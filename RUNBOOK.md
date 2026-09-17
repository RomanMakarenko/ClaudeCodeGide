# Project delivery runbook

**Назва:** `RUNBOOK.md`  
**Призначення:** внутрішній хронологічний запис реально виконаних задач цього проєкту.  
**Дата актуалізації:** 2026-09-17
**Статус документа:** `present`

## Межі та правила читання

Цей файл фіксує delivery history, а не production audit log, повний transcript або список майбутніх планів. Записи складено за підтвердженими результатами роботи з repository та за повідомленнями поточної сесії. `implemented` означає, що зміна була внесена; `reviewed` — що область була перевірена без зміни; `partially verified` — що реалізацію перевірено статично, але окремий тип перевірки не виконувався; `not performed` — явно зафіксована невиконана дія.

У прикладах і шаблонах не зберігаються credentials, API keys, tokens, PII або інші secrets. Документ не стверджує про production deployment, реальні approvals, зовнішні lab outcomes чи browser screenshots, якщо таких доказів немає.

## Хронологія виконаних задач

### Поточний запис. TASK_SPEC30: AI-native MVP — `implemented` / `partially verified`

- **Мета і scope:** додати level 30 із пʼятьма source-backed уроками про AI-native MVP-мислення, ціннісну пропозицію, user/JTBD, success metric, scope/non-goals/release slice і reviewer-ready specification.
- **Змінені файли:** `src/data/guide.ts`, `src/data/level-30.ts`, `src/data/content.ts`, `src/data/artifacts.ts`, `src/data/task-specs.ts`, `src/pages/guide/index.astro`, `src/pages/tasks/index.astro`, `README.md`, `CLAUDE.md`, `RUNBOOK.md`.
- **Нові маршрути:** `/guide/level-30/ai-native-mvp-thinking`, `/guide/level-30/value-proposition-capstone`, `/guide/level-30/user-jtbd-success-metric`, `/guide/level-30/scope-non-goals-release-slice`, `/guide/level-30/reviewer-specification`. Для кожного збережено exact canonical JavaRush source URL `lecture.level30.lecture01`–`lecture05` із `TASK_SPEC30.md`; усі пʼять сторінок мають authored content.
- **Результат:** registry оновлено до 30 рівнів і 150 source-backed lesson routes. Guide і tasks catalog використовують актуальну кількість рівнів; existing routes, lesson IDs, slugs і task taxonomy збережено.
- **Artifacts:** повторно використано `capstone-brief`, `spec`, `task-spec`, `contract-md`, `backlog-roadmap`, `evidence` і `review-notes`; додано чотири reusable documented-example records — `VALUE_PROPOSITION.md` (`value-proposition`), `USER_JTBD.md` (`user-jtbd`), `SUCCESS_METRIC.md` (`success-metric`) і `RELEASE_SLICE.md` (`release-slice`). Нові IDs додано до purpose-based quick-jump group `Визначити й спланувати` рівно один раз; catalog містить 68 artifact records.
- **Task coverage:** окремий task type не додавався. Існуючий `capstone` розширено level-30 source lessons, MVP-specific scope/non-goals/success/rules і filled documented examples для чотирьох нових artifacts; task catalog містить 24 records і покриває всі 30 levels.
- **Search:** build-time projection автоматично містить 242 documents — 150 lessons, 68 artifacts і 24 tasks — та 8158 indexed terms; evidence regression query зберігається.
- **Verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate` — guide validation passed для 150 сторінок across 30 levels, artifact validation passed для 68 artifacts, task specification validation passed для 24 types, 30 levels і 10 lab-backed types, search validation passed для 242 documents і 8158 indexed terms; `npm run build` — успішно завершився та згенерував static output із пʼятьма level-30 routes.
- **Static-only boundary:** нові записи є documented examples. Це не доказ реального MVP, user research/validation, customer metric, release, deployment або production readiness; backend, API, database, authorization і persistence не додавалися. Chromium/Chrome/Playwright/Puppeteer не запускався, тому browser/mobile visual verification — `Unknown`; підтверджено лише static output, registry contracts і generated markup.

### Поточний запис. TASK_SPEC777: site-wide static search — `implemented` / `partially verified`

- **Мета і scope:** додати пошук по сайту з доступом із shared header, responsive desktop/mobile layout, keyword matching і deterministic semantic layer; запит `евіденс` має знаходити Latin artifact `EVIDENCE.md`.
- **Змінені файли:** `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/types/search.ts`, `src/lib/search.ts`, `src/data/search.ts`, `src/pages/search/index.astro`, `scripts/validate-search.ts`, `package.json`, `README.md`, `CLAUDE.md`, `RUNBOOK.md`.
- **Результат:** додано `/search`; header search link залишається доступним на mobile окремо від прихованої desktop navigation. Build-time projection охоплює 233 documents: 145 lessons, 64 artifacts і 24 tasks; postings містить 8042 indexed terms. Runtime використовує embedded JSON, shared pure search logic, URL query `q`, DOM `textContent`, no-script fallback і без browser persistence.
- **Пошук:** normalization, tokenization, aliases, transliteration, weighted title/context matching, phrase bonuses, prefix/substring matching і deterministic tie-breaking. `евіденс`, `EVIDENCE`, `evidens`, `доказ` та filename variants мапляться до evidence concept; evidence regression query ранжує `EVIDENCE.md` першим.
- **Static-only boundary:** backend, API, database, authorization, server-side persistence, external search service та embeddings не додавалися. Embedded index не містить raw registry fields `template`, `artifactExamples`, `paragraphs` або `fields`.
- **Verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate` — guide validation passed для 145 сторінок across 29 levels, artifact validation passed для 64 artifacts, task specification validation passed для 24 types, 29 levels і 10 lab-backed types, search validation passed для 233 documents і 8042 indexed terms; `npm run build` — успішно завершився зі static output.
- **Static audit:** підтверджено `dist/search/index.html`, generated header link `/search`, embedded 233-document index, `EVIDENCE.md` і evidence alias/query text, valid links до 145 guide routes, 64 artifact anchors і 24 task anchors, а також відсутність backend/API access.
- **Обмеження:** screenshot inputs використано як layout references; screenshot match не заявляється. Chromium/Chrome/Playwright/Puppeteer не запускався, тому browser/mobile visual verification — `Unknown`; перевірено лише source contracts, generated static HTML і deterministic validator behavior.

### Поточний запис. TASK_SPEC29: migration execution controls — `implemented` / `partially verified`

