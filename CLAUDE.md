# Claude Code Guide — project recovery contract

## 1. Місія проєкту

Це український практичний статичний гайд про Claude Code, його робочі поверхні, інженерні workflow та artifacts. Мета сайту — пояснювати не лише команди, а спосіб контрольованої роботи: постановка задачі, discovery, планування, реалізація, verification, handoff, governance, modernization і migration planning.

Цей файл є operational instruction і reconstruction blueprint. Якщо repository переноситься в новий проект, спочатку відновіть структуру, реєстри, типи, маршрути та правила нижче. Не замінюйте описаний registry-driven підхід набором hardcoded сторінок.

Проєкт є навчальним сайтом, а не реалізацією бізнес-системи. Наведені task specs, templates, artifact descriptions і migration workflows — documented examples, якщо інше прямо не підтверджене фактичним файлом або свіжим verification output.

## 2. Verified baseline і межі

Поточний підтверджений baseline:

- Astro 5.x.
- TypeScript.
- ESM (`"type": "module"`).
- Node.js `>=20`.
- Astro static output: `output: 'static'`.
- HTML compression: `compressHTML: true`.
- Поточний `site` у `astro.config.mjs`: `https://claude-code-guide.example.com`.
- 29 зареєстрованих рівнів.
- 145 source-backed lesson routes: 29 рівнів × 5 уроків.
- 64 records у central artifact catalog.
- 24 records у task catalog.
- Search index охоплює 233 records (145 lessons, 64 artifacts, 24 tasks) і 8042 indexed terms у build-time projection.
- Увесь authored lesson content зберігається в TypeScript registries.

Архітектура не містить і не повинна отримати без окремого запиту:

- backend або server runtime;
- API endpoints;
- database;
- authorization або user accounts;
- server-side persistence;
- production deployment;
- реальну Java/Boot migration;
- автоматичний publish, release або deploy;
- зовнішні інтеграції, які виконують operational actions.

Levels 28–29 можуть згадувати Boot 3.x, Java 21, changelog research, compatibility matrix, pilot execution, rollback, behavior parity та phased migration plan. Це освітня схема discovery/planning/execution controls. Вона не є доказом upgrade, міграції, сумісності, rollback, rollout або production readiness.

### Source of truth

Для поточного стану використовуй у такому пріоритеті:

1. Фактичні файли repository.
2. Typed registries у `src/data/` і type contracts у `src/types/`.
3. Executable validators та свіжі outputs команд.
4. README/RUNBOOK як контекст і delivery history.
5. Історичні task-spec files та старі числа — лише як історію.

Якщо документація суперечить registry або файлам, не маскуй суперечність. Познач її як `Unknown` або `Needs verification`, вкажи обидва шляхи й не роби широкий cleanup без окремого запиту.

Історичні записи можуть містити старі числа на кшталт 125, 130 або 135 reviewed routes, а README може містити wording про першу ітерацію на 34 сторінки. Це не треба ретроактивно переписувати лише для узгодження хронології. Для current state використовуй `guidePages`, `artifacts` і `taskSpecs`.

## 3. Технології та команди

`package.json` має зберігати такі основні scripts:

```text
npm run dev              # astro dev
npm run check            # astro check && tsc --noEmit
npm run validate         # guide + artifacts + task specs + search validators
npm run validate:registry# guide + artifact validators
npm run validate:artifacts# artifact validator only
npm run build            # astro build
npm run preview          # astro preview
```

Перед командами, що потребують dependencies:

```bash
npm install
```

Node має відповідати `>=20`. Не оновлюй dependencies, lockfile, Astro або TypeScript без explicit request. Не роби version bump лише для того, щоб змінити документацію.

Нормальний локальний порядок перевірки:

```bash
npm run check
npm run validate
npm run build
```

`npm run dev` і `npm run preview` потрібні для локального перегляду, але сам факт запуску сервера не є browser visual verification.

## 4. Canonical структура repository

Очікувана структура має виглядати приблизно так:

