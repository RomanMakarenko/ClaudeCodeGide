# Editorial review: 125 уроків

**Дата огляду:** 2026-09-13  
**Режим:** read-only review. Файли уроків, registry, типи, renderer і `TASK_SPEC*.md` під час перевірки не змінювалися.

## Метод і межі

Перевірено registry та authored content у `src/data/guide.ts`, `src/data/content.ts` і `src/data/level-01.ts`–`src/data/level-25.ts`; source indexes `TASK_SPEC1.md`–`TASK_SPEC25.md`; валідатор `scripts/validate-guide.ts`; renderer `src/pages/guide/[...slug].astro`; типи `src/types/guide.ts`; а також workbook `/Users/romanmakarenko/Documents/code/ClaudeCodeGide/Claude code.xlsx`.

Зіставлення виконувалося за стабільним ключем `levelNN.lectureNN` і URL, а не за позицією рядка. Семантичну відповідність оцінено на рівні теми, назви, опису, структури authored sections і заявлених артефактів. XLSX та `TASK_SPEC*.md` є індексами й назвами джерел, а не повними текстами лекцій, тому вони не дають підстав оголосити кожне речення джерельною дослівною копією.

## Повнота корпусу

- **Confirmed — 125/125 canonical lessons.** Registry містить 25 рівнів по 5 уроків; для кожного маршруту є authored content, source file і HTTPS source URL. Це підтверджується `src/data/guide.ts`, `src/data/content.ts` та `scripts/validate-guide.ts:11-49`.
- **Confirmed — пропусків серед canonical scope 1–25 не знайдено.** Усі 125 canonical IDs із workbook зіставляються з registry; registry-only canonical IDs відсутні.
- **Confirmed — workbook містить 128 заповнених topic/lecture записів (136 рядків разом із header і порожніми рядками), тобто три записи поза поточним scope:** `level26.lecture01`, `level26.lecture02` і `level35.lecture01`. Це не пропущені уроки рівнів 1–25. `level35.lecture01` — «Встановлення плагіна JavaRush» — присутній у `TASK_SPEC1.md`, але навмисно виключений із маршрутизації та validator-а (`scripts/validate-guide.ts:51-53`).
- **Confirmed — дублікати canonical IDs і source URLs не виявлені.** Порядок уроків усередині кожного рівня contiguous; `npm run validate` повідомив: `Guide validation passed: 125 source-backed pages across 25 levels.`
- **Confirmed — назви частини existing lessons мають редакційні варіанти в workbook.** Виявлено 9 title wording variants (зокрема backticks навколо `CLAUDE.md`, а також варіанти для evidence/docs, review/subagents, delegation/planning, controlled implementation, L1 і risk). Це не URL- або lesson-identity gaps; статус — **Minor / editorial normalization**.

Отже, у сенсі заявленого scope не знайдено втраченого уроку. Три додаткові рядки workbook потребують лише окремого рішення про майбутній scope, а не автоматичного додавання до поточних 125 сторінок.

## Смислова відповідність і редакторські знахідки

На рівні доступних індексів і власних конспектів **не підтверджено зміщення теми цілого уроку**: назви й registry descriptions відповідають темам відповідних `TASK_SPEC`/workbook rows, а всі 125 записів мають непорожній структурований content. Це статус **Confirmed на рівні topic coverage**, але не твердження про дослівну або повну відповідність кожному зовнішньому абзацу.

Виявлено такі редакторські проблеми:

1. **Major / Confirmed — неузгоджена назва evidence-артефакту.** У ранніх матеріалах використовується `EVIDENCE_LOG.md` (наприклад, `src/data/level-04.ts:49-73`, `src/data/level-18.ts:160-172`, `src/data/level-21.ts:285-296`), а в capstone — `EVIDENCE.md` (`src/data/level-25.ts:143-146`, `src/data/level-25.ts:262-270`). Це може створити два різні артефакти замість одного журналу доказів. Статус: **Needs verification / editorial decision** — потрібно визначити canonical filename і пояснити, чи `EVIDENCE_LOG.md` є legacy-назвою.
2. **Minor / Confirmed — дрейф шляхів у capstone-прикладах.** `l25-03` посилається на `EVIDENCE.md` і `SPEC.md` у корені, тоді як `l25-04` у таблиці використовує `docs/SPEC.md` і `docs/EVIDENCE.md` (`src/data/level-25.ts:143-163`, `src/data/level-25.ts:213-225`). Це не доводить помилку конкретного проєкту, але без явного правила суперечить вимозі називати canonical path. Статус: **Needs verification**.
3. **Needs verification — source-backed technical claims.** Твердження про команди, permissions, hooks, CI, plugins і актуальну поведінку Claude Code можуть змінюватися разом із CLI та документацією. Поточна перевірка підтверджує наявність і тематичну узгодженість конспектів, але не замінює live-перевірку всіх 125 зовнішніх JavaRush URLs. Статус: **Not verified** для актуальності кожної version-sensitive деталі.