- **Мета і scope:** додати level 29 із пʼятьма source-backed уроками про bounded migration pilot, branch/worktree isolation, rollback prerequisite, behavior parity, карту типів міграцій і data/configuration sequencing.
- **Змінені файли:** `src/data/guide.ts`, `src/data/level-29.ts`, `src/data/content.ts`, `src/data/artifacts.ts`, `src/data/task-specs.ts`, `src/pages/guide/index.astro`, `src/pages/tasks/index.astro`, `README.md`, `CLAUDE.md`, `RUNBOOK.md`.
- **Нові маршрути:** `/guide/level-29/pilot-slice-branch-workflow`, `/guide/level-29/rollback-plan-pilot-prerequisite`, `/guide/level-29/behavior-parity-evidence`, `/guide/level-29/migration-types-map`, `/guide/level-29/data-configuration-migrations`. Для кожного збережено exact canonical JavaRush source URL із `TASK_SPEC29.md` (`lecture.level29.lecture01`–`lecture05`).
- **Результат:** registry оновлено до 29 рівнів і 145 source-backed lesson routes; усі пʼять level-29 page IDs мають authored content. Migration task збережено як один typed record, додано всі level-29 source lessons разом із level-28 prerequisite coverage, а scope описує pilot, rollback, parity, migration types і data/config recovery.
- **Artifacts:** повторно використано наявні migration, risk, branch/worktree, characterization, contract і evidence artifacts; збережено `MIGRATION_TYPES.md` (`migration-types`) і `DATA_CONFIG_MIGRATION.md` (`data-config-migration`) та додано три reusable documented-example records — `ROLLBACK.md` (`rollback`), `MIGRATION_VALIDATION_REPORT.md` (`migration-validation-report`) і `POST_MIGRATION_NOTES.md` (`post-migration-notes`). Усі пʼять додані до migration quick-jump group рівно один раз; catalog містить 64 artifact records. Окремий `behavior-parity` record не створювався: parity покривають наявні characterization/contract/evidence artifacts.
- **Task coverage:** task catalog містить 24 records; `migration` посилається на уроки рівнів 28 і 29 та має filled examples для `MIGRATION_PLAN.md`, `MIGRATION_TYPES.md`, `DATA_CONFIG_MIGRATION.md`, `ROLLBACK.md`, `MIGRATION_VALIDATION_REPORT.md` і `POST_MIGRATION_NOTES.md`.
- **Verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate` — guide validation passed для 145 сторінок across 29 levels, artifact validation passed для 64 artifacts, task specification validation passed для 24 types, 29 levels і 10 lab-backed types; `npm run build` — успішно завершився та згенерував static output.
- **Static audit:** підтверджено 5 level-29 generated routes, 150 generated HTML files загалом, 5 authored content keys, exact 5 level-29 source URLs, наявність `/guide`, `/artifacts` і `/tasks`, валідні artifact references і exactly-once quick-jump coverage для 64 IDs; lesson source metadata не використовує README/RUNBOOK/EVIDENCE/archive paths.
- **Обмеження:** усі нові lesson prose, task specs і migration artifacts є documented examples. Це не доказ реальної Java/Boot migration, dependency upgrade, execution pilot, rollback, behavior parity, compatibility result, data/config migration, rollout або production readiness. Chromium/Chrome/Playwright/Puppeteer не запускався, тому browser/mobile visual verification — `Unknown`; підтверджено лише static output, registry contracts і generated markup.

### Поточний запис. Додавання CHARACTERIZATION_TESTS.md — `implemented`

- **Мета і scope:** додати пропущений documented-example артефакт для фіксації characterization tests під час безпечної модернізації legacy-коду.
- **Змінені файли:** `src/data/artifacts.ts`, `src/data/level-26.ts`, `src/data/level-27.ts`, `RUNBOOK.md`.
- **Результат:** зареєстровано `CHARACTERIZATION_TESTS.md` зі scope/baseline, cases, inputs, observable outputs, invariants, evidence, run command і coverage limits; артефакт додано до quick-jump групи модернізації legacy та пов’язано з уроками рівнів 26 і 27.
- **Обмеження:** це documented example, а не твердження про фізичну наявність файла або реалізовані production tests.
- **Verification:** `npm run check`, `npm run validate:artifacts`, `npm run validate`, `npm run build` — усі завершилися успішно; artifact validation підтвердила 54 records, guide validation — 135 сторінок, static build — 139 сторінок.


### 1. Read-only editorial review 125 уроків — `reviewed`

- **Мета і scope:** зіставити canonical lessons рівнів 1–25 із registry, authored content, source indexes і workbook та перевірити повноту й тематичну відповідність.
- **Перевірені джерела:** `src/data/guide.ts`, `src/data/content.ts`, `src/data/level-01.ts`–`src/data/level-25.ts`, `scripts/validate-guide.ts`, renderer guide pages, `src/types/guide.ts`, `TASK_SPEC*.md` та workbook до його видалення.
- **Результат:** підтверджено 125/125 canonical lessons, 25 рівнів × 5 уроків, без omissions у scope 1–25. Зафіксовано title/path drift, naming issue `EVIDENCE_LOG.md`/`EVIDENCE.md`, supplementary gaps і delivery gap для media metadata.
- **Evidence:** `EVIDENCE.md` секції «Повнота корпусу» та «Смислова відповідність».
- **Verification:** `Guide validation passed: 125 source-backed pages across 25 levels.`

### 2. З’ясування відсутності діаграм і зображень — `reviewed`

- **Мета і scope:** окремо встановити, чи media були втрачені під час перенесення.
- **Перевірені області:** структура XLSX (`xl/media`, `xl/drawings/drawing1.xml`), `src/types/guide.ts` і `src/pages/guide/[...slug].astro`.
- **Результат:** локальних embedded images/drawings у workbook не знайдено; current guide model і renderer підтримують текст, таблиці, code blocks і notes, але не image/diagram/video/presentation fields. Зовнішні presentation/video URLs залишилися delivery gap, а не пропущеними lesson IDs.
- **Evidence:** `EVIDENCE.md` секція «Діаграми, зображення, відео та презентації».
- **Verification:** структурна перевірка source package і коду; media renderer не вигадувався під час review.

### 3. Підтвердження фінального evidence — `reviewed`

- **Мета і scope:** перечитати й зафіксувати фінальний `EVIDENCE.md`.
- **Перевірений файл:** `EVIDENCE.md`.
- **Результат:** документ містить межі read-only review, 125/125 результат, media explanation, TASK_SPEC4 review, відомі gaps і чесні verification limitations.
- **Verification:** повне перечитування документа; зміст не подається як доказ фізичної наявності кожного описаного в уроках артефакта.

### 4. Оновлення README результатами review — `implemented`

- **Мета і scope:** зробити результати review видимими на entry point проєкту.
- **Змінений файл:** `README.md`.
- **Результат:** додано інформацію про статичний сайт, 125 source-backed routes, рівні 1–25, authored structured notes, artifact catalog і typed registry; збережено відмінність між present files і documented examples.
- **Verification:** перечитування оновлених README statements; відомі legacy route-count/source-file assumptions не маскувалися.

### 5. Побудова typed artifact catalog — `implemented`

- **Мета і scope:** зібрати повний реєстр артефактів із назвою, відповідальністю, роллю, шляхами, полями, умовами використання та poor-choice сценаріями.
- **Змінені/перевірені файли:** `src/types/artifact.ts`, `src/data/artifacts.ts`, `src/pages/artifacts/index.astro`, `scripts/validate-artifacts.ts`.
- **Результат:** створено централізовану typed registry model зі стабільними IDs, statuses `present`/`documented-example`/`variant`/`external-source`, path scopes, fields, templates і source references. Registry охоплює 40 артефактів.
- **Обмеження:** documented examples не оголошуються фізично присутніми файлами.
- **Verification:** `npm run validate:artifacts` після фінальних catalog additions — `Artifact validation passed: 40 artifacts.`

### 6. Artifact cloud і anchor navigation — `implemented`

- **Мета і scope:** додати швидкий перехід із шапки artifact page до потрібної картки.
- **Змінений файл:** `src/pages/artifacts/index.astro`; стилі — `src/styles/global.css`.
- **Результат:** cloud ітерує central registry, кожна картка має stable `id`, template має copy control, anchor targets мають offset під sticky header.
- **Verification:** static build/check і перевірка generated structure; навігація реалізована semantic links без backend або client persistence.

### 7. Очищення catalog від непотрібних записів — `implemented`

- **Мета і scope:** прибрати з artifact catalog і cloud `astro.config.mjs`, `tsconfig.json`, `favicon.svg`, `TASK_SPEC1.md`–`TASK_SPEC25.md` та інші записи, які були позначені для видалення.
- **Змінений файл:** `src/data/artifacts.ts`; renderer залишено registry-driven.
- **Результат:** записи прибрано з каталогу та cloud presentation. Фізичні build/runtime files не видалялися лише через видалення catalog entries. Фізичний `scripts/validate-guide.ts` збережено.
- **Verification:** registry validation і generated catalog inspection.

### 8. Виконання TASK_SPEC2 — `implemented`

- **Мета і scope:** виконати вимоги з `TASK_SPEC2.md` у межах доступного repository scope.
- **Змінені/перевірені області:** artifact registry, guide data/renderer і відповідні project documentation files.
- **Результат:** вимоги, що стосувалися typed guide/artifact structure та їхнього відображення, були реалізовані; приклад структури проєкту на artifact page додатково позначено як умовний, а не mandatory.
- **Verification:** `npm run check`, artifact validation і static build на відповідних етапах.

### 9. Уточнення, що project tree був прикладом — `implemented`

- **Мета і scope:** виправити semantic misunderstanding щодо схеми структури.
- **Змінений файл:** `src/pages/artifacts/index.astro`.
- **Результат:** explanatory text прямо каже, що конкретний набір файлів і каталогів залежить від проєкту, а елементи є можливими місцями/формами організації, не обов’язковою структурою.
- **Verification:** generated page content перевірено статично.

### 10. Видалення workbook після review — `implemented`

- **Мета і scope:** прибрати локальний `Claude code.xlsx` після завершення його використання як review source.
- **Змінена область:** repository root/source workspace; згадки про workbook у review evidence залишені як історичний опис джерела та висновків.
- **Результат:** workbook видалено за explicit request; дані review не переписувалися заднім числом.
- **Verification:** каталог source files після видалення та перечитування `EVIDENCE.md`.

### 11. Перевірка розстановки артефактів — `reviewed`

- **Мета і scope:** повторно перечитати catalog і перевірити, чи records відповідають ролям, статусам, paths і категоріям.
- **Перевірені файли:** `src/data/artifacts.ts`, `src/types/artifact.ts`, `src/pages/artifacts/index.astro`, `scripts/validate-artifacts.ts`.
- **Результат:** records розділяють repository/user/external/generated scopes, present files і documented examples; validation rule не дозволяє повертати internal validator у catalog.
- **Verification:** `Artifact validation passed: 40 artifacts.`

### 12. TASK_SPEC3 та конфігураційні artifacts — `implemented`

- **Мета і scope:** виконати TASK_SPEC3 і доповнити catalog конфігураційними та workflow artifacts, які були явно названі.
- **Змінені/перевірені файли:** `src/data/artifacts.ts`, `src/pages/artifacts/index.astro`, `src/data/guide.ts`, `src/data/content.ts`, `SKILL.md` та related project files.
- **Результат:** додано `MCP`, `settings.json`, `settings.local.json`; у skill template додано `argument-hint:` з placeholders. Усі configuration templates не містять credentials.
- **Verification:** type/check/build і artifact registry validation після відповідних змін.

### 13. Review і виконання TASK_SPEC4 supplementary materials — `reviewed`

- **Мета і scope:** перевірити додаткові presentation/deck URLs для рівнів 01–04 і 06–20 та GitHub repository `tg-bot-example`.
- **Перевірені джерела:** `TASK_SPEC4.md`, 19 deck URLs і 1 GitHub URL; canonical guide registry/content.
- **Результат:** thematic repetition для покритого діапазону підтверджена на рівні headings/topics; повна дослівна відповідність не заявлялася. Зафіксовано, що TASK_SPEC4 не має supplementary links для рівня 05 і рівнів 21–25.
- **Evidence:** `EVIDENCE.md` секція TASK_SPEC4.
- **Verification:** live fetch/review доступних external materials; GitHub source позначено як приклад, не authoritative course index.

### 14. Додавання practical artifacts і labs — `implemented`

- **Мета і scope:** перенести в typed catalog і renderer практичні артефакти та лабораторні сценарії, знайдені в supplementary materials.
- **Змінені файли:** `src/types/guide.ts`, `src/data/artifacts.ts`, `src/data/content.ts`, `src/pages/guide/[...slug].astro`, `scripts/validate-artifacts.ts`.
- **Результат:** додано `GuideLab`, section/lab artifact references, renderer для lab cards і catalog records для практичних матеріалів, зокрема `commands.md`, `CLAWD Wisdom`, `CLAWD YOLO`, `CLAWD Runner`, locale bundle, `CONTRACT.md`, `PLAN.md`, `workflow.md`, research/status/diagnosis, policy/ownership/postmortem/review artifacts.
- **Обмеження:** renderer описує lab steps і verification criteria, але не вигадує фактичні результати виконання labs.
- **Verification:** validator перевіряє lab IDs, steps, sourceRefs і referenced artifact IDs; `Artifact validation passed: 40 artifacts.`

### 15. Видалення Guide validation script з catalog — `implemented`

- **Мета і scope:** прибрати `Guide validation script` як навчальний artifact record, але не ламати project validation.
- **Змінені/перевірені файли:** `src/data/artifacts.ts`, `scripts/validate-artifacts.ts`, `scripts/validate-guide.ts`, `package.json`.
- **Результат:** catalog ID `validation-script` відсутній; validator rule це перевіряє; physical `scripts/validate-guide.ts` і package scripts збережені.
- **Verification:** `npm run validate:artifacts` успішний; physical validator залишається доступним для `npm run validate`.

### 16. Mobile optimization artifact catalog — `implemented`

- **Мета і scope:** виправити layout `/artifacts` за mobile evidence.
- **Змінений файл:** `src/styles/global.css`; markup у `src/pages/artifacts/index.astro` перевірено.
- **Результат:** додано/уточнено intrinsic sizing, local overflow для code/table/field areas, wrapping і mobile grid rules; сторінка не потребує горизонтального body scroll.
- **Verification:** `npm run check` і `npm run build`; фактичний screenshot browser test не виконувався через відсутність Chromium/Playwright.

### 17. Mobile layout lesson pages — `implemented`

- **Мета і scope:** виправити вузький mobile rendering guide pages, зокрема `/guide/level-02/git-baseline`.
- **Змінені/перевірені файли:** `src/styles/global.css`, `src/pages/guide/[...slug].astro`, `src/components/GuideNav.astro`.
- **Результат:** guide article стає full-width у mobile grid, довгі заголовки/labels wrapping, code/table мають локальний horizontal overflow, а mobile navigation зберігає `<details>` і semantic links.
- **Verification:** type/check/build і static inspection; browser screenshot не заявляється.

### 18. Виправлення накладання тексту під project tree — `implemented`

- **Мета і scope:** розмістити explanatory note після code block без overlap.
- **Змінений файл:** `src/styles/global.css`.
- **Результат:** `.artifact-example-note` отримав позитивні вертикальні margins замість negative top margin.
- **Verification:** generated CSS/build inspection.

### 19. Back-to-top navigation і sticky header — `implemented`

- **Мета і scope:** дати швидке повернення до шапки після anchor jump або глибокої прокрутки.
- **Змінені файли:** `src/layouts/BaseLayout.astro`, `src/styles/global.css`.
- **Результат:** sticky `.site-header` із `id="page-top"`, semantic fixed link «На початок», focus/hit-area styles, safe-area adjustment і `scroll-margin-top` для anchor targets. Backend, API, database або додаткова persistence для цього не створювалися.
- **Verification:** `npm run check`, `npm run build`; static CSS/HTML inspection. Фактичний browser interaction test не виконувався через відсутність Chromium/Playwright.

### 20. Full-width mobile cards на `/guide` — `implemented`

- **Мета і scope:** зробити level/lesson cards на mobile `/guide` такими самими повноширинними, як на homepage `/`.
- **Змінений файл:** `src/styles/global.css`; markup `src/pages/guide/index.astro` перевірено.
- **Результат:** у mobile breakpoint `.catalog-layout` використовує `grid-template-columns: minmax(0, 1fr)`, тому прихований desktop sidebar більше не залишає контент у fixed 250px track.
- **Verification:** type/check/build і static generated layout checks.

### 21. Збереження позиції desktop sidebar — `implemented` / `partially verified`

- **Мета і scope:** після переходу між статичними lesson routes залишати desktop sidebar на попередній позиції, не відновлюючи позицію основного документа та не змінюючи mobile menu.
- **Змінені файли:** `src/pages/guide/[...slug].astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`; `src/components/GuideNav.astro` не змінювався.
- **Результат:** desktop navigation обгорнуто в `.sidebar-scroll`; sidebar отримав sticky independent viewport, `max-height`, `overflow-y: auto`, containment і `scrollbar-gutter`. Shared script зберігає лише `.sidebar-scroll.scrollTop` у `sessionStorage`, відновлює його на desktop і не перехоплює links, не відновлює `window.scrollY` та не торкається mobile `<details>`.
- **Verification:** `npm run check`, `npm run build`, `npm run validate:artifacts`; generated HTML/CSS і script перевірені статично. End-to-end browser check level 20 не виконувався через відсутність Chromium/Playwright.

### 22. Створення цього runbook artifact — `implemented`

- **Мета і scope:** створити внутрішній документ із кожною підтверджено виконаною task group і зареєструвати його в catalog.
- **Змінені файли:** `RUNBOOK.md`, `src/data/artifacts.ts`.
- **Результат:** цей документ містить 22 хронологічні записи, окремо відділяє implemented/reviewed/partially verified і не дублює повний transcript або production record. Record `runbook-md` має status `present` і stable ID `runbook-md`; окремий renderer change не потрібен, бо catalog вже registry-driven.
- **Verification:** див. фінальний розділ нижче.

## Явно зафіксовані невиконані або обмежені дії

- **Візуальний browser test:** не виконаний — у середовищі не знайдено Chromium, Chrome, Chromium Browser або Playwright. Static build/check не є screenshot confirmation.
- **Повний `npm run validate`:** неуспішний через legacy references до видалених `TASK_SPEC*.md` і stale README route-count assumptions. Фактичний output цього запуску: `Missing source file: TASK_SPEC1.md` та аналогічні повідомлення для `TASK_SPEC5.md`–`TASK_SPEC25.md`, після чого `README source-backed route count is stale`. Це не спричинено `RUNBOOK.md` і не маскується.
- **Команда «видалити `package.json`, Guide registry, Authored guide content»:** не записана як виконана зміна, оскільки поточний проєкт досі містить `package.json`, guide registry та authored content. Runbook не оголошує цю дію виконаною.
- **Supplementary completeness:** TASK_SPEC4 не покриває level 05 і levels 21–25; це залишковий coverage gap, а не пропущені canonical routes.
- **Live validation version-sensitive claims:** не є повною повторною перевіркою всіх 125 external lesson URLs.

## Поточний стан і фінальна verification

- Canonical guide scope: 125 routes, 25 levels × 5 lessons.
- Artifact registry: 41 records після додавання `runbook-md`.
- `RUNBOOK.md`: present, repository-local, without secrets.
- Physical guide validator: збережений у `scripts/validate-guide.ts`.
- Catalog renderer: registry-driven, stable anchor для runbook — `#runbook-md`.

