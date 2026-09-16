import type { GuideSection } from '../types/guide';

export const levelTwentyNineContent: Record<string, GuideSection[]> = {
  'l29-01': [
    {
      heading: 'Pilot slice: мінімальна одиниця міграційного виконання',
      paragraphs: [
        'Pilot — це не «половина міграції», а bounded перевірка конкретної source-to-target гіпотези. Виберіть один endpoint, job, adapter або інший observable flow, для якого можна назвати inputs, outputs, залежності, owner і stop condition.',
        'Розділіть migration execution на підготовку, pilot, verification і рішення. До pilot потрібно мати migration discovery, compatibility assumptions і rollback path; інакше невеликий diff лише створює малий, але непередбачуваний ризик.'
      ],
      artifactIds: ['migration-plan', 'migration-discovery', 'risk-map', 'strangler-slice', 'rollback']
    },
    {
      heading: 'Branch і worktree як контроль межі',
      table: {
        headers: ['Крок', 'Що зафіксувати', 'Навіщо'],
        rows: [
          ['Baseline', 'revision, clean/known diff, доступні checks', 'мати точку порівняння'],
          ['Branch', 'окрема назва й один pilot scope', 'не змішати migration з feature work'],
          ['Worktree', 'ізольований шлях, owner і cleanup rule', 'зменшити перетин паралельних змін'],
          ['Review', 'diff, affected paths, risk і evidence', 'зупинити scope drift до merge'],
          ['Decision', 'GO, HOLD, NARROW або ROLLBACK', 'зробити результат явним']
        ]
      },
      artifactIds: ['git-review-artifacts']
    },
    {
      heading: 'Entry та exit gates pilot-зрізу',
      steps: [
        'Опишіть migration hypothesis і bounded affected area у task spec та migration plan.',
        'Створіть baseline revision і branch/worktree; не змішуйте незвʼязані зміни.',
        'Перевірте, що rollback trigger, owner і checkpoint відомі до першого edit.',
        'Виконайте лише погоджений slice та зберіть diff, focused checks і behavior evidence.',
        'Прийміть GO, HOLD, NARROW або ROLLBACK; розширення scope потребує нового рішення.'
      ],
      note: 'Це documented example workflow. Branch, pilot і checks описані як навчальна схема; фактичне виконання міграції та compatibility outcome — Unknown.'
    },
    {
      heading: 'Коли pilot потрібно зупинити',
      bullets: [
        'source baseline не відтворюється або critical input залишається Unknown;',
        'знайдено неописану зміну data format, configuration або side effect;',
        'behavior comparison не має observable oracle або виявляє discrepancy;',
        'rollback не може повернути code і state у визначену безпечну точку;',
        'diff виходить за bounded slice або потребує непогодженого dependency upgrade.'
      ]
    }
  ],
  'l29-02': [
    {
      heading: 'Rollback — передумова, а не фінальний пункт',
      paragraphs: [
        'Rollback-план має існувати до pilot, тому що після зміни може бути пізно зʼясовувати, як повернути code, configuration, data і traffic. Для кожної поверхні вкажіть checkpoint, trigger, owner, команду або процедуру та спосіб перевірити відновлення.',
        'Code rollback і state rollback — різні речі. Повернення branch або artifact не скасовує вже виконаний backfill, змінений schema state, зовнішній side effect чи несумісний config. Якщо state recovery не доведений, рішення має бути HOLD.'
      ],
      artifactIds: ['migration-plan', 'modernization-baseline', 'risk-map', 'strangler-slice']
    },
    {
      heading: 'Rollback matrix',
      table: {
        headers: ['Поверхня', 'Trigger', 'Повернення', 'Перевірка', 'Межа'],
        rows: [
          ['Code/artifact', 'failed check або critical regression', 'попередній revision/artifact', 'diff і smoke signal', 'не відміняє state changes'],
          ['Configuration', 'startup/config mismatch', 'попередня versioned config', 'startup і representative flow', 'secrets не копіювати в docs'],
          ['Data/schema', 'invariant або read failure', 'approved backout/forward-fix', 'integrity та compatibility checks', 'може бути irreversible'],
          ['Traffic/routing', 'error rate або parity discrepancy', 'switch до source path', 'routing і output comparison', 'потрібен owner'],
          ['Decision', 'невідомий recovery path', 'HOLD без pilot', 'отримати missing evidence', 'не маскувати Unknown']
        ]
      },
      artifactIds: ['compatibility-matrix', 'data-config-migration', 'rollback']
    },
    {
      heading: 'Поля, без яких rollback не є планом',
      bullets: [
        'точка, з якої можна відновити source state;',
        'конкретний observable trigger і поріг рішення;',
        'відповідальний owner та канал ескалації;',
        'порядок code/config/data/routing actions;',
        'перевірка після rollback і умова, коли потрібен forward-fix;',
        'явна позначка irreversible або неперевірених операцій.'
      ],
      artifactIds: ['migration-plan']
    },
    {
      heading: 'Stop condition для pilot',
      code: [
        {
          language: 'markdown',
          caption: 'MIGRATION_PLAN.md — documented example',
          code: `## Rollback gate
- Trigger: behavior discrepancy, integrity failure, or unavailable recovery evidence
- Owner: migration decision owner
- Code action: return to source checkpoint
- Config/data action: <approved procedure — Unknown until verified>
- Verification: compare representative flow and invariants
- Decision: HOLD until all recovery steps are verified`
        }
      ],
      note: 'Запис демонструє структуру рішення, а не підтверджує реальний rollback. Жодна міграція, backout або production recovery не виконувалася в межах цього уроку.'
    }
  ],
  'l29-03': [
    {
      heading: 'Паритет поведінки — це observable contract',
      paragraphs: [
        'Доказ паритету порівнює source і target на однакових representative inputs, а не лише перевіряє, що target компілюється. Контракт може містити outputs, errors, status codes, side effects, ordering, timing, idempotency, retries і persistence behavior — лише ті виміри, які справді observable для споживача.',
        'Порівняння має розділяти expected equivalence, допустиму різницю і blocking discrepancy. Якщо oracle або baseline відсутні, результат не «паритет», а Unknown.'
      ],
      artifactIds: ['characterization-tests', 'contract-md', 'evidence', 'behavior-inventory', 'migration-validation-report', 'post-migration-notes']
    },
    {
      heading: 'Матриця source-to-target comparison',
      table: {
        headers: ['Dimension', 'Source baseline', 'Target observation', 'Decision'],
        rows: [
          ['Inputs', 'representative request/state', 'same controlled input', 'підтвердити coverage'],
          ['Output', 'value, status, shape', 'target value, status, shape', 'equivalent або investigate'],
          ['Errors', 'type, code, message boundary', 'target error behavior', 'blocking при contract drift'],
          ['Side effects', 'writes/events/notifications', 'target effects and count', 'перевірити idempotency'],
          ['Ordering/timing', 'observable sequence/latency class', 'target sequence/latency class', 'лише якщо contract requires'],
          ['Evidence', 'command, test, log, fixture', 'matching anchor', 'Unknown без anchors']
        ]
      },
      artifactIds: ['characterization-tests', 'contract-md', 'evidence', 'behavior-inventory', 'migration-validation-report', 'post-migration-notes']
    },
    {
      heading: 'Порядок збирання доказу',
      steps: [
        'Визначте representative cases і зафіксуйте source revision та environment assumptions.',
        'Запишіть observable contract: inputs, outputs, errors, side effects та invariants.',
        'Повторіть ті самі cases на target у контрольованій поверхні.',
        'Порівняйте results за кожною dimension, не зводячи все до одного score.',
        'Збережіть evidence anchors, discrepancy, confidence і owner наступного рішення.',
        'Зупиніться або зробіть HOLD при непоясненій різниці чи відсутньому oracle.'
      ],
      artifactIds: ['characterization-tests', 'evidence']
    },
    {
      heading: 'Що не доводить паритет',
      bullets: [
        'успішний build без runtime або contract checks;',
        'один happy-path case без errors і side effects;',
        'однаковий internal implementation або class names;',
        'загальний statement «сумісно» без source/target observations;',
        'заповнений template без фактичних command/test outputs.'
      ],
      note: 'Усі приклади — documented examples. У цьому repository немає виконаного source-v-target migration comparison, тому compatibility і parity outcome мають статус Unknown.'
    }
  ],
  'l29-04': [
    {
      heading: 'Карта типів міграцій',
      paragraphs: [
        'Одна migration initiative часто містить кілька різних типів робіт. Класифікація допомагає не загубити owner, dependency і rollback: code/dependency, schema/data, configuration, infrastructure/platform та operational migration мають різні докази й failure modes.',
        'Тип не визначається лише назвою ticket. Записуйте source state, target state, affected surface, coupling, evidence gate і рішення для кожного типу окремо.'
      ],
      artifactIds: ['migration-types', 'migration-discovery', 'dependency-graph']
    },
    {
      heading: 'Основні категорії та evidence',
      table: {
        headers: ['Тип', 'Що переходить', 'Ключовий ризик', 'Потрібна перевірка'],
        rows: [
          ['Code/dependency', 'source code, runtime, framework, libraries', 'API, ABI або behavior drift', 'build, tests, changelog, parity'],
          ['Schema/data', 'schema, records, format, indexes', 'loss, corruption або irreversible state', 'integrity, backfill, dual-read/write plan'],
          ['Configuration', 'keys, defaults, flags, environment mapping', 'wrong startup або unsafe default', 'config validation без secret exposure'],
          ['Infrastructure/platform', 'runtime, host, network, storage, platform', 'resource/network/permission mismatch', 'representative deployment checks'],
          ['Operational', 'traffic, monitoring, runbook, ownership', 'невчасне виявлення та recovery', 'alerts, owner, rollback drill or Unknown']
        ]
      },
      artifactIds: ['migration-types', 'compatibility-matrix']
    },
    {
      heading: 'Залежності між типами',
      bullets: [
        'не починайте data change, якщо target code не вміє читати source і target format;',
        'configuration migration повинна мати versioned mapping і перевірку startup;',
        'infrastructure change може змінити timing, network або permissions навіть без code diff;',
        'operational readiness не замінює technical compatibility;',
        'порядок і coupling потрібно показати в dependency graph, а blocking Unknown — винести у risk map.'
      ],
      artifactIds: ['dependency-graph', 'risk-map']
    },
    {
      heading: 'Decision record для класифікації',
      code: [
        {
          language: 'markdown',
          caption: 'MIGRATION_TYPES.md — documented example',
          code: `| Work item | Type | Source -> target | Coupled with | Evidence gate | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| framework update | code/dependency | source runtime -> target runtime | config, parity | changelog + focused checks | role | Unknown |
| record backfill | schema/data | old format -> new format | code, rollback | integrity + recovery check | role | HOLD |
| env key rename | configuration | old key -> new key | startup, secrets | config validation | role | Unknown |

Decision: classify first; execute only after gates.`
        }
      ],
      note: 'Класифікаційна карта — reusable documented example, не inventory виконаної міграції.'
    }
  ],
  'l29-05': [
    {
      heading: 'Data і configuration мають окремий migration contract',
      paragraphs: [
        'Data migration змінює records, schema або format; configuration migration змінює спосіб, яким код отримує settings, flags, credentials references чи defaults. Вони можуть бути повʼязані, але не повинні зливатися в один рядок plan: data має integrity і recovery concerns, config — startup, scope та secret-handling concerns.',
        'Для кожної зміни потрібні source/target representation, compatibility window, owner, sequencing, validation та backout або forward-fix strategy. Якщо операція irreversible, це blocking decision, а не дрібна примітка.'
      ],
      artifactIds: ['data-config-migration', 'compatibility-matrix', 'migration-plan']
    },
    {
      heading: 'Inventory і sequencing',
      table: {
        headers: ['Surface', 'Inventory', 'Sequence', 'Validation'],
        rows: [
          ['Schema', 'tables, columns, indexes, constraints', 'expand -> migrate -> contract', 'schema and integrity checks'],
          ['Records', 'volume, formats, nulls, ownership', 'backfill in bounded batches', 'counts, invariants, representative reads'],
          ['Configuration', 'keys, defaults, environments, flags', 'add compatible mapping -> switch -> remove old', 'startup and scenario checks'],
          ['Secrets references', 'names/scopes, not secret values', 'provision before switch', 'presence/permissions without exposure'],
          ['Recovery', 'checkpoint, backout, forward-fix', 'define before pilot', 'recovery evidence or HOLD']
        ]
      },
      artifactIds: ['data-config-migration']
    },
    {
      heading: 'Compatibility patterns і їхні межі',
      bullets: [
        'expand-contract дає coexistence window, але потребує retirement criteria;',
        'dual-read/dual-write додає reconciliation та idempotency risk;',
        'backfill має бути resumable, observable і обмеженим за blast radius;',
        'versioned configuration повинна мати explicit default і безпечний unknown-key behavior;',
        'секрети не копіюються в task spec, logs, templates або evidence;',
        'forward-fix може бути безпечнішим за backout для state, який не можна повернути.'
      ],
      artifactIds: ['compatibility-matrix', 'risk-map']
    },
    {
      heading: 'Перевірка до і після перемикання',
      steps: [
        'Зіставте data/config inventory з dependency graph і affected behavior flows.',
        'Визначте compatibility window, допустиму coexistence і точку припинення.',
        'Підготуйте validation для counts, invariants, reads, writes, startup і representative scenarios.',
        'Виконайте pilot лише за наявності owner та recovery path; недоступні checks позначте Unknown.',
        'Після switch порівняйте behavior, integrity і operational signals; не видаляйте source path до exit criteria.',
        'Зафіксуйте GO, HOLD, rollback або forward-fix як окреме рішення з evidence.'
      ],
      artifactIds: ['data-config-migration', 'evidence', 'migration-plan', 'migration-validation-report', 'post-migration-notes'],
      note: 'Планування data/config migration не доводить, що backfill, schema change, config switch або recovery реально виконані.'
    }
  ]
};