```text
.
├── CLAUDE.md
├── README.md
├── RUNBOOK.md
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── public/
│   └── favicon.svg
├── archive/
│   └── task-specs/
│       ├── TASK_SPEC.md
│       ├── TASK_SPEC2.md
│       ├── TASK_SPEC3.md
│       ├── TASK_SPEC4.md
│       ├── TASK_SPEC26.md
│       ├── TASK_SPEC27.md
│       ├── TASK_SPEC28.md
│       ├── TASK_SPEC111.md
│       ├── TASK_SPEC333.md
│       └── TASK_SPEC444.md
├── scripts/
│   ├── validate-guide.ts
│   ├── validate-artifacts.ts
│   ├── validate-task-specs.ts
│   └── validate-search.ts
└── src/
    ├── components/
    ├── data/
    │   ├── guide.ts
    │   ├── content.ts
    │   ├── level-01.ts … level-29.ts
    │   ├── artifacts.ts
    │   └── task-specs.ts
    ├── layouts/
    │   └── BaseLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── 404.astro
    │   ├── guide/
    │   │   ├── index.astro
    │   │   └── [...slug].astro
    │   ├── artifacts/
    │   │   └── index.astro
    │   ├── tasks/
    │   │   └── index.astro
    │   └── search/
    │       └── index.astro
    ├── styles/
    │   └── global.css
    └── types/
        ├── guide.ts
        ├── artifact.ts
        └── task-spec.ts
```

`dist/`, `.astro/` і `node_modules/` — generated/dependency output. Вони не є source of truth і не повинні бути джерелом lesson identity або artifact availability. `dist/` можна перевіряти після build, але не редагувати вручну.

`archive/task-specs/` містить історичні inputs. Не повертай ці files у root і не використовуй їх для визначення route identity, task availability або current task registry.

## 5. Routes і URL-контракти

Стабільні routes:

- `/` — homepage: hero, counts, navigation і level cards.
- `/guide` — каталог 29 рівнів і 145 lesson routes.
- `/guide/<page.slug>` — конкретний lesson; routes генеруються через `getStaticPaths()` із `guidePages`.
- `/artifacts` — central artifact catalog.
- `/tasks` — central task specification catalog.
- `/search` — static client-side пошук по lessons, artifacts і tasks.
- `/404` — статична not-found сторінка.

Стабільні internal anchors:

- `/artifacts#<artifact-id>` — artifact deep link;
- `/tasks#<task-id>` — task deep link;
- `/tasks#family-<family-id>` — task family deep link.

Не змінюй існуючі lesson IDs, slugs або artifact/task anchors без explicit migration plan. Майбутня можлива міграція до MD/MDX може змінити storage format, але не повинна ламати canonical URLs.

## 6. Guide registry і authored content

### `src/data/guide.ts`

Файл має бути central identity registry і експортувати:

- `guideLevels`;
- `guidePages`;
- `getLevel(levelId)`;
- `getPagesForLevel(levelId)`.

`GuideLevel`:

```ts
type GuideLevel = {
  id: string;
  number: number;
  title: string;
  description: string;
  planned: number;
};
```

Зараз є `level-01` … `level-29`, кожен із `planned: 5`. Кожен рівень має пʼять lesson records.

`GuidePage`:

```ts
type GuidePage = {
  id: string;
  slug: string;
  title: string;
  levelId: string;
  order: number;
  description: string;
  sourceUrl: string;
};
```

`id`, `slug`, `levelId` і `order` — стабільні дані. Canonical lesson route завжди формується як `/guide/${page.slug}`.

`sourceUrl` — canonical HTTPS JavaRush URL для відповідного lesson. Для lesson identity використовуються саме ці зовнішні source URLs. Не додавай у `sourceUrl`, source metadata або lesson references:

- `CLAUDE.md`;
- `README.md`;
- `RUNBOOK.md`;
- `EVIDENCE.md` або `EVIDENCE_LOG.md`;
- локальні `TASK_SPEC*.md`;
- archive paths;
- generated output.

### Search contract

- `src/data/search.ts` будує компактний build-time projection із guide, artifact і task registries; client-side runtime не імпортує повні registries.
- `src/lib/search.ts` є pure search layer із Unicode normalization, tokenization, explicit Ukrainian/Cyrillic-to-Latin transliteration та alias mapping. Запит `евіденс` повинен знаходити artifact `EVIDENCE.md`.
- Пошук є deterministic lexical/semantic layer із weighted title/context matching, phrase bonuses, prefix/substring support і bounded results; embeddings, external search services, backend/API/database та persistence не додаються.
- `scripts/validate-search.ts` перевіряє 233 documents, postings, destination hrefs, compact payload і evidence regression query.

Не вигадуй відсутні JavaRush lectures і не додавай неіснуючий `l1-06` plugin lesson. Якщо external URL не підтверджений, залиш його `Unknown`, а не створюй правдоподібний URL.