Команди для перевірки цього стану:

```bash
npm run check
npm run build
npm run validate:artifacts
```

Фактичні результати цієї актуалізації:

- `npm run check` — успішно: 0 errors, 0 warnings, 0 hints.
- `npm run build` — успішно: static output, 129 page(s) built.
- `npm run validate:artifacts` — успішно: `Artifact validation passed: 41 artifacts.`
- Generated artifact check — успішно: `dist/artifacts/index.html` містить `id="runbook-md"` і `RUNBOOK.md`.
- `npm run validate` — неуспішно через pre-existing legacy references до видалених `TASK_SPEC*.md` і stale README route-count assumption; runbook artifact validation при цьому проходить.

Відсутність browser tooling залишається окремим обмеженням, а не прихованим результатом.

### 23. Групування швидкого переходу за призначенням — `implemented` / `partially verified`

- **Мета і scope:** замінити плоский список артефактів у quick-jump на навігацію, де артефакти шукаються за практичною потребою.
- **Розглянуті варіанти:** повторити 8 існуючих категорій; додати 5 кураторських task-intent груп; створити повну tags taxonomy. Обрано 5 task-intent груп, оскільки вони краще відповідають пошуку «за призначенням» без зміни категорій карток і без зайвої taxonomy infrastructure.
- **Змінені файли:** `src/data/artifacts.ts`, `src/pages/artifacts/index.astro`, `src/styles/global.css`, `scripts/validate-artifacts.ts`.
- **Результат:** додано 5 впорядкованих груп — «Орієнтуватися в проєкті», «Визначити й спланувати», «Налаштувати й розширити workflow», «Виконати й контролювати», «Перевірити, передати й доставити». Усі 41 artifact IDs включені рівно один раз; existing 8 category sections і stable anchors збережені.
- **Accessibility/mobile:** quick-jump використовує labelled semantic `<nav>`, headings і `<ul><li><a>`; desktop groups мають grid layout, mobile переходить в одну колонку, посилання мають щонайменше 44px touch target і wrapping для довгих назв.
- **Verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate:artifacts` — `Artifact validation passed: 41 artifacts.`; `npm run build` — `129 page(s) built`; generated check — 5 груп, 41 унікальне посилання, усі target IDs присутні.
- **Обмеження:** visual browser/mobile E2E не виконувався через відсутність Chromium/Playwright; перевірка є static/generated output verification.

### 24. Перевірка quick-jump і виправлення desktop «На початок» — `implemented` / `partially verified`

- **Мета і scope:** перевірити grouped quick-jump на desktop/mobile режимах і усунути проблему, через яку fragment target back-to-top знаходився на sticky header та міг не скидати root document scroll.
- **Діагностика:** у `BaseLayout.astro` `#page-top` був на `position: sticky` header, а контроль використовував лише `href="#page-top"`. Quick-jump при цьому не мав structural дефектів: усі 41 посилання мали відповідні target IDs.
- **Змінені файли:** `src/layouts/BaseLayout.astro`, `src/styles/global.css`.
- **Результат:** додано окремий нульовий non-sticky `.page-top-sentinel` з `id="page-top"` перед sticky header; header залишився sticky, back-to-top link і native smooth/reduced-motion behavior збережені. Quick-jump не змінювався.
- **Verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate:artifacts` — `Artifact validation passed: 41 artifacts.`; `npm run build` — `129 page(s) built`; generated check — 5 quick-jump groups, 41 унікальне quick-jump посилання, 41 matching card anchor, top sentinel присутній.
- **Обмеження:** у середовищі відсутні Chromium/Playwright/Puppeteer, тому фактичний click/E2E тест desktop/mobile не виконувався; static CSS/HTML підтверджує структуру і fix, але не доводить browser runtime interaction.

### 25. Перевірка доцільності повернення видалених артефактів — `reviewed`

- **Мета і scope:** перевірити, чи purpose-based quick-jump створює підстави повернути до user-facing artifact catalog раніше вилучені записи.
- **Перевірені кандидати:** `astro.config.mjs`, `tsconfig.json`, `package.json`, `public/favicon.svg`, `scripts/validate-guide.ts`, `TASK_SPEC1.md`–`TASK_SPEC25.md`, а також фізично присутні `TASK_SPEC2.md`–`TASK_SPEC4.md` і `TASK_SPEC26.md`.
- **Результат:** жоден кандидат не повертається до catalog. `astro.config.mjs`, `tsconfig.json` і `package.json` є build/toolchain/runtime implementation files; `public/favicon.svg` — runtime static asset; `scripts/validate-guide.ts` — внутрішній validator. Нумеровані `TASK_SPEC*.md` є source indexes або task-history inputs, а reusable концепцію `TASK_SPEC.md` уже представляє artifact `task-spec`.
- **Окремі рішення:** фізична наявність `TASK_SPEC2.md`–`TASK_SPEC4.md` не робить їх user-facing artifacts; `TASK_SPEC1.md` і `TASK_SPEC5.md`–`TASK_SPEC25.md` відсутні та не є catalog omissions; `TASK_SPEC26.md` виходить за межі поточного 25-рівневого scope і потребує окремого scope decision.
- **Збережені межі:** build/runtime files, guide registry, authored guide content і internal validator можуть залишатися фізично присутніми, але не повинні змішуватися з reusable artifact catalog. Це рішення не змінює registry, renderer або quick-jump groups.
- **Evidence:** результат read-only assessment; попередні рішення про очищення catalog у записі 7; виключення validator у записі 15; поточний стан registry у записі 23 та generated verification у записі 24.
- **Verification:** перевірено physical file presence, registry absence, історичні згадки в `README.md`, `EVIDENCE.md` і `RUNBOOK.md`; змін до source files не вносилося.

### 26. TASK_SPEC26: legacy discovery і карта ризиків — `implemented` / `partially verified`

- **Мета і scope:** додати level 26 із пʼятьма уроками про legacy discovery, technical debt, current-state documentation, risk map та behavior inventory; витягнути reusable artifacts і додати їх до purpose-based quick-jump.
- **Змінені файли:** `src/data/guide.ts`, `src/data/level-26.ts`, `src/data/content.ts`, `src/data/artifacts.ts`, `scripts/validate-guide.ts`, `README.md`, `src/pages/guide/index.astro`, `RUNBOOK.md`.
- **Нові маршрути:** `level-26/legacy-change-risk`, `level-26/technical-debt-static-signals`, `level-26/how-it-works-today`, `level-26/legacy-risk-map`, `level-26/behavior-inventory`.
- **Результат:** registry розширено до 130 source-backed routes і 26 рівнів × 5 уроків. Authored content покриває read-only discovery, evidence anchors, static signals, `ARCHITECTURE_CURRENT.md`, незалежні business criticality/change risk, visible unknowns і behavior-first inventory. Validator тепер перевіряє authored content через `guideLevels`, без hardcoded переліку рівнів.
- **Нові catalog artifacts:** `DEBT_SIGNALS.md` (`debt-signals`), `RISK_MAP.md` (`risk-map`), `ARCHITECTURE_CURRENT.md` (`architecture-current`), `BEHAVIOR_INVENTORY.md` (`behavior-inventory`), `CRITICAL_FLOWS.md` (`critical-flows`), `MODULE_INVENTORY.md` (`module-inventory`). Усі мають status `documented-example`, source reference `level-26` і додані до окремої групи «Дослідити legacy й ризики».
- **Свідоме виключення:** `BILLING_RULES.md` не додано до універсального catalog, оскільки це domain-specific billing example, а не reusable artifact для загального legacy discovery.
- **Verification:** `npm run check` — успішно: 0 errors, 0 warnings, 0 hints; `npm run validate:artifacts` — успішно: `Artifact validation passed: 47 artifacts.`; `npm run build` — успішно: `134 page(s) built`; generated check — 5 level-26 route files, 5 точних source links, 6 artifact anchors, 6 нових quick-jump links без дублікатів.
- **Повний validate:** `npm run validate` — неуспішний на guide validator через відсутні legacy source files `TASK_SPEC1.md` і `TASK_SPEC5.md`–`TASK_SPEC25.md`; запуск завершується до artifact validator. README count check після оновлення не є джерелом цієї помилки.
- **Обмеження:** browser/mobile E2E і click interaction не виконувалися, оскільки в середовищі немає Chromium/Playwright/Puppeteer; static build і generated output не доводять runtime browser behavior. Characterization tests не створювалися — уроки фіксують discovery та рішення про кандидатів, а не реалізацію тестів.

## Поточний стан після TASK_SPEC26

- Canonical guide scope: 130 routes, 26 levels × 5 lessons.
- Artifact registry: 47 records; усі 47 IDs входять до quick-jump рівно один раз.
- `RUNBOOK.md`: present, repository-local, without secrets.
- Physical guide validator: збережений у `scripts/validate-guide.ts`, authored completeness перевіряється ітерацією по `guideLevels`.
- Catalog renderer: registry-driven; додано stable anchors для шести legacy-discovery artifacts.
- Route source metadata більше не залежить від локальних історичних `TASK_SPEC*.md` files.
- Browser verification: не виконана через відсутність browser tooling.


### 27. Очищення task-spec source metadata — `implemented`

- **Мета і scope:** прибрати локальні `TASK_SPEC*.md` із актуальних source metadata уроків, artifact `sourceRefs` і lab `sourceRefs`, зберігши canonical JavaRush URLs, route identities та навчальні згадки про task spec.
- **Зміни:** `GuidePage` більше не має `sourceFile`; guide renderer показує лише canonical JavaRush source; `validate-guide.ts` більше не перевіряє існування локального task-spec файла. Із metadata вилучено `TASK_SPEC.md`/`TASK_SPEC4.md`, а stable `level-*` refs залишено.
- **Історія:** фізичні task-spec файли, instructional prose, `task-spec` artifact, а також попередні історичні записи цього runbook і `EVIDENCE.md` не видалялися та не переписувалися заднім числом.
- **Verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate:artifacts` — `Artifact validation passed: 47 artifacts.`; `npm run validate` — guide і artifact validation passed; `npm run build` — `134 page(s) built`. Static audit підтвердив 130 source URL, відсутність `sourceFile` і відсутність task-spec tokens у актуальних artifact/lab `sourceRefs`.