Фізичного `EVIDENCE.md` або `EVIDENCE_LOG.md` до цього огляду в проєкті не було; згадки про них існували лише як inline content у `src/data/level-*.ts`. Тому сам цей файл є першим окремим review evidence artifact, а не доказом того, що описані в уроках артефакти вже створені в кожному навчальному проєкті.

## Діаграми, зображення, відео та презентації

Діаграми й зображення не були «загублені» під час копіювання окремих файлів — у поточному джерельному пакеті їх немає як локальних assets і поточна delivery model не вміє їх рендерити:

- у `Claude code.xlsx` немає `xl/media` із вбудованими файлами;
- `xl/drawings/drawing1.xml` не містить drawing objects (`twoCellAnchor`, `oneCellAnchor`, `pic` або `graphicFrame` відсутні);
- `GuideSection` у `src/types/guide.ts:20-28` підтримує тільки headings, paragraphs, bullets, steps, code, tables і notes — без `image`, `diagram`, `video`, `presentation` або `embed`;
- `src/pages/guide/[...slug].astro` рендерить текстові блоки, таблиці, code blocks і notes, але не має media/diagram renderer.

Workbook містить зовнішні presentation/video URLs лише для частини уроків: **22 video URLs і 21 presentation-column URLs із 128 заповнених lesson rows**. Вони залишилися source metadata, а не вбудованими елементами сторінки: registry зберігає лише JavaRush `sourceUrl`, а renderer не показує окремих presentation/video links. Це **Confirmed delivery gap**, але не пропущений lesson ID. Наслідок — у тих темах, де слайди або відео несуть важливий візуальний контекст, локальний сайт показує текстовий конспект без відповідної візуальної опори. Для виправлення потрібне окреме рішення про media schema, asset policy, зовнішні embeds і доступність; під час цього read-only review нічого не змінювалося.

## TASK_SPEC4: review додаткових матеріалів

### Інвентар джерел

У `TASK_SPEC4.md` знайдено **20 зовнішніх посилань**: 19 presentation/deck URLs і 1 GitHub repository. Усі URL були передані на live fetch у межах цього огляду; для deck-ів аналізувалися доступні headings, topics, artifacts та exercises, а GitHub-джерело виявилося доступним, але стислим за описом.

Перелік перевірених джерел:

- рівень 01 — `https://ua-claude-code-01-0c10.javarush-university.workers.dev/#slide-26`
- рівень 02 — `https://ua-claude-code-02-abb4.javarush-university.workers.dev/#slide-20`
- рівень 03 — `https://ua-claude-code-03-4bf0.javarush-university.workers.dev/`
- рівень 04 — `https://ua-claude-code-04-1625.javarush-university.workers.dev/`
- рівень 06 — `https://ua-claude-code-06-26ef.javarush-university.workers.dev/`
- рівень 06, GitHub-приклад — `https://github.com/JR-J4/tg-bot-example`
- рівень 07 — `https://ua-claude-code-07-c130.javarush-university.workers.dev/`
- рівень 08 — `https://ua-claude-code-08-fbba.javarush-university.workers.dev/`
- рівень 09 — `https://ua-claude-code-09-60bc.javarush-university.workers.dev/`
- рівень 10 — `https://ua-claude-code-10-53f8.javarush-university.workers.dev/`
- рівень 11 — `https://ua-claude-code-11-8b90.javarush-university.workers.dev/`
- рівень 12 — `https://ua-claude-code-12-e432.javarush-university.workers.dev/`
- рівень 13 — `https://ua-claude-code-13-1dca.javarush-university.workers.dev/`
- рівень 14 — `https://ua-claude-code-14-cc74.javarush-university.workers.dev/`
- рівень 15 — `https://ua-claude-code-15-9643.javarush-university.workers.dev/`
- рівень 16 — `https://ua-claude-code-16-06a6.javarush-university.workers.dev/`
- рівень 17 — `https://ua-claude-code-17-54d2.javarush-university.workers.dev/`
- рівень 18 — `https://ua-claude-code-18-c437.javarush-university.workers.dev/#slide-1`
- рівень 19 — `https://ua-claude-code-19-29b5.javarush-university.workers.dev/`
- рівень 20 — `https://ua-claude-code-20-1f05.javarush-university.workers.dev/`