### `src/data/content.ts` і `src/data/level-*.ts`

`content.ts` імпортує `level-01.ts` … `level-29.ts` і експортує `guideContentByLevel`. Це central authored-content registry:

```ts
const guideContentByLevel = {
  'level-01': levelOneContent,
  // …
  'level-28': levelTwentyEightContent
};
```

Усі 145 зареєстрованих pages мають authored content. Content key має відповідати page `id`.

Основний content model у `src/types/guide.ts`:

```ts
type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  code?: GuideCodeBlock[];
  table?: GuideTable;
  note?: string;
  artifactIds?: string[];
  additionalMaterials?: GuideLink[];
  lab?: GuideLab;
};
```

Підтримувані presentation primitives — headings, paragraphs, bullets, ordered steps, code blocks, tables, notes, artifact references, additional materials і labs. Поточний renderer не має окремої schema для images, diagrams, video або presentations. Не стверджуй, що такі media були відтворені, якщо renderer їх не підтримує.

`GuideLab`:

```ts
type GuideLab = {
  id: string;
  title: string;
  goal: string;
  steps: string[];
  inputs?: string[];
  outputs?: string[];
  verification?: string[];
  stopCondition?: string;
  artifactIds?: string[];
  sourceRefs: string[];
};
```

Відомі explicit labs:

```text
l6-01-milestone-record
l6-05-handoff-review
l8-02-diagnosis-packet
l10-04-plugin-trial
l14-05-hook-ladder
l16-02-pipeline-handoff
l18-04-bugfix-evidence
l20-02-characterization
l21-03-ci-diagnosis
l22-04-quality-gate
l23-05-risk-boundary
l24-03-policy-review
l25-04-capstone-evidence
```

Lab IDs можуть не збігатися з page ID, у якому вони оголошені. Наприклад, mapping треба перевіряти через `guideContentByLevel`, а не виводити з назви lab. Validator `validate-task-specs.ts` контролює фактичне розташування lab.

### Тематична дуга рівнів

- **1–2:** mental model, installation, authorization, update, settings, permissions, `CLAUDE.md`, Git baseline, safe start.
- **3–4:** task specification, Goal, current/desired behavior, scope, non-goals, constraints, acceptance criteria, verification, DoD, evidence.
- **5–6:** context budget, compaction, session lifecycle, milestones, checkpoints, rewind, Git recovery, worktree, handoff, fresh reviewer.
- **7–8:** codebase discovery, inventory, modules, dependencies, runtime flow, API map, logs, IDE/terminal evidence, subagents, docs-as-code.
- **9–10:** command taxonomy, bundled/custom skills, `SKILL.md`, argument hints, plugins, scope, lifecycle, verification і team-ready packaging.
- **11–12:** subagent roles, engineering/output contracts, tools, permissions, scoped skills/MCP/memory, context/worktree isolation, lifecycle evaluation.
- **13–14:** MCP, transports, scopes, auth boundaries, tool preflight, hooks, event/matcher/handler, automation ladder, debugging і recovery.
- **15–16:** parallelism choices, agent teams, orchestration patterns, workstreams, pipelines, checkpoints, merge strategy, human review, usefulness metrics.
- **17–18:** issue intake, investigation, implementation planning, PR slices, controlled implementation, bugfix, regression evidence, commits, diff review.
- **19–20:** risk-based tests, TDD, unit/integration/API/E2E distinctions, smoke/regression, characterization, verification harness, behavior-preserving refactoring.
- **21–22:** non-interactive Claude Code, environment diagnostics, CI, build/packaging, failure analysis, quality gates, docs-as-code, release boundaries, recovery.
- **23–24:** risk classification, capability envelope, permissions, protected paths, sensitive data, sandbox, approvals, policy, traceability, AI engineering culture.
- **25:** capstone brief, SPEC, guardrails, repository baseline, roadmap, evaluation і evidence.
- **26–29:** legacy discovery, technical debt, current architecture, behavior inventory, modernization, seams, Strangler Fig, migration discovery, changelog, compatibility, pilot execution, rollback, behavior parity, migration types і data/configuration sequencing.

## 7. Artifact catalog contract

`src/types/artifact.ts` визначає typed catalog. Artifact catalog — це curated description of reusable artifacts, а не автоматичний inventory фактичних файлів.