### 28. TASK_SPEC27: legacy modernization — `implemented` / `partially verified`

- **Мета і scope:** додати level 27 із пʼятьма уроками про safety baseline, incremental refactoring, seam decomposition, Strangler Fig slice та modernization roadmap/anti-patterns; витягнути reusable artifacts у purpose-based quick-jump.
- **Змінені файли:** `src/data/guide.ts`, `src/data/level-27.ts`, `src/data/content.ts`, `src/data/artifacts.ts`, `src/pages/guide/index.astro`, `README.md`, `RUNBOOK.md`.
- **Нові маршрути:** `level-27/safety-baseline`, `level-27/incremental-refactoring`, `level-27/seam-decomposition`, `level-27/strangler-fig-slice`, `level-27/modernization-roadmap`. Кожен має canonical JavaRush `sourceUrl` із відповідною `level27.lecture01`–`lecture05` адресою.
- **Результат:** registry розширено до 135 source-backed routes і 27 рівнів × 5 уроків. Authored content покриває baseline evidence, invariants, stop conditions, incremental slices, seams, dependency direction, adapters/interfaces, coexistence, routing, rollout, rollback, retirement criteria, roadmap, ownership, evidence gates та anti-patterns. Production modernization code, migration scripts і characterization tests не створювалися.
- **Нові catalog artifacts:** `modernization-baseline`, `refactoring-plan`, `seam-map`, `strangler-slice`, `modernization-roadmap`, `modernization-anti-patterns`. Усі мають status `documented-example`, source reference `level-27` і додані до окремої quick-jump group «Модернізувати legacy без big-bang rewrite».
- **Свідомі межі:** нові paths використовують `{project}` placeholders і не заявляють про фізичну наявність цих files; static-only архітектура збережена без backend, API, authentication, database або persistence.
- **Verification:** `npm run check` — успішно: 0 errors, 0 warnings, 0 hints; `npm run validate:artifacts` — успішно: `Artifact validation passed: 53 artifacts.`; `npm run validate` — успішно: 135 source-backed pages across 27 levels і 53 artifacts; `npm run build` — успішно: `139 page(s) built`. Static audit підтвердив 5 level-27 slugs, 5 точних JavaRush URLs, 5 authored entries, 6 artifact anchors і 53 quick-jump IDs без дублікатів.

