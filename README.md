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
- Зареєстровано 125 source-backed маршрутів; перші 34 — редакторська ціль першої хвилі, а не вимога вигадувати сторінки.
- Рівні 1–25 перенесено в авторські структуровані конспекти з прикладами, кроками, таблицями та source links.
- Усі 25 рівнів мають source-backed metadata та authored content; наступний етап — редакторський review і майбутня artifact-first навігація.
- `TASK_SPEC.md` і `TASK_SPEC2.md` залишаються read-only джерелами для матеріалів гайда.
- Порожні або ще не опрацьовані task-spec файли не перетворюються на вигаданий контент.
- Каталог артефактів доступний на [`/artifacts`](/artifacts); його typed registry знаходиться в `src/data/artifacts.ts`.
- Кожен запис має відповідальність, роль, шляхи, поля, умови використання та погані сценарії вибору. Статус розрізняє файли, присутні в цьому repository, і documented examples із навчальних матеріалів.
- Концептуальні артефакти на кшталт `SKILL.md`, `SPEC.md` і `CODEBASE_INVENTORY.md` не вважаються фізично наявними лише через згадку в уроках; naming/path variants позначені явно.

## Результати editorial review

- Read-only review усіх 125 уроків завершено; результати зафіксовано в `EVIDENCE.md`.
- Підтверджено повноту canonical scope: 25 рівнів по 5 уроків, без пропущених canonical IDs і дублікатів source URLs.
- Виявлено редакційні питання щодо узгодження назв `EVIDENCE.md` / `EVIDENCE_LOG.md` і шляхів `SPEC.md` / `docs/SPEC.md` та `EVIDENCE.md` / `docs/EVIDENCE.md`.
- Перевірки після review успішні: `npm run check` без errors, warnings і hints; `npm run validate` підтверджує 125 сторінок на 25 рівнях.

## Структура

Контент першої ітерації зберігається в `src/data/guide.ts` як типізований registry. Коли редакторська модель стабілізується, записи можна перенести в Markdown/MDX content collections без зміни URL-ів.
