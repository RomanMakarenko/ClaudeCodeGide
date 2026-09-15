import type { GuideSection } from '../types/guide';

export const levelTwentySixContent: Record<string, GuideSection[]> = {
  'l26-01': [
    {
      heading: 'Legacy — це невизначеність, а не просто вік',
      paragraphs: [
        'Legacy-система не визначається лише роком створення або старою технологією. Важливішими сигналами є слабко задокументована поведінка, незрозуміле ownership і висока ціна помилки. Навіть відносно новий модуль стає legacy-зоною, якщо команда не може впевнено пояснити його контракти та наслідки змін.',
        'Мета discovery — не знайти винного і не довести, що код треба переписати. Потрібно зібрати достатньо evidence, щоб розділити підтверджені факти, unknowns і області, де зміна потребує додаткового контролю.'
      ],
      bullets: [
        'weakly documented behavior: реальна поведінка відома переважно з коду або усних пояснень;',
        'unclear ownership: незрозуміло, хто підтвердить business rule або прийме ризик;',
        'high failure cost: помилка впливає на гроші, доступ, дані або критичний операційний процес.'
      ],
      artifactIds: ['codebase-inventory', 'module-inventory'],
    },
    {
      heading: 'Що потрібно знайти до будь-якої зміни',
      table: {
        headers: ['Область discovery', 'Питання', 'Можливе evidence'],
        rows: [
          ['Підсистеми', 'Які модулі беруть участь у потрібному сценарії?', 'каталоги, entry points, imports, service boundaries'],
          ['Critical runtime flows', 'Який шлях проходять input, рішення та output?', 'код, логи, integration tests, configuration'],
          ['Change-risk areas', 'Де мала зміна може мати широкий або дорогий вплив?', 'shared utilities, retries, flags, dates, money paths'],
          ['Existing coverage', 'Які сценарії вже перевіряються і на якому рівні?', 'unit/integration tests, coverage report, CI checks'],
          ['Unknowns', 'Що залишається непідтвердженим?', 'відсутній owner, суперечливі docs, manual verification']
        ]
      },
      paragraphs: [
        'Перевіряйте не тільки source code. Tests показують закріплені очікування, configuration — умови запуску, logs — фактичні runtime-сигнали, а Git history — зони частих змін і попередні рішення. Жоден із цих шарів не є достатнім сам по собі.'
      ]
    },
    {
      heading: 'Read-only discovery з evidence anchors',
      steps: [
        'Зафіксуйте scope і заборону редагування в discovery-note.',
        'Побудуйте список ключових підсистем та entry points.',
        'Простежте critical flows через code, tests, configuration і logs.',
        'Перевірте Git history, ownership та наявні coverage signals.',
        'Для кожного матеріального твердження додайте evidence anchor: шлях, символ, команду, log-сигнал або commit.',
        'Винесіть непідтверджені питання в окремий список unknowns.',
        'Лише після discovery підготуйте draft `RISK_MAP.md`; код не змінюйте.'
      ],
      note: 'Discovery виконується в read-only або plan-mode. Його результат — карта фактів і невідомого, а не patch та не обіцянка, що система безпечна.'
    },
    {
      heading: 'Фокус для навчального legacy-сценарію',
      paragraphs: [
        'Як приклад для дослідження можна взяти `mrr-engine`, `payments`, retry logic, configuration і feature flags. Окремо перевірте `legacy/`, pause/resume та timezone calculations. Повідомлена 8% MRR discrepancy є input для розслідування, але не доведеним root cause: її потрібно привʼязати до конкретних даних, коду або log evidence.',
        'Discovery-note зручно вести таблицею: «Підсистема», «Що підтверджено», «Які тести є», «Що неясно», «Чому це ризик». У кінці додайте перелік джерел і рішення, які ще потребують owner або ручної перевірки.'
      ],
      artifactIds: ['critical-flows', 'risk-map'],
    },
    {
      heading: 'Вихід discovery',
      bullets: [
        'CODEBASE_INVENTORY.md дає навігаційну карту, а MODULE_INVENTORY.md — деталізацію меж і ownership;',
        'CRITICAL_FLOWS.md показує runtime-потоки, які не можна випадково втратити;',
        'discovery-note відділяє facts, assumptions та unknowns;',
        'draft RISK_MAP.md перетворює зібрані сигнали на наступні рішення;',
        'жоден висновок не називайте підтвердженим без anchor на evidence.'
      ]
    }
  ],
  'l26-02': [
    {
      heading: 'Technical debt signal — це індикатор, не доказ дефекту',
      paragraphs: [
        'Static signal допомагає вирішити, де потрібне глибше дослідження. Він не доводить сам по собі наявність bug, неправильного дизайну або необхідність refactor. Наприклад, TODO, низьке coverage чи частий Git churn можуть мати законне пояснення — тому signal потрібно поєднати з контекстом і потенційним впливом.',
        'Для одного discovery-циклу обмежте набір максимум пʼятьма найсильнішими сигналами. Кожен signal має бути однією думкою у форматі: область + evidence + ризик + наступний крок.'
      ],
      artifactIds: ['debt-signals'],
    },
    {
      heading: 'П’ять класів сигналів',
      table: {
        headers: ['Signal', 'Що перевіряє', 'Межа висновку'],
        rows: [
          ['Source structure', 'складність, дублювання, legacy paths, великі модулі', 'не означає, що код має defect'],
          ['Tests and coverage', 'відсутні сценарії, слабкі assertions, coverage gaps', 'coverage не дорівнює якості поведінки'],
          ['Change history and ownership', 'Git churn, відсутній owner, часті emergency changes', 'часті зміни можуть бути очікуваним розвитком'],
          ['Configuration and build', 'warnings, precedence, feature flags, dependency drift', 'warning потребує класифікації та впливу'],
          ['Known reports', 'TODO/FIXME, incidents, user reports, discrepancy', 'report — input для перевірки, не root cause']
        ]
      }
    },
    {
      heading: 'Приклади evidence-backed signals',
      bullets: [
        '`mrr-engine/MrrFormulas.java` має Git churn, який потрібно зіставити з формулою, тестами та reported discrepancy;',
        '`subscriptions/SubscriptionService.java` треба перевірити разом із `tests/integration/MrrSnapshotIT.java`, а не робити висновок лише з назви сервісу;',
        '`legacy/OldBillingUtils.java` — сигнал широкого впливу, якщо його викликають кілька flows, але слабкі тести залишають поведінку невідомою;',
        '`PaymentRetryService.java` і `reporting/ReportCsvFormatter.java` потребують різних risk hypotheses: recovery грошей та стабільність зовнішнього формату;',
        '`application.yml`, JaCoCo report і TODO/FIXME search можуть пояснити configuration, coverage та maintenance signals.'
      ],
      artifactIds: ['module-inventory'],
    },
    {
      heading: 'Команди — лише джерела, не автоматичний verdict',
      code: [
        {
          language: 'bash',
          caption: 'Приклади збору signals без редагування',
          code: `git log --since="1 year ago" --oneline -- mrr-engine/MrrFormulas.java
./gradlew test jacocoTestReport
grep -R "TODO\\|FIXME" -n legacy/`
        }
      ],
      paragraphs: [
        'Результат кожної команди запишіть із датою, scope і обмеженням. Не вигадуйте coverage percentage або кількість warning, якщо команда фактично не запускалася. Гіпотезу позначайте словом «гіпотеза», а наступним кроком робіть конкретну перевірку: відкрити test, простежити caller, знайти owner або виконати manual scenario.'
      ]
    },
    {
      heading: 'Як скоротити signal log до корисного набору',
      steps: [
        'Зберіть широкий список можливих indicators.',
        'Відкиньте сигнали без зрозумілого evidence anchor.',
        'Обʼєднайте дублікати, щоб одна думка не зʼявлялася кілька разів.',
        'Залиште максимум пʼять сигналів із найвищим поєднанням впливу та невизначеності.',
        'Для кожного запишіть ризик і один наступний крок.',
        'Перенесіть наслідки до RISK_MAP.md, не перетворюючи signal log на backlog усіх бажаних refactors.'
      ],
      note: 'Static signals допомагають пріоритизувати discovery. Вони не є дозволом змінювати код і не замінюють domain owner, runtime evidence або acceptance criteria.'
    }
  ],
  'l26-03': [
    {
      heading: 'ARCHITECTURE_CURRENT.md описує today, а не бажане завтра',
      paragraphs: [
        '`ARCHITECTURE_CURRENT.md` має відтворювати фактичну current-state architecture: підсистеми, потоки, межі, configuration і залежності, які підтверджені кодом та іншими джерелами. Це не місце для desired architecture, backlog або рекламного опису системи.',
        'Якщо code і старі docs суперечать одне одному, code є authoritative для фактичної поведінки, але саму розбіжність потрібно зафіксувати. `ARCHITECTURE.md` не переписуйте автоматично: збережіть його як historical documentation і явно покажіть, що треба перевірити.'
      ],
      artifactIds: ['architecture-current'],
    },
    {
      heading: 'Три рівні впевненості',
      table: {
        headers: ['Мітка', 'Що означає', 'Приклад'],
        rows: [
          ['Confirmed fact', 'є прямий evidence anchor', '`PaymentRetryService` викликає конкретний retry client у source code'],
          ['Assumption / inferred', 'логічне припущення, яке ще не підтверджене', 'ownership команди inferred з CODEOWNERS або Git history'],
          ['Manual verification', 'потрібна перевірка поза static reading', 'timezone precedence або повний pause/resume flow у running environment']
        ]
      },
      paragraphs: [
        'Не змішуйте ці рівні в одному реченні. Читач документа повинен одразу бачити, що є фактом, що виведено з непрямого сигналу, а що ще потребує ручного запуску або питання до owner.'
      ]
    },
    {
      heading: 'Рекомендована структура current-state документа',
      code: [
        {
          language: 'markdown',
          caption: 'Каркас ARCHITECTURE_CURRENT.md',
          code: `# ARCHITECTURE_CURRENT.md

## Що це за документ
## Підсистеми
## Критичні потоки
## Підтверджені факти
## Припущення
## Що потрібно перевірити вручну
## Розбіжності з історичною документацією`
        }
      ],
      bullets: [
        'для кожної підсистеми вкажіть boundary, entry points, залежності та evidence;',
        'для кожного потоку опишіть input, рішення, side effects і output;',
        'inferred ownership позначайте явно як `inferred`, а не як підтверджений факт;',
        'додавайте дату або revision context, якщо behavior може змінюватися.'
      ]
    },
    {
      heading: 'Повʼязані карти не дублюють одна одну',
      paragraphs: [
        'CODEBASE_INVENTORY.md відповідає на питання «де що лежить», MODULE_INVENTORY.md — «які межі та відповідальні області», CRITICAL_FLOWS.md — «як проходить runtime-сценарій», а ARCHITECTURE_CURRENT.md — «як ці частини фактично складаються в систему». RISK_MAP.md додає вимір рішення: що робити з невизначеністю та впливом.',
        '`BEHAVIOR_INVENTORY.md` дивиться з боку бізнес-потоків і observable behavior. Він може посилатися на current architecture, але не повинен перетворюватися на список класів.'
      ],
      artifactIds: ['codebase-inventory', 'critical-flows', 'behavior-inventory', 'risk-map'],
    },
    {
      heading: 'Документування без вигадування',
      steps: [
        'Зберіть evidence anchors із source, tests, configuration і logs.',
        'Запишіть підтверджені факти окремо від припущень.',
        'Винесіть code/docs discrepancies у власну секцію.',
        'Сформулюйте manual verification як конкретний сценарій або питання до owner.',
        'Попросіть reviewer перевірити, чи current-state опис не підмінено бажаним дизайном.',
        'Звʼяжіть документ із risk map і behavior inventory.'
      ],
      note: 'Якісний current-state документ може містити unknowns. Приховати невідоме під впевненою architectural схемою небезпечніше, ніж чесно залишити manual verification.'
    }
  ],
  'l26-04': [
    {
      heading: 'Business criticality і change risk — різні dimensions',
      paragraphs: [
        'Business criticality показує, наскільки болючим буде збій для користувачів або бізнесу. Change risk показує, наскільки легко саме запропонована зміна може порушити поведінку. Критичний flow може мати низький change risk для добре ізольованої правки, а другорядний модуль — високий change risk через shared utility та відсутність тестів.',
        'Не зводьте ці dimensions до одного score. Додайте visible unknowns: невідомий owner, неперевірена configuration precedence або суперечливі docs впливають на рішення навіть тоді, коли business impact ще не оцінений.'
      ],
      artifactIds: ['risk-map'],
    },
    {
      heading: 'Мінімальний запис risk map',
      table: {
        headers: ['Поле', 'Що зафіксувати'],
        rows: [
          ['Area', 'підсистема, flow або конкретний модуль'],
          ['Business criticality', 'low / medium / high та чому це важливо'],
          ['Change risk', 'low / medium / high і механізм можливого впливу'],
          ['Risk categories', 'money, integration, data, dates, ownership, coverage тощо'],
          ['Evidence', 'шляхи, тести, logs, Git history, reports'],
          ['Missing checks', 'що саме ще не перевірено'],
          ['Recommended action', 'конкретне рішення та наступний крок']
        ]
      }
    },
    {
      heading: 'Приклади рішень, а не generic improve',
      bullets: [
        '`mrr-engine / pause-resume MRR`: high business criticality і high change risk; приблизно 25% coverage та можлива code/docs discrepancy — characterize behavior і перевірити owner до зміни;',
        '`payments / retry recovery`: high/high через money та external integration — зібрати recovery evidence і звузити scope до одного retry path;',
        '`config / timezone + feature flags`: medium/high — документувати precedence і виконати manual verification для дат та прапорців;',
        '`legacy/OldBillingUtils.java`: broad impact і weak tests — спочатку побудувати module/flow map, а не починати масовий refactor.'
      ],
      note: 'Число coverage або конкретний discrepancy у прикладі є сигналом для перевірки, а не дозволом подавати його як результат власного запуску. Підтверджуйте такі значення власними evidence anchors.'
    },
    {
      heading: 'Операційні дії з risk map',
      steps: [
        'characterize current behavior для high/high flow;',
        'gather more evidence, якщо unknowns блокують оцінку;',
        'identify an owner для business rule або критичної інтеграції;',
        'document configuration precedence, якщо behavior залежить від кількох шарів;',
        'hold the change або narrow the scope, якщо evidence недостатньо;',
        'freeze changes чи defer work, якщо ризик перевищує готовність перевірок.'
      ],
      paragraphs: [
        'Risk map має вести до рішення: що можна робити зараз, що потребує доказів, а що слід відкласти. Формулювання «покращити якість» без owner, scope і перевірки не є operational action.'
      ]
    },
    {
      heading: 'Git churn як допоміжний сигнал',
      code: [
        {
          language: 'bash',
          caption: 'Порахувати згадки шляху в історії змін',
          code: `git log --since="1 year ago" --name-only --pretty=format: \\
  | grep 'mrr-engine/MrrFormulas.java' | wc -l`
        }
      ],
      paragraphs: [
        'У навчальному прикладі результатом може бути 11, але це потрібно трактувати лише як signal churn. Саме число без періоду, джерела та порогу не доводить ризик. Додайте його до evidence, порівняйте з іншими модулями й вирішіть, чи потрібне deeper discovery.'
      ],
      artifactIds: ['debt-signals', 'module-inventory'],
    }
  ],
  'l26-05': [
    {
      heading: 'BEHAVIOR_INVENTORY.md описує бізнес-потоки',
      paragraphs: [
        '`BEHAVIOR_INVENTORY.md` потрібен перед змінами в системі, де важлива фактична поведінка. Це не список файлів і не architectural diagram: кожен запис описує business flow, inputs, observable outputs, existing tests, missing checks і candidate на characterization.',
        'Кандидат має мати явне значення `yes` або `no`. `yes` доречний для high-risk/high-business-criticality flow, uncovered edge case або ситуації, де code і documentation суперечать одне одному.'
      ],
      artifactIds: ['behavior-inventory'],
    },
    {
      heading: 'Схема одного запису',
      table: {
        headers: ['Поле', 'Зміст'],
        rows: [
          ['Потік', 'Назва бізнес-сценарію та його межі'],
          ['Поточна поведінка', 'Що система фактично робить, із позначенням впевненості'],
          ['Входи', 'Відтворювані дані, стан, час, flags або події'],
          ['Виходи', 'Статуси, суми, дати, записи, повідомлення чи side effects'],
          ['Існуючі тести', 'Тести та рівень, який вони покривають'],
          ['Бракує перевірок', 'Конкретні uncovered conditions або manual checks'],
          ['Кандидат на characterization', '`yes` / `no` та коротке обґрунтування'],
          ['Докази', 'Source, test, config, log або інший anchor']
        ]
      }
    },
    {
      heading: 'П’ять обовʼязкових потоків',
      bullets: [
        'pause/resume subscription — перевірте стан підписки, pause interval, resume date і наступне списання;',
        'partial refund in the middle of billing period — зафіксуйте суму, період, округлення та observable ledger output;',
        'failed payment followed by successful retry — розділіть failure, retry schedule, повторний успіх і повідомлення користувачу;',
        'plan switch on billing day — перевірте precedence дати, старий/новий план і суму на межі періоду;',
        'upgrade/downgrade in the middle of a period — відокремте prorating, effective date, credits і майбутній invoice.'
      ],
      artifactIds: ['critical-flows'],
    },
    {
      heading: 'Inputs, outputs і evidence мають бути відтворюваними',
      paragraphs: [
        'Для кожного flow вкажіть мінімальний набір inputs: ідентифікатор стану, timestamp або billing date, plan, amount, feature flag і зовнішню подію, якщо вона потрібна. Outputs мають бути спостережуваними: status transition, invoice/refund amount, next billing date, persisted record або повідомлення. Не записуйте «працює правильно» без конкретного observable result.',
        'Existing tests покажіть із шляхом і рівнем. Якщо тестів немає, це missing check, а не доказ, що behavior неправильний. Розділяйте confirmed facts, assumptions і manual verification так само, як у ARCHITECTURE_CURRENT.md.'
      ],
      artifactIds: ['architecture-current', 'module-inventory'],
    },
    {
      heading: 'Від inventory до characterization candidate',
      steps: [
        'Виберіть приблизно 10–15 найсильніших кандидатів, а не кожну можливу умову.',
        'Поставте `yes` для дорогих, невкритих або суперечливих flows; поставте `no`, якщо behavior уже достатньо підтверджена і ризик низький.',
        'Запишіть reproducible inputs і observable outputs.',
        'Додайте evidence anchors і список того, що треба перевірити вручну.',
        'Передайте high/high entries у RISK_MAP.md з конкретною дією.',
        'Не пишіть characterization tests у межах цього discovery-завдання.'
      ],
      note: 'Код тестів не пропонуй. На цьому етапі потрібні інвентаризація поведінки, evidence і рішення про пріоритет; реалізація тестів є окремою задачею з власним scope та approval.'
    }
  ]
};
