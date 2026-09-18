import type { Artifact } from '../types/artifact';

export const artifacts: Artifact[] = [
  {
    id: 'claude-md', name: 'CLAUDE.md', category: 'Контекст і правила',
    responsibility: 'Фіксує стабільні правила роботи агента з конкретним проєктом.',
    role: 'Спільний контекст для більшості сесій і точка входу в conventions репозиторію.',
    template: "# CLAUDE.md\n\n## Commands\n- check: `npm run check`\n- test: `npm test`\n\n## Rules\n- Keep changes inside the task scope.\n- Report changed files and verification results.\n\n## Do not\n- Read or edit secrets without explicit approval.\n",
    paths: [{ value: '{project}/CLAUDE.md', scope: 'repository', status: 'present' }, { value: '.claude/CLAUDE.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'commands', description: 'Команди запуску, тестів і перевірок.', requirement: 'conventional', example: 'npm run check' },
      { name: 'conventions', description: 'Стиль, архітектурні та naming-правила.', requirement: 'conventional' },
      { name: 'forbidden actions', description: 'Дії, яких агент не має виконувати без окремого рішення.', requirement: 'conventional' },
      { name: 'report format', description: 'Очікуваний формат результату та доказів.', requirement: 'conventional' }
    ],
    whenToUse: 'Коли правило стабільне, командне й потрібне в більшості задач.',
    poorChoiceWhen: 'Для одноразової гіпотези, task-specific деталей, секретів або повної енциклопедії проєкту.',
    status: 'present', sourceRefs: ['level-02']
  },
  {
    id: 'claude-local-md', name: 'CLAUDE.local.md', category: 'Контекст і правила',
    responsibility: 'Зберігає локальні переваги та машинні налаштування, які не мають потрапити до team contract.',
    role: 'Персональний шар контексту поверх спільних правил.',
    template: "# CLAUDE.local.md\n\n## Local context\n- Database: localhost:<port>\n- Fixture directory: <local-path>\n\n## Preferences\n- Explain the plan before multi-file changes.\n",
    paths: [{ value: '.claude/CLAUDE.local.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'local preferences', description: 'Особисті налаштування workflow.', requirement: 'conventional' },
      { name: 'machine context', description: 'Локальні шляхи або особливості середовища.', requirement: 'conventional' }
    ],
    whenToUse: 'Коли контекст потрібен лише одному розробнику або машині.',
    poorChoiceWhen: 'Для спільних правил, permissions, секретів чи вимог, які має бачити команда.',
    status: 'documented-example', sourceRefs: ['level-02']
  },
  {
    id: 'claude-rules', name: '.claude/rules/', category: 'Контекст і правила',
    responsibility: 'Організовує правила, scoped до окремої області або типу файлів.',
    role: 'Зменшує шум глобального контексту та наближає правило до affected area.',
    template: "# Rule: <area-name>\n\nApplies to: `src/<area>/**`\n\n- Preserve the public contract.\n- Run the focused checks after changes.\n- Do not edit unrelated files.\n",
    paths: [{ value: '{project}/.claude/rules/', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'scope', description: 'Шляхи або умови, на які поширюється правило.', requirement: 'required' }, { name: 'rule content', description: 'Інструкції для визначеної області.', requirement: 'required' }],
    whenToUse: 'Коли правило стосується лише окремого модуля, шару або glob-патерна.',
    poorChoiceWhen: 'Для одного короткого завдання або правила, яке має діяти всюди.',
    status: 'documented-example', sourceRefs: ['level-02', 'level-09']
  },
  {
    id: 'settings-json', name: 'settings.json', category: 'Контекст і правила',
    responsibility: 'Визначає спільні або користувацькі налаштування Claude Code.',
    role: 'Версійований configuration layer для командних або account-wide defaults, окремий від локальних override.',
    template: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm run check)\"],\n    \"deny\": [\"Read(.env)\"]\n  },\n  \"env\": {\n    \"PROJECT_MODE\": \"<mode>\"\n  }\n}\n",
    paths: [{ value: '{project}/.claude/settings.json', scope: 'repository', status: 'documented-example' }, { value: '~/.claude/settings.json', scope: 'user', status: 'documented-example' }],
    fields: [{ name: 'permissions', description: 'Явно дозволені та заборонені tool patterns.', requirement: 'conventional' }, { name: 'env', description: 'Безпечні non-secret environment defaults для scope.', requirement: 'optional' }, { name: 'scope', description: 'Рівень застосування: user або project.', requirement: 'required' }, { name: 'version/secret policy', description: 'Правила сумісності та заборона зберігати credentials у файлі.', requirement: 'conventional' }],
    whenToUse: 'Для спільних project defaults або user-wide configuration, яку треба відтворювати на визначеному рівні.',
    poorChoiceWhen: 'Для machine-specific overrides, секретів або transient session state.',
    status: 'documented-example', versionNote: 'Доступні ключі та пріоритети треба звіряти з актуальною Claude Code документацією.', sourceRefs: ['level-01', 'level-02']
  },
  {
    id: 'settings-local-json', name: 'settings.local.json', category: 'Контекст і правила',
    responsibility: 'Зберігає локальні налаштування середовища.',
    role: 'Машинний configuration layer, зазвичай поза Git.',
    template: "{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm run check)\"],\n    \"deny\": [\"Read(.env)\"]\n  }\n}\n",
    paths: [{ value: '.claude/settings.local.json', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'settings', description: 'Локальні параметри Claude Code або workflow.', requirement: 'conventional' }, { name: 'ignore policy', description: 'Правило виключення локального файла з commit.', requirement: 'conventional' }],
    whenToUse: 'Для персональних налаштувань, які не повинні змінювати командний workflow.',
    poorChoiceWhen: 'Як secret store, заміна permissions або місце для командних правил.',
    status: 'documented-example', sourceRefs: ['level-02']
  },
  {
    id: 'task-spec', name: 'TASK_SPEC.md', category: 'Постановка задачі',
    responsibility: 'Перетворює issue або ідею на перевірюваний task contract.',
    role: 'Визначає межі роботи до реалізації та зменшує scope drift.',
    template: "# Task spec — <short task name>\n\n## Goal\n- <problem and desired outcome>\n\n## Scope\n- <files or behavior included>\n\n## Non-goals\n- <explicitly excluded work>\n\n## Acceptance criteria\n- <verifiable condition>\n\n## Verification\n- <command or manual check>\n",
    paths: [{ value: '{project}/TASK_SPEC.md', scope: 'repository', status: 'documented-example' }, { value: 'archive/task-specs/TASK_SPEC.md', scope: 'repository', status: 'present' }],
    fields: [
      { name: 'goal/problem', description: 'Яку проблему вирішуємо і навіщо.', requirement: 'required' },
      { name: 'current/desired behavior', description: 'Поточний і очікуваний стан.', requirement: 'required' },
      { name: 'scope/non-goals', description: 'Що входить і що свідомо не входить у роботу.', requirement: 'required' },
      { name: 'constraints', description: 'Технічні, часові або policy-обмеження.', requirement: 'required' },
      { name: 'acceptance criteria', description: 'Умови, за якими результат приймається.', requirement: 'required' },
      { name: 'verification plan', description: 'Як перевірити результат.', requirement: 'required' },
      { name: 'risks/open questions', description: 'Невизначеності, ризики та рішення, які ще потрібні.', requirement: 'optional' }
    ],
    whenToUse: 'Перед реалізацією feature, bugfix або refactor і щоразу, коли змінюється scope.',
    poorChoiceWhen: 'Для стабільних repository rules, фактичного evidence log або довгого raw transcript.',
    status: 'present', sourceRefs: ['level-03', 'level-25']
  },
  {
    id: 'spec', name: 'SPEC.md', category: 'Постановка задачі',
    responsibility: 'Описує project-level contract: проблему, аудиторію, scope і критерії результату.',
    role: 'Довгоживуча специфікація проєкту або capstone.',
    template: "# Project specification\n\n## Problem\n<problem statement>\n\n## Audience\n<primary users>\n\n## Scope\n- <included capability>\n\n## Non-goals\n- <excluded capability>\n\n## Acceptance criteria\n- <measurable result>\n",
    paths: [{ value: 'SPEC.md', scope: 'repository', status: 'documented-example' }, { value: 'docs/SPEC.md', scope: 'repository', status: 'variant' }],
    fields: [
      { name: 'project/problem', description: 'Контекст проєкту й проблема.', requirement: 'required' },
      { name: 'audience', description: 'Для кого створюється результат.', requirement: 'required' },
      { name: 'scope/non-goals', description: 'Межі та виключення.', requirement: 'required' },
      { name: 'constraints', description: 'Обмеження реалізації.', requirement: 'required' },
      { name: 'acceptance criteria', description: 'Перевірювані умови готовності.', requirement: 'required' },
      { name: 'verification', description: 'План перевірки.', requirement: 'required' }
    ],
    whenToUse: 'Для project contract, який живе довше за одну задачу.',
    poorChoiceWhen: 'Для короткої одноразової нотатки, поточного evidence або детального implementation plan.',
    status: 'variant', aliases: ['docs/SPEC.md'], sourceRefs: ['level-25']
  },
  {
    id: 'evidence', name: 'EVIDENCE.md', category: 'Докази й доставка',
    responsibility: 'Фіксує факти, рішення, перевірки та залишкові ризики.',
    role: 'Стислий audit trail, який дозволяє відрізнити виконану перевірку від припущення.',
    template: "# Evidence\n\n## Result\n<what was checked and what happened>\n\n## Decisions\n- <decision and rationale>\n\n## Verification\n- `<command>` — <result>\n\n## Open risks\n- <unresolved item or none>\n",
    paths: [{ value: 'EVIDENCE.md', scope: 'repository', status: 'present' }, { value: 'docs/EVIDENCE.md', scope: 'repository', status: 'variant' }],
    fields: [
      { name: 'assignment/result', description: 'Що перевірялося та який результат отримано.', requirement: 'required' },
      { name: 'decisions', description: 'Прийняті рішення та їх обґрунтування.', requirement: 'required' },
      { name: 'verification', description: 'Команди, тести й фактичні результати.', requirement: 'required' },
      { name: 'risks/open questions', description: 'Неперевірені частини та наступні питання.', requirement: 'optional' }
    ],
    whenToUse: 'Після аналізу, review або implementation, коли потрібен короткий фактичний trace.',
    poorChoiceWhen: 'Для вимог, raw logs без висновків або повного діалогу сесії.',
    status: 'variant', aliases: ['EVIDENCE_LOG.md', 'docs/EVIDENCE.md'], versionNote: 'У навчальних матеріалах назва EVIDENCE_LOG.md використовується як legacy/concept variant; canonical filename треба узгодити.', sourceRefs: ['level-04', 'level-18', 'level-25']
  },
  {
    id: 'codebase-inventory', name: 'CODEBASE_INVENTORY.md', category: 'Розуміння codebase',
    responsibility: 'Створює компактну карту репозиторію та його ризиків.',
    role: 'Discovery та handoff artifact для швидкого орієнтування.',
    template: "# Codebase inventory\n\n## Stack\n- Language: <language>\n- Framework: <framework>\n\n## Entry points\n- <path> — <purpose>\n\n## Commands\n- Run: `<command>`\n- Check: `<command>`\n\n## Risk areas\n- <area and reason>\n",
    paths: [{ value: '{project}/CODEBASE_INVENTORY.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'stack', description: 'Мови, framework та інструменти.', requirement: 'required' },
      { name: 'system parts', description: 'Основні модулі й межі.', requirement: 'required' },
      { name: 'entry points', description: 'Де починається виконання.', requirement: 'required' },
      { name: 'run/check commands', description: 'Як запустити та перевірити систему.', requirement: 'required' },
      { name: 'runtime flows', description: 'Ключові потоки даних або control flow.', requirement: 'optional' },
      { name: 'risk areas/open questions', description: 'Зони ризику й непідтверджені питання.', requirement: 'optional' }
    ],
    whenToUse: 'Після discovery, перед handoff або коли codebase складний для нового учасника.',
    poorChoiceWhen: 'Як копію коду, chat transcript або джерело неперевірених припущень.',
    status: 'documented-example', sourceRefs: ['level-07']
  },
  {
    id: 'api-map', name: 'API_MAP.md', category: 'Розуміння codebase',
    responsibility: 'Показує зв’язки між routes, handlers, integrations, DB, env і tests.',
    role: 'Карта трасування інтеграцій.',
    template: "# API map\n\n| Route | Handler | Boundary | Checks |\n| --- | --- | --- | --- |\n| `GET /<resource>` | `<handler>` | `<DB or service>` | `<test>` |\n\n## Environment\n- `<ENV_NAME>` — <purpose>\n",
    paths: [{ value: '{project}/API_MAP.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'route/handler', description: 'Вхідна точка та обробник.', requirement: 'required' }, { name: 'integration/data boundary', description: 'DB, queue або зовнішній client.', requirement: 'required' }, { name: 'tests/env', description: 'Перевірки та configuration dependencies.', requirement: 'optional' }],
    whenToUse: 'Коли треба простежити endpoint або integration boundary.',
    poorChoiceWhen: 'У проєкті без API чи зовнішніх інтеграцій або для загальної карти всього репозиторію.',
    status: 'documented-example', sourceRefs: ['level-08']
  },
  {
    id: 'handoff-note', name: 'HANDOFF_NOTE.md', category: 'Докази й доставка',
    responsibility: 'Передає контекст, стан і наступний крок іншому виконавцю або reviewer.',
    role: 'Milestone transfer artifact.',
    template: "# Handoff note\n\n## Goal and scope\n<what this work covers>\n\n## Changed files\n- `<path>` — <change>\n\n## Decisions\n- <decision>\n\n## Checks\n- `<command>` — <result>\n\n## Next step\n<one concrete next action>\n",
    paths: [{ value: '{project}/HANDOFF_NOTE.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'goal/scope', description: 'Мета та межі переданої роботи.', requirement: 'required' }, { name: 'changed files', description: 'Що було змінено.', requirement: 'required' }, { name: 'decisions/assumptions', description: 'Рішення та припущення.', requirement: 'required' }, { name: 'evidence/checks', description: 'Команди й результати перевірок.', requirement: 'required' }, { name: 'risks/next step', description: 'Ризики та одна найближча дія.', requirement: 'required' }],
    whenToUse: 'На межі milestone, передачею роботи або залученням свіжого reviewer.',
    poorChoiceWhen: 'Як PR description, commit message або changelog.',
    status: 'documented-example', sourceRefs: ['level-06']
  },
  {
    id: 'skill-md', name: 'SKILL.md', category: 'Повторювані workflow',
    responsibility: 'Описує стабільну повторювану процедуру з її trigger, інструкціями й обмеженнями.',
    role: 'Версіонований workflow contract.',
    template: "---\nname: <skill-name>\ndescription: <what this workflow does>\nargument-hint: \"[input-path] [focus]\"\n---\n\n# <Skill title>\n\n## When to use\nUse when <trigger>.\n\n## Steps\n1. Inspect the input.\n2. Perform the focused workflow.\n3. Return evidence and remaining risks.\n\n## Constraints\n- Do not modify files outside the declared scope.\n",
    paths: [{ value: '{project}/.claude/skills/{skill-name}/SKILL.md', scope: 'repository', status: 'documented-example' }, { value: '~/.claude/skills/{skill-name}/SKILL.md', scope: 'user', status: 'documented-example' }],
    fields: [{ name: 'name', description: 'Стабільний ідентифікатор workflow.', requirement: 'required', example: 'issue-analysis' }, { name: 'description', description: 'Що робить skill і який результат повертає.', requirement: 'required' }, { name: 'argument-hint', description: 'Підказка щодо аргументів slash-команди.', requirement: 'optional', example: '[input-path] [focus]' }, { name: 'when_to_use', description: 'Умови запуску.', requirement: 'conventional' }, { name: 'allowed_tools', description: 'Мінімальний набір дозволених інструментів.', requirement: 'conventional', example: 'read, grep' }, { name: 'instructions/templates', description: 'Основна процедура та допоміжні шаблони.', requirement: 'required' }],
    whenToUse: 'Коли одна процедура повторюється і має стабільний контракт.',
    poorChoiceWhen: 'Для одноразової думки, нестабільного експерименту або permission enforcement.',
    status: 'documented-example', versionNote: 'Поля з прикладу TASK_SPEC є project convention; точний frontmatter залежить від актуальної версії Claude Code.', sourceRefs: ['level-09']
  },
  {
    id: 'subagent', name: 'Custom subagent', category: 'Повторювані workflow',
    responsibility: 'Фіксує вузьку роль агента для повторюваного discovery, review або дослідження.',
    role: 'Контрольований role contract із межами Read/Run/Write/Stop.',
    template: "---\nname: <reviewer>\ndescription: Reviews <area> and returns evidence-backed findings.\ntools: Read, Grep\n---\n\n# Role\nInspect only the assigned scope.\n\n# Output\n- Finding\n- File and line\n- Evidence\n- Confidence\n\n# Prohibitions\nDo not edit files or broaden the scope.\n",
    paths: [{ value: '{project}/.claude/agents/reviewer.md', scope: 'repository', status: 'documented-example' }, { value: '~/.claude/agents/{name}.md', scope: 'user', status: 'documented-example' }],
    fields: [{ name: 'name', description: 'Назва ролі.', requirement: 'required' }, { name: 'description', description: 'Коли та для чого викликати.', requirement: 'required' }, { name: 'tools', description: 'Дозволені інструменти.', requirement: 'conventional' }, { name: 'role/prohibitions', description: 'Роль і заборонені дії.', requirement: 'required' }, { name: 'result format', description: 'Структура findings із доказами.', requirement: 'required' }],
    whenToUse: 'Для вузької повторюваної ролі з підготовленим входом і визначеним звітом.',
    poorChoiceWhen: 'Для необмеженої реалізації або як заміну permissions і human approval.',
    status: 'documented-example', sourceRefs: ['level-11']
  },
  {
    id: 'hook-config', name: 'Hook configuration', category: 'Повторювані workflow',
    responsibility: 'Автоматично реагує на вузьку подію життєвого циклу.',
    role: 'Локальна event-driven automation.',
    template: "event: <lifecycle-event>\nmatcher: <path-or-condition>\nhandler: <command-or-script>\nmode: non-blocking\nkill_switch: <how-to-disable>\n",
    paths: [{ value: '{project}/.claude/hooks/', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'event', description: 'Момент, коли automation запускається.', requirement: 'required' }, { name: 'matcher', description: 'Умова або шлях, що звужує область.', requirement: 'required' }, { name: 'handler', description: 'Одна передбачувана дія або команда.', requirement: 'required' }, { name: 'mode/kill switch', description: 'Режим blocking/non-blocking та спосіб вимкнення.', requirement: 'conventional' }],
    whenToUse: 'Для вузької, передбачуваної й легко вимкненої локальної автоматизації.',
    poorChoiceWhen: 'Для orchestration, бізнес-рішень, повного CI або прихованого task spec.',
    status: 'documented-example', versionNote: 'Назви подій і matcher треба звіряти з актуальною CLI-документацією.', sourceRefs: ['level-14']
  },
  {
    id: 'mcp-config', name: 'MCP', category: 'Інтеграції',
    responsibility: 'Підключає зовнішнє джерело даних або дій до workflow.',
    role: 'Integration boundary із transport, scope та auth.',
    template: "server: <server-name>\ntransport: <stdio|http>\ncommand: <command>\nscope: project\nauth: REDACTED\nhealthcheck: <status command>\n",
    paths: [{ value: '{project}/.claude/mcp/', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'transport', description: 'Як підключається server.', requirement: 'required' }, { name: 'scope', description: 'Де та для кого доступна інтеграція.', requirement: 'required' }, { name: 'auth', description: 'Як надаються credentials без витоку секретів.', requirement: 'required' }, { name: 'status/health', description: 'Як перевірити доступність і стан.', requirement: 'conventional' }],
    whenToUse: 'Коли дані або дії живуть у зовнішній issue tracker, DB, docs чи browser service.',
    poorChoiceWhen: 'Коли потрібні дані вже локальні або credential/side-effect/prompt-injection ризики не контрольовані.',
    status: 'documented-example', versionNote: 'Конкретна конфігурація version-sensitive.', sourceRefs: ['level-13']
  },
  {
    id: 'plugin', name: 'Plugin', category: 'Повторювані workflow',
    responsibility: 'Постачає версіонований пакет workflow, skills, agents або інтеграцій.',
    role: 'Distribution unit для перевіреного командного розширення.',
    template: "name: <plugin-name>\nversion: 0.1.0\nmanifest:\n  skills:\n    - <skill-name>\n  agents:\n    - <agent-name>\npermissions:\n  - <required-access>\n",
    paths: [{ value: 'Plugin package', scope: 'external', status: 'documented-example' }],
    fields: [{ name: 'manifest', description: 'Ідентичність і склад пакета.', requirement: 'required' }, { name: 'workflow assets', description: 'Skills, agents або commands.', requirement: 'required' }, { name: 'version', description: 'Версія для відтворюваної доставки.', requirement: 'required' }, { name: 'permissions/integration notes', description: 'Потрібні доступи й обмеження.', requirement: 'conventional' }],
    whenToUse: 'Для стабільного workflow, який треба повторно доставляти команді.',
    poorChoiceWhen: 'Для one-off experiment або неперевіреного automation.',
    status: 'documented-example', sourceRefs: ['level-09', 'level-10']
  },
  {
    id: 'git-review-artifacts', name: 'Git branch / worktree / diff', category: 'Виконання і якість',
    responsibility: 'Ізолює роботу, показує зміни та підтримує review/rollback.',
    role: 'Операційний набір контрольованої реалізації.',
    template: "git switch -c <branch-name>\ngit status\ngit diff -- <path>\n# Review the diff, run checks, then create a checkpoint.\n",
    paths: [{ value: '.git/', scope: 'generated', status: 'external-source' }, { value: 'worktree/', scope: 'generated', status: 'external-source' }, { value: 'working diff', scope: 'generated', status: 'external-source' }],
    fields: [{ name: 'baseline', description: 'Стан, від якого почалася робота.', requirement: 'required' }, { name: 'scope', description: 'Файли та межі зміни.', requirement: 'required' }, { name: 'diff', description: 'Фактична різниця змін.', requirement: 'required' }, { name: 'checkpoint', description: 'Точка повернення або review.', requirement: 'optional' }],
    whenToUse: 'Для довгої, паралельної, ризикової або такої, що потребує review, роботи.',
    poorChoiceWhen: 'Для крихітної незалежної зміни або worktree без плану cleanup.',
    status: 'external-source', sourceRefs: ['level-06', 'level-18']
  },
  {
    id: 'readme', name: 'README.md', category: 'Артефакти цього сайту',
    responsibility: 'Пояснює запуск, scope, структуру та поточний стан repository.',
    role: 'Публічний entry point для розробника проєкту.',
    template: "# Project name\n\n## Setup\n```bash\nnpm install\nnpm run dev\n```\n\n## Scope\n<what this project contains>\n\n## Verification\n- `npm run check`\n",
    paths: [{ value: 'README.md', scope: 'repository', status: 'present' }],
    fields: [{ name: 'setup', description: 'Вимоги та команди запуску.', requirement: 'required' }, { name: 'scope', description: 'Що входить у поточну ітерацію.', requirement: 'required' }, { name: 'structure', description: 'Де знаходяться ключові частини.', requirement: 'required' }, { name: 'status/review notes', description: 'Поточні результати та обмеження.', requirement: 'optional' }],
    whenToUse: 'На вході в repository або коли змінюється setup і scope.',
    poorChoiceWhen: 'Для детального task contract, evidence log або внутрішніх секретів.',
    status: 'present', sourceRefs: ['level-01']
  },
  {
    id: 'capstone-brief', name: 'CAPSTONE_BRIEF.md', category: 'Постановка задачі',
    responsibility: 'Фіксує спільні правила й очікування capstone.',
    role: 'Надзадачний brief, який відрізняється від конкретного SPEC.md.',
    template: "# Capstone brief\n\n## Shared expectations\n- Deliver one complete core flow.\n- Keep the scope reviewable.\n\n## Guardrails\n- No secrets in the repository.\n- Record checks and remaining risks.\n",
    paths: [{ value: '{project}/CAPSTONE_BRIEF.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'shared expectations', description: 'Спільні правила capstone.', requirement: 'required' }, { name: 'guardrails', description: 'Межі та критерії безпечної роботи.', requirement: 'required' }],
    whenToUse: 'На старті capstone або іншої спільної навчальної ініціативи.',
    poorChoiceWhen: 'Для task-specific requirements або журналу фактичних перевірок.',
    status: 'documented-example', sourceRefs: ['level-25']
  },
  {
    id: 'backlog-roadmap', name: 'Backlog / roadmap', category: 'Постановка задачі',
    responsibility: 'Розкладає capstone або довгу роботу на milestones.',
    role: 'Послідовність delivery та evaluation steps.',
    template: "# Roadmap\n\n## Milestones\n1. Discovery — map the current behavior.\n2. Implementation — deliver the core flow.\n3. Verification — run checks and prepare evidence.\n\n## Evaluation\n- <criterion for milestone completion>\n",
    paths: [{ value: 'project backlog or roadmap', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'milestones', description: 'Ключові етапи роботи.', requirement: 'required' }, { name: 'core flow', description: 'Пріоритетний наскрізний сценарій.', requirement: 'required' }, { name: 'evaluation', description: 'Як оцінюється готовність етапу.', requirement: 'optional' }],
    whenToUse: 'Для довгих задач із кількома етапами та залежностями.',
    poorChoiceWhen: 'Для маленької одноразової зміни або заміни acceptance criteria.',
    status: 'documented-example', sourceRefs: ['level-25']
  },
  {
    id: 'pr-description', name: 'PR description', category: 'Докази й доставка',
    responsibility: 'Пакує зміни для pre-merge review.',
    role: 'Delivery packet із контекстом, diff summary та checks.',
    template: "## Summary\n<what changed>\n\n## Scope\n- Included: <area>\n- Not included: <non-goal>\n\n## Checks\n- `<command>` — <result>\n\n## Risks\n- <risk or none>\n",
    paths: [{ value: 'pull request description', scope: 'external', status: 'external-source' }],
    fields: [{ name: 'summary', description: 'Що змінилося.', requirement: 'required' }, { name: 'scope', description: 'Межі зміни та non-goals.', requirement: 'required' }, { name: 'tests/checks', description: 'Перевірки та їх результати.', requirement: 'required' }, { name: 'risks/review notes', description: 'Ризики та питання reviewer.', requirement: 'optional' }],
    whenToUse: 'Перед merge, коли зміни мають пройти review.',
    poorChoiceWhen: 'Як довготривалий project spec або заміна handoff між milestone.',
    status: 'external-source', sourceRefs: ['level-06', 'level-18']
  },
  {
    id: 'commit-message', name: 'Commit message', category: 'Докази й доставка',
    responsibility: 'Описує один логічний крок історії змін.',
    role: 'Короткий trace у version control history.',
    template: "<type>(<scope>): <short imperative summary>\n\nExplain why the change is needed and mention verification when useful.\n",
    paths: [{ value: 'Git commit metadata', scope: 'generated', status: 'external-source' }],
    fields: [{ name: 'intent', description: 'Логічна мета коміту.', requirement: 'required' }, { name: 'scope', description: 'Межі цього кроку.', requirement: 'required' }],
    whenToUse: 'Для атомарного логічного кроку, який треба відтворити або відкотити.',
    poorChoiceWhen: 'Як місце для повного test report, вимог або довгого design decision.',
    status: 'external-source', sourceRefs: ['level-06', 'level-18']
  },
  {
    id: 'changelog', name: 'Changelog', category: 'Докази й доставка',
    responsibility: 'Пояснює release- та user-visible зміни.',
    role: 'Комунікаційний release artifact.',
    template: "# Changelog\n\n## [Unreleased]\n### Added\n- <user-visible capability>\n\n### Fixed\n- <user-visible bug fix>\n\n### Migration notes\n- <required action or none>\n",
    paths: [{ value: 'CHANGELOG.md or release notes', scope: 'repository', status: 'external-source' }],
    fields: [{ name: 'release/version', description: 'До якого релізу належить запис.', requirement: 'required' }, { name: 'user-visible changes', description: 'Зміни, важливі для користувача.', requirement: 'required' }, { name: 'migration notes', description: 'Несумісності та інструкції переходу.', requirement: 'optional' }],
    whenToUse: 'Під час release або публікації user-visible змін.',
    poorChoiceWhen: 'Як технічний task contract, raw evidence або список кожного внутрішнього коміту.',
    status: 'external-source', sourceRefs: ['level-06', 'level-18']
  },
  {
    id: 'commands-md', name: 'commands.md', category: 'Повторювані workflow',
    responsibility: 'Фіксує короткі повторювані команди та їхній безпечний контекст запуску.',
    role: 'Discoverable command reference для команди або skill.',
    template: "# Commands\n\n## <workflow>\n- Purpose: <what it verifies or changes>\n- Run from: <directory>\n- Command: `<command>`\n- Expected result: <observable output>\n- Stop if: <failure or unsafe condition>\n",
    paths: [{ value: '{project}/commands.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'workflow', description: 'Процес або сценарій, якому належить команда.', requirement: 'required' }, { name: 'run context', description: 'Каталог, середовище та передумови запуску.', requirement: 'required' }, { name: 'expected result', description: 'Спостережуваний результат і stop condition.', requirement: 'required' }],
    whenToUse: 'Коли команди повторюються й коротка довідка зменшує помилки запуску.',
    poorChoiceWhen: 'Як заміна task spec, повного README або прихований automation script.',
    status: 'documented-example', sourceRefs: ['level-01', 'level-10']
  },
  {
    id: 'clawd-wisdom', name: 'CLAWD Wisdom', category: 'Розуміння codebase',
    responsibility: 'Зберігає перевірені короткі висновки, які варто повторно використовувати в workflow.',
    role: 'Curated knowledge record, відділений від сирих transcript-ів.',
    template: "# CLAWD Wisdom\n\n## <lesson>\n- Context: <where this applies>\n- Evidence: <file, command, or source>\n- Insight: <verified reusable conclusion>\n- Limitation: <where it does not apply>\n- Reviewed: <date or version>\n",
    paths: [{ value: '.claude/knowledge/CLAWD-Wisdom.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'context', description: 'Сценарій, у якому висновок справедливий.', requirement: 'required' }, { name: 'evidence', description: 'Доказ, на якому ґрунтується висновок.', requirement: 'required' }, { name: 'limitation', description: 'Межі застосування та version-sensitive застереження.', requirement: 'required' }],
    whenToUse: 'Для стислих перевірених lessons learned, які корисні в наступних задачах.',
    poorChoiceWhen: 'Для неперевірених припущень, особистого щоденника або повного логу сесії.',
    status: 'documented-example', sourceRefs: ['level-08', 'level-16']
  },
  {
    id: 'clawd-yolo', name: 'CLAWD YOLO', category: 'Повторювані workflow',
    responsibility: 'Описує свідомий швидкий режим із явно звуженими межами та умовами зупинки.',
    role: 'Risk-bounded fast-path contract, а не дозвіл на необмежені дії.',
    template: "# CLAWD YOLO\n\n## Allowed scope\n- Paths: <narrow paths>\n- Actions: <allowed actions>\n\n## Guardrails\n- No secrets or destructive operations.\n- Stop on: <failure signal>\n- Human checkpoint: <before merge or release>\n",
    paths: [{ value: '.claude/workflows/CLAWD-YOLO.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'allowed scope', description: 'Точні шляхи, дії та середовище.', requirement: 'required' }, { name: 'guardrails', description: 'Заборонені дії та обмеження ризику.', requirement: 'required' }, { name: 'human checkpoint', description: 'Момент обовʼязкового людського рішення.', requirement: 'required' }],
    whenToUse: 'Для низькоризикової повторюваної роботи з коротким feedback loop.',
    poorChoiceWhen: 'Для production, auth, secrets, платежів, destructive commands або невизначеного scope.',
    status: 'documented-example', sourceRefs: ['level-15', 'level-23']
  },
  {
    id: 'clawd-runner', name: 'CLAWD Runner', category: 'Виконання і якість',
    responsibility: 'Описує відтворюваний запуск workflow з входом, статусом, логом і результатом.',
    role: 'Operational execution record для локального або CI runner.',
    template: "# CLAWD Runner\n\nrun: <human-readable name>\ninput: <path or task id>\ncommand: `<command>`\nenvironment: <local|ci|staging>\nstatus: <planned|running|passed|failed|stopped>\noutput: <artifact path or summary>\n",
    paths: [{ value: '.claude/runs/<run-id>.md', scope: 'generated', status: 'documented-example' }],
    fields: [{ name: 'input', description: 'Вхідні дані або ідентифікатор задачі.', requirement: 'required' }, { name: 'command/environment', description: 'Що і де було запущено.', requirement: 'required' }, { name: 'status/output', description: 'Фактичний стан і посилання на результат.', requirement: 'required' }],
    whenToUse: 'Коли запуск треба повторити, перевірити або передати іншому учаснику.',
    poorChoiceWhen: 'Для довільного raw log без висновку або як заміна CI provider record.',
    status: 'documented-example', sourceRefs: ['level-21', 'level-22']
  },
  {
    id: 'locales-json', name: 'locales.json', category: 'Виконання і якість',
    responsibility: 'Описує доступні локалі та правила їхнього вибору.',
    role: 'Machine-readable locale contract для UI, API і тестів.',
    template: "{\n  \"defaultLocale\": \"<locale>\",\n  \"supportedLocales\": [\"<locale>\"],\n  \"fallbackLocale\": \"<locale>\",\n  \"namespaces\": [\"<namespace>\"]\n}\n",
    paths: [{ value: '{project}/locales.json', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'defaultLocale', description: 'Локаль за замовчуванням.', requirement: 'required' }, { name: 'supportedLocales', description: 'Які локалі реально підтримуються.', requirement: 'required' }, { name: 'fallbackLocale/namespaces', description: 'Fallback і групи перекладів.', requirement: 'required' }],
    whenToUse: 'Коли locale behavior має бути єдиним контрактом для кількох шарів системи.',
    poorChoiceWhen: 'Для одного текстового перекладу або як заміна локалізаційним файлам і тестам.',
    status: 'documented-example', sourceRefs: ['level-04']
  },
  {
    id: 'locale-bundle', name: 'Locale API/UI/test bundle', category: 'Виконання і якість',
    responsibility: 'Поєднує зміни локалі в API, UI та тестах в один reviewable output.',
    role: 'Cross-layer delivery bundle для перевірки узгодженості перекладів.',
    template: "# Locale bundle\n\n## Contract\n- Locale: <locale>\n- Keys added/changed: <keys>\n\n## Layers\n- API: <paths>\n- UI: <paths>\n- Tests: <paths>\n\n## Verification\n- `<command>` — <result>\n",
    paths: [{ value: 'locale API/UI/test change set', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'locale/keys', description: 'Локаль і змінені translation keys.', requirement: 'required' }, { name: 'layers', description: 'Повʼязані API, UI та test paths.', requirement: 'required' }, { name: 'verification', description: 'Перевірка fallback, rendering і тестів.', requirement: 'required' }],
    whenToUse: 'Для змін, де одна локаль повинна узгоджено пройти кілька шарів.',
    poorChoiceWhen: 'Для зміни лише одного тексту без cross-layer поведінки.',
    status: 'documented-example', sourceRefs: ['level-04']
  },
  {
    id: 'handoff-review', name: 'HANDOFF_REVIEW.md', category: 'Докази й доставка',
    responsibility: 'Передає reviewer-у перевірений стан handoff-пакета та відкриті питання.',
    role: 'Review checkpoint поверх базового HANDOFF_NOTE.md.',
    template: "# HANDOFF_REVIEW.md\n\n## Reviewed handoff\n- Source: <handoff path>\n- Scope: <reviewed scope>\n\n## Confirmed\n- <evidence-backed item>\n\n## Findings\n- <finding or none>\n\n## Next decision\n- <action and owner>\n",
    paths: [{ value: '{project}/HANDOFF_REVIEW.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'source/scope', description: 'Який handoff і межі перевірено.', requirement: 'required' }, { name: 'confirmed/findings', description: 'Підтвердження та зауваження з evidence.', requirement: 'required' }, { name: 'next decision', description: 'Наступна дія і відповідальна роль.', requirement: 'required' }],
    whenToUse: 'Перед передачею milestone або залученням fresh reviewer.',
    poorChoiceWhen: 'Для повторення повного handoff, PR summary або неперевіреного статусу.',
    status: 'documented-example', sourceRefs: ['level-06', 'level-16']
  },
  {
    id: 'contract-md', name: 'CONTRACT.md', category: 'Постановка задачі',
    responsibility: 'Фіксує межу взаємодії між компонентами, ролями або workflow stages.',
    role: 'Shared interface contract із входами, виходами та інваріантами.',
    template: "# CONTRACT.md\n\n## Parties\n- Producer: <role/component>\n- Consumer: <role/component>\n\n## Input\n- <required input>\n\n## Output\n- <expected output>\n\n## Invariants\n- <must remain true>\n\n## Failure/stop conditions\n- <condition>\n",
    paths: [{ value: '{project}/CONTRACT.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'parties', description: 'Хто або що взаємодіє.', requirement: 'required' }, { name: 'input/output', description: 'Формат і зміст передачі.', requirement: 'required' }, { name: 'invariants/failures', description: 'Незмінні умови та stop conditions.', requirement: 'required' }],
    whenToUse: 'Коли кілька ролей або етапів мають працювати незалежно через стабільну межу.',
    poorChoiceWhen: 'Для простої одноетапної правки або як заміна domain/API specification.',
    status: 'documented-example', sourceRefs: ['level-03', 'level-15', 'level-16']
  },
  {
    id: 'plan-md', name: 'PLAN.md', category: 'Постановка задачі',
    responsibility: 'Перекладає task contract у послідовність перевірюваних implementation steps.',
    role: 'Короткий execution plan перед редагуванням.',
    template: "# PLAN.md\n\n## Goal\n<desired outcome>\n\n## Scope\n- <included paths or behavior>\n\n## Steps\n1. <inspect>\n2. <change>\n3. <verify>\n\n## Risks\n- <risk or none>\n\n## Stop condition\n- <when to pause and ask>\n",
    paths: [{ value: '{project}/PLAN.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'goal/scope', description: 'Результат і дозволена зона роботи.', requirement: 'required' }, { name: 'steps', description: 'Послідовність малих дій.', requirement: 'required' }, { name: 'risks/stop condition', description: 'Ризики та умова зупинки.', requirement: 'required' }],
    whenToUse: 'Перед multi-file, ризиковою або делегованою зміною.',
    poorChoiceWhen: 'Для стабільних правил, фактичного звіту або плану без acceptance criteria.',
    status: 'documented-example', sourceRefs: ['level-03', 'level-15', 'level-18']
  },
  {
    id: 'workflow-md', name: 'workflow.md', category: 'Повторювані workflow',
    responsibility: 'Описує повторюваний процес від trigger до перевіреного результату.',
    role: 'Людиночитний workflow contract із ролями та failure path.',
    template: "# Workflow: <name>\n\n## Trigger\n<when to use>\n\n## Inputs\n- <input>\n\n## Stages\n1. <stage and owner>\n2. <stage and owner>\n\n## Evidence\n- <output artifact>\n\n## Failure path\n<how to stop, retry, rollback, or escalate>\n",
    paths: [{ value: '{project}/workflow.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'trigger/inputs', description: 'Умови запуску та вхідні дані.', requirement: 'required' }, { name: 'stages/owners', description: 'Етапи й відповідальність.', requirement: 'required' }, { name: 'evidence/failure path', description: 'Вихідні артефакти та обробка збою.', requirement: 'required' }],
    whenToUse: 'Коли процес повторюється і його потрібно передати або відтворити.',
    poorChoiceWhen: 'Для одноразового prompt, низькорівневого script або policy-only правила.',
    status: 'documented-example', sourceRefs: ['level-14', 'level-16']
  },
  {
    id: 'research-digest', name: 'research-digest.md', category: 'Розуміння codebase',
    responsibility: 'Стискає результати дослідження з джерелами, висновками та невизначеністю.',
    role: 'Curated read-only research output.',
    template: "# Research digest\n\n## Question\n<question>\n\n## Sources\n- <source> — <what it supports>\n\n## Findings\n- <confirmed finding>\n\n## Unknowns\n- <unverified item>\n\n## Recommendation\n<next safe step>\n",
    paths: [{ value: 'sources/research-digest.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'question', description: 'Питання або гіпотеза дослідження.', requirement: 'required' }, { name: 'sources/findings', description: 'Джерела та підтверджені висновки.', requirement: 'required' }, { name: 'unknowns/recommendation', description: 'Невідоме та безпечний наступний крок.', requirement: 'required' }],
    whenToUse: 'Після широкого discovery, external research або read-only subagent роботи.',
    poorChoiceWhen: 'Для сирих нотаток, implementation plan або висновку без посилань на джерела.',
    status: 'documented-example', sourceRefs: ['level-08', 'level-13']
  },
  {
    id: 'run-status-yaml', name: 'run-status.yaml', category: 'Виконання і якість',
    responsibility: 'Машинночитано фіксує стан етапів workflow та їхні результати.',
    role: 'Structured status surface для локального runner або CI.',
    template: "run_id: <opaque-id>\nworkflow: <name>\nstatus: <planned|running|passed|failed|stopped>\nstages:\n  - name: <stage>\n    status: <status>\n    evidence: <path-or-summary>\nupdated_at: <timestamp>\n",
    paths: [{ value: '.claude/runs/run-status.yaml', scope: 'generated', status: 'documented-example' }],
    fields: [{ name: 'workflow/status', description: 'Workflow і загальний стан запуску.', requirement: 'required' }, { name: 'stages', description: 'Стани окремих етапів та evidence.', requirement: 'required' }, { name: 'run_id/updated_at', description: 'Trace identifier і час оновлення.', requirement: 'conventional' }],
    whenToUse: 'Для статусу довгого або багатостадійного локального/CI запуску.',
    poorChoiceWhen: 'Для людиночитного postmortem або одноразової команди без етапів.',
    status: 'documented-example', sourceRefs: ['level-16', 'level-21']
  },
  {
    id: 'diagnosis-json', name: 'diagnosis.json', category: 'Виконання і якість',
    responsibility: 'Структуровано зберігає класифікацію failure, evidence та наступну дію.',
    role: 'Deterministic diagnosis output для CI або bounded analyzer.',
    template: "{\n  \"status\": \"<failure|healthy|unknown>\",\n  \"class\": \"<test|build|environment|flaky|contract>\",\n  \"evidence\": [\"<redacted-log-line>\"],\n  \"confidence\": \"<high|medium|low>\",\n  \"nextAction\": \"<safe next step>\"\n}\n",
    paths: [{ value: '.claude/diagnosis/diagnosis.json', scope: 'generated', status: 'documented-example' }],
    fields: [{ name: 'status/class', description: 'Загальний стан і категорія проблеми.', requirement: 'required' }, { name: 'evidence', description: 'Мінімальні очищені докази.', requirement: 'required' }, { name: 'confidence/nextAction', description: 'Впевненість і безпечна наступна дія.', requirement: 'required' }],
    whenToUse: 'Коли failure треба відрізнити від flaky, environment або contract проблеми.',
    poorChoiceWhen: 'Для автоматичного виправлення без human review або публікації сирих секретних логів.',
    status: 'documented-example', sourceRefs: ['level-18', 'level-21']
  },
  {
    id: 'ai-coding-policy', name: 'AI_CODING_POLICY.md', category: 'Контекст і правила',
    responsibility: 'Задає командний baseline безпечного використання AI у розробці.',
    role: 'Policy layer, який доповнює permissions, hooks і quality gates.',
    template: "# AI coding policy\n\n## Allowed\n- <low-risk use>\n\n## Review required\n- <change or capability>\n\n## Human approval required\n- <production or destructive action>\n\n## Data boundaries\n- Never include secrets, PII, or customer data without approved controls.\n\n## Enforcement\n- <settings, hooks, gates, and owner>\n",
    paths: [{ value: '{project}/AI_CODING_POLICY.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'allowed/review/approval', description: 'Класи дій за рівнем контролю.', requirement: 'required' }, { name: 'data boundaries', description: 'Правила для secrets і чутливих даних.', requirement: 'required' }, { name: 'enforcement/owner', description: 'Технічне забезпечення та відповідальний.', requirement: 'required' }],
    whenToUse: 'Коли команді потрібне єдине трактування AI-дій і людських approvals.',
    poorChoiceWhen: 'Як заміна конкретним permissions, security standard, task spec або incident procedure.',
    status: 'documented-example', sourceRefs: ['level-23', 'level-24']
  },
  {
    id: 'codeowners', name: 'CODEOWNERS', category: 'Контекст і правила',
    responsibility: 'Визначає відповідальних reviewer-ів для шляхів або компонентів.',
    role: 'Repository ownership rule для автоматизації review routing.',
    template: "# CODEOWNERS\n\n# Default owner\n* @<team-or-role>\n\n# Sensitive area\n/src/<area>/** @<approved-owner>\n\n# Configuration\n/.claude/** @<workflow-owner>\n",
    paths: [{ value: '.github/CODEOWNERS', scope: 'repository', status: 'documented-example' }, { value: 'CODEOWNERS', scope: 'repository', status: 'variant' }],
    fields: [{ name: 'patterns', description: 'Шляхи або glob-патерни ownership.', requirement: 'required' }, { name: 'owners', description: 'Команди або ролі, що мають review.', requirement: 'required' }, { name: 'sensitive areas', description: 'Окремі правила для критичних шляхів.', requirement: 'optional' }],
    whenToUse: 'Коли ownership і required review треба застосувати послідовно через repository tooling.',
    poorChoiceWhen: 'Для одноразового погодження або як заміна human decision gate.',
    status: 'documented-example', sourceRefs: ['level-23', 'level-24']
  },
  {
    id: 'postmortem', name: 'Postmortem', category: 'Докази й доставка',
    responsibility: 'Фіксує, що сталося після збою, які controls не спрацювали і що змінити.',
    role: 'Blameless improvement record для повторюваних проблем.',
    template: "# Postmortem: <incident or failure>\n\n## Impact\n<observable impact and duration>\n\n## Timeline\n- <time> — <event>\n\n## Root cause and contributing factors\n- <verified cause>\n\n## What worked / failed\n- <control> — <result>\n\n## Actions\n- [ ] <owner> — <preventive or corrective action>\n\n## Verification\n- <how the fix will be checked>\n",
    paths: [{ value: 'docs/postmortems/<incident>.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'impact/timeline', description: 'Фактичний вплив і послідовність подій.', requirement: 'required' }, { name: 'cause/controls', description: 'Підтверджені причини та оцінка controls.', requirement: 'required' }, { name: 'actions/verification', description: 'Дії з owner і спосіб перевірки.', requirement: 'required' }],
    whenToUse: 'Після значного збою або повторюваної проблеми, щоб змінити процес, а не лише код.',
    poorChoiceWhen: 'Для пошуку гіпотези до збору evidence або для персонального звинувачення.',
    status: 'documented-example', sourceRefs: ['level-21', 'level-24']
  },
  {
    id: 'review-notes', name: 'REVIEW_NOTES.md', category: 'Докази й доставка',
    responsibility: 'Зберігає findings, перевірені області та невирішені питання reviewer.',
    role: 'Curated review output між diff і фінальним рішенням.',
    template: "# REVIEW_NOTES.md\n\n## Scope reviewed\n- <paths or behavior>\n\n## Findings\n- <severity> — <file:line> — <finding>\n\n## Checks\n- `<command>` — <result>\n\n## Open questions\n- <question or none>\n\n## Verdict\n<APPROVE | REWORK | HOLD>\n",
    paths: [{ value: '{project}/REVIEW_NOTES.md', scope: 'repository', status: 'documented-example' }],
    fields: [{ name: 'scope/findings', description: 'Межі review та evidence-backed findings.', requirement: 'required' }, { name: 'checks', description: 'Фактично виконані перевірки.', requirement: 'required' }, { name: 'questions/verdict', description: 'Відкриті питання та обережний висновок.', requirement: 'required' }],
    whenToUse: 'Для окремого self-review, fresh-context review або quality gate.',
    poorChoiceWhen: 'Для PR summary без findings, raw transcript або автоматичного approval.',
    status: 'documented-example', sourceRefs: ['level-18', 'level-22', 'level-24']
  },
  {
    id: 'runbook-md', name: 'RUNBOOK.md', category: 'Докази й доставка',
    responsibility: 'Фіксує хронологію реально виконаних project tasks, їхній scope, результат і verification.',
    role: 'Внутрішній delivery history та repeatable handoff reference, а не production audit log.',
    template: "# Project delivery runbook\n\n**Дата актуалізації:** <YYYY-MM-DD>\n\n## Task log\n\n### <task name> — `<implemented|reviewed|partially verified|not performed>`\n- Goal and scope: <what was requested>\n- Changed or reviewed files: `<paths>`\n- Result: <confirmed outcome>\n- Verification: `<command or manual check>` — <actual result>\n- Limitations: <known gap or none>\n\n## Open limitations\n- <unverified item or none>\n",
    paths: [{ value: 'RUNBOOK.md', scope: 'repository', status: 'present' }],
    fields: [
      { name: 'task/date', description: 'Назва задачі та дата або порядок виконання.', requirement: 'required' },
      { name: 'status', description: 'Чесний стан: implemented, reviewed, partially verified або not performed.', requirement: 'required' },
      { name: 'scope/files', description: 'Межі задачі та змінені або перевірені шляхи.', requirement: 'required' },
      { name: 'result', description: 'Підтверджений результат без вигаданих claims.', requirement: 'required' },
      { name: 'verification/limitations', description: 'Фактичні перевірки та залишкові обмеження.', requirement: 'required' }
    ],
    whenToUse: 'Після серії повʼязаних milestone або перед handoff, коли потрібно відновити фактичну послідовність delivery.',
    poorChoiceWhen: 'Для raw transcript, майбутнього task plan, user-visible changelog, конкретного review evidence, secret storage або вигаданого production record.',
    status: 'present', sourceRefs: ['level-24']
  },
  {
    id: 'debt-signals', name: 'DEBT_SIGNALS.md', category: 'Розуміння codebase',
    responsibility: 'Фіксує обмежений набір evidence-backed static signals технічного боргу.',
    role: 'Discovery log для пріоритизації подальшої перевірки, а не автоматичний список дефектів.',
    template: "# DEBT_SIGNALS.md\n\n## Scope and date\n- Area: <module or flow>\n- Reviewed: <date or revision>\n\n## Signals\n| Area | Evidence | Risk | Next step |\n| --- | --- | --- | --- |\n| <area> | <path, command, report, or commit> | <possible impact> | <one concrete check> |\n\n## Limitations\n- A signal is an indicator, not proof of a defect.\n",
    paths: [{ value: '{project}/DEBT_SIGNALS.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'scope/date', description: 'Область і revision context discovery.', requirement: 'required' },
      { name: 'area/evidence', description: 'Одна зона та конкретний evidence anchor.', requirement: 'required' },
      { name: 'risk', description: 'Можливий наслідок без перебільшення certainty.', requirement: 'required' },
      { name: 'next step/limitation', description: 'Одна перевірка та межа висновку.', requirement: 'required' }
    ],
    whenToUse: 'Коли потрібно звести максимум пʼять найсильніших static signals перед risk review.',
    poorChoiceWhen: 'Для повного списку TODO, автоматичного defect report або заміни runtime і domain verification.',
    status: 'documented-example', sourceRefs: ['level-26']
  },
  {
    id: 'risk-map', name: 'RISK_MAP.md', category: 'Розуміння codebase',
    responsibility: 'Поєднує business criticality, change risk, unknowns і конкретні дії.',
    role: 'Decision map для визначення: змінювати, звузити scope, збирати evidence або hold.',
    template: "# RISK_MAP.md\n\n## Risk entries\n| Area | Business criticality | Change risk | Categories | Evidence | Missing checks | Recommended action |\n| --- | --- | --- | --- | --- | --- | --- |\n| <area> | <low\|medium\|high> | <low\|medium\|high> | <categories> | <anchors> | <checks> | <decision> |\n\n## Unknowns\n- <unknown and owner or verification step>\n",
    paths: [{ value: '{project}/RISK_MAP.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'area/criticality', description: 'Зона та business impact.', requirement: 'required' },
      { name: 'change risk/categories', description: 'Ризик зміни та категорії впливу.', requirement: 'required' },
      { name: 'evidence/missing checks', description: 'Докази й те, що ще не перевірено.', requirement: 'required' },
      { name: 'recommended action', description: 'Конкретне рішення, owner або stop condition.', requirement: 'required' }
    ],
    whenToUse: 'Після legacy discovery, коли потрібно перетворити факти та unknowns на operational decisions.',
    poorChoiceWhen: 'Для єдиного quality score, generic backlog або висновку без evidence і missing checks.',
    status: 'documented-example', sourceRefs: ['level-26']
  },
  {
    id: 'architecture-current', name: 'ARCHITECTURE_CURRENT.md', category: 'Розуміння codebase',
    responsibility: 'Описує фактичну current-state architecture та її підтверджені межі.',
    role: 'Стабільна карта today, яка відділяє facts, assumptions, manual verification і historical discrepancies.',
    template: "# ARCHITECTURE_CURRENT.md\n\n## Що це за документ\n<actual current behavior, not desired architecture>\n\n## Підсистеми\n## Критичні потоки\n## Підтверджені факти\n## Припущення\n## Що потрібно перевірити вручну\n## Розбіжності з історичною документацією\n",
    paths: [{ value: '{project}/ARCHITECTURE_CURRENT.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'purpose/revision', description: 'Межі документа та актуальний revision context.', requirement: 'required' },
      { name: 'subsystems/flows', description: 'Підсистеми, boundaries та critical runtime flows.', requirement: 'required' },
      { name: 'facts/assumptions', description: 'Розділені confirmed facts та inferred assumptions.', requirement: 'required' },
      { name: 'manual checks/discrepancies', description: 'Неперевірене та конфлікти з historical docs.', requirement: 'required' }
    ],
    whenToUse: 'Коли legacy-система потребує опису того, як вона працює сьогодні, до зміни або refactor.',
    poorChoiceWhen: 'Для desired architecture, product roadmap, списку файлів або бездоказового переписування історичних docs.',
    status: 'documented-example', sourceRefs: ['level-26']
  },
  {
    id: 'behavior-inventory', name: 'BEHAVIOR_INVENTORY.md', category: 'Розуміння codebase',
    responsibility: 'Інвентаризує бізнес-потоки, їхні inputs/outputs, тести та characterization candidates.',
    role: 'Behavior-first baseline перед змінами в legacy або критичному домені.',
    template: "# BEHAVIOR_INVENTORY.md\n\n## Flow: <business flow>\n- Поточна поведінка: <confirmed facts and confidence>\n- Входи: <reproducible inputs>\n- Виходи: <observable outputs>\n- Існуючі тести: <paths and level>\n- Бракує перевірок: <gaps>\n- Кандидат на characterization: <yes|no> — <reason>\n- Докази: <anchors>\n",
    paths: [{ value: '{project}/BEHAVIOR_INVENTORY.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'flow/current behavior', description: 'Бізнес-потік і фактична поведінка.', requirement: 'required' },
      { name: 'inputs/outputs', description: 'Відтворювані входи та observable outputs.', requirement: 'required' },
      { name: 'tests/missing checks', description: 'Існуюче покриття та конкретні прогалини.', requirement: 'required' },
      { name: 'characterization candidate', description: 'Явне yes/no з обґрунтуванням.', requirement: 'required' },
      { name: 'evidence', description: 'Якорі source, tests, config, logs або reports.', requirement: 'required' }
    ],
    whenToUse: 'Перед змінами, коли потрібно зберегти observable business behavior і вибрати сильні characterization candidates.',
    poorChoiceWhen: 'Для переліку класів, бажаної архітектури, коду тестів або списку кожної малозначущої умови.',
    status: 'documented-example', sourceRefs: ['level-26']
  },
  {
    id: 'critical-flows', name: 'CRITICAL_FLOWS.md', category: 'Розуміння codebase',
    responsibility: 'Описує наскрізні runtime-потоки, які мають високий вплив або високу ціну помилки.',
    role: 'Карта трасування від trigger та input до side effects, output і failure path.',
    template: "# CRITICAL_FLOWS.md\n\n## Flow: <name>\n- Trigger: <event or entry point>\n- Inputs: <state and data>\n- Steps: <ordered components>\n- Side effects: <writes, integrations, notifications>\n- Output: <observable result>\n- Failure path: <error, retry, rollback, or escalation>\n- Evidence: <anchors>\n",
    paths: [{ value: '{project}/CRITICAL_FLOWS.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'trigger/inputs', description: 'Умова запуску та вхідний стан.', requirement: 'required' },
      { name: 'steps/boundaries', description: 'Послідовність компонентів і integration boundaries.', requirement: 'required' },
      { name: 'side effects/output', description: 'Зміни стану та observable result.', requirement: 'required' },
      { name: 'failure path/evidence', description: 'Обробка помилки та доказові якорі.', requirement: 'required' }
    ],
    whenToUse: 'Для потоків, де зміна одного модуля може вплинути на гроші, дані, інтеграції або користувацький результат.',
    poorChoiceWhen: 'Для повної dependency graph, кожного trivial helper або опису без failure path.',
    status: 'documented-example', sourceRefs: ['level-26']
  },
  {
    id: 'module-inventory', name: 'MODULE_INVENTORY.md', category: 'Розуміння codebase',
    responsibility: 'Фіксує межі модулів, entry points, залежності, ownership і відкриті питання.',
    role: 'Деталізований discovery index між загальним codebase inventory та runtime flow map.',
    template: "# MODULE_INVENTORY.md\n\n## Module: <name>\n- Path: <path>\n- Responsibility: <observed responsibility>\n- Entry points: <symbols or routes>\n- Dependencies: <internal and external>\n- Tests: <paths and coverage signal>\n- Owner: <confirmed or inferred>\n- Risks and unknowns: <items>\n- Evidence: <anchors>\n",
    paths: [{ value: '{project}/MODULE_INVENTORY.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'module/path', description: 'Назва модуля та фактичний шлях.', requirement: 'required' },
      { name: 'responsibility/entry points', description: 'Спостережувана роль і точки входу.', requirement: 'required' },
      { name: 'dependencies/tests', description: 'Залежності та наявні перевірки.', requirement: 'required' },
      { name: 'owner/risks', description: 'Підтверджений або inferred owner і ризики.', requirement: 'required' },
      { name: 'evidence', description: 'Anchors для кожного суттєвого твердження.', requirement: 'required' }
    ],
    whenToUse: 'Під час legacy discovery, коли потрібно розкласти system-level карту на reviewable module records.',
    poorChoiceWhen: 'Для business behavior inventory, повної call graph або тверджень про ownership без evidence.',
    status: 'documented-example', sourceRefs: ['level-26']
  },
  {
    id: 'characterization-tests', name: 'CHARACTERIZATION_TESTS.md', category: 'Виконання і якість',
    responsibility: 'Фіксує перевірки фактичної поведінки legacy-модуля до та під час modernization.',
    role: 'Regression safety net для observable behavior, а не набір тестів «на всяк випадок».',
    template: "# CHARACTERIZATION_TESTS.md\n\n## Scope and baseline\n- Module/flow: <area>\n- Revision: <commit or date>\n- Behavior under test: <observable contract>\n\n## Cases\n| Case | Inputs | Expected observable output | Side effects | Evidence |\n| --- | --- | --- | --- | --- |\n| <case> | <reproducible input> | <status, value, event, or error> | <effect or none> | <test/log/source> |\n\n## Invariants\n- <behavior that must remain unchanged>\n\n## Run and interpretation\n- Command: `<focused test command>`\n- Baseline result: <actual result>\n- Stop if: <unexpected behavior or missing evidence>\n\n## Limits\n- <unknown behavior or scenario not covered>\n",
    paths: [{ value: '{project}/CHARACTERIZATION_TESTS.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'scope/baseline', description: 'Межі модуля, flow і revision, для якого зафіксовано поведінку.', requirement: 'required' },
      { name: 'cases/inputs', description: 'Відтворювані сценарії та їхні вхідні дані.', requirement: 'required' },
      { name: 'observable outputs/side effects', description: 'Очікувані результати, помилки та side effects.', requirement: 'required' },
      { name: 'invariants/evidence', description: 'Поведінкові інваріанти й конкретні докази.', requirement: 'required' },
      { name: 'run/limits', description: 'Команда запуску, baseline result і межі покриття.', requirement: 'required' }
    ],
    whenToUse: 'Коли перед legacy refactoring потрібно закріпити критичну фактичну поведінку focused тестами.',
    poorChoiceWhen: 'Для повного unit-test плану, тестування кожного implementation detail або заміни business requirements.',
    status: 'documented-example', sourceRefs: ['level-27']
  },
  {
    id: 'modernization-baseline', name: 'MODERNIZATION_BASELINE.md', category: 'Розуміння codebase',
    responsibility: 'Фіксує спостережувану поведінку, інваріанти та safety checks legacy-модуля до modernization.',
    role: 'Before-state contract для порівняння результатів малих змін і контрольованого rollback.',
    template: "# MODERNIZATION_BASELINE.md\n\n## Scope and revision\n- Module/flow: <area>\n- Revision: <commit or date>\n\n## Observable behavior\n- Inputs: <inputs>\n- Outputs: <outputs>\n- Side effects: <effects>\n- Failure paths: <errors and recovery>\n\n## Invariants\n- <contract that must remain true>\n\n## Checks and observability\n- `<command or scenario>` — <actual result>\n\n## Rollback point and unknowns\n- Checkpoint: <reference>\n- Unknowns: <items>\n",
    paths: [{ value: '{project}/MODERNIZATION_BASELINE.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'scope/revision', description: 'Межі модуля або flow та revision context.', requirement: 'required' },
      { name: 'observable behavior', description: 'Inputs, outputs, side effects і failure paths.', requirement: 'required' },
      { name: 'invariants', description: 'Контракти, які не можна змінити в structural slice.', requirement: 'required' },
      { name: 'checks/rollback', description: 'Фактичні checks, checkpoint і невідомі питання.', requirement: 'required' }
    ],
    whenToUse: 'Перед modernization або великим refactoring, коли потрібно мати перевірювану точку відліку.',
    poorChoiceWhen: 'Для бажаної архітектури, повного тестового звіту або припущень без observable evidence.',
    status: 'documented-example', sourceRefs: ['level-27']
  },
  {
    id: 'refactoring-plan', name: 'REFACTORING_PLAN.md', category: 'Постановка задачі',
    responsibility: 'Обмежує один incremental refactoring slice його метою, non-goals, checks і stop condition.',
    role: 'Execution contract для structural зміни без змішування feature work або bugfix.',
    template: "# REFACTORING_PLAN.md\n\n## Goal\n<one structural improvement>\n\n## Allowed scope\n- <paths, symbols, or seam>\n\n## Preserve\n- <public behavior and invariants>\n\n## Non-goals\n- <feature, dependency, or unrelated cleanup>\n\n## Steps\n1. <inspect>\n2. <change>\n3. <check and review>\n\n## Stop and rollback\n- <condition and checkpoint>\n",
    paths: [{ value: '{project}/REFACTORING_PLAN.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'goal/scope', description: 'Одна structural мета та дозволена область.', requirement: 'required' },
      { name: 'preserve/non-goals', description: 'Інваріанти й явно виключена робота.', requirement: 'required' },
      { name: 'steps/checks', description: 'Малі кроки та focused verification.', requirement: 'required' },
      { name: 'stop/rollback', description: 'Умова зупинки й точка повернення.', requirement: 'required' }
    ],
    whenToUse: 'Перед одним інкрементальним refactoring кроком у legacy-модулі.',
    poorChoiceWhen: 'Для повної modernization roadmap, feature specification або необмеженого cleanup.',
    status: 'documented-example', sourceRefs: ['level-27']
  },
  {
    id: 'seam-map', name: 'SEAM_MAP.md', category: 'Розуміння codebase',
    responsibility: 'Картує точки розділення між callers, legacy implementation і майбутнім replacement.',
    role: 'Boundary decision record для вибору testable та rollback-friendly seam.',
    template: "# SEAM_MAP.md\n\n## Flow and boundary\n- Flow: <business or runtime flow>\n- Entry point: <caller>\n\n## Current path\n- Caller: <component>\n- Legacy callee: <component>\n- Side effects: <effects>\n\n## Candidate seam\n- Interface/adapter/event/routing: <boundary>\n- Dependency direction: <producer -> consumer>\n- Test seam: <how to observe it>\n\n## Migration risk and next slice\n- Risk: <risk>\n- Next check: <one verification>\n",
    paths: [{ value: '{project}/SEAM_MAP.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'flow/current path', description: 'Flow, caller, callee та фактичний dependency path.', requirement: 'required' },
      { name: 'candidate seam', description: 'Boundary, adapter або routing point для підміни.', requirement: 'required' },
      { name: 'dependency/test direction', description: 'Напрям залежності та спосіб спостерігати seam.', requirement: 'required' },
      { name: 'risk/next check', description: 'Міграційний ризик і конкретна наступна перевірка.', requirement: 'required' }
    ],
    whenToUse: 'Коли legacy-модуль потрібно розділити на незалежні reviewable modernization slices.',
    poorChoiceWhen: 'Для повної call graph, декоративної abstraction або seam без перевірюваного output.',
    status: 'documented-example', sourceRefs: ['level-27']
  },
  {
    id: 'strangler-slice', name: 'STRANGLER_SLICE.md', category: 'Виконання і якість',
    responsibility: 'Описує bounded Strangler Fig slice зі старим і новим шляхом, coexistence та rollback.',
    role: 'Migration contract для поступової підміни фрагмента без big-bang rewrite.',
    template: "# STRANGLER_SLICE.md\n\n## Fragment and boundary\n<bounded behavior being replaced>\n\n## Paths\n- Legacy: <old path>\n- New: <new path>\n- Router: <explicit selection rule>\n\n## Compatibility and side effects\n- Contract: <preserved behavior>\n- Side effects: <single-write/idempotency rule>\n- Observability: <signals>\n\n## Rollout and rollback\n- Rollout: <small expansion>\n- Rollback: <switch and state recovery>\n\n## Retirement criteria\n- <evidence required before removing legacy>\n",
    paths: [{ value: '{project}/STRANGLER_SLICE.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'fragment/paths', description: 'Межа fragment та legacy/new paths.', requirement: 'required' },
      { name: 'routing/compatibility', description: 'Правило вибору path і збереження contract.', requirement: 'required' },
      { name: 'side effects/observability', description: 'Coexistence, idempotency та сигнали результату.', requirement: 'required' },
      { name: 'rollback/retirement', description: 'Повернення і докази для видалення legacy.', requirement: 'required' }
    ],
    whenToUse: 'Для поступової підміни ізольованого legacy-фрагмента з контрольованим coexistence.',
    poorChoiceWhen: 'Для повного rewrite, непомітного dual-write або міграції без rollback і observability.',
    status: 'documented-example', sourceRefs: ['level-27']
  },
  {
    id: 'modernization-roadmap', name: 'MODERNIZATION_ROADMAP.md', category: 'Постановка задачі',
    responsibility: 'Розкладає modernization на milestones з owner, evidence gates, dependencies та exit criteria.',
    role: 'Risk-aware delivery roadmap, яка дозволяє proceed, narrow, hold або rollback.',
    template: "# MODERNIZATION_ROADMAP.md\n\n## Outcome and constraints\n<why modernization matters and what is out of scope>\n\n## Milestones\n| Slice | Owner | Dependency | Evidence gate | Exit criteria | Rollback/hold |\n| --- | --- | --- | --- | --- | --- |\n| <slice> | <role> | <dependency> | <check> | <observable result> | <action> |\n\n## Retirement plan\n- <legacy removal condition>\n\n## Open risks\n- <risk and next decision>\n",
    paths: [{ value: '{project}/MODERNIZATION_ROADMAP.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'outcome/constraints', description: 'Мета modernization та обмеження scope.', requirement: 'required' },
      { name: 'milestones/owners', description: 'Послідовні slices і відповідальні ролі.', requirement: 'required' },
      { name: 'dependencies/evidence gates', description: 'Передумови та перевірки переходу.', requirement: 'required' },
      { name: 'exit/rollback/risks', description: 'Exit criteria, hold/rollback і відкриті ризики.', requirement: 'required' }
    ],
    whenToUse: 'Для modernization, що складається з кількох залежних slices та risk decisions.',
    poorChoiceWhen: 'Для списку всіх бажаних refactors, календаря без gates або заміни поточного baseline.',
    status: 'documented-example', sourceRefs: ['level-27']
  },
  {
    id: 'modernization-anti-patterns', name: 'MODERNIZATION_ANTI_PATTERNS.md', category: 'Докази й доставка',
    responsibility: 'Збирає сигнали небезпечних modernization-практик і безпечніші альтернативи.',
    role: 'Review checklist для виявлення big-bang, scope mixing, відсутності baseline та rollback.',
    template: "# MODERNIZATION_ANTI_PATTERNS.md\n\n## Anti-pattern: <name>\n- Signal: <observable warning>\n- Impact: <possible consequence>\n- Safer alternative: <bounded practice>\n- Stop condition: <when to pause>\n- Evidence: <anchor>\n",
    paths: [{ value: '{project}/MODERNIZATION_ANTI_PATTERNS.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'anti-pattern/signal', description: 'Назва небезпечного патерну та його спостережуваний сигнал.', requirement: 'required' },
      { name: 'impact', description: 'Можливий вплив без перебільшення certainty.', requirement: 'required' },
      { name: 'safer alternative', description: 'Обмежена практика, яка зменшує ризик.', requirement: 'required' },
      { name: 'stop condition/evidence', description: 'Умова паузи та evidence anchor.', requirement: 'required' }
    ],
    whenToUse: 'Під час review modernization plan або перед risk gate для наступного slice.',
    poorChoiceWhen: 'Для blame list, автоматичного verdict або заміни фактичного baseline і risk map.',
    status: 'documented-example', sourceRefs: ['level-27']
  },
  {
    id: 'migration-discovery', name: 'MIGRATION_DISCOVERY.md', category: 'Розуміння codebase',
    responsibility: 'Фіксує source-to-target межі міграції, стартову точку, evidence та невідомі питання.',
    role: 'Read-only discovery record для визначення, чи готовий bounded migration slice до compatibility analysis.',
    template: "# MIGRATION_DISCOVERY.md\n\n## Source and target\n- Source state: <runtime, framework, platform, or version>\n- Target state: <runtime, framework, platform, or version>\n- Migration slice: <bounded area>\n\n## Evidence\n- <repository, build, deployment, integration or official-doc anchor>\n\n## Known, assumed, unknown\n- Known: <confirmed fact>\n- Assumption: <assumption and owner>\n- Unknown: <question and next check>\n\n## Starting checkpoint\n- Revision/environment: <reference>\n- Baseline check: <command or scenario>\n\n## Stop conditions\n- <condition that blocks analysis or pilot>\n",
    paths: [{ value: '{project}/MIGRATION_DISCOVERY.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'source/target scope', description: 'Source state, target intent і bounded migration area.', requirement: 'required' },
      { name: 'evidence', description: 'Repository, runtime, deployment, integration або official-doc anchors.', requirement: 'required' },
      { name: 'knowns/assumptions/unknowns', description: 'Розділені факти, припущення, невідомі питання та owners.', requirement: 'required' },
      { name: 'starting checkpoint', description: 'Revision/environment і відтворюваний baseline.', requirement: 'required' },
      { name: 'stop conditions', description: 'Умови, що блокують analysis або pilot.', requirement: 'required' }
    ],
    whenToUse: 'Перед migration analysis, коли потрібно відділити read-only facts від target assumptions і визначити точку старту.',
    poorChoiceWhen: 'Для загальної карти repository, виконаного migration report або списку dependencies без source-to-target scope.',
    status: 'documented-example', sourceRefs: ['level-28']
  },
  {
    id: 'changelog-research', name: 'CHANGELOG_RESEARCH.md', category: 'Розуміння codebase',
    responsibility: 'Зіставляє зміни у version window з affected code, configuration, runtime та integration surfaces.',
    role: 'Evidence-backed research record для breaking changes, deprecations і behavior changes перед migration pilot.',
    template: "# CHANGELOG_RESEARCH.md\n\n## Version window\n- Source: <version>\n- Target: <version>\n\n## Findings\n| Version | Official section | Change type | Affected area | Impact | Confidence | Next check |\n| --- | --- | --- | --- | --- | --- | --- |\n| <version> | <URL or section> | <breaking/deprecated/behavior/config> | <path or component> | <possible impact> | <confirmed/needs verification/Unknown> | <check> |\n\n## Limits\n- <release or repository fact not verified>\n",
    paths: [{ value: '{project}/CHANGELOG_RESEARCH.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'version window', description: 'Source і target versions та межі changelog search.', requirement: 'required' },
      { name: 'official evidence', description: 'Версія, розділ, URL або repository anchor для finding.', requirement: 'required' },
      { name: 'change and impact', description: 'Тип зміни, affected area та можливий вплив.', requirement: 'required' },
      { name: 'confidence/next check', description: 'Рівень підтвердження і конкретна follow-up перевірка.', requirement: 'required' },
      { name: 'limits', description: 'Недоступні, неоднозначні або неперевірені факти.', requirement: 'required' }
    ],
    whenToUse: 'Коли migration проходить між версіями й потрібно перетворити офіційні release notes на перевірювані repository findings.',
    poorChoiceWhen: 'Для загального release changelog, повного transcript або впевнених висновків без official source і affected-area check.',
    status: 'documented-example', sourceRefs: ['level-28']
  },
  {
    id: 'dependency-graph', name: 'DEPENDENCY_GRAPH.md', category: 'Розуміння codebase',
    responsibility: 'Показує migration-impact nodes, напрямлені звʼязки, target constraints і affected flows.',
    role: 'Карта впливу для визначення порядку compatibility checks та bounded migration slices.',
    template: "# DEPENDENCY_GRAPH.md\n\n## Nodes\n| Node | Source | Target | Type | Evidence |\n| --- | --- | --- | --- | --- |\n| <component> | <source state> | <target state> | <runtime/framework/plugin/integration> | <anchor> |\n\n## Directed edges\n- <producer> -> <consumer>: <contract or version constraint>\n\n## Affected flows\n- <flow>: <entry point, path and side effects>\n\n## Hubs and unknowns\n- High-impact hub: <node and reason>\n- Unknown: <edge or constraint and next check>\n",
    paths: [{ value: '{project}/DEPENDENCY_GRAPH.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'nodes/source-target', description: 'Компоненти graph і їхні source/target states.', requirement: 'required' },
      { name: 'directed edges', description: 'Напрям залежності, contract або version constraint.', requirement: 'required' },
      { name: 'affected flows', description: 'Runtime flows, entry points і side effects під впливом.', requirement: 'required' },
      { name: 'evidence/unknowns', description: 'Anchors, high-impact hubs і непідтверджені edges.', requirement: 'required' }
    ],
    whenToUse: 'Перед migration sequencing, коли version changes можуть зачепити direct/transitive dependencies або integration paths.',
    poorChoiceWhen: 'Для простого списку модулів, повної call graph без migration scope або декоративної схеми без evidence.',
    status: 'documented-example', sourceRefs: ['level-28']
  },
  {
    id: 'compatibility-matrix', name: 'COMPATIBILITY_MATRIX.md', category: 'Розуміння codebase',
    responsibility: 'Фіксує source-to-target compatibility decisions за технічними вимірами та їхніми evidence anchors.',
    role: 'Decision matrix для розділення compatible, blocking, Unknown і requires-verification items.',
    template: "# COMPATIBILITY_MATRIX.md\n\n## Scope\n- Source: <version or platform>\n- Target: <version or platform>\n\n## Decisions\n| Component/edge | API | Config | ABI | Runtime | Data format | Protocol | Operations | Status | Evidence | Owner |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| <item> | <status> | <status> | <status> | <status> | <status> | <status> | <status> | <compatible/blocking/Unknown> | <anchor> | <role> |\n\n## Blocking and unknown items\n- <item> — <next check or hold decision>\n",
    paths: [{ value: '{project}/COMPATIBILITY_MATRIX.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'source/target scope', description: 'Пара станів, для якої приймається compatibility decision.', requirement: 'required' },
      { name: 'technical dimensions', description: 'API, configuration, ABI, runtime, data, protocol і operations.', requirement: 'required' },
      { name: 'status/evidence', description: 'Compatible, blocking, Unknown або requires verification з anchor.', requirement: 'required' },
      { name: 'owner/next action', description: 'Відповідальна роль і перевірка для невизначених items.', requirement: 'required' }
    ],
    whenToUse: 'Коли потрібно прийняти окремі технічні рішення про сумісність, а не звести ризики до одного score.',
    poorChoiceWhen: 'Для загальної risk map, vendor claim без перевірки або compatibility verdict без component-level dimensions.',
    status: 'documented-example', sourceRefs: ['level-28']
  },
  {
    id: 'migration-plan', name: 'MIGRATION_PLAN.md', category: 'Постановка задачі',
    responsibility: 'Розкладає migration на bounded phases із evidence gates, owners, rollback і exit criteria.',
    role: 'Execution contract для переходу від source до target без неявного production або completion claim.',
    template: "# MIGRATION_PLAN.md\n\n## Outcome and boundaries\n- Source: <current state>\n- Target: <target state>\n- Scope: <bounded slice>\n- Non-goals: <excluded changes>\n\n## Phases\n| Phase | Scope | Owner | Evidence gate | Exit criteria | Rollback/HOLD |\n| --- | --- | --- | --- | --- | --- |\n| Discovery | <facts and unknowns> | <role> | <anchor> | <result> | <hold action> |\n| Analysis | <compatibility work> | <role> | <anchor> | <result> | <narrow action> |\n| Pilot | <small slice> | <role> | <behavior check> | <result> | <rollback> |\n\n## GO / HOLD decision\n- Decision: <GO | HOLD | NARROW | ROLLBACK>\n- Evidence: <facts>\n- Open risks: <items>\n",
    paths: [{ value: '{project}/MIGRATION_PLAN.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'outcome/scope/non-goals', description: 'Source, target, bounded slice та виключена робота.', requirement: 'required' },
      { name: 'phases/owners', description: 'Discovery, analysis, pilot та наступні фази з ownership.', requirement: 'required' },
      { name: 'evidence gates/exit criteria', description: 'Перевірки переходу і спостережувані умови завершення.', requirement: 'required' },
      { name: 'rollback/hold decision', description: 'Практична дія повернення, HOLD або звуження scope.', requirement: 'required' },
      { name: 'open risks', description: 'Невирішені compatibility, behavior або operational risks.', requirement: 'required' }
    ],
    whenToUse: 'Після discovery та compatibility analysis, коли потрібна керована послідовність pilot, verification, expand або retirement.',
    poorChoiceWhen: 'Для modernization roadmap без source/target transition, календаря без evidence gates або твердження про виконаний rollout.',
    status: 'documented-example', sourceRefs: ['level-28']
  },
  {
    id: 'migration-types', name: 'MIGRATION_TYPES.md', category: 'Постановка задач',
    responsibility: 'Класифікує склад migration initiative за типами роботи, coupling, evidence gates і owners.',
    role: 'Decision map для розділення code/dependency, schema/data, configuration, infrastructure/platform та operational changes.',
    template: "# MIGRATION_TYPES.md\n\n## Scope\n- Source state: <current state>\n- Target state: <target state>\n- Boundary: <bounded initiative or pilot>\n\n## Classification\n| Work item | Type | Source -> target | Coupled with | Evidence gate | Owner | Status |\n| --- | --- | --- | --- | --- | --- | --- |\n| <item> | <code/dependency\\|schema/data\\|configuration\\|infrastructure/platform\\|operational> | <states> | <dependencies> | <check> | <role> | <Unknown/HOLD/ready> |\n\n## Ordering and stop conditions\n- <dependency or blocking unknown>\n- <condition that stops the pilot>\n",
    paths: [{ value: '{project}/MIGRATION_TYPES.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'scope/source-target', description: 'Межі ініціативи та source/target states.', requirement: 'required' },
      { name: 'classification', description: 'Категорія роботи, affected surface і coupling.', requirement: 'required' },
      { name: 'evidence/owner/status', description: 'Evidence gate, відповідальна роль і поточний статус.', requirement: 'required' },
      { name: 'ordering/stop conditions', description: 'Залежності, порядок і блокуючі умови.', requirement: 'required' }
    ],
    whenToUse: 'На старті migration execution, коли одна ініціатива поєднує code, data, config, platform або operational changes.',
    poorChoiceWhen: 'Для простого dependency list, implementation checklist без source/target або verdict про виконану міграцію.',
    status: 'documented-example', sourceRefs: ['level-29']
  },
  {
    id: 'data-config-migration', name: 'DATA_CONFIG_MIGRATION.md', category: 'Постановка задачі',
    responsibility: 'Описує data і configuration migration окремо: inventory, compatibility window, sequencing, validation і recovery.',
    role: 'Risk-aware execution record для stateful змін, які не скасовуються простим code rollback.',
    template: "# DATA_CONFIG_MIGRATION.md\n\n## Scope and representations\n- Data source -> target: <format/schema/state>\n- Configuration source -> target: <keys/defaults/environments>\n- Compatibility window: <coexistence period or Unknown>\n\n## Plan\n| Surface | Inventory | Sequence | Validation | Recovery | Owner | Status |\n| --- | --- | --- | --- | --- | --- | --- |\n| <schema/records/config/secrets references> | <items> | <ordered action> | <check> | <backout/forward-fix> | <role> | <Unknown/HOLD/ready> |\n\n## Safety boundaries\n- Never store secret values in this document.\n- <irreversible action and explicit approval/stop condition>\n",
    paths: [{ value: '{project}/DATA_CONFIG_MIGRATION.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'representations/inventory', description: 'Source/target data and configuration representations та inventory.', requirement: 'required' },
      { name: 'compatibility/sequence', description: 'Compatibility window і порядок expand, migrate, switch, contract.', requirement: 'required' },
      { name: 'validation', description: 'Integrity, counts, startup і representative behavior checks.', requirement: 'required' },
      { name: 'recovery/owner/status', description: 'Backout або forward-fix, owner і рішення за статусом.', requirement: 'required' },
      { name: 'secret boundary', description: 'Правило не зберігати secret values у документах і evidence.', requirement: 'required' }
    ],
    whenToUse: 'Перед data або configuration pilot, коли state, schema, defaults, flags чи references можуть пережити code rollback.',
    poorChoiceWhen: 'Для загального migration roadmap без stateful surfaces, зберігання секретів або непідтвердженого backfill report.',
    status: 'documented-example', sourceRefs: ['level-29']
  },
  {
    id: 'rollback', name: 'ROLLBACK.md', category: 'Виконання і якість',
    responsibility: 'Фіксує recovery procedure для code, configuration, data/schema і traffic змін до початку migration pilot.',
    role: 'Операційна карта trigger, checkpoint, owner, послідовності відновлення та post-rollback verification.',
    template: "# ROLLBACK.md\n\n## Boundary\n- Scope: <bounded pilot>\n- Checkpoint: <source revision/config/state checkpoint>\n- Trigger: <observable threshold or blocking discrepancy>\n- Owner: <role>\n\n## Ordered recovery\n1. <route traffic or stop the affected slice>\n2. <restore code or artifact>\n3. <restore compatible configuration>\n4. <backout data/schema or choose forward-fix>\n5. <verify representative behavior and invariants>\n\n## Decision\n- State recovery: <verified/Unknown>\n- Decision: <GO | HOLD | ROLLBACK>\n- Never store secret values here.\n- Status: documented example; no recovery was executed.\n",
    paths: [{ value: '{project}/ROLLBACK.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'scope/checkpoint/trigger', description: 'Bounded surface, recoverable checkpoint і observable trigger.', requirement: 'required' },
      { name: 'owner/escalation', description: 'Відповідальна роль і шлях ескалації рішення.', requirement: 'required' },
      { name: 'ordered recovery', description: 'Порядок code, config, data/schema і traffic actions.', requirement: 'required' },
      { name: 'backout/forward-fix boundary', description: 'Межа між backout та forward-fix для stateful або irreversible змін.', requirement: 'required' },
      { name: 'post-rollback verification', description: 'Перевірка behavior, integrity і operational invariants після recovery.', requirement: 'required' }
    ],
    whenToUse: 'До migration pilot або stateful change, коли code rollback сам по собі не повертає всі surfaces у безпечний стан.',
    poorChoiceWhen: 'Для загального incident postmortem, неперевіреного production recovery claim або плану без trigger і checkpoint.',
    status: 'documented-example', sourceRefs: ['level-29']
  },
  {
    id: 'migration-validation-report', name: 'MIGRATION_VALIDATION_REPORT.md', category: 'Докази й доставка',
    responsibility: 'Структурує порівняння source і target та окремі validation signals для migration decision.',
    role: 'Evidence record для parity, integrity, configuration, startup, representative cases, discrepancies і GO/HOLD рішення.',
    template: "# MIGRATION_VALIDATION_REPORT.md\n\n## Scope and baseline\n- Source revision: <revision>\n- Target revision: <revision>\n- Pilot slice: <bounded surface>\n\n## Checks\n| Dimension | Expected | Observed | Evidence anchor | Status |\n| --- | --- | --- | --- | --- |\n| behavior inputs/outputs/errors/side effects | <contract> | <observation> | <test/log/fixture> | <pass/fail/Unknown> |\n| data integrity and counts | <invariant> | <observation> | <command/result> | <pass/fail/Unknown> |\n| configuration and startup | <expected mapping> | <observation> | <check> | <pass/fail/Unknown> |\n\n## Decision\n- Discrepancies: <none or described>\n- Decision: <GO | HOLD | NARROW | ROLLBACK>\n- Confidence and limits: <what remains Unknown>\n- Status: documented example; no migration validation was executed.\n",
    paths: [{ value: '{project}/MIGRATION_VALIDATION_REPORT.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'baseline/scope', description: 'Source and target revisions, pilot boundary та environment assumptions.', requirement: 'required' },
      { name: 'validation dimensions', description: 'Behavior parity, integrity, configuration, startup і representative cases.', requirement: 'required' },
      { name: 'expected/observed/evidence', description: 'Очікування, observations і traceable evidence anchors.', requirement: 'required' },
      { name: 'discrepancy/decision', description: 'Невідповідності, confidence і GO, HOLD, NARROW або ROLLBACK decision.', requirement: 'required' },
      { name: 'limits/owner', description: 'Неперевірені межі, відповідальна роль і наступна дія.', requirement: 'required' }
    ],
    whenToUse: 'Під час pilot verification і перед switch, коли потрібно розділити parity evidence, integrity checks та невідомі результати.',
    poorChoiceWhen: 'Для загального test report без source/target comparison, claim про сумісність без evidence або журналу production incidents.',
    status: 'documented-example', sourceRefs: ['level-29']
  },
  {
    id: 'post-migration-notes', name: 'POST_MIGRATION_NOTES.md', category: 'Докази й доставка',
    responsibility: 'Збирає post-switch observations, residual risks, follow-up actions і handoff після migration decision point.',
    role: 'Delivery note, що відділяє спостережені signals від очікувань і не підміняє validation report або incident record.',
    template: "# POST_MIGRATION_NOTES.md\n\n## Scope and decision\n- Migration slice/checkpoint: <bounded surface>\n- Switch decision: <GO | HOLD | NARROW | ROLLBACK>\n- Observation window: <window or Unknown>\n\n## Observations\n| Signal | Expected | Observed | Evidence | Status |\n| --- | --- | --- | --- | --- |\n| representative behavior | <contract> | <observation> | <anchor> | <pass/fail/Unknown> |\n| data/configuration state | <invariant> | <observation> | <anchor> | <pass/fail/Unknown> |\n| operational signal | <threshold> | <observation> | <anchor> | <pass/fail/Unknown> |\n\n## Follow-up and handoff\n- Residual risk: <risk or Unknown>\n- Next action: <bounded action>\n- Owner: <role>\n- Lessons learned: <observation>\n- Never store secret values here.\n- Status: documented example; no post-migration outcome is claimed.\n",
    paths: [{ value: '{project}/POST_MIGRATION_NOTES.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'scope/checkpoint/decision', description: 'Migration slice, checkpoint, switch decision і observation boundary.', requirement: 'required' },
      { name: 'expected/observed signals', description: 'Порівняння очікуваних і фактичних behavior, data/config та operational signals.', requirement: 'required' },
      { name: 'evidence/discrepancies', description: 'Evidence anchors, discrepancies і confidence limits.', requirement: 'required' },
      { name: 'residual risks/follow-up', description: 'Невирішені ризики, наступні дії та відповідальні ролі.', requirement: 'required' },
      { name: 'handoff/lessons', description: 'Handoff context і lessons learned без secret values.', requirement: 'required' }
    ],
    whenToUse: 'Після контрольованого switch або decision checkpoint, коли потрібен handoff запис спостережень і залишкових ризиків.',
    poorChoiceWhen: 'Для планування до pilot, заміни validation evidence, incident postmortem або твердження про production readiness.',
    status: 'documented-example', sourceRefs: ['level-29']
  },
  {
    id: 'value-proposition', name: 'VALUE_PROPOSITION.md', category: 'Постановка задач',
    responsibility: 'Звʼязує конкретного користувача та його проблему з обіцяним outcome, альтернативою і планом перевірки.',
    role: 'Короткий contract для відділення ціннісної гіпотези від slogan або непідтвердженого product claim.',
    template: "# VALUE_PROPOSITION.md\n\n## User and problem\n- User: <primary user>\n- Problem: <recurring loss or friction>\n\n## Promise\n- Alternative: <how the user solves it today>\n- Outcome: <observable improvement>\n- Differentiation: <why this approach may help>\n\n## Proof boundary\n- Signal: <metric or observation>\n- Assumptions: <assumptions to validate>\n- Status: documented example; user validation is Unknown.\n",
    paths: [{ value: '{project}/VALUE_PROPOSITION.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'user/problem', description: 'Primary user і конкретна recurring problem.', requirement: 'required' },
      { name: 'alternative/outcome', description: 'Поточна альтернатива і очікуваний observable outcome.', requirement: 'required' },
      { name: 'differentiation', description: 'Чому запропонований підхід може бути корисним.', requirement: 'required' },
      { name: 'proof signal', description: 'Метрика або observation, що може підтвердити чи спростувати promise.', requirement: 'required' },
      { name: 'assumptions/status', description: 'Неперевірені припущення та межа claims.', requirement: 'required' }
    ],
    whenToUse: 'На старті capstone або MVP, коли потрібно узгодити користувача, проблему, promise і спосіб перевірки.',
    poorChoiceWhen: 'Для повного project specification, детального research transcript або claim про підтверджений market fit.',
    status: 'documented-example', sourceRefs: ['level-30']
  },
  {
    id: 'user-jtbd', name: 'USER_JTBD.md', category: 'Постановка задач',
    responsibility: 'Описує конкретну ситуацію користувача, job, trigger, бажаний progress, pains, gains і constraints.',
    role: 'Структурований user hypothesis, який допомагає повʼязати MVP flow із реальною роботою користувача.',
    template: "# USER_JTBD.md\n\n## Situation\n- User: <specific role>\n- Trigger/context: <when this job appears>\n\n## Job\n- When <situation>, I want to <job>, so I can <desired outcome>.\n\n## Constraints\n- Pains: <friction>\n- Gains: <desired progress>\n- Constraints: <time, access, policy or quality limits>\n\n## Validation boundary\n- Assumptions: <what still needs research>\n- Status: documented example; observed user behavior is Unknown.\n",
    paths: [{ value: '{project}/USER_JTBD.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'user/context', description: 'Конкретний user role, trigger і ситуація.', requirement: 'required' },
      { name: 'job/outcome', description: 'Job to be done і бажаний progress.', requirement: 'required' },
      { name: 'pains/gains', description: 'Перешкоди та очікувані вигоди.', requirement: 'required' },
      { name: 'constraints', description: 'Обмеження часу, доступу, policy або quality.', requirement: 'required' },
      { name: 'assumptions', description: 'Гіпотези, які ще потребують user validation.', requirement: 'required' }
    ],
    whenToUse: 'Коли MVP потрібно привʼязати до конкретної користувацької ситуації, а не до абстрактної persona.',
    poorChoiceWhen: 'Для повної customer research бази, analytics report або довільного списку user features.',
    status: 'documented-example', sourceRefs: ['level-30']
  },
  {
    id: 'success-metric', name: 'SUCCESS_METRIC.md', category: 'Постановка задач',
    responsibility: 'Фіксує metric definition, baseline, target, observation window, method і guardrails для MVP outcome.',
    role: 'Робить success claim вимірюваною гіпотезою з явними межами інтерпретації.',
    template: "# SUCCESS_METRIC.md\n\n## Metric\n- Name: <metric name and unit>\n- Definition: <what counts and what does not>\n- Baseline: <known baseline or Unknown>\n- Target: <bounded target>\n- Window: <observation period>\n\n## Method and guardrails\n- Collection: <how the signal would be observed>\n- Leading signal: <flow completion or quality signal>\n- Guardrail: <quality, safety or rework constraint>\n- Limits: <what this metric cannot prove>\n- Status: documented example; no measured outcome is claimed.\n",
    paths: [{ value: '{project}/SUCCESS_METRIC.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'definition/unit', description: 'Назва метрики, одиниця та точне правило підрахунку.', requirement: 'required' },
      { name: 'baseline/target/window', description: 'Baseline, bounded target і observation window.', requirement: 'required' },
      { name: 'collection method', description: 'Як і з якого evidence джерела збирається сигнал.', requirement: 'required' },
      { name: 'guardrail', description: 'Обмеження якості, безпеки або rework.', requirement: 'required' },
      { name: 'interpretation limits', description: 'Що метрика не може довести сама по собі.', requirement: 'required' }
    ],
    whenToUse: 'Перед MVP demo, коли потрібно узгодити success signal і спосіб його чесного спостереження.',
    poorChoiceWhen: 'Для vanity dashboard, вигаданого customer result або заміни повного evidence record.',
    status: 'documented-example', sourceRefs: ['level-30']
  },
  {
    id: 'release-slice', name: 'RELEASE_SLICE.md', category: 'Постановка задач',
    responsibility: 'Обмежує перший MVP release slice через in-scope, non-goals, dependencies, risks і release criteria.',
    role: 'Scope-freeze record для одного завершеного core flow, який можна перевірити й передати reviewer-у.',
    template: "# RELEASE_SLICE.md\n\n## Core flow\n- User: <primary user>\n- Trigger: <starting situation>\n- Flow: <bounded steps>\n- Outcome: <observable result>\n\n## Boundaries\n- In scope: <included capabilities>\n- Non-goals: <explicit exclusions>\n- Deferred: <safe follow-up work>\n\n## Gates\n- Dependencies: <known dependencies>\n- Risks: <risk and stop condition>\n- Release criteria: <reviewable conditions>\n- Status: documented example; no release or deployment is claimed.\n",
    paths: [{ value: '{project}/RELEASE_SLICE.md', scope: 'repository', status: 'documented-example' }],
    fields: [
      { name: 'core flow', description: 'Один user, trigger, bounded flow і expected outcome.', requirement: 'required' },
      { name: 'in-scope/non-goals', description: 'Included capabilities і явні exclusions.', requirement: 'required' },
      { name: 'deferred work', description: 'Відкладені елементи, які не потрібні першому slice.', requirement: 'optional' },
      { name: 'dependencies/risks', description: 'Залежності, risks і stop conditions.', requirement: 'required' },
      { name: 'release criteria', description: 'Умови review, verification і переходу до рішення.', requirement: 'required' }
    ],
    whenToUse: 'Коли MVP потрібно заморозити на одному core flow перед реалізацією або demo.',
    poorChoiceWhen: 'Для повного roadmap, необмеженого backlog або твердження про фактичний production release.',
    status: 'documented-example', sourceRefs: ['level-30']
  },
];

export type ArtifactQuickJumpGroup = {
  label: string;
  description: string;
  artifactIds: string[];
};

export const artifactQuickJumpGroups: ArtifactQuickJumpGroup[] = [
  {
    label: 'Орієнтуватися в проєкті',
    description: 'Перші документи для розуміння проєкту, контексту та codebase.',
    artifactIds: ['readme', 'claude-md', 'claude-local-md', 'codebase-inventory', 'api-map', 'research-digest', 'clawd-wisdom']
  },
  {
    label: 'Визначити й спланувати',
    description: 'Артефакти, які перетворюють ідею на межі, контракт і послідовність роботи.',
    artifactIds: ['task-spec', 'spec', 'capstone-brief', 'backlog-roadmap', 'contract-md', 'plan-md', 'value-proposition', 'user-jtbd', 'success-metric', 'release-slice']
  },
  {
    label: 'Налаштувати й розширити workflow',
    description: 'Configuration, policy, skills та integrations для контрольованого workflow.',
    artifactIds: ['settings-json', 'settings-local-json', 'claude-rules', 'ai-coding-policy', 'codeowners', 'skill-md', 'subagent', 'hook-config', 'mcp-config', 'plugin']
  },
  {
    label: 'Виконати й контролювати',
    description: 'Операційні артефакти для запуску, ізоляції та контролю виконання.',
    artifactIds: ['git-review-artifacts', 'commands-md', 'workflow-md', 'clawd-yolo', 'clawd-runner', 'run-status-yaml', 'locales-json', 'locale-bundle']
  },
  {
    label: 'Перевірити, передати й доставити',
    description: 'Evidence, review, handoff і delivery records для завершення роботи.',
    artifactIds: ['evidence', 'handoff-note', 'handoff-review', 'review-notes', 'diagnosis-json', 'pr-description', 'commit-message', 'changelog', 'postmortem', 'runbook-md']
  },
  {
    label: 'Дослідити legacy й ризики',
    description: 'Артефакти для опису поточної поведінки, technical debt і ризиків змін.',
    artifactIds: ['debt-signals', 'risk-map', 'architecture-current', 'behavior-inventory', 'critical-flows', 'module-inventory']
  },
  {
    label: 'Модернізувати legacy без big-bang rewrite',
    description: 'Артефакти для baseline, seams, incremental slices, strangler rollout і roadmap.',
    artifactIds: ['modernization-baseline', 'characterization-tests', 'refactoring-plan', 'seam-map', 'strangler-slice', 'modernization-roadmap', 'modernization-anti-patterns']
  },
  {
    label: 'Планувати міграцію й сумісність',
    description: 'Source-to-target analysis, changelog evidence, compatibility decisions і пофазна delivery-послідовність.',
    artifactIds: ['migration-discovery', 'changelog-research', 'dependency-graph', 'compatibility-matrix', 'migration-plan', 'migration-types', 'data-config-migration', 'rollback', 'migration-validation-report', 'post-migration-notes']
  }
];

export const artifactCategories = [...new Set(artifacts.map((artifact) => artifact.category))];

export const getArtifactCategoryAnchor = (category: string) => category.toLowerCase().replaceAll(' ', '-');
