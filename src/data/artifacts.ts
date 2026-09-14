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
    status: 'present', sourceRefs: ['level-02', 'CLAUDE.md']
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
    paths: [{ value: '{project}/TASK_SPEC.md', scope: 'repository', status: 'present' }],
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
    status: 'present', sourceRefs: ['level-03', 'level-25', 'TASK_SPEC.md']
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
    status: 'variant', aliases: ['docs/SPEC.md'], sourceRefs: ['level-25', 'EVIDENCE.md']
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
    status: 'variant', aliases: ['EVIDENCE_LOG.md', 'docs/EVIDENCE.md'], versionNote: 'У навчальних матеріалах назва EVIDENCE_LOG.md використовується як legacy/concept variant; canonical filename треба узгодити.', sourceRefs: ['level-04', 'level-18', 'level-25', 'EVIDENCE.md']
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
    status: 'documented-example', versionNote: 'Поля з прикладу TASK_SPEC є project convention; точний frontmatter залежить від актуальної версії Claude Code.', sourceRefs: ['level-09', 'TASK_SPEC.md']
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
    status: 'present', sourceRefs: ['README.md']
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
    status: 'documented-example', sourceRefs: ['level-01', 'level-10', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-08', 'level-16', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-15', 'level-23', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-21', 'level-22', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-04', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-04', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-06', 'level-16', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-03', 'level-15', 'level-16', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-03', 'level-15', 'level-18', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-14', 'level-16', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-08', 'level-13', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-16', 'level-21', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-18', 'level-21', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-23', 'level-24', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-23', 'level-24', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-21', 'level-24', 'TASK_SPEC4.md']
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
    status: 'documented-example', sourceRefs: ['level-18', 'level-22', 'level-24', 'TASK_SPEC4.md']
  },
];

export const artifactCategories = [...new Set(artifacts.map((artifact) => artifact.category))];