### 29. TASK_SPEC333: додаткові матеріали для уроків 5 — `implemented` / `partially verified`

- **Мета і scope:** додати наприкінці уроку 5 визначених рівнів секцію «Додаткові матеріали» з наданими presentation, YouTube та факультативними external links.
- **Змінені файли:** `src/types/guide.ts`, `src/pages/guide/[...slug].astro`, `src/styles/global.css`, `src/data/level-01.ts`, `src/data/level-03.ts`, `src/data/level-05.ts`, `src/data/level-07.ts`–`src/data/level-25.ts` для рівнів із URL, `RUNBOOK.md`.
- **Результат:** додано типізований `GuideLink` з видами `presentation`, `video` і `optional-resource`; renderer відображає матеріали як зовнішні посилання з `target="_blank"` та `rel="nofollow noopener noreferrer"`. Рівні 2, 4 і 6 не змінювалися через відсутність URL у специфікації.
- **SEO boundary:** усі lesson pages зберігають page-level `<meta name="robots" content="noindex, nofollow">`; `noindex` не використовується як невалідний link-level attribute.
- **Збережені межі:** URL взяті лише з `TASK_SPEC333.md`; canonical JavaRush source URLs, lesson slugs, internal navigation і static-only архітектура не змінювалися. Backend, API, database, authorization або server persistence не додавалися.
- **Verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate:artifacts` — `Artifact validation passed: 54 artifacts.`; `npm run validate` — guide validation passed для 135 сторінок і artifact validation passed для 54 artifacts; `npm run build` — `139 page(s) built`. Generated HTML audit: 43 додаткові links, усі з потрібними attributes; секції є на рівнях 1, 3, 5, 7–25 і відсутні на рівнях 2, 4, 6; усі 135 lesson pages мають правильний robots meta.
- **Обмеження:** browser/E2E click test не виконувався через відсутність Chromium/Playwright/Puppeteer; перевірено generated static HTML, а не доступність або вміст зовнішніх ресурсів.

### 30. TASK_SPEC444: приховані додаткові матеріали з Konami unlock — `implemented` / `partially verified`

- **Мета і scope:** залишити блоки «Додаткові матеріали» та «Канонічне джерело уроку» у generated lesson markup, але приховувати їх за замовчуванням і показувати після точного Konami-коду `ArrowUp`, `ArrowUp`, `ArrowDown`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `ArrowLeft`, `ArrowRight`, `B`, `A`, `Enter`.
- **Змінені файли:** `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `RUNBOOK.md`.
- **Результат:** `.additional-materials` і `.source-box` отримали default `display: none`; клас `body.materials-unlocked` повертає `display: block`. Shared client script нормалізує `B`/`A` без урахування регістру, ігнорує `event.repeat`, скидає прогрес на помилковій клавіші, додає unlock class лише після повної послідовності та зберігає стан у guarded `sessionStorage` для поточної вкладки.
- **Збережені межі:** Astro renderer і lesson data не змінювалися; блоки та їхні external anchors не видалені. Backend, API, database, authorization або server persistence не додавалися.
- **Static verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate:artifacts` — `Artifact validation passed: 54 artifacts.`; `npm run validate` — guide validation passed для 135 сторінок і artifact validation passed для 54 artifacts; `npm run build` — `139 page(s) built`. Generated audit підтвердив: 135 `.source-box`, 22 `.additional-materials`, 43 додаткові external links, canonical links на всіх 135 lesson pages, default hidden CSS, reveal override, exact sequence, guarded sessionStorage, repeat-event guard і відсутність цих блоків на 4 non-guide pages.
- **Обмеження:** Chromium/Chrome/Playwright/Puppeteer у середовищі не знайдено, тому фактичні browser keyboard, Tab-order, reload/navigation і visual checks не виконувалися; verification підтверджує static output і compiled client logic, але не runtime interaction у браузері.

## Поточний стан після TASK_SPEC444

- Canonical guide scope: 135 routes, 27 levels × 5 lessons.
- Artifact registry: 54 records; усі 54 IDs входять до quick-jump рівно один раз.
- Authored content: lesson 5 має додаткові матеріали на всіх рівнях, для яких URL надані в `TASK_SPEC333.md`; рівні 2, 4 і 6 свідомо без секції.
- Konami unlock: `.additional-materials` і `.source-box` залишаються у generated lesson HTML, приховані default CSS і відкриваються через `body.materials-unlocked` після exact sequence; unlock зберігається в `sessionStorage`.
- `RUNBOOK.md`: present, repository-local, without secrets.
- Physical guide validator: збережений у `scripts/validate-guide.ts`; він не є user-facing catalog artifact.
- Catalog renderer: registry-driven; stable anchors і purpose-based quick-jump збережені.
- Архітектурні межі: static-only output без backend, API, authorization, database або server persistence.
- Browser verification: не виконана через відсутність Chromium/Playwright/Puppeteer; підтверджено generated static output і compiled client logic.

### 31. TASK_SPEC28: міграції, discovery і compatibility analysis — `implemented` / `partially verified`

- **Мета і scope:** додати level 28 із пʼятьма уроками про відмінність refactoring, modernization і migration, migration discovery, changelog research, dependency graph, compatibility matrix, behavior contract і пофазний план.
- **Змінені файли:** `src/data/guide.ts`, `src/data/level-28.ts`, `src/data/content.ts`, `src/data/artifacts.ts`, `src/pages/guide/index.astro`, `README.md`, `RUNBOOK.md`.
- **Нові маршрути:** `level-28/refactoring-modernization-migration`, `level-28/migration-discovery-starting-point`, `level-28/changelog-research-for-migration`, `level-28/dependency-graph-compatibility-matrix`, `level-28/behavior-contract-phased-plan`. Для кожного збережено canonical JavaRush source URL `lecture.level28.lecture01`–`lecture05`.
- **Результат:** додано authored content для всіх пʼяти сторінок і оновлено guide catalog до 28 рівнів. Новий quick-jump group `Планувати міграцію й сумісність` містить рівно пʼять migration artifacts: `migration-discovery`, `changelog-research`, `dependency-graph`, `compatibility-matrix`, `migration-plan`.
- **Artifact boundary:** усі пʼять records мають status `documented-example`, placeholder paths і `sourceRefs: ['level-28']`; вони описують reusable templates, а не фізично присутні migration files. Existing `codebase-inventory`, `module-inventory`, `changelog`, `risk-map` і `modernization-roadmap` не дублювалися.
- **Збережені межі:** migration scripts, dependency upgrades, production rollout, backend, API, database, authentication і server persistence не додавалися. Наявні migration examples не є доказом виконаної міграції або compatibility result.
- **Verification:** `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run validate:artifacts` — `Artifact validation passed: 59 artifacts.`; `npm run validate` — `Guide validation passed: 140 source-backed pages across 28 levels` і artifact validation для 59 records; `npm run build` — `144 page(s) built`. Generated audit підтвердив 5 level-28 pages, 5 точних source URLs, 5 authored entries, 5 robots meta `noindex, nofollow`, 5 migration artifact cards і 5 quick-jump targets.
- **Обмеження:** Chromium/Chrome/Playwright/Puppeteer у середовищі не знайдено, тому browser/mobile visual або E2E interaction test не виконувався; verification підтверджує static output, registry contracts і compiled/generated markup, але не реальні migration outcomes.

### 32. Сторінка типів задач із заповненими артефактами — `implemented` / `verified`

- **Мета і scope:** виконати `TASK_SPEC27` як окрему статичну сторінку з різними типами задач і заповненими прикладами повʼязаних артефактів, а не лише з порівняльною таблицею режимів.
- **Змінені файли:** `src/types/task-spec.ts`, `src/data/task-specs.ts`, `src/pages/tasks/index.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `scripts/validate-task-specs.ts`, `package.json`, `README.md`, `RUNBOOK.md`.
- **Результат:** route `/tasks` розширено до 24 різних task types із registry-driven сімействами, stable anchors, полями Mode/Type/Goal/Scope/Non-goals/Success, правилами сесії, source links на конкретні уроки та окремими filled artifact examples. Modernization і Migration збережені як окремі режими з порівнянням.
- **Покриття:** task registry посилається на 28 із 28 рівнів і 10 lab-backed task types; кожна картка має власну постановку та навчальні приклади артефактів із посиланнями на `/artifacts#...`.
- **Перевірюваність:** `scripts/validate-task-specs.ts` перевіряє унікальні IDs, режими, сімейства, source lesson/lab references, artifact references, documented-example boundary і покриття всіх рівнів.
- **Збережені межі:** усі task specs і artifact contents є навчальними documented examples. Реальні Boot/Java upgrades, migration scripts, production rollout, backend/API/database/auth/persistence не додавалися.
- **Verification:** `npm run validate` — успішно: 24 types, 28 levels, 10 lab-backed types; `npm run check` — 0 errors, 0 warnings, 0 hints; `npm run build` — успішно: 145 page(s) built.
- **Обмеження:** browser/mobile visual та E2E interaction test не заявляється без доступного Chromium/Playwright/Puppeteer; перевірено static output, registry contracts і generated markup.

