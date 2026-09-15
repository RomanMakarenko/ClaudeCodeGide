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
- Зареєстровано 140 source-backed маршрутів із 28 рівнів по 5 уроків; перші 34 — редакторська ціль першої хвилі, а не вимога вигадувати сторінки.
- Рівні 1–28 перенесено в авторські структуровані конспекти з прикладами, кроками, таблицями та source links.
- Усі 28 рівнів мають source-backed metadata та authored content; levels 26–28 покривають legacy discovery, modernization, migration discovery, changelog analysis, dependency/compatibility analysis, behavior contracts і phased gates.
- Level 27 додає сім reusable documented-example artifacts: `MODERNIZATION_BASELINE.md`, `CHARACTERIZATION_TESTS.md`, `REFACTORING_PLAN.md`, `SEAM_MAP.md`, `STRANGLER_SLICE.md`, `MODERNIZATION_ROADMAP.md` і `MODERNIZATION_ANTI_PATTERNS.md`. Level 28 додає пʼять migration artifacts: `MIGRATION_DISCOVERY.md`, `CHANGELOG_RESEARCH.md`, `DEPENDENCY_GRAPH.md`, `COMPATIBILITY_MATRIX.md` і `MIGRATION_PLAN.md`; загалом catalog містить 59 artifact records.
- Canonical source для маршрутів — зовнішні JavaRush URLs; локальні `TASK_SPEC*.md` більше не є source metadata уроків.
- Локальні task-spec файли можуть залишатися editorial inputs або прикладами workflow, але не визначають identity чи доступність route.
- Порожні або ще не опрацьовані task-spec файли не перетворюються на вигаданий контент.
- Каталог артефактів доступний на [`/artifacts`](/artifacts); його typed registry знаходиться в `src/data/artifacts.ts`.
- Кожен запис має відповідальність, роль, шляхи, поля, умови використання та погані сценарії вибору. Статус розрізняє файли, присутні в цьому repository, і documented examples із навчальних матеріалів.
- Концептуальні артефакти на кшталт `SKILL.md`, `SPEC.md` і `CODEBASE_INVENTORY.md` не вважаються фізично наявними лише через згадку в уроках; naming/path variants позначені явно.
- Окрема сторінка [`/tasks`](/tasks) містить 24 source-backed типи задач із заповненими прикладами `TASK_SPEC` та повʼязаних артефактів, що посилаються на всі 28 рівнів; це documented examples, а не production evidence.
- Внутрішня хронологія виконаних задач зберігається в [`RUNBOOK.md`](RUNBOOK.md) і зареєстрована в каталозі як `runbook-md`; це delivery history, а не production audit log.

## Результати editorial review

- Read-only review усіх 125 уроків завершено; результати зафіксовано в `EVIDENCE.md`.
- Підтверджено повноту canonical scope: 25 рівнів по 5 уроків, без пропущених canonical IDs і дублікатів source URLs.
- Виявлено редакційні питання щодо узгодження назв `EVIDENCE.md` / `EVIDENCE_LOG.md` і шляхів `SPEC.md` / `docs/SPEC.md` та `EVIDENCE.md` / `docs/EVIDENCE.md`.
- Перевірки попереднього scope: `npm run check` проходив без errors, warnings і hints; `npm run build` генерував 129 static pages; `npm run validate:artifacts` проходив для 41 records. Поточні результати після level 26 див. у `RUNBOOK.md`.
- Guide validator більше не залежить від наявності локальних `TASK_SPEC*.md`; історичні обмеження попередніх перевірок збережено в `EVIDENCE.md` і `RUNBOOK.md`.

## Структура

Контент першої ітерації зберігається в `src/data/guide.ts` як типізований registry. Коли редакторська модель стабілізується, записи можна перенести в Markdown/MDX content collections без зміни URL-ів.