```ts
type ArtifactStatus =
  | 'present'
  | 'documented-example'
  | 'variant'
  | 'external-source';

type ArtifactPath = {
  value: string;
  scope: 'repository' | 'user' | 'external' | 'generated';
  status: ArtifactStatus;
};

type ArtifactField = {
  name: string;
  description: string;
  requirement: 'required' | 'optional' | 'conventional';
  example?: string;
};

type Artifact = {
  id: string;
  name: string;
  category: string;
  responsibility: string;
  role: string;
  paths: ArtifactPath[];
  fields: ArtifactField[];
  whenToUse: string;
  poorChoiceWhen: string;
  status: ArtifactStatus;
  template: string;
  aliases?: string[];
  versionNote?: string;
  sourceRefs: string[];
};
```

Поточний каталог має 64 records у 8 categories. Він має 8 purpose-based quick-jump groups. Кожен artifact ID повинен зʼявлятися в quick-jump рівно один раз.

Поточні artifact IDs:

```text
claude-md
claude-local-md
claude-rules
settings-json
settings-local-json
task-spec
spec
evidence
codebase-inventory
api-map
handoff-note
skill-md
subagent
hook-config
mcp-config
plugin
git-review-artifacts
readme
capstone-brief
backlog-roadmap
pr-description
commit-message
changelog
commands-md
clawd-wisdom
clawd-yolo
clawd-runner
locales-json
locale-bundle
handoff-review
contract-md
plan-md
workflow-md
research-digest
run-status-yaml
diagnosis-json
ai-coding-policy
codeowners
postmortem
review-notes
runbook-md
debt-signals
risk-map
architecture-current
behavior-inventory
critical-flows
module-inventory
characterization-tests
modernization-baseline
refactoring-plan
seam-map
strangler-slice
modernization-roadmap
modernization-anti-patterns
migration-discovery
changelog-research
dependency-graph
compatibility-matrix
migration-plan
migration-types
data-config-migration
rollback
migration-validation-report
post-migration-notes
migration-types
data-config-migration
```

Quick-jump purpose groups охоплюють:

- Orient in project;
- Define/plan;
- Configure/extend workflow;
- Execute/control;
- Verify/handoff/deliver;
- Explore legacy/risk;
- Modernize legacy no big-bang;
- Plan migration/compatibility.

### Artifact naming and path rules

Ключові conventions, які потрібно зберігати в catalog:

- `CLAUDE.md` — project-level instructions і recovery contract.
- `.claude/CLAUDE.local.md` — local context, не shared canonical project policy.
- `.claude/settings.json` — shared project settings.
- `.claude/settings.local.json` — local settings; не записувати secrets у repository.
- `TASK_SPEC.md` — task contract; root `{project}/TASK_SPEC.md` у catalog є documented example.
- `archive/task-specs/TASK_SPEC.md` — present historical archive path у catalog.
- `SPEC.md` — broader project/capstone specification.
- `EVIDENCE.md` — evidence/review record, якщо такий шлях фактично обраний проектом.
- `CODEBASE_INVENTORY.md`, `API_MAP.md`, `HANDOFF_NOTE.md` — discovery/handoff artifacts.
- `.claude/skills/**/SKILL.md`, `.claude/agents/`, hooks, MCP і plugins — reusable workflow/configuration forms.
- CI/build/release artifacts — schemas and examples, не докази фактичного pipeline run.
- `DEBT_SIGNALS.md`, `RISK_MAP.md`, `ARCHITECTURE_CURRENT.md`, `BEHAVIOR_INVENTORY.md`, `CRITICAL_FLOWS.md`, `MODULE_INVENTORY.md` — legacy discovery forms.
- `CHARACTERIZATION_TESTS.md`, `MODERNIZATION_BASELINE.md`, `REFACTORING_PLAN.md`, `SEAM_MAP.md`, `STRANGLER_SLICE.md`, `MODERNIZATION_ROADMAP.md` — modernization forms.
- `MIGRATION_DISCOVERY.md`, `CHANGELOG_RESEARCH.md`, `DEPENDENCY_GRAPH.md`, `COMPATIBILITY_MATRIX.md`, `MIGRATION_PLAN.md`, `MIGRATION_TYPES.md`, `DATA_CONFIG_MIGRATION.md`, `ROLLBACK.md`, `MIGRATION_VALIDATION_REPORT.md`, `POST_MIGRATION_NOTES.md` — migration planning, execution-control і handoff forms.

