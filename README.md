    # Claude Code Guide

Перший каркас українського статичного сайту-гіда про Claude Code.

## Запуск

Потрібен Node.js 20 або новіший.

```bash
npm install
npm run dev
```

Production build і локальний preview:

```bash
npm run check
npm run validate
npm run build
npm run preview
```

## Поточний scope

- Реалізовано базову оболонку сайту без backend, API, авторизації та бази даних.
- Додано головну сторінку, каталог рівнів і сторінки доступних уроків.
- Зареєстровано 160 source-backed маршрутів із 32 рівнів по 5 уроків; перші 34 — редакторська ціль першої хвилі, а не вимога вигадувати сторінки.
- Рівні 1–32 перенесено в авторські структуровані конспекти з прикладами, кроками, таблицями та source links.
- Усі 32 рівні мають source-backed metadata та authored content; levels 26–29 покривають legacy discovery, modernization, migration discovery, changelog analysis, dependency/compatibility analysis, pilot execution controls, rollback, behavior parity, migration types і data/configuration sequencing, level 30 — AI-native MVP-мислення, level 31 — controlled vibe coding, implementation sprint, demo gates, readiness і capstone handoff, а level 32 — submission package, repro audit, defense narrative, evaluation rubric, mentor review, remediation backlog і portfolio packaging.
- Level 27 додає сім reusable documented-example artifacts, level 28 — пʼять migration planning artifacts, level 29 — migration execution-control artifacts, level 30 — `VALUE_PROPOSITION.md`, `USER_JTBD.md`, `SUCCESS_METRIC.md` і `RELEASE_SLICE.md`, level 31 — `CONTROLLED_VIBE_CODING.md`, `IMPLEMENTATION_SPRINT_PLAN.md`, `DEMO_QUALITY_GATE.md`, `DEMO_READINESS.md`, `CAPSTONE_DEFENSE_HANDOFF.md`, `DEMO.md`, `EVIDENCE_LOG.md` і `HANDOFF_PACKAGE.md`, а level 32 — `SUBMISSION_PACKAGE.md`, `REPRO_AUDIT.md`, `DEFENSE_NARRATIVE.md`, `CAPSTONE_RUBRIC.md`, `REMEDIATION_BACKLOG.md` і `PORTFOLIO_PACKAGE.md`; загалом catalog містить 82 artifact records.
- Canonical source для маршрутів — зовнішні JavaRush URLs; локальні `TASK_SPEC*.md` більше не є source metadata уроків.
- Локальні task-spec файли можуть залишатися editorial inputs або прикладами workflow, але не визначають identity чи доступність route.
- Порожні або ще не опрацьовані task-spec файли не перетворюються на вигаданий контент.
- Каталог артефактів доступний на [`/artifacts`](/artifacts); його typed registry знаходиться в `src/data/artifacts.ts`.
- Доступний site-wide пошук на [`/search`](/search): build-time projection індексує 160 уроків, 82 артефакти і 24 постановки задач, а браузер виконує deterministic lexical search без backend/API/database/persistence або зовнішнього search service.
- Search layer поєднує keyword matching із нормалізацією, alias/transliteration mapping, prefix/substring matching і зваженим ranking; запит `евіденс` знаходить Latin artifact `EVIDENCE.md`.
- Кожен запис має відповідальність, роль, шляхи, поля, умови використання та погані сценарії вибору. Статус розрізняє файли, присутні в цьому repository, і documented examples із навчальних матеріалів.
- Концептуальні артефакти на кшталт `SKILL.md`, `SPEC.md` і `CODEBASE_INVENTORY.md` не вважаються фізично наявними лише через згадку в уроках; naming/path variants позначені явно.
- Окрема сторінка [`/tasks`](/tasks) містить 24 source-backed типи задач із заповненими прикладами `TASK_SPEC` та повʼязаних артефактів, що посилаються на всі 32 рівні; levels 31–32 розширюють capstone workflow без нового task type. Це documented examples, а не production evidence.
- Внутрішня хронологія виконаних задач зберігається в [`RUNBOOK.md`](RUNBOOK.md) і зареєстрована в каталозі як `runbook-md`; це delivery history, а не production audit log.

## Результати editorial review

- Read-only review усіх 125 уроків завершено; результати зафіксовано в `EVIDENCE.md`.
- Підтверджено повноту canonical scope: 25 рівнів по 5 уроків, без пропущених canonical IDs і дублікатів source URLs.
- Виявлено редакційні питання щодо узгодження назв `EVIDENCE.md` / `EVIDENCE_LOG.md` і шляхів `SPEC.md` / `docs/SPEC.md` та `EVIDENCE.md` / `docs/EVIDENCE.md`.
- Перевірки попереднього scope: `npm run check` проходив без errors, warnings і hints; `npm run build` генерував 129 static pages; `npm run validate:artifacts` проходив для 41 records. Поточні результати після level 26 див. у `RUNBOOK.md`.
- Guide validator більше не залежить від наявності локальних `TASK_SPEC*.md`; історичні обмеження попередніх перевірок збережено в `EVIDENCE.md` і `RUNBOOK.md`.

## Структура

Контент першої ітерації зберігається в `src/data/guide.ts` як типізований registry. Коли редакторська модель стабілізується, записи можна перенести в Markdown/MDX content collections без зміни URL-ів.