## Поточний стан після TASK_SPEC28

- Canonical guide scope: 140 routes, 28 levels × 5 lessons.
- Artifact registry: 59 records; усі 59 IDs входять до quick-jump рівно один раз.
- Authored content: усі 28 рівнів мають authored content; level 28 покриває migration distinctions, discovery, changelog evidence, dependency/compatibility analysis і phased behavior contract.
- `RUNBOOK.md`: present, repository-local, without secrets.
- Physical guide validator: збережений у `scripts/validate-guide.ts`; він не є user-facing catalog artifact.
- Catalog renderer: registry-driven; додано stable anchors і purpose-based quick-jump group для migration artifacts.
- Архітектурні межі: static-only output без backend, API, authorization, database або server persistence.
- Browser verification: не виконана через відсутність browser tooling; підтверджено generated static output.

### 33. Розгортання Cloudflare Workers і Cloudflare Pages — `implemented` / `partially verified`

- **Мета і scope:** опублікувати статичний Astro output на Cloudflare, зберігши безкоштовний тариф і отримавши project-level URL без account-level username у домені.
- **Перший deployment:** Wrangler `4.132.0` розпізнав Astro-конфігурацію та виконав Workers-oriented flow: `Astro → Cloudflare Worker → workers.dev`. Результат — `https://claudecodegide.makarenkoroman1989.workers.dev`. Під час цього flow локально були згенеровані/змінені deployment files, зокрема `wrangler.jsonc`, `public/.assetsignore`, `.gitignore`, `package.json`, `package-lock.json` і `astro.config.mjs`; ці deployment-generated зміни не були автоматично commit/push у Git.
- **Другий deployment:** Wrangler `3.114.17` створив classic Cloudflare Pages project `claudecodegide` і вручну завантажив уже зібраний каталог `dist`: `Astro dist → Cloudflare Pages project → pages.dev`. Основний URL — `https://claudecodegide.pages.dev`; deployment також повернув version-specific URL `https://78363bb0.claudecodegide.pages.dev`.
- **Ручний command path:** Pages deployment виконувався через `wrangler pages project create claudecodegide --production-branch main`, а потім `wrangler pages deploy /Users/romanmakarenko/Documents/code/ClaudeCodeGide/dist --project-name claudecodegide`. GitHub automatic deployment для Pages не налаштовувався.
- **Тариф і межі:** безкоштовний Cloudflare plan не змінювався. Deployment не додавав backend, API, database, authorization, server persistence або реальну Java/Boot migration.
- **Автоматичність після `git push`:** у поточній конфігурації `git push` сам по собі не запускає новий Pages deployment, тому зміни зʼявляться на `https://claudecodegide.pages.dev` лише після повторного `npm run build` і ручного `wrangler pages deploy dist --project-name claudecodegide`. Автоматична публікація після push була б можлива лише після окремого налаштування GitHub integration/CI у Cloudflare Pages; цього не робили.
- **Verification:** основний Pages URL і `/tasks/` відповідали HTTP 200 після ручного deployment. Перевірка version-specific subdomain через curl мала TLS handshake error, що не блокувало основний project URL.
- **Обмеження:** це підтверджує ручний upload і доступність основного URL на момент перевірки, але не означає автоматичну синхронізацію з GitHub і не є browser visual verification.

