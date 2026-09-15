import type { GuideSection } from '../types/guide';

export const levelTwentyEightContent: Record<string, GuideSection[]> = {
  'l28-01': [
    {
      heading: 'Три різні режими роботи зі змінами',
      paragraphs: [
        'Рефакторинг змінює внутрішню структуру без навмисної зміни зовнішнього контракту. Modernization покращує або замінює частини legacy-системи, часто залишаючи бізнес-поведінку та інтеграційні межі стабільними. Migration переносить систему або її slice із source state до target state: іншої версії runtime, framework, платформи, API, формату чи середовища.',
        'Ці режими можуть перетинатися, але не є синонімами. Під час migration можуть знадобитися refactoring або modernization, проте сам факт зміни версії чи платформи не доводить, що виконано rewrite або production rollout.'
      ],
      artifactIds: ['migration-discovery', 'modernization-baseline', 'refactoring-plan', 'risk-map']
    },
    {
      heading: 'Порівняння scope і доказів',
      table: {
        headers: ['Режим', 'Основна мета', 'Що зберігаємо', 'Ключовий evidence'],
        rows: [
          ['Refactoring', 'Виправити внутрішню структуру', 'Зовнішній behavior і contract', 'Diff, focused tests, characterization'],
          ['Modernization', 'Зменшити legacy-обмеження або оновити capability', 'Погоджену business-поведінку та boundaries', 'Baseline, seams, risk gates'],
          ['Migration', 'Перейти від source до target state', 'Сумісність, observable behavior і дані в межах scope', 'Version evidence, compatibility analysis, pilot checks']
        ]
      }
    },
    {
      heading: 'Discovery перед рішенням про міграцію',
      bullets: [
        'назвіть source і target: версії, runtime, framework, build або платформу;',
        'зафіксуйте, який boundary справді переноситься, а що залишається поза scope;',
        'відокремте підтверджені факти від припущень і Unknown;',
        'визначте, який contract має залишитися стабільним і як його спостерігати;',
        'не називайте міграцією звичайне перейменування або внутрішнє переміщення без source-to-target зміни.'
      ],
      note: 'Найбезпечніший перший результат міграційної задачі — не patch, а короткий evidence-backed опис стартової точки, target assumptions і невідомих.'
    },
    {
      heading: 'Коли не можна змішувати режими',
      paragraphs: [
        'Якщо під час migration discovery знайдено окрему business-вимогу, bugfix або широке очищення коду, не додавайте їх мовчки до migration scope. Винесіть роботу в окреме рішення, щоб результати compatibility analysis і behavior comparison залишалися зрозумілими.',
        'Migration brief у цьому гайді є documented example: він демонструє спосіб мислення та поля документа, але не описує реально виконаний upgrade конкретного репозиторію.'
      ]
    }
  ],
  'l28-02': [
    {
      heading: 'Migration discovery: знайти точку старту',
      paragraphs: [
        'Migration discovery — це read-only збір фактів про source state, target intent і межі переходу. До першої зміни потрібно знати хоча б affected runtime, build, dependencies, deployment/configuration boundaries, integrations і спосіб перевірити behavior.',
        'Точка старту — це конкретний revision, environment або pilot slice, від якого можна відтворити baseline. Якщо revision, owner або критичний input невідомі, це потрібно записати як Unknown, а не замінити припущенням.'
      ],
      artifactIds: ['migration-discovery', 'codebase-inventory', 'module-inventory', 'architecture-current', 'research-digest']
    },
    {
      heading: 'Питання discovery та evidence anchors',
      table: {
        headers: ['Питання', 'Де шукати evidence', 'Confidence', 'Наступна перевірка'],
        rows: [
          ['Який source runtime і target runtime?', 'build files, CI, deployment docs', 'high / medium / low', 'звірити фактичний запуск і owner'],
          ['Які компоненти залежать від source?', 'dependency manifests, imports, lockfiles', 'high / medium / low', 'побудувати affected graph'],
          ['Які інтеграції мають contract?', 'API schema, clients, tests, logs', 'high / medium / low', 'обрати representative scenario'],
          ['Яка точка старту доступна?', 'Git revision, environment, artifact', 'confirmed / unknown', 'зберегти baseline reference'],
          ['Що не можна підтвердити read-only?', 'missing docs, inaccessible systems', 'unknown', 'призначити owner або stop condition']
        ]
      }
    },
    {
      heading: 'Межі migration discovery',
      bullets: [
        'не оновлюйте dependencies лише тому, що target version здається очевидною;',
        'не оголошуйте компонент compatible без source, target і evidence anchor;',
        'не вважайте список package names повним описом runtime behavior;',
        'не ховайте недоступні production або vendor facts за словом «перевірено»;',
        'не переходьте до pilot, якщо немає rollback або способу порівняти output.'
      ],
      note: 'Discovery може завершитися рішенням HOLD. Це коректний результат, якщо критична невідомість блокує безпечну міграцію.'
    },
    {
      heading: 'Порядок роботи з точкою старту',
      steps: [
        'Визначте один migration slice і сформулюйте source-to-target intent.',
        'Зберіть repository, build, runtime, integration і deployment evidence.',
        'Зафіксуйте revision, environment assumptions і доступні baseline checks.',
        'Випишіть knowns, assumptions, unknowns та owner для кожного важливого питання.',
        'Позначте stop conditions, після яких analysis або pilot потрібно призупинити.'
      ]
    }
  ],
  'l28-03': [
    {
      heading: 'Changelog як evidence для version window',
      paragraphs: [
        'Changelog research починається з явного version window: від якої source version до якої target version досліджуємо зміни. Потрібно читати офіційні release notes, migration guides або changelog sections для кожного relevant переходу, а не покладатися на назву нової версії.',
        'Мета — не переписати весь changelog, а витягнути зміни, які можуть вплинути на affected code, configuration, runtime, build, integrations або operations.'
      ],
      artifactIds: ['changelog-research', 'changelog', 'research-digest', 'evidence']
    },
    {
      heading: 'Класифікація знайдених змін',
      table: {
        headers: ['Тип зміни', 'Що перевірити в repository', 'Результат запису'],
        rows: [
          ['Breaking API', 'imports, calls, signatures, adapters', 'affected symbol і focused check'],
          ['Deprecation/removal', 'usage, configuration, replacement path', 'version + official section + action'],
          ['Behavior change', 'outputs, errors, ordering, retries', 'representative scenario і contract impact'],
          ['Configuration/runtime', 'env, defaults, startup, deploy', 'assumption, environment check, owner'],
          ['Unknown', 'недоступне або неоднозначне джерело', 'Unknown + конкретний next check']
        ]
      }
    },
    {
      heading: 'Мінімальний запис changelog finding',
      code: [
        {
          language: 'markdown',
          caption: 'CHANGELOG_RESEARCH.md — documented example',
          code: `## Finding: <version and change>
- Source: <official URL or repository file:section>
- Affected area: <module, API, config, runtime>
- Change type: <breaking | deprecated | behavior | operational>
- Expected impact: <what may change>
- Confidence: <confirmed | needs verification | Unknown>
- Next check: <focused command or scenario>`
        }
      ],
      note: 'Template не є результатом реального changelog review. Якщо офіційне джерело не прочитане або висновок не підтверджений кодом, confidence має це показувати.'
    },
    {
      heading: 'Порядок changelog research',
      steps: [
        'Зафіксуйте source version, target version і межі пошуку.',
        'Зберіть офіційні release/changelog entries у межах version window.',
        'Відфільтруйте breaking, deprecated, behavior, configuration і operational changes.',
        'Зіставте кожну зміну з конкретним repository area або позначте її як неaffected.',
        'Додайте evidence anchor, confidence і наступну focused verification.',
        'Зупиніться, якщо target або relevant release evidence залишається Unknown.'
      ]
    }
  ],
  'l28-04': [
    {
      heading: 'Dependency graph для міграційного impact',
      paragraphs: [
        'Migration dependency graph показує не лише список модулів, а напрямлені звʼязки між source runtime, framework, build plugins, libraries, integrations, deployment і data/protocol boundaries. На графі важливо бачити target constraints, affected paths і вузли з великим blast radius.',
        'Це окремий артефакт від MODULE_INVENTORY: inventory описує окремі модулі, а migration graph допомагає визначити порядок переходу та compatibility impact між компонентами.'
      ],
      artifactIds: ['dependency-graph', 'module-inventory', 'critical-flows', 'risk-map']
    },
    {
      heading: 'Вузли, ребра та обмеження',
      table: {
        headers: ['Елемент', 'Приклад змісту', 'Чому важливо'],
        rows: [
          ['Node', 'runtime, framework, plugin, client, protocol', 'окрема surface для migration decision'],
          ['Directed edge', 'application → framework або service → protocol', 'показує напрям впливу та порядок перевірки'],
          ['Constraint', 'supported version, ABI, config, data format', 'визначає blocking або conditional path'],
          ['Affected flow', 'endpoint, job, event, persistence operation', 'повʼязує graph із observable behavior'],
          ['Unknown', 'непідтверджена transitive dependency', 'блокує необґрунтований compatibility claim']
        ]
      }
    },
    {
      heading: 'Compatibility matrix як рішення, а не score',
      paragraphs: [
        'Матриця сумісності розкладає source-to-target рішення за вимірами: API, configuration, ABI, runtime, data format, protocol і operations. Для кожної клітинки потрібні status, evidence і owner. Статуси на кшталт compatible, requires verification, blocking або Unknown не можна заміняти одним загальним числом.',
        'Risk map може показати пріоритет і наслідок ризику, але не замінює технічного рішення про те, чи конкретна пара source/target сумісна.'
      ],
      artifactIds: ['compatibility-matrix']
    },
    {
      heading: 'Порядок побудови graph і matrix',
      steps: [
        'Почніть із affected flow і його entry point, а не з повного списку пакетів.',
        'Додайте source/target nodes та direct і transitive dependencies, наскільки вони підтверджені.',
        'Позначте directed edges, version constraints і high-impact hubs.',
        'Для кожного critical edge заповніть compatibility dimensions і evidence.',
        'Призначте owner для Unknown та blocking items.',
        'Виберіть найменший pilot, який перевіряє головну compatibility hypothesis.'
      ],
      note: 'Graph і matrix у каталозі — reusable documented examples. Вони не стверджують, що dependency scan або vendor compatibility test уже виконано.'
    }
  ],
  'l28-05': [
    {
      heading: 'Behavior contract перед зміною source state',
      paragraphs: [
        'Міграція має зберігати не лише happy-path output. Контракт поведінки охоплює inputs, outputs, errors, side effects, порядок і timing там, де вони спостережувані, idempotency, retries, persistence та recovery behavior.',
        'Контракт не означає, що implementation або внутрішня структура залишаються незмінними. Він визначає, що саме потрібно порівняти між source і target та яке відхилення потребує рішення owner.'
      ],
      artifactIds: ['migration-plan', 'contract-md', 'modernization-baseline', 'risk-map', 'evidence']
    },
    {
      heading: 'Пофазний migration plan',
      table: {
        headers: ['Фаза', 'Evidence gate', 'Рішення', 'Rollback/hold'],
        rows: [
          ['Discovery', 'source state і scope відтворювані', 'proceed до analysis', 'hold при критичних unknowns'],
          ['Analysis', 'changelog, graph і matrix мають anchors', 'обрати pilot', 'звузити scope або hold'],
          ['Pilot', 'bounded slice і behavior checks', 'перевірити target hypothesis', 'повернутися до source checkpoint'],
          ['Verification', 'focused + contract checks', 'expand або rework', 'rollback при discrepancy'],
          ['Expand / hold', 'risk gate і owner decision', 'збільшити охоплення або зупинити', 'disable/rollback за процедурою'],
          ['Retirement', 'exit criteria і migration evidence', 'видаляти старий path лише після доказів', 'залишити coexistence']
        ]
      }
    },
    {
      heading: 'Поля фази, які не можна пропустити',
      bullets: [
        'одна bounded scope та відповідальний owner;',
        'конкретний evidence gate, а не загальне «перевірити»;',
        'exit criteria, які можна спостерігати або відтворити;',
        'практичний rollback або hold action із відомою точкою повернення;',
        'рішення GO, HOLD, narrow або rollback із поясненням і відкритими unknowns.'
      ],
      artifactIds: ['modernization-roadmap']
    },
    {
      heading: 'План не є доказом виконаної міграції',
      paragraphs: [
        'Документований migration plan описує майбутню послідовність та критерії рішень. Він не доводить, що dependencies оновлені, pilot пройшов, production сумісний або rollout завершено. Фактичний результат зʼявляється лише після реальних команд, тестів, review і запису evidence.',
        'Якщо behavior contract неможливо перевірити або compatibility matrix містить blocking Unknown, коректне рішення — HOLD, а не оптимістичне GO.'
      ],
      note: 'Усі приклади цього рівня є навчальними documented examples; жоден із них не є звітом про виконану міграцію конкретного проєкту.'
    }
  ]
};