У TASK_SPEC4 **немає посилань для рівня 05 і рівнів 21–25**. Це coverage gap саме supplementary layer; це не пропущені canonical lesson routes, оскільки registry усе ще містить 125 уроків рівнів 1–25.

### Зіставлення з курсом

- **Підтверджено тематичне повторення для покритого діапазону 01–04 і 06–20.** Додаткові матеріали проходять ту саму послідовність: базова модель Claude Code, setup/auth/IDE/Git, permissions і rules; task spec та acceptance; context/session lifecycle і recovery; plugins; subagents, skills, MCP і hooks; multi-agent/worktree workflows; testing, refactoring, CI, quality gates, risk boundaries та human approval.
- **Суплементи часто деталізують практику краще за canonical конспекти.** Серед знайдених exercises: iterative browser workflow, calculator/logic labs, locale-directory lab, `tester.md`/`file2md`, MCP injection test, log-only → blocking hooks ladder, collectors/digest/verifier, pipeline status/evidence flow, TDD and flaky-test cases, characterization/refactoring, deterministic CI diagnosis, traceability і GO/HOLD/SPLIT decision exercises.
- **Тематичних суперечностей із 125 canonical lesson routes на рівні оглянутих headings не підтверджено.** Водночас supplement materials не є повними source texts, тому цей висновок не означає дослівної або повної відповідності кожному слайду.
- **GitHub `tg-bot-example` — слабке джерело для semantic verification.** Сторінка доступна, але публічний опис і структура repository не дають достатньо матеріалу, щоб підтвердити повну відповідність конкретним lesson outcomes; його слід вважати прикладом, а не authoritative course index.

### Що додаткові матеріали містять, але каталог не описує

У deck-ах названо більше практичних артефактів, ніж у поточному catalog registry: `CLAWD Wisdom`, `YOLO`, `Runner`, locale artifacts, `CONTRACT.md`, `PLAN.md`, `workflow.md`, `sources/research-digest`, `run-status.yaml`, `decision_id`, `diagnosis.json`, `AI_CODING_POLICY.md`, `CODEOWNERS`, `trace-head-check`, branch protection і pilot/postmortem records. Це не omissions lesson routes, але **delivery/catalog gap**: частина supplementary artifacts не має окремої картки, typed metadata або copyable template.

### Висновок TASK_SPEC4

**Не підтверджено пропуску canonical уроків у межах рівнів 1–25.** Додаткові матеріали загалом повторюють і практично розширюють курс для рівнів 01–04 і 06–20. Проте TASK_SPEC4 не містить матеріалів для рівня 05 і 21–25, а окремі labs та artifacts із presentation layer не представлені в lesson renderer або catalog. Тому результат — **semantic coverage підтверджена частково/на рівні тем, delivery completeness не підтверджена**. Для повного покриття потрібні supplementary links для відсутніх рівнів, typed source/media metadata, renderer і окремі catalog entries для важливих практичних артефактів.

## Автоматичні перевірки

- `npm run check` — **успішно:** 0 errors, 0 warnings, 0 hints.
- `npm run validate:artifacts` — **успішно:** 24 artifacts.
- `npm run validate` — **неуспішно через pre-existing gaps:** відсутні `TASK_SPEC1.md` і `TASK_SPEC4.md`–`TASK_SPEC25.md`, а також validator очікує інше формулювання route-count у README. Цю проблему не змінювали в рамках TASK_SPEC4.

Ці команди підтверджують типову та structural integrity сайту, але не доводять повну редакторську правильність, повноту supplementary layer або актуальність усіх version-sensitive зовнішніх джерел.

## Висновок

Головного пропуску в заявленому корпусі немає: усі 125 уроків рівнів 1–25 присутні, мають content і проходять structural validation. Реально пропущено не уроки, а частину delivery layer: workbook-посилання на відео та презентації не стали елементами сторінок, а модель даних не має для них полів. Окремого редакторського доопрацювання потребують canonical naming/path для evidence-артефактів і майбутня live-перевірка version-sensitive технічних тверджень. Ці висновки зафіксовані без змін у матеріалах уроків.