### 34. Підготовка автоматичного Pages deployment після GitHub push — `implemented` / `partially configured`

- **Мета і scope:** підготувати безкоштовний GitHub Actions flow, який після push у `main` перевіряє, збирає та публікує `dist` до наявного Cloudflare Pages project `claudecodegide`.
- **Змінений файл:** `.github/workflows/deploy-pages.yml`.
- **Результат:** workflow запускається на `push` у `main` або вручну через `workflow_dispatch`; використовує Node.js 20, `npm ci`, `npm run check`, `npm run validate`, `npm run build` і `wrangler@3.114.17 pages deploy dist --project-name claudecodegide --branch main`. Встановлено `contents: read` і concurrency з скасуванням застарілого production run.
- **Secrets boundary:** workflow очікує лише GitHub encrypted secrets `CLOUDFLARE_API_TOKEN` і `CLOUDFLARE_ACCOUNT_ID`. Значення не зберігаються в repository, workflow, RUNBOOK або chat. Локальний Wrangler OAuth не використовується GitHub Actions.
- **Тариф і deployment model:** Cloudflare free plan не змінюється; це GitHub Actions + Direct Upload до існуючого Pages project, а не native Cloudflare Git integration і не Workers deployment.
- **Поточний стан:** обидва GitHub encrypted secrets додано до repository: `CLOUDFLARE_API_TOKEN` і `CLOUDFLARE_ACCOUNT_ID`. Значення token не записане в repository, workflow, RUNBOOK або chat.
- **Verification:** ручний `workflow_dispatch` run `35072104423` успішно завершив усі кроки: `npm ci`, `npm run check`, `npm run validate`, `npm run build`, credential check і Pages deployment. Новий production deployment зʼявився в project `claudecodegide`; stable URL перевірено HTTP 200 для `/` і `/tasks/`.
- **Push trigger:** workflow залишається налаштованим на `push` у `main`; успішний `workflow_dispatch` підтверджує credentials і deployment path, а окремий наступний push потрібен для незалежного підтвердження саме push-triggered запуску.
- **Тариф і межі:** Cloudflare free plan не змінювався; автоматизація не додає backend, API, database, authorization, server persistence або реальну Java/Boot migration.
- **Обмеження:** Cloudflare native Git integration не налаштовувалася; використовується GitHub Actions + Wrangler Direct Upload до існуючого Pages project. Browser visual verification не виконувалася.

