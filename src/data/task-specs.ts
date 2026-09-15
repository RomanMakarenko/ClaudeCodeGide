import type { TaskSpec } from '../types/task-spec';

const artifactExample = (artifactId: string, content: string) => ({ artifactId, content });

export const taskSpecs: TaskSpec[] = [
  {
    id: 'setup-baseline', type: 'environment-setup', family: 'foundations', title: 'Підготувати середовище й baseline', mode: 'general',
    goal: 'Перевірити, що Claude Code запускається в правильному repository із зрозумілими командами, налаштуваннями та безпечним стартовим станом.',
    scope: ['Встановлення, авторизація та версія CLI.', 'README, scripts і проєктні settings.', 'Git status і перша контрольна точка.'],
    nonGoals: ['Редагування application code.', 'Зміна permissions заради швидкого обходу проблем.', 'Публікація секретів або виконання незворотних дій.'],
    success: ['Repository і поточний стан підтверджені.', 'Команди запуску й перевірки знайдені в repo.', 'Невідомі частини позначені Unknown.'],
    rules: ['Почати з read-only огляду та `git status`.', 'Не зберігати credentials у файлах або prompt.', 'Зупинитися, якщо відкрито не той repository.'],
    artifactIds: ['settings-json', 'readme', 'git-review-artifacts'],
    artifactExamples: [artifactExample('settings-json', `{
  "permissions": { "defaultMode": "ask" },
  "source": "documented example",
  "secrets": "never stored here"
}`)],
    sourceLessonIds: ['l1-03', 'l2-01', 'l5-02'],
    note: 'Навчальний documented example; фактичний CLI, repository і settings не перевірялися.'
  },
  {
    id: 'feature', type: 'feature', family: 'foundations', title: 'Додати нову функціональність', mode: 'general',
    goal: 'Перетворити потребу користувача на малу наскрізну зміну з явним desired behavior і перевірюваним acceptance.',
    scope: ['Один user flow і його точки входу.', 'Потрібні UI/API/domain зміни та тести.', 'Документований public contract.'],
    nonGoals: ['Непроханий redesign.', 'Загальний cleanup сусідніх модулів.', 'Зміна бізнес-правил поза вимогою.'],
    success: ['Нова поведінка описана спостережувано.', 'Existing scenarios не погіршилися.', 'Acceptance і verification привʼязані до diff.'],
    rules: ['Розділяти Goal, Scope і Constraints.', 'Не вважати названий у тикеті файл доведеною точкою зміни.', 'Погодити plan до редагування.'],
    artifactIds: ['task-spec', 'contract-md'],
    artifactExamples: [artifactExample('task-spec', `# TASK_SPEC.md
Goal: оператор може додати необов'язкову нотатку до refund.
Scope: форма, endpoint, storage contract і targeted tests.
Non-goals: payment rules, approval flow, unrelated UI.
Verification: note зберігається та повертається в деталях.
Status: documented example; execution result: Unknown.`)],
    sourceLessonIds: ['l3-01', 'l3-03'],
    note: 'Приклад постановки нової функції, а не доказ зміни конкретної системи.'
  },
  {
    id: 'bugfix', type: 'bugfix', family: 'delivery', title: 'Закрити bugfix через regression evidence', mode: 'general',
    goal: 'Відтворити дефект, підтвердити причину, внести найменший фікс і залишити evidence для review.',
    scope: ['Один failure path.', 'Regression test і суміжний позитивний сценарій.', 'Опис diff, перевірок і залишкових ризиків.'],
    nonGoals: ['Переписування всієї error architecture.', 'Feature work під час bugfix.', 'Вигадані результати тестів.'],
    success: ['Дефект відтворюється до фіксу.', 'Regression test захищає виправлений сценарій.', 'Формат зовнішнього контракту змінюється лише за погодженням.'],
    rules: ['Спочатку facts-first diagnosis, потім edit.', 'Після кожної правки перевірити diff.', 'Unknown причина не є дозволом на широкий patch.'],
    artifactIds: ['diagnosis-json', 'pr-description', 'review-notes'],
    artifactExamples: [artifactExample('diagnosis-json', `{
  "symptom": "empty items[] returns server error",
  "evidence": ["request fixture", "service trace"],
  "hypothesis": "total calculation reads absent first item",
  "confidence": "needs verification",
  "nextAction": "add regression case before editing",
  "status": "documented example"
}`)],
    sourceLessonIds: ['l18-02', 'l18-03', 'l18-04'],
    sourceLabIds: ['l18-04-bugfix-evidence'],
    note: 'Документований workflow example; жоден реальний bugfix або test run не заявляється.'
  },
  {
    id: 'refactoring', type: 'refactoring', family: 'delivery', title: 'Виконати behavior-preserving refactoring', mode: 'general',
    goal: 'Змінити внутрішню структуру коду, зберігши observable behavior, public API, side effects та інваріанти.',
    scope: ['Одна structural change.', 'Залежні focused tests і diff review.', 'Явна точка rollback.'],
    nonGoals: ['Нові features або bugfix.', 'Dependency/framework upgrade.', 'Зміна форматів даних чи контрактів.'],
    success: ['Diff має одну structural мету.', 'Characterization і targeted checks не показують непогоджених змін.', 'Rollback point зафіксований.'],
    rules: ['Не починати з редагування.', 'Працювати одним reviewable slice.', 'Зупинитися при зміні public behavior.'],
    artifactIds: ['refactoring-plan', 'plan-md', 'review-notes'],
    artifactExamples: [artifactExample('refactoring-plan', `# REFACTORING_PLAN.md
Goal: виділити округлення рахунку в одну internal responsibility.
Allowed files: BillingService і focused tests.
Preserve: signature, totals, error codes, side effects.
Steps: inspect callers; extract smallest function; run checks; review diff.
Stop: output or scope changes. Rollback: baseline checkpoint.
Status: documented example.`)],
    sourceLessonIds: ['l20-03', 'l20-04'],
    sourceLabIds: ['l20-02-characterization'],
    note: 'Навчальний план refactoring; він не описує фактично змінений модуль.'
  },
  {
    id: 'characterization', type: 'characterization', family: 'delivery', title: 'Зафіксувати фактичну поведінку', mode: 'general',
    goal: 'Створити safety net для вузького flow до рефакторингу, описавши фактичні inputs, outputs, помилки та side effects.',
    scope: ['Один bounded flow.', 'Representative і edge-case inputs.', 'Запис спостережень і невідомих.'],
    nonGoals: ['Виправлення дивної поведінки.', 'Підміна current behavior бажаним дизайном.', 'Широке тестове переписування.'],
    success: ['Тест або запис відтворює current behavior.', 'Несподівані результати явно позначені.', 'Є рішення, що саме захищати перед зміною.'],
    rules: ['Фіксувати факт, а не припущену причину.', 'Не змінювати implementation під час baseline.', 'Усе неперевірене маркувати Unknown.'],
    artifactIds: ['characterization-tests', 'behavior-inventory'],
    artifactExamples: [artifactExample('characterization-tests', `# CHARACTERIZATION_TESTS.md
Flow: BillingService.calculateInvoice
Case: valid line items -> existing total
Case: invalid line item -> existing validation error
Case: rounding boundary -> record observed value
Side effects: Unknown; inspect logs and collaborators.
Purpose: protect current behavior before structural change.
Status: documented example; tests not executed.`)],
    sourceLessonIds: ['l20-03', 'l27-01'],
    note: 'Приклад safety net із навмисним Unknown; він не є результатом виконаних тестів.'
  },
  {
    id: 'tests', type: 'tests', family: 'delivery', title: 'Спроєктувати risk-based тести', mode: 'general',
    goal: 'Обрати рівень і набір тестів за ризиком, а не генерувати assertions без звʼязку з контрактом.',
    scope: ['Критичні правила й boundary cases.', 'Unit, integration, API або E2E level за потребою.', 'Fail conditions і representative data.'],
    nonGoals: ['Максимальне покриття заради метрики.', 'Крихкі E2E для кожної гілки.', 'Зміна production code без окремої задачі.'],
    success: ['Кожен важливий ризик має перевірку.', 'Assertions описують observable result.', 'Test data не містить секретів або PII.'],
    rules: ['Спочатку сформулювати acceptance.', 'Не довіряти тесту, який не перевіряє потрібну поведінку.', 'Результат запуску без виконання позначати Unknown.'],
    artifactIds: ['contract-md', 'evidence', 'review-notes'],
    artifactExamples: [artifactExample('contract-md', `# CONTRACT.md
Scenario: empty refund reason
Given: form is open and reason is blank
When: operator submits
Then: request is not sent and a field error is visible
Compatibility: POST /api/orders/{id}/refund remains unchanged.
Status: documented contract; execution: Unknown.`)],
    sourceLessonIds: ['l19-01', 'l19-02', 'l19-03', 'l19-05'],
    note: 'Це documented example test contract, а не звіт про pass/fail конкретного test suite.'
  },
  {
    id: 'documentation', type: 'documentation', family: 'delivery', title: 'Синхронізувати документацію з кодом', mode: 'general',
    goal: 'Перетворити підтверджені факти про систему на коротку документацію для конкретного читача без вигаданих деталей.',
    scope: ['Один документ або section.', 'Фактичні commands, paths і contracts.', 'Diff review і практична перевірка прикладів.'],
    nonGoals: ['Переписування всієї документації.', 'Додавання неперевірених promises.', 'Публікація secrets, PII або внутрішніх токенів.'],
    success: ['Кожне важливе твердження має source.', 'Приклад відповідає фактичній поведінці або маркований Unknown.', 'Зміни reviewable.'],
    rules: ['Читач і мета документа мають бути визначені.', 'Перевіряти docs через code/config/tests.', 'Не називати illustrative snippet production evidence.'],
    artifactIds: ['readme', 'research-digest'],
    artifactExamples: [artifactExample('research-digest', `# research-digest.md
Audience: developer joining the repository
Confirmed: start command is <repo script — verify>
Confirmed: tests live at <path — verify>
Unknown: deployment environment and production permissions
Sources: <file paths and commands>
Status: documented example; no live inspection recorded.`)],
    sourceLessonIds: ['l8-04', 'l8-05', 'l22-02'],
    note: 'Документаційний example не підміняє актуальну документацію конкретного проєкту.'
  },
  {
    id: 'acceptance-verification', type: 'acceptance-verification', family: 'foundations', title: 'Оформити acceptance і verification plan', mode: 'general',
    goal: 'Зробити умови готовності задачі спостережуваними, вимірюваними та придатними для незалежної перевірки.',
    scope: ['Functional і negative scenarios.', 'Compatibility та UI/API signals.', 'Команди, очікувані результати й fail conditions.'],
    nonGoals: ['Навʼязування конкретної бібліотеки.', 'Розмитий критерій «зробити краще».', 'Автоматичне рішення про merge.'],
    success: ['Кожен criterion має signal і спосіб перевірки.', 'Є поведінка, яку потрібно зберегти.', 'DoD містить scope, diff, tests і review.'],
    rules: ['Виводити критерії з фактів.', 'Розділяти acceptance від implementation plan.', 'Невиконану перевірку маркувати Unknown.'],
    artifactIds: ['task-spec', 'evidence'],
    artifactExamples: [artifactExample('evidence', `# EVIDENCE.md
Criterion: empty-cart request is handled predictably
Signal: one response with agreed error body
Check: <targeted API test — command to verify>
Fail: server error or changed valid-order response
Status: planned documented example; result: Unknown.`)],
    sourceLessonIds: ['l4-02', 'l4-03', 'l4-04'],
    note: 'План перевірки заповнений як приклад; команди й результати потребують конкретного repository.'
  },
  {
    id: 'investigation-diagnosis', type: 'investigation-diagnosis', family: 'discovery', title: 'Провести evidence-based investigation', mode: 'general',
    goal: 'Відокремити симптом від гіпотези, простежити flow і повернути доказовий висновок або наступну перевірку.',
    scope: ['Один failure або runtime flow.', 'Код, tests, config, logs і reproduction steps.', 'Confidence, unknowns і next action.'],
    nonGoals: ['Редагування коду під час discovery.', 'Причина лише за назвою файла.', 'Довгий transcript замість стислого висновку.'],
    success: ['Кожен висновок має evidence anchor.', 'Hypothesis не видається за fact.', 'Небезпечна дія не запускається автоматично.'],
    rules: ['Працювати read-only до окремого approval.', 'Очищати logs від secrets і PII.', 'Неповний evidence означає Unknown.'],
    artifactIds: ['diagnosis-json', 'research-digest'],
    artifactExamples: [artifactExample('diagnosis-json', `{
  "symptom": "page becomes empty after invalid login",
  "evidence": ["reproduction steps", "<log path>"],
  "hypothesis": "error mapping drops the response",
  "confidence": "Unknown",
  "nextAction": "inspect handler and related test",
  "mode": "read-only documented example"
}`)],
    sourceLessonIds: ['l7-02', 'l8-02', 'l17-03', 'l18-02'],
    sourceLabIds: ['l8-02-diagnosis-packet'],
    note: 'Приклад diagnosis packet не підтверджує реальну root cause.'
  },
  {
    id: 'codebase-discovery', type: 'codebase-discovery', family: 'discovery', title: 'Побудувати карту codebase', mode: 'general',
    goal: 'Створити компактну evidence-backed карту стеку, модулів, entry points, runtime flows, залежностей і unknowns.',
    scope: ['Top-level structure і manifests.', 'Ключові модулі, тести та commands.', 'Один dependency або runtime slice.'],
    nonGoals: ['Читання всього repository підряд.', 'Рефакторинг знайдених проблем.', 'Висновки лише з назв каталогів.'],
    success: ['Наступний інженер знає, де шукати логіку.', 'Карта містить sources і confidence.', 'Open questions не маскуються під facts.'],
    rules: ['Проводити окремою read-only сесією.', 'Фіксувати факти й припущення окремо.', 'Не вносити зміни під час mapping.'],
    artifactIds: ['codebase-inventory', 'module-inventory'],
    artifactExamples: [artifactExample('codebase-inventory', `# CODEBASE_INVENTORY.md
## Stack
- Language/framework: <inspect manifests>
## Entry points
- HTTP: <path — verify>
- Jobs: Unknown
## Commands
- Test: <repository script — verify>
## Risk zones
- auth, payments, migrations: inspect before edit
## Open questions
- ownership and runtime deployment: Unknown
Status: documented example.`)],
    sourceLessonIds: ['l7-01', 'l7-03', 'l7-04', 'l7-05', 'l26-03'],
    note: 'Inventory є reusable прикладом структури, не інвентаризацією цього repository.'
  },
  {
    id: 'issue-intake-planning', type: 'issue-intake', family: 'foundations', title: 'Перетворити issue на керовану постановку', mode: 'general',
    goal: 'Відділити в сирому issue проблему, вплив, докази, вимоги, припущення, межі та відкриті питання.',
    scope: ['Issue text, comments, labels і attachments.', 'Read-only investigation handoff.', 'Non-goals, risks і next step.'],
    nonGoals: ['Автоматичне прийняття запропонованого fix.', 'Редагування коду під час intake.', 'Закриття відкритих питань припущеннями.'],
    success: ['Наступний інженер відтворить контекст без усного пояснення.', 'Facts і hypotheses розділені.', 'Є конкретний наступний крок.'],
    rules: ['Не називати файл із тикета доведеною причиною.', 'Публічний контракт перевіряти окремо.', 'Unknown залишати явним.'],
    artifactIds: ['task-spec', 'research-digest'],
    artifactExamples: [artifactExample('task-spec', `# ISSUE_INTAKE_NOTE
Problem: empty items list causes a server error.
Impact: customer cannot complete checkout.
Evidence: reproducible request and service trace.
Requirement: handle the state predictably.
Hypothesis: total calculation reads an absent item.
Open question: expected API status and error body.
Out of scope: checkout redesign.
Status: documented example.`)],
    sourceLessonIds: ['l17-01', 'l17-02'],
    note: 'Назва й поля показують навчальний intake; конкретний issue не аналізувався.'
  },
  {
    id: 'implementation-plan', type: 'implementation-plan', family: 'foundations', title: 'Скласти bounded implementation plan', mode: 'general',
    goal: 'Перекласти підтверджені findings у послідовність малих змін із ризиками, verification, stop condition і rollback.',
    scope: ['Affected files і modules.', 'Ordered implementation steps.', 'Acceptance links і failure path.'],
    nonGoals: ['Редагування до approval.', 'Розширення scope через cleanup.', 'Планування неповʼязаних features.'],
    success: ['План самодостатній для реалізації.', 'Кожен крок має перевірку.', 'Широкий або небезпечний крок має stop condition.'],
    rules: ['Планувати після investigation.', 'Один logical intent на slice.', 'Не приховувати ризики за словом «refactor».'],
    artifactIds: ['plan-md', 'contract-md'],
    artifactExamples: [artifactExample('plan-md', `# PLAN.md
Goal: handle empty-cart input without changing valid orders.
1. Reproduce and record failing case.
2. Add domain guard and focused test.
3. Confirm API mapping with contract test.
4. Review diff and adjacent scenarios.
Stop: shared pricing behavior needs a broader decision.
Rollback: revert the single slice.
Status: documented example.`)],
    sourceLessonIds: ['l17-04'],
    note: 'План не означає, що описані кроки виконані.'
  },
  {
    id: 'pr-slicing', type: 'pr-slicing', family: 'delivery', title: 'Розкласти задачу на PR slices', mode: 'general',
    goal: 'Перетворити затверджений план на малі логічні частини, які можна окремо перевірити, відревʼювати й відкотити.',
    scope: ['Один intent на slice.', 'Обмежені файли.', 'Acceptance link, targeted check і rollback.'],
    nonGoals: ['Big-bang PR.', 'Прихований cleanup.', 'Змішування feature, refactor і dependency update.'],
    success: ['Кожен slice має зрозумілу мету.', 'Порядок не приховує незавершений контракт.', 'Reviewer може ізолювати failure.'],
    rules: ['Декомпозувати після plan approval.', 'Перший slice може бути reproduce/evidence.', 'Зупинитися при розширенні diff.'],
    artifactIds: ['pr-description', 'commit-message', 'review-notes'],
    artifactExamples: [artifactExample('pr-description', `# PR_DESCRIPTION
Intent: add the empty-cart domain guard.
Files: order service and focused test.
Verification: empty-cart regression plus valid-order check.
Out of scope: API redesign, UI changes, unrelated cleanup.
Rollback: revert this slice.
Status: documented example; checks: Unknown.`)],
    sourceLessonIds: ['l17-05', 'l18-04'],
    note: 'Це приклад упаковки PR slice, не фактичний pull request.'
  },
  {
    id: 'handoff-recovery', type: 'handoff-recovery', family: 'delivery', title: 'Зберегти milestone і передати handoff', mode: 'general',
    goal: 'Передати стан довгої задачі fresh reviewer так, щоб вони могли відтворити evidence і продовжити без здогадок.',
    scope: ['Current diff і checkpoint.', 'Зроблено, перевірено, ризики й unknowns.', 'Одна наступна дія та stop condition.'],
    nonGoals: ['Передача секретів або повного transcript.', 'Автоматичне продовження після handoff.', 'Приховування невдалих перевірок.'],
    success: ['Інший учасник розуміє стан без усної передачі.', 'Rollback/checkpoint названі.', 'Неперевірені твердження марковані.'],
    rules: ['Записувати факти окремо від next step.', 'Зберігати лише потрібний context.', 'Не вважати session rewind Git rollback.'],
    artifactIds: ['handoff-note', 'handoff-review', 'run-status-yaml'],
    artifactExamples: [artifactExample('handoff-note', `# HANDOFF_NOTE.md
Done: baseline and one approved slice prepared.
Checked: <commands and results — Unknown>
Risk: shared caller behavior not fully inspected.
Checkpoint: <Git reference>
Next: fresh reviewer checks scope and evidence.
Stop: diff leaves the agreed module.
Status: documented example.`)],
    sourceLessonIds: ['l6-01', 'l6-02', 'l6-05', 'l16-04'],
    sourceLabIds: ['l6-01-milestone-record', 'l6-05-handoff-review'],
    note: 'Handoff example не є записом виконаної довгої задачі.'
  },
  {
    id: 'integration-evaluation', type: 'extensions-evaluation', family: 'automation', title: 'Оцінити skill, plugin, MCP або hook', mode: 'general',
    goal: 'Перевірити capability surface, permissions, lifecycle і rollback інтеграції у вузькому trial до командного поширення.',
    scope: ['Одна capability і один bounded scenario.', 'Origin, permissions і auth boundary.', 'Log-only trial, verification і kill switch.'],
    nonGoals: ['Встановлення неперевіреного пакета в командний scope.', 'Credentials у repository.', 'Blocking automation без evidence.'],
    success: ['Цінність trial сформульована.', 'Побічні ефекти й data boundary відомі.', 'Є спосіб disable/rollback.'],
    rules: ['Починати вручну або log-only.', 'Надавати мінімальні permissions.', 'Зупинитися при prompt injection або неясному ownership.'],
    artifactIds: ['plugin', 'mcp-config', 'hook-config', 'workflow-md'],
    artifactExamples: [artifactExample('workflow-md', `# workflow.md
Capability: inspect one issue and return a Markdown summary.
Input boundary: sanitized issue text only.
Permissions: read-only; no publish or deploy.
Trial: log-only for one controlled case.
Verification: output schema and data boundary review.
Kill switch: disable integration before widening scope.
Status: documented example.`)],
    sourceLessonIds: ['l9-03', 'l10-04', 'l13-04', 'l14-05'],
    sourceLabIds: ['l10-04-plugin-trial', 'l14-05-hook-ladder'],
    note: 'Приклад evaluation не означає, що plugin, MCP або hook встановлено чи запущено.'
  },
  {
    id: 'agent-orchestration', type: 'agent-orchestration', family: 'automation', title: 'Спроєктувати multi-agent workflow', mode: 'general',
    goal: 'Розділити незалежні workstreams між ролями з чітким ownership, output contract, checkpoints і стратегією злиття.',
    scope: ['Decomposition і dependency order.', 'Scoped tools/context для ролей.', 'Handoff, merge strategy і human checkpoint.'],
    nonGoals: ['Паралельність заради кількості агентів.', 'Спільне редагування одного файлу без координації.', 'Автоматичне прийняття результатів.'],
    success: ['Потоки незалежні або залежності явні.', 'Кожен output має evidence і status.', 'Людина зберігає merge/go-no-go.'],
    rules: ['Спочатку оцінити, чи потрібен subagent.', 'Вузько делегувати та обмежувати tools.', 'Зупинитися при conflict або відсутності safety net.'],
    artifactIds: ['contract-md', 'handoff-review', 'run-status-yaml'],
    artifactExamples: [artifactExample('contract-md', `# CONTRACT.md
Role: reviewer-agent
Input: one proposed diff and task scope
Read: changed files, related tests, task spec
Run: targeted checks only
Write: findings with file, evidence, confidence
Stop: scope conflict or missing baseline
Human gate: owner decides merge
Status: documented example.`)],
    sourceLessonIds: ['l11-04', 'l12-04', 'l15-04', 'l16-02'],
    sourceLabIds: ['l16-02-pipeline-handoff'],
    note: 'Orchestration contract не є звітом про реальний multi-agent run.'
  },
  {
    id: 'diagnosis-ci', type: 'investigation-diagnosis', family: 'automation', title: 'Діагностувати failure у CI', mode: 'general',
    goal: 'Класифікувати червоний job як test, build, environment, contract або flaky і повернути evidence-backed next action.',
    scope: ['Job status і релевантний очищений output.', 'Локальна відтворюваність.', 'Diagnosis, confidence і безпечна наступна дія.'],
    nonGoals: ['Автоматичний fix у production.', 'Передача секретів у prompt.', 'Називати flaky без повторної перевірки.'],
    success: ['Класифікація має конкретний evidence.', 'Logs очищені від secrets.', 'Наступна дія не обходить approval.'],
    rules: ['Починати з першого надійного сигналу.', 'Розділяти CI status від root cause.', 'Неповний log означає Unknown.'],
    artifactIds: ['clawd-runner', 'run-status-yaml', 'diagnosis-json'],
    artifactExamples: [artifactExample('run-status-yaml', `status: failed
job: test
classification: Unknown
first_signal: <log line>
reproduced_locally: Unknown
secrets_removed: true
next_action: inspect focused test and environment
approval_required: true
status_record: documented example`)],
    sourceLessonIds: ['l21-03', 'l21-05'],
    sourceLabIds: ['l21-03-ci-diagnosis'],
    note: 'CI record є заповненим навчальним прикладом, не результатом реального job.'
  },
  {
    id: 'build-packaging-release', type: 'ci-build', family: 'automation', title: 'Перевірити build, packaging і release boundary', mode: 'general',
    goal: 'Описати відтворюваний build/package workflow та відокремити технічні сигнали від рішення про publish або deploy.',
    scope: ['Build command і clean environment.', 'Package/Docker path та smoke signal.', 'Changelog/release notes і human gate.'],
    nonGoals: ['Production deployment.', 'Publish без approval.', 'Приховування failed build або неповного smoke-check.'],
    success: ['Вхідні команди й output artifacts визначені.', 'Smoke criteria спостережувані.', 'Release boundary має owner і rollback path.'],
    rules: ['Claude аналізує, але не підміняє build.', 'Permissions мінімальні.', 'Не стверджувати, що build пройшов без output.'],
    artifactIds: ['commands-md', 'changelog', 'run-status-yaml'],
    artifactExamples: [artifactExample('commands-md', `# commands.md
Build: <repository build command>
Package: <clean packaging command>
Run: <local smoke command>
Expected: artifact exists and endpoint responds as specified.
Failure owner: <role>
Release action: human approval required.
Status: commands are a documented example; execution: Unknown.`)],
    sourceLessonIds: ['l21-04', 'l22-03', 'l22-05'],
    note: 'Команди та release boundary потребують адаптації до реального проєкту.'
  },
  {
    id: 'quality-gate', type: 'quality-release', family: 'governance', title: 'Оформити пояснюваний quality gate', mode: 'general',
    goal: 'Зробити blocking або advisory check прозорим: що він перевіряє, яке evidence повертає і коли зупиняє delivery.',
    scope: ['Signal, threshold і status.', 'Blocking/advisory policy.', 'Owner, exception і recovery path.'],
    nonGoals: ['Gate лише заради метрики.', 'Автоматичний merge без human policy.', 'Змішування unrelated checks.'],
    success: ['Failure зрозумілий іншому інженеру.', 'Evidence зберігається.', 'Rerun, rollback або disable path відомі.'],
    rules: ['Починати з advisory, якщо signal новий.', 'Не приховувати flaky або environment failure.', 'Людина приймає фінальне рішення.'],
    artifactIds: ['workflow-md', 'review-notes', 'run-status-yaml'],
    artifactExamples: [artifactExample('workflow-md', `# workflow.md
Gate: targeted verification for changed API contract
Signal: test status and response assertion
Mode: advisory until baseline is established
Block when: contract assertion fails
Evidence: command, status, relevant output
Owner: <team role>
Recovery: inspect, rerun only with reason, or disable with approval
Status: documented example.`)],
    sourceLessonIds: ['l22-03', 'l22-05'],
    sourceLabIds: ['l22-04-quality-gate'],
    note: 'Quality gate описаний як навчальний контракт; реального pipeline policy не створено.'
  },
  {
    id: 'policy-risk-review', type: 'risk-policy', family: 'governance', title: 'Перевірити risk boundary і AI policy', mode: 'general',
    goal: 'Зіставити risk classification, permissions, data boundaries, protected paths і human approval до дії.',
    scope: ['Класифікація задачі.', 'Allowed tools, paths і data.', 'Owner, approval, audit trail і stop condition.'],
    nonGoals: ['Обхід permission prompt.', 'Передача secrets/PII у контекст.', 'Автономний production deploy.'],
    success: ['Capability envelope відповідає ризику.', 'Protected paths мають enforcement.', 'GO/HOLD рішення має evidence та відповідального.'],
    rules: ['Least privilege за замовчуванням.', 'Sensitive data очищати до передачі.', 'Незворотні дії залишати за людиною.'],
    artifactIds: ['ai-coding-policy', 'codeowners', 'review-notes'],
    artifactExamples: [artifactExample('ai-coding-policy', `# AI_CODING_POLICY.md
Allowed: read-only discovery, bounded drafts, targeted checks.
Controlled: edits in protected paths and shared workflow assets.
Forbidden: secrets in prompts, unapproved deploys, bypassing review.
Approval: owner of the affected boundary.
Evidence: task spec, diff, checks and review note.
Status: documented policy example; enforcement: Unknown.`)],
    sourceLessonIds: ['l23-01', 'l23-02', 'l23-03', 'l23-05', 'l24-01', 'l24-03'],
    sourceLabIds: ['l23-05-risk-boundary', 'l24-03-policy-review'],
    note: 'Policy documented example не є чинною політикою організації і не доводить фактичне enforcement.'
  },
  {
    id: 'capstone', type: 'capstone', family: 'governance', title: 'Спланувати capstone з evidence', mode: 'general',
    goal: 'Обмежити фінальний проєкт одним core flow і побудувати відтворювану послідовність SPEC, baseline, milestones, demo та evidence.',
    scope: ['Problem, audience і core flow.', 'SPEC, repository baseline і roadmap.', 'Малі milestones та evaluation evidence.'],
    nonGoals: ['Демонстрація всього продукту.', 'Вигадані metrics або screenshots.', 'Розширення scope під час demo.'],
    success: ['Критерії оцінювання визначені до коду.', 'Кожен milestone має evidence.', 'Demo відтворюється іншим учасником.'],
    rules: ['Починати з малого verified slice.', 'Фіксувати Unknown і limitations.', 'Не називати план production readiness.'],
    artifactIds: ['capstone-brief', 'spec', 'backlog-roadmap'],
    artifactExamples: [artifactExample('capstone-brief', `# CAPSTONE_BRIEF.md
Problem: make one repository workflow easier to verify.
Audience: developer reviewing a bounded change.
Core flow: intake -> plan -> implementation -> evidence.
In scope: one representative scenario and its checks.
Out of scope: full product, deployment and scale claims.
Demo evidence: <commands and outputs — Unknown>.
Status: documented example.`)],
    sourceLessonIds: ['l25-01', 'l25-03', 'l25-04', 'l25-05'],
    sourceLabIds: ['l25-04-capstone-evidence'],
    note: 'Capstone brief є навчальною постановкою, а не заявкою на виконаний проєкт.'
  },
  {
    id: 'legacy-discovery', type: 'codebase-discovery', family: 'legacy-transition', title: 'Дослідити legacy і карту ризиків', mode: 'general',
    goal: 'Описати current-state architecture, technical-debt signals, critical flows і change risk до будь-якого редагування.',
    scope: ['Фактична поведінка legacy flow.', 'Модулі, залежності та static signals.', 'Business criticality, change risk і unknowns.'],
    nonGoals: ['Негайний refactor.', 'Вигаданий target architecture.', 'Висновок із одного smell без evidence.'],
    success: ['Current state відділений від desired state.', 'Risk map має evidence і confidence.', 'Наступний крок bounded.'],
    rules: ['Read-only discovery first.', 'Не плутати business criticality із change risk.', 'Unknown блокери виносити явно.'],
    artifactIds: ['architecture-current', 'debt-signals', 'risk-map'],
    artifactExamples: [artifactExample('risk-map', `# RISK_MAP.md
Area: BillingService.calculateInvoice
Business criticality: high — confirm with owner
Change risk: high — shared callers are Unknown
Evidence: <paths, tests, runtime observations>
Safe next step: characterize one bounded flow
Do not do: broad rewrite or dependency upgrade
Status: documented example.`)],
    sourceLessonIds: ['l26-01', 'l26-02', 'l26-03', 'l26-04', 'l26-05'],
    note: 'Legacy map заповнена як приклад; жоден production codebase не досліджувався в межах сторінки.'
  },
  {
    id: 'modernization', type: 'modernization', family: 'legacy-transition', title: 'Модернізувати legacy-модуль', mode: 'modernization',
    goal: 'Поступово зменшити технічний ризик одного legacy-модуля, не змінюючи зовнішній контракт і бізнес-сенс.',
    scope: ['Один bounded module або business flow.', 'Одна structural change через підтверджену seam.', 'Characterization, focused checks і rollback.'],
    nonGoals: ['Big-bang rewrite.', 'Public API, business-rule або data-format changes.', 'Framework/dependency upgrade чи нові features.'],
    success: ['Один reviewable slice має обмежений diff.', 'Inputs, outputs, errors, side effects та invariants сумісні.', 'Перевірки виконані або марковані Unknown.'],
    rules: ['Почати з MODERNIZATION_BASELINE.md і RISK_MAP.md.', 'Кожен крок має non-goals і stop condition.', 'Зупинитися при непідтвердженій зміні контракту.'],
    artifactIds: ['modernization-baseline', 'characterization-tests', 'refactoring-plan', 'modernization-roadmap'],
    artifactExamples: [artifactExample('modernization-baseline', `# MODERNIZATION_BASELINE.md
Module: BillingService.calculateInvoice
Revision: <baseline commit — fill with evidence>
Inputs: customer, period, line items
Outputs: total and validation errors
Invariants: rounding and error codes remain unchanged
Checks: <focused command — Unknown until executed>
Unknowns: callers relying on internal ordering
Status: documented example.`)],
    sourceLessonIds: ['l27-01', 'l27-02', 'l27-03', 'l27-04', 'l27-05'],
    note: 'Навчальний modernization example; реальний legacy-модуль не змінювався.'
  },
  {
    id: 'migration', type: 'migration', family: 'legacy-transition', title: 'Підготувати пілотну міграцію', mode: 'migration',
    goal: 'Підготувати bounded pilot переходу на Boot 3.x і Java 21, спочатку зібравши evidence для сумісності та зберігши поточну поведінку.',
    scope: ['Build-конфігурація і version constraints.', 'Security-конфігурація target slice.', 'Один read-only endpoint.', 'Official docs і repository files.'],
    nonGoals: ['Рефакторинг BillingService.', 'Нова схема БД.', 'Нові features, full rollout або production deployment.', 'Version bump до discovery та approval.'],
    success: ['Known, Assumption і Unknown розділені.', 'Compatibility checks, behavior contract і rollback визначені.', 'Pilot має пройти поточні перевірки та поводитися як раніше; результат до виконання — Unknown.'],
    rules: ['Source of truth: official docs + repo files.', 'Кожен висновок має docs section або file path.', 'Не пропонувати edit, build або version bump без запиту.', 'Почати з discovery, changelog, dependency graph і compatibility matrix.'],
    artifactIds: ['task-spec', 'claude-md', 'migration-discovery', 'changelog-research', 'dependency-graph', 'compatibility-matrix', 'migration-plan'],
    artifactExamples: [artifactExample('migration-plan', `# MIGRATION_PLAN.md
Mode: migration
Source: <current Boot/Java versions — verify in repo>
Target: Boot 3.x / Java 21
Scope: build, security config, one read-only endpoint
Non-goals: BillingService refactor, new DB schema, new features
Evidence gate: official docs + repository paths
Decision: HOLD until facts and checks are recorded
Rollback: <approved procedure — Unknown>
Status: documented example.`)],
    sourceLessonIds: ['l28-01', 'l28-02', 'l28-03', 'l28-04', 'l28-05'],
    note: 'Migration example не є виконаним Boot/Java upgrade: source version, checks, compatibility і rollout залишаються Unknown.'
  }
];
