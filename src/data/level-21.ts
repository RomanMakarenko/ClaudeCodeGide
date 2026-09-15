import type { GuideSection } from '../types/guide';

export const levelTwentyOneContent: Record<string, GuideSection[]> = {
  'l21-01': [
    {
      heading: 'Non-interactive mode — Claude як bounded step',
      paragraphs: [
        'Non-interactive mode призначений для одноразового запуску із shell-скрипта, локального automation або CI. Замість довгої сесії маємо явний вхід, одну вузьку мету й результат, який можна зберегти та перевірити.',
        'Такий запуск добре підходить для summarization, класифікації логу, підготовки чернетки release notes або короткого аналізу diff. Він не перетворює Claude на безумовного approver: merge, release і production-deploy залишаються рішеннями людини та політик репозиторію.'
      ],
      code: [
        {
          language: 'bash',
          caption: 'Перевірте актуальний CLI-синтаксис перед automation',
          code: `claude --help

# Приклад: передати Claude вузький diff і зберегти результат
claude -p "Склади короткий опис змін для code review" \\
  --allowed-tools "Bash(git diff:*)" \\
  > tmp/summary.md`
        }
      ],
      note: 'Назви прапорців і доступні можливості можуть залежати від встановленої версії Claude Code. Не копіюйте старий приклад у CI без перевірки через claude --help.'
    },
    {
      heading: 'Контракт входу та виходу',
      table: {
        headers: ['Частина', 'Практика'],
        rows: [
          ['Вхід', 'Передавайте diff, конкретний log-файл, changelog або інший явно визначений набір даних'],
          ['Мета', 'Описуйте одну операцію: summary, classification або список ризиків'],
          ['Вихід', 'Вимагайте Markdown або JSON із фіксованими полями'],
          ['Перевірка', 'Переконайтеся, що результат не порожній і відповідає очікуваному формату'],
          ['Evidence', 'Збережіть джерело, команду, обмеження та отриманий файл']
        ]
      },
      paragraphs: [
        'Структурований вихід полегшує подальшу обробку, але валідний JSON не робить висновок правильним автоматично. Перевіряйте його проти первинного diff або логу.'
      ]
    },
    {
      heading: 'Вузьке делегування замість повного доступу',
      steps: [
        'Визначте, який саме файл або команда є входом.',
        'Опишіть, що Claude має повернути і чого не має робити.',
        'Надайте лише мінімальні tools та permissions.',
        'Запишіть результат у тимчасовий або окремий evidence-файл.',
        'Зробіть людський review перед будь-якою зовнішньою дією.'
      ],
      bullets: [
        'не передавайте весь репозиторій, якщо достатньо diff або логу;',
        'не давайте scripted-запуску широке редагування без окремої потреби;',
        'не передавайте secrets у prompt, stdin або збережені артефакти;',
        'не дозволяйте створення комітів, push чи destructive commands у першій версії.'
      ]
    },
    {
      heading: 'Приклад аналізу логу',
      code: [
        {
          language: 'bash',
          caption: 'Потік даних: log → bounded prompt → JSON-файл',
          code: `cat build.log | claude -p \\
  "Поверни JSON: категорія, причина, докази, перевірка, наступна дія" \\
  > tmp/failure.json

# Далі файл перевіряє script або людина,
# а не автоматичний merge-крок.`
        }
      ],
      paragraphs: [
        'Промпт має назвати формат і заборонити редагування. Якщо pipeline потребує машинного розбору, додайте окрему JSON-schema validation і обробляйте невалідний output як failure, а не як порожній успіх.'
      ]
    },
    {
      heading: 'Коли обрати інтерактивну сесію',
      table: {
        headers: ['Сценарій', 'Кращий режим'],
        rows: [
          ['Короткий повторюваний summary або classification', 'Non-interactive'],
          ['Аналіз одного build-логу', 'Non-interactive'],
          ['Дослідження незнайомого codebase', 'Інтерактивна сесія'],
          ['Пошук root cause у кількох компонентах', 'Інтерактивна сесія'],
          ['Невизначені вимоги та уточнення', 'Інтерактивна сесія']
        ]
      },
      note: 'Non-interactive mode дає передбачуваний automation boundary, але не замінює контекстне інженерне рішення.'
    }
  ],
  'l21-02': [
    {
      heading: 'Діагностика починається з фактів',
      paragraphs: [
        'Проблему запуску не варто одразу лікувати змінами коду. Спочатку зберіть ОС, shell, поточну директорію, стан Git, версії інструментів, точну команду та перший змістовний фрагмент логу.',
        'Ціль діагностики — перетворити нечіткий симптом на сценарій, який інша людина може повторити з чистого або описаного середовища.'
      ],
      code: [
        {
          language: 'bash',
          caption: 'Мінімальний setup evidence',
          code: `pwd
git status --short
./gradlew --version
node -v
docker --version
docker compose ps
docker compose logs backend --tail=40
grep -n "SPRING_PROFILES_ACTIVE" .env.example`
        }
      ],
      note: 'Склад команд залежить від стеку. Додавайте тільки ті сигнали, які реально допомагають перевірити гіпотезу.'
    },
    {
      heading: 'Відтворюване середовище',
      bullets: [
        'зафіксуйте версії runtime та build tools;',
        'використовуйте lock-файли й wrapper, якщо вони передбачені проєктом;',
        'запишіть package manager, profile, ports і стандартну команду запуску;',
        'перевірте, чи потрібні Docker-сервіси справді запущені;',
        'визначте smoke-сигнал: health endpoint, CLI output або інший observable result.'
      ],
      table: {
        headers: ['Джерело', 'Питання'],
        rows: [
          ['README.md', 'Які команди, версії, порти та змінні заявлені?'],
          ['package scripts / Gradle tasks', 'Які команди фактично доступні?'],
          ['Dockerfile / Compose', 'Який entrypoint, env і порт використовує контейнер?'],
          ['CLAUDE.md', 'Чи відповідають локальні правила фактичній конфігурації?']
        ]
      }
    },
    {
      heading: 'Git і файлова система як baseline',
      steps: [
        'Переконайтеся, що ви в правильній робочій копії через pwd.',
        'Перевірте наявність README, wrapper, lock-файлів, compose-файлів і .env.example.',
        'Запустіть git status --short до початку розслідування.',
        'Відокремте власні локальні зміни від нового симптому.',
        'Порівняйте команду запуску з документацією та scripts.'
      ],
      paragraphs: [
        'Якщо симптом схожий на проблему permissions, окремо перевірте доступ до потрібних файлів, каталогів або Docker-сокета. Не маскуйте permission failure зміною прав навмання.'
      ]
    },
    {
      heading: 'Змінні середовища без витоку секретів',
      paragraphs: [
        '.env.example має описувати імена та безпечні приклади значень, але не містити реальних ключів. Передавайте Claude лише замасковані значення або назви змінних, якщо значення не потрібне для діагнозу.',
        'Порівняйте .env.example, README, Compose і код. Невідома обовʼязкова змінна часто пояснює failure раніше, ніж помилка бізнес-логіки.'
      ],
      code: [
        {
          language: 'dotenv',
          caption: 'Безпечний шаблон змінної',
          code: `PAYMENT_PROVIDER_MODE=sandbox
PAYMENT_API_KEY=<set-locally-never-commit>`
        }
      ],
      note: 'Якщо секрет випадково надруковано в логу, замаскуйте його в evidence і розгляньте ротацію. Не додавайте секрет до Git заради зручного відтворення.'
    },
    {
      heading: 'Гіпотеза, одна перевірка, найменша зміна',
      steps: [
        'Сформулюйте найімовірнішу причину та докази на її підтримку.',
        'Попросіть Claude лише про read-only аналіз і команди перевірки.',
        'Перевірте одну гіпотезу однією командою або малою зміною.',
        'Якщо гіпотеза не підтвердилася, зафіксуйте це й поверніться до фактів.',
        'Після підтвердження внесіть найменше необхідне виправлення та повторіть baseline.'
      ],
      note: 'Завершення діагностики — це не просто «команда більше не падає». Потрібні підтверджена причина, стабільний baseline, smoke-сигнал і запис фактичних результатів у EVIDENCE_LOG.md.'
    }
  ],
  'l21-03': [
    {
      heading: 'GitHub Actions — конкретна реалізація переносної CI-моделі',
      paragraphs: [
        'Переносна CI-модель має однакову логіку незалежно від провайдера: подія запускає workflow, job отримує чистий runner, виконує перевірки, зберігає evidence, а людина приймає рішення про merge.',
        'GitHub Actions — лише один YAML-синтаксис для цієї моделі. Та сама послідовність переноситься на GitLab CI, Jenkins або Bitbucket Pipelines із відповідними назвами полів.'
      ],
      table: {
        headers: ['Поняття', 'Роль'],
        rows: [
          ['Workflow', 'Версіонований YAML-сценарій автоматизації'],
          ['Event', 'Умова запуску, наприклад pull_request до main'],
          ['Job', 'Окрема одиниця роботи на runner'],
          ['Step', 'Команда або action усередині job'],
          ['Runner', 'Тимчасове стандартизоване середовище'],
          ['Artifact', 'Файл, збережений після job для перегляду']
        ]
      }
    },
    {
      heading: 'Мінімальний PR workflow',
      code: [
        {
          language: 'yaml',
          caption: '.github/workflows/pr-check.yml',
          code: `name: PR verification

on:
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      # setup runtime, build і tests додаються нижче`
        }
      ],
      paragraphs: [
        'Workflow має проходити звичайний Git-review. Починайте з contents: read і додавайте інші permissions лише тоді, коли конкретний крок цього вимагає.'
      ],
      note: 'Для реального запуску Claude потрібні CLI та автентифікація. Перевіряйте актуальну схему встановлення і прапорці за документацією встановленої версії; ключ не можна вбудовувати в YAML.'
    },
    {
      heading: 'Claude у CI як обмежений аналізатор',
      artifactIds: ['clawd-runner', 'run-status-yaml', 'diagnosis-json'],
      lab: {
        id: 'l21-03-ci-diagnosis',
        title: 'Класифікувати червоний CI job',
        goal: 'Відокремити test, build, environment, contract і flaky failure та повернути доказовий next action.',
        inputs: ['Job output і status', 'Команда відтворення', 'Мінімальний очищений log context'],
        steps: ['Зберіть статус job і релевантні рядки output.', 'Перевірте, чи failure відтворюється локально.', 'Класифікуйте тип проблеми без автоматичного fix.', 'Запишіть evidence, confidence і next action.', 'Позначте flaky лише за повторною перевіркою, а не за припущенням.'],
        outputs: ['`diagnosis.json` із класифікацією', '`run-status.yaml` або CI evidence record'],
        verification: ['Секрети та зайві логи очищені.', 'Класифікація має конкретний доказ.', 'Наступна дія не запускає небезпечну automation без approval.'],
        stopCondition: 'лог неповний, failure не класифікується або потрібен доступ до секретних даних.',
        artifactIds: ['clawd-runner', 'run-status-yaml', 'diagnosis-json'],
        sourceRefs: ['level-21']
      },
      steps: [
        'Підготуйте конкретний вхідний файл: diff, build log або test log.',
        'Передайте Claude тільки цей вхід і вузький prompt.',
        'Попросіть структурований Markdown або JSON без редагування коду.',
        'Збережіть результат як workflow artifact.',
        'Перегляньте висновок разом із первинним логом перед рішенням.'
      ],
      code: [
        {
          language: 'yaml',
          caption: 'Ілюстрація bounded analysis-кроку',
          code: `- name: Prepare diff
  run: git show --stat --patch --format=medium HEAD > pr.diff

- name: Analyze changes
  env:
    ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
  run: |
    cat pr.diff | claude -p "Стисло опиши зміни та три можливі ризики" > pr-review.md`
        }
      ],
      note: 'Цей приклад показує межу інтеграції, а не гарантує готовність конкретного CLI-прапорця чи permission policy. Перевірте їх у власному runner.'
    },
    {
      heading: 'Secrets, artifacts і timeout',
      bullets: [
        'зберігайте API-ключі в GitHub Secrets;',
        'не друкуйте secrets у prompt, логу або uploaded artifact;',
        'обмежуйте job через timeout-minutes;',
        'використовуйте pull-requests: write лише для усвідомленого автоматичного коментування PR;',
        'завантажуйте тільки потрібні Markdown, JSON або failure-log файли.'
      ],
      code: [
        {
          language: 'yaml',
          caption: 'Збереження результату як artifact',
          code: `- name: Upload review
  uses: actions/upload-artifact@v4
  with:
    name: pr-review
    path: pr-review.md`
        }
      ]
    },
    {
      heading: 'Переносний checklist workflow',
      table: {
        headers: ['Питання', 'Що має бути явно'],
        rows: [
          ['Що запускає pipeline?', 'Event і цільова гілка'],
          ['Де працює job?', 'Runner та його runtime setup'],
          ['Які права доступні?', 'permissions на рівні workflow/job'],
          ['Які команди є джерелом правди?', 'README і локальні scripts'],
          ['Що зберігається?', 'Логи та потрібні artifacts'],
          ['Хто приймає рішення?', 'Людина або branch protection policy, не висновок Claude']
        ]
      },
      note: 'Зелений workflow або позитивний AI-звіт є evidence конкретних перевірок, але не автоматичним дозволом на merge.'
    }
  ],
  'l21-04': [
    {
      heading: 'Build і packaging — це перевірюваний результат',
      paragraphs: [
        'Dockerfile, пакувальний script або Gradle task — лише опис наміру. Артефакт стає корисним після фактичної збірки, запуску й smoke-перевірки в середовищі, близькому до чистого runner.',
        'Пакування потрібно розглядати як узгоджений набір: build-файли, Dockerfile, Compose або команда запуску, README та EVIDENCE_LOG.md.'
      ],
      table: {
        headers: ['Артефакт', 'Що підтверджує'],
        rows: [
          ['Dockerfile', 'Як створюється runtime-образ'],
          ['Compose / run script', 'Як підняти сервіс і передати конфігурацію'],
          ['README.md', 'Як інша людина повторює build і запуск'],
          ['EVIDENCE_LOG.md', 'Які команди, результати та smoke-сигнали реально виконані']
        ]
      }
    },
    {
      heading: 'Multi-stage build і фактичні шляхи',
      code: [
        {
          language: 'dockerfile',
          caption: 'Концептуальна схема build → runtime',
          code: `FROM gradle:latest AS build
WORKDIR /workspace
COPY . .
RUN ./gradlew bootJar

FROM eclipse-temurin:latest
COPY --from=build /workspace/build/libs/app.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]`
        }
      ],
      paragraphs: [
        'Приклад є схемою, а не готовим Dockerfile для кожного проєкту. Назву image, версію базового образу та шлях до JAR потрібно перевірити фактично через build.gradle, результат bootJar і структуру build/libs. Не припускайте, що артефакт завжди називається app.jar.'
      ],
      note: 'Спочатку визначте, де саме падає процес: у вихідній збірці, під час складання образу чи на smoke-запуску. Кожен шар має різну першопричину.'
    },
    {
      heading: 'Чистий build-контекст і відтворюваність',
      bullets: [
        'використовуйте lock-файли, wrapper і зафіксовані версії там, де це підтримує проєкт;',
        'перевіряйте build на чистому runner, а не лише з локальним кешем;',
        'узгодьте README, package scripts, Gradle tasks, Dockerfile та Compose;',
        'не покладайтеся на вже запущений локальний сервіс або прихований .env;',
        'додавайте .dockerignore для .git, .gradle, node_modules, .env та зайвих output-каталогів.'
      ],
      code: [
        {
          language: 'text',
          caption: 'Пакет перевірки після build',
          code: `build / assemble
  -> image exists
  -> container starts
  -> health endpoint responds
  -> command and result recorded`
        }
      ]
    },
    {
      heading: 'Claude допомагає аналізувати, але не підміняє build',
      steps: [
        'Передайте Claude конкретні build.gradle, Dockerfile, Compose-фрагмент і лог помилки.',
        'Попросіть назвати невідповідності та найменші перевірки.',
        'Забороніть широке редагування, dependency updates і push.',
        'Перевірте запропонований шлях або команду фактичним build.',
        'Збережіть результат і smoke-evidence окремо від вихідного коду.'
      ],
      paragraphs: [
        'Якщо bootJar падає, спочатку діагностуйте application build. Якщо контейнер зібрався, але health endpoint не відповідає, досліджуйте runtime, порт, env і час старту. Не маскуйте failure швидким переписуванням Dockerfile.'
      ]
    },
    {
      heading: 'Smoke-check як критерій життєздатності',
      code: [
        {
          language: 'bash',
          caption: 'Концептуальна послідовність запуску сервісу',
          code: `docker compose build backend
docker compose up -d backend
curl --fail http://localhost:8080/actuator/health
docker compose logs backend --tail=40
docker compose down`
        }
      ],
      table: {
        headers: ['Сигнал', 'Що перевірити при failure'],
        rows: [
          ['Build не створив артефакт', 'Gradle/npm команда, залежності та шляхи output'],
          ['Образ не зібрався', 'Dockerfile, context, COPY і base image'],
          ['Контейнер одразу завершується', 'entrypoint, env і runtime log'],
          ['Health endpoint не відповідає', 'порт, readiness, profile і час запуску'],
          ['Локально green, CI red', 'кеші, приховані змінні та відмінності runner']
        ]
      },
      note: 'Smoke-check підтверджує мінімальну життєздатність сервісу, але не замінює unit, integration та contract-тести.'
    }
  ],
  'l21-05': [
    {
      heading: 'Тести в CI — стандартизований доказ',
      paragraphs: [
        'Локальні тести дають швидкий feedback, а CI повторює ключові припущення у чистому стандартизованому середовищі. Типовий backend job може поєднати unit або service tests, integration/API checks, build JAR і smoke health endpoint.',
        'Назви задач і потреба в тестових сервісах залежать від проєкту. Важливо, щоб workflow використовував ті самі базові команди, що й README та локальна розробка.'
      ],
      table: {
        headers: ['Шар', 'Приклад сигналу'],
        rows: [
          ['Unit / service', 'Локальна бізнес-логіка та правила'],
          ['Integration / API', 'Взаємодія сервісу, БД, конфігурації та контракту'],
          ['Build', 'Компіляція, залежності та пакування'],
          ['Smoke', 'Запуск і health endpoint'],
          ['Frontend', 'Install із lockfile, тести, build і короткий запуск']
        ]
      }
    },
    {
      heading: 'Як читати червоний job',
      steps: [
        'Знайдіть step, який завершився помилкою.',
        'Відшукайте перше змістовне повідомлення про збій.',
        'Відокремте первинну помилку від каскадних повідомлень.',
        'Зіставте failure зі зміненими файлами та конфігурацією job.',
        'Повторіть тільки повʼязаний job після мінімального виправлення.'
      ],
      note: 'Довгий лог не потрібно читати від початку до кінця. Зафіксуйте команду, step, ключовий доказ і очікуваний результат у EVIDENCE_LOG.md.'
    },
    {
      heading: 'Класифікація failure',
      table: {
        headers: ['Категорія', 'Ознаки', 'Перший напрямок'],
        rows: [
          ['code', 'Exception, неправильна відповідь або результат', 'Змінений код і його контракт'],
          ['test', 'Застаріле або некоректне очікування', 'Відповідність тесту бізнес-правилу'],
          ['environment', 'Порт, сервіс або env не налаштовані', 'Runtime і конфігурація job'],
          ['dependency', 'npm/Gradle, lockfile або несумісна версія', 'Залежності та wrapper'],
          ['flaky', 'Нестабільний результат без зміни коду', 'Повторюваність та історія запусків'],
          ['infrastructure / permissions', 'Runner, мережа, timeout або відсутній доступ', 'Стан CI і permissions']
        ]
      },
      paragraphs: [
        'Падіння тесту не доводить автоматично, що зламано продукт. Можливо, функціональність змінилася свідомо й застарів тест. Порівнюйте assertion із бізнес-правилом і evidence з логу.'
      ]
    },
    {
      heading: 'Claude як діагност, а не автоматичний ремонтник',
      code: [
        {
          language: 'text',
          caption: 'Bounded prompt для аналізу CI failure',
          code: `Input: failing job log and changed-file list
Return:
- failure category
- probable root cause
- evidence from the log
- smallest verification command
- next action
Do not edit files, disable tests, or hide the failure.`
        }
      ],
      steps: [
        'Передайте лише релевантний лог і список змінених файлів.',
        'Попросіть відрізнити symptom, hypothesis і підтверджений факт.',
        'Перевірте гіпотезу локально або повторним вузьким job.',
        'Зробіть мінімальний fix після підтвердження.',
        'Не приймайте AI-висновок без первинного доказу.'
      ]
    },
    {
      heading: 'Flaky-тести, rerun і evidence',
      additionalMaterials: [
        { label: 'Презентація рівня 21', href: 'https://ua-claude-code-17-54d2.javarush-university.workers.dev/', kind: 'presentation' },
        { label: 'YouTube-відео рівня 21', href: 'https://www.youtube.com/watch?v=C8JXMu693Bg', kind: 'video' },
        { label: 'Факультативне YouTube-відео', href: 'https://www.youtube.com/watch?v=bk-aYpap4nc', kind: 'optional-resource' },
      ],
      artifactIds: ['postmortem'],
      paragraphs: [
        'Один успішний rerun не доводить, що проблема зникла. Він лише показує, що тест може проходити нестабільно. Зафіксуйте частоту, умови, логи та свідоме рішення щодо ізоляції або виправлення.',
        'Тимчасове вимкнення тесту робить pipeline зеленим, але прибирає сигнал регресії. Замість цього відокремте code, test, environment, dependency, flaky або infrastructure причину.'
      ],
      table: {
        headers: ['Подія', 'Evidence для запису'],
        rows: [
          ['Невдалий job', 'Назва step, перша помилка, команда і commit context'],
          ['Гіпотеза', 'Чому вона пояснює симптом'],
          ['Мінімальний fix', 'Змінені файли та non-goals'],
          ['Повторна перевірка', 'Той самий сценарій і фактичний результат'],
          ['Flaky signal', 'Кілька запусків, умови та подальше рішення']
        ]
      },
      note: 'Після кожного рівня автоматизації зберігайте evidence, яке може перевірити інша людина. CI надає сигнал, але людський review визначає, чи достатньо його для merge.'
    }
  ]
};