### 35. TASK_SPEC888: sticky site header — `already implemented` / `partially verified`

- **Мета і scope:** перевірити вимогу тримати shared `.site-header` на екрані під час прокручування у desktop і mobile версіях.
- **Перевірені файли:** `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `TASK_SPEC888.md`.
- **Результат:** shared `<header class="site-header">` рендериться безпосередньо після нульового `#page-top` sentinel; `.site-header` має `position: sticky`, `top: 0` і `z-index: 10`. Для mobile виправлено sticky containing-block interference: у mobile breakpoint `html, body` тепер використовують `overflow-x: clip` замість `overflow-x: hidden`, щоб горизонтальне обрізання не створювало scroll container і не блокувало sticky header у mobile browsers.
- **Збережені інваріанти:** document flow не порушено; `#page-top`, `scroll-margin-top: 88px`, skip link, existing navigation, touch-friendly search control і локальні overflow-контейнери для code/table залишилися без змін. Fixed positioning, spacer, JavaScript, backend, API, database та persistence не додавалися.
- **Verification:** source/static inspection підтвердив shared markup, sticky declaration, mobile `overflow-x: clip`, відсутність responsive position override, відповідні anchor offsets і збереження локальних horizontal scrollers; після зміни виконано `npm run check`, `npm run validate` і `npm run build` у цій сесії. `git diff --check` і generated-output audit виконані; browser/mobile visual verification — `Unknown`, оскільки Chromium/Playwright/Puppeteer фактично не запускався.
- **Обмеження:** runtime перевірка на конкретному mobile browser не виконувалася; static verification підтверджує CSS/layout fix, але не замінює browser E2E доказ.
