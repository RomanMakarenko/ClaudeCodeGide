import type { SearchIndex, SearchMatch } from '../types/search';

const aliasGroups: Record<string, string[]> = {
  evidence: ['evidence', 'евіденс', 'evidens', 'доказ', 'докази', 'evidence.md', 'evidence_log.md', 'docs/evidence.md'],
  migration: ['migration', 'міграція', 'міграції', 'міграційний', 'міграційна'],
  configuration: ['configuration', 'config', 'конфігурація', 'конфігурації', 'налаштування'],
  verification: ['verification', 'перевірка', 'перевірки', 'перевірити'],
  artifact: ['artifact', 'артефакт', 'артефакти']
};

const aliasToCanonical = new Map<string, string>();
for (const [canonical, aliases] of Object.entries(aliasGroups)) {
  for (const alias of aliases) aliasToCanonical.set(alias, canonical);
}

const cyrillicToLatin: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ye', ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'yu', я: 'ya', ы: 'y', э: 'e', ё: 'yo', ъ: ''
};

const stripPunctuation = (value: string) => value
  .normalize('NFKC')
  .toLocaleLowerCase('uk-UA')
  .replace(/[’ʼ`]/g, "'")
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim();

export const transliterate = (value: string) => [...value].map((character) => cyrillicToLatin[character] ?? character).join('');

export const normalizeText = (value: string) => stripPunctuation(value);

export const tokenize = (value: string) => {
  const normalized = normalizeText(value);
  return normalized ? normalized.split(/\s+/).filter(Boolean) : [];
};

export const expandQueryTokens = (value: string) => {
  const tokens = tokenize(value);
  const expanded = new Set<string>();
  for (const token of tokens) {
    const canonical = aliasToCanonical.get(token) ?? aliasToCanonical.get(transliterate(token));
    expanded.add(canonical ?? token);
    const transliterated = transliterate(token);
    if (transliterated !== token) expanded.add(transliterated);
  }
  return [...expanded];
};

const tokenSet = (tokens: string[]) => new Set(tokens);

export const search = (index: SearchIndex, query: string, limit = 20): SearchMatch[] => {
  const normalizedQuery = normalizeText(query);
  const queryTokens = expandQueryTokens(query);
  if (!queryTokens.length) return [];

  const candidateIds = new Set<number>();
  for (const token of queryTokens) {
    for (const [indexedToken, ids] of Object.entries(index.postings)) {
      if (indexedToken === token || indexedToken.startsWith(token) || indexedToken.includes(token)) {
        ids.forEach((id) => candidateIds.add(id));
      }
    }
  }

  const matches: SearchMatch[] = [];
  for (const documentId of candidateIds) {
    const document = index.documents[documentId];
    if (!document) continue;
    const title = normalizeText(document.title);
    const context = normalizeText(document.context);
    const snippet = normalizeText(document.snippet);
    const titleTokens = tokenSet(document.titleTokens);
    const contextTokens = tokenSet(document.contextTokens);
    const indexedTokens = new Set<string>();
    for (const [token, ids] of Object.entries(index.postings)) {
      if (ids.includes(documentId)) indexedTokens.add(token);
    }

    let score = 0;
    let matched = 0;
    for (const token of queryTokens) {
      const direct = titleTokens.has(token) || contextTokens.has(token) || indexedTokens.has(token);
      const prefix = [...indexedTokens].some((indexed) => indexed.startsWith(token));
      const substring = [...indexedTokens].some((indexed) => indexed.includes(token));
      if (direct || prefix || substring) matched += 1;
      if (titleTokens.has(token)) score += 60;
      else if (contextTokens.has(token)) score += 36;
      else if (indexedTokens.has(token)) score += 22;
      else if (prefix) score += 13;
      else if (substring || snippet.includes(token)) score += 7;
    }

    if (matched !== queryTokens.length) score -= (queryTokens.length - matched) * 9;
    if (normalizedQuery && title.includes(normalizedQuery)) score += 90;
    if (normalizedQuery && context.includes(normalizedQuery)) score += 30;
    if (document.kind === 'artifact' && queryTokens.includes('evidence') && document.id === 'evidence') score += 25;
    if (!score) continue;
    matches.push({ ...document, score });
  }

  return matches.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'uk') || a.href.localeCompare(b.href)).slice(0, limit);
};