`{project}/TASK_SPEC.md`, `{project}/EVIDENCE.md`, `docs/SPEC.md` та подібні entries — path conventions або documented variants, доки статус не підтверджує реальний файл. `present` означає лише те, що конкретний path підтверджений як present у registry/history; не поширюй цей статус на інші варіанти.

Кожна artifact card повинна мати responsibility, role, paths, fields, template, when-to-use, poor-choice boundary, status і source references. Source references для lesson-backed catalog мають бути рівнями/уроками гайда, а не внутрішніми delivery documents.

## 8. Task catalog contract

`src/types/task-spec.ts` визначає:

```ts
type TaskMode = 'general' | 'modernization' | 'migration';

type TaskFamily =
  | 'foundations'
  | 'discovery'
  | 'delivery'
  | 'automation'
  | 'governance'
  | 'legacy-transition';
```

`TaskType` має такі 23 literal types:

```text
environment-setup
git-baseline
feature
bugfix
refactoring
characterization
tests
documentation
investigation-diagnosis
codebase-discovery
acceptance-verification
issue-intake
implementation-plan
pr-slicing
handoff-recovery
extensions-evaluation
agent-orchestration
ci-build
quality-release
risk-policy
capstone
modernization
migration
```

Registry `src/data/task-specs.ts` має 24 task records. Це кількість records, а не кількість унікальних literal values у union. Не скорочуй current catalog до двох mode cards і не роби 145 task cards за кількістю lessons.

Кожен `TaskSpec` має:

```ts
type TaskSpec = {
  id: string;
  type: TaskType;
  family: TaskFamily;
  title: string;
  mode: TaskMode;
  goal: string;
  scope: string[];
  nonGoals: string[];
  success: string[];
  rules: string[];
  artifactIds: string[];
  artifactExamples: { artifactId: string; content: string }[];
  sourceLessonIds: string[];
  sourceLabIds?: string[];
  note: string;
};
```

Кожен record повинен мати:

- непорожній goal, scope, non-goals, success, rules і note;
- щонайменше одне source lesson;
- валідні artifact IDs;
- щонайменше один непорожній filled artifact example;
- явну межу `documented example`, а не claim про виконану роботу;
- source lesson links, що ведуть на `/guide/<page.slug>`;
- optional lab links, що ведуть до фактичного lesson, у якому lab оголошено.

Усі 29 levels мають бути покриті task catalog. Explicit labs mapping перевіряється validator-ом.

Основні task records охоплюють setup/baseline, feature, bugfix, refactoring, characterization, tests, documentation, diagnosis, discovery, acceptance, issue intake, implementation plan, PR slicing, handoff/recovery, extension evaluation, orchestration, CI/build, quality/release, risk/policy, capstone, legacy discovery, modernization і migration.

### Modernization vs Migration

- **Modernization:** поступове внутрішнє покращення legacy-коду, збереження observable behavior, seams, characterization, risk gates і малих slices.
- **Migration:** перехід із визначеного source state до target state, із dependency/changelog research, compatibility matrix, behavior contract, rollback і phased exit criteria.

Не називай migration task доказом того, що source code оновлено, dependencies змінено, application запущено або compatibility перевірено.

## 9. Authoring, evidence і factual claims

Завжди розділяй чотири статуси artifact:

- `present` — фактичний path підтверджений;
- `documented-example` — опис/шаблон існує, але physical file або execution не підтверджені;
- `variant` — альтернативний path/name convention;
- `external-source` — зовнішній або operational artifact, який не є local file.

Template, filled example, lesson prose, registry record і path convention не доводять, що файл існує або команда була виконана.

Якщо факт не підтверджений:

- використовуй `Unknown`;
- для pending verification використовуй `Needs verification`;
- для навчального шаблону прямо пиши `documented example`;
- додавай repository file path і, коли це research/migration claim, section/URL official docs;
- не перетворюй припущення на compatibility fact, test result або production status.

Заборонено вигадувати:

- виконані тести або їхні результати;
- build output, якого не було у свіжому command output;
- browser/mobile screenshots або visual verification;
- production readiness, deployment, publish, rollout або approval;
- compatibility outcome для Java/Boot migration;
- реальний bugfix, regression evidence або merged PR;
- user/team approval;
- наявність artifact file лише тому, що його описано в catalog.

Не записуй secrets, credentials, tokens, PII або зайві operational logs у приклади, документацію чи evidence.

`RUNBOOK.md` — внутрішня delivery history цього repository. Він не є production audit log, не є повним transcript і не замінює plan або evidence. `EVIDENCE.md` — опис evidence/review boundary, а не автоматичний доказ наявності всіх перелічених files. `EVIDENCE_LOG.md` і `EVIDENCE.md`, root і `docs/` — різні naming/path variants, доки фактичний canonical path не підтверджений.

## 10. Rendering і UX invariants

### Shared layout

`src/layouts/BaseLayout.astro` є shared document shell:

- `<html lang="uk">`;
- description і title metadata;
- favicon `/favicon.svg`;
- skip link до `#main-content`;
- sticky site header;
- navigation до `/`, `/guide`, `/artifacts`, `/tasks`;
- `#page-top` sentinel;
- back-to-top link;
- footer із static-only message;
- shared global stylesheet;
- client-side sidebar/session helpers.

Не видаляй homepage links на `/tasks` або `/artifacts`: вони потрібні, зокрема, для mobile access.

### Lesson pages

`src/pages/guide/[...slug].astro`:

- будує `getStaticPaths()` із `guidePages`;
- знаходить level/page content у registries;
- рендерить sections, labs і artifact references;
- рендерить canonical JavaRush source link;
- передає `robots="noindex, nofollow"` у `BaseLayout`.

Lesson pages не повинні індексуватися як search landing pages. Не поширюй `noindex` на `/`, `/guide`, `/artifacts` або `/tasks` без окремого рішення.

External JavaRush і additional-material links відкриваються в новій вкладці та мають `rel="nofollow noopener noreferrer"`. Не перетворюй зовнішні links на внутрішні fake routes.

### Navigation and session behavior

- Sticky header потребує `scroll-margin-top` для stable anchors.
- Back-to-top використовує `href="#page-top"`.
- Desktop guide sidebar scroll position зберігається у `sessionStorage` під key `guide-sidebar-scroll` лише для viewport `min-width: 801px`.
- Storage calls мають бути guarded `try/catch`, бо storage може бути недоступним у restricted/private режимі.
- Additional materials приховані за замовчуванням і відкриваються exact Konami sequence:
  `ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a Enter`.
- Unlock state зберігається лише в session storage під `materials-unlocked`; це не authorization і не server persistence.

### Copy controls

Task і artifact template blocks мають copy buttons. Existing behavior:

1. спочатку `navigator.clipboard.writeText`;
2. fallback через hidden readonly `textarea` і `document.execCommand('copy')`;
3. button text змінюється на `Скопійовано` або `Не вдалося скопіювати`;
4. live feedback показує результат;
5. приблизно через 2,2 секунди button повертається до початкового text.

Не роби Clipboard API єдиним способом доступу до content: copy controls — progressive enhancement.

### Mobile constraints

Зберігай mobile-first layout:

- не допускай body-level horizontal overflow;
- використовуй `min-width: 0` і `max-width: 100%` у flex/grid children;
- на вузькому viewport grids переходять в одну колонку;
- buttons і links мають touch-friendly мінімальну область;
- довгі tables і code blocks мають local `overflow-x: auto` контейнер;
- не додавай `min-width`, ширший за viewport;
- stable anchors повинні враховувати sticky header;
- task family index, task fields, artifact cards і lesson blocks повинні залишатися доступними з ширини близько 400px.

Поточний repository не має Chromium/Playwright/Puppeteer у межах цього project contract. Тому browser/mobile visual verification має статус `Unknown`, якщо відповідний tool фактично не був доступний і запущений.

## 11. Validators і invariants

### `scripts/validate-guide.ts`

Перевіряє, зокрема:

- 145 source-backed pages;
- 29 levels;
- known level IDs;
- unique lesson IDs і slugs;
- canonical HTTPS JavaRush source URLs;
- contiguous lesson orders і planned bounds;
- content/registry consistency;
- authored content для кожної page;
- заборонені або вигадані source assumptions, зокрема JavaRush plugin lesson;
- README route-count coupling, якщо ця перевірка присутня у поточній версії script.

### `scripts/validate-artifacts.ts`

Перевіряє:

- unique artifact IDs;
- unique artifact names;
- valid status, path scopes і field requirements;
- непорожні metadata, paths, fields, templates і sourceRefs;
- unique fields у record;
- valid artifact references;
- valid lesson/lab references;
- quick-jump coverage: усі 64 IDs рівно один раз;
- відсутність forbidden `validation-script` artifact.

### `scripts/validate-task-specs.ts`

Перевіряє:

- unique task IDs;
- valid modes, families і TaskType values;
- непорожні required fields;
- valid `sourceLessonIds`;
- valid `sourceLabIds` і фактичний lab/page agreement;
- all artifact IDs;
- artifact example membership і non-empty content;
- відсутність `TODO`, `TBD` або ellipsis placeholders у filled examples;
- documented-example boundary;
- покриття всіх 29 levels.

Не послаблюй validator лише для того, щоб приховати drift. Якщо invariant більше не відповідає фактичній architecture, спочатку зафіксуй проблему та отримай окреме рішення про зміну contract.

## 12. Recovery workflow для нового repository

Виконуй відновлення в bounded послідовності:

1. Прочитай `CLAUDE.md`, `package.json`, `astro.config.mjs`, `tsconfig.json`, `README.md`, `RUNBOOK.md` і `.gitignore`.
2. Перевір Node version, встанови dependencies через `npm install`.
3. Перевір tree; збережи `archive/task-specs/` як archive і не повертай files у root.
4. Віднови `src/types/guide.ts`, `artifact.ts`, `task-spec.ts`.
5. Віднови `src/data/guide.ts` із 29 levels і 145 canonical pages.
6. Віднови `src/data/level-01.ts` … `level-29.ts` і central `src/data/content.ts`.
7. Віднови `src/data/artifacts.ts`, artifact types, categories і quick-jump groups.
8. Віднови `src/data/task-specs.ts`, task types, source mappings і filled documented examples.
9. Віднови `BaseLayout.astro`, shared components і `global.css`.
10. Віднови routes: homepage, guide catalog, lesson catch-all, artifacts, tasks і 404.
11. Запусти `npm run check`, потім `npm run validate`, потім `npm run build`.
12. Перевір generated static HTML та route/anchor/source patterns текстовим audit-ом.
13. Лише після фактичної перевірки додай новий entry до `RUNBOOK.md`.

На кожному кроці:

- якщо docs і files суперечать одне одному — зупинись, наведи paths і познач `Unknown`;
- спочатку роби read-only discovery;
- для non-trivial changes використовуй plan-first workflow;
- не редагуй generated output;
- не роби broad refactor, dependency update, version bump, deployment або migration без explicit request;
- після змін перевіряй diff і запускай лише релевантні validators.

## 13. Static verification і claims

Результати команд у старих README/RUNBOOK entries є historical records. Називай результат freshly verified лише якщо команда запущена в поточній сесії й output доступний.

Після build допустимий static audit, наприклад:

- існування `dist/tasks/index.html` і `dist/artifacts/index.html`;
- збереження guide/artifact/task routes;
- кількість generated HTML files;
- наявність task/artifact anchors;
- internal source link patterns;
- відсутність lesson source href на `README.md`, `RUNBOOK.md`, `EVIDENCE.md` або archive task specs;
- наявність documented-example boundary.

За відсутності browser tooling не пиши «перевірено в браузері», «mobile працює» або «візуально підтверджено». Правильне формулювання: `Static verification виконано; browser/mobile visual verification — Unknown через відсутність Chromium/Playwright/Puppeteer.`

## 14. Заборонені операції

Без окремого explicit request не можна:

- додавати backend, API, database, authorization або persistence;
- додавати production deployment, publish або release automation із реальним side effect;
- виконувати реальну Java/Boot migration чи dependency upgrade;
- додавати credentials, secrets або PII;
- видаляти artifact records або stable anchors через припущення про непотрібність;
- повертати archived `TASK_SPEC*.md` у root;
- використовувати README/RUNBOOK/EVIDENCE або local task specs як canonical lesson source URLs;
- міняти canonical JavaRush URLs, lesson IDs або slugs без підтвердженого migration plan;
- вигадувати plugin lesson, route, test, build, screenshot, compatibility result, deployment result або approval;
- називати task/artifact examples production evidence;
- редагувати `dist/`, `.astro/` або `node_modules/` вручну;
- стверджувати browser/mobile visual verification без відповідного фактичного run.

Цей документ описує поточний recovery contract. Якщо майбутня задача змінює architecture або counts, спочатку онови plan і перевірені source files, а потім змінюй цей файл разом із executable validators та іншою документацією.
