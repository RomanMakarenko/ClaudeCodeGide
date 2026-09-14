import type { GuideSection } from '../types/guide';

export const levelTwentyThreeContent: Record<string, GuideSection[]> = {
  'l23-01': [
    {
      heading: 'Ризик визначають до запуску Claude',
      paragraphs: [
        'Ризик задачі потрібно оцінити до написання prompt і до запуску Claude. Це допомагає заздалегідь визначити допустимий режим роботи та можливий масштаб помилки.',
        'Не змішуйте опис задачі, план перевірки, класифікацію ризику й capability envelope. Task spec відповідає на питання «що зробити», а envelope — «що Claude може робити в межах цієї задачі».'
      ],
      table: {
        headers: ['Рівень', 'Типові області', 'Режим роботи'],
        rows: [
          ['Низький', 'Документація або малий локальний refactor із тестами', 'Обмежене редагування у визначеній області'],
          ['Потрібен review', 'Код, конфігурація, залежності та API-контракти', 'Спочатку analysis і plan, потім зміни під контролем людини'],
          ['Високий', 'Production, база даних, secrets, спільна інфраструктура, irreversible actions', 'План, checklist і матеріали; виконання робить людина']
        ]
      },
      note: 'Якщо категорію важко визначити, обирайте режим із review. Невизначеність не є підставою послаблювати обмеження.'
    },
    {
      heading: 'Capability envelope задачі',
      bullets: [
        'рівень ризику та критерії його підвищення;',
        'дозволені інструменти, файли, каталоги й команди;',
        'необхідні схвалення та відповідальні особи;',
        'обовʼязкові перевірки: tests, lint, build, contract checks;',
        'заборонені області та дії;',
        'план відкату й умови зупинки.'
      ],
      code: [
        {
          language: 'text',
          caption: 'Приклад короткого envelope',
          code: `Risk: review-required
Allowed: read support/**, edit one service, run focused tests
Ask before: files outside support/** or config changes
Deny: payments/**, migrations/**, .env*, force push
Required: regression test, diff review, rollback note
Stop: if public API or production access is involved`
        }
      ]
    },
    {
      heading: 'Ризик змінюється разом із контекстом',
      table: {
        headers: ['Задача', 'Класифікація'],
        rows: [
          ['Заміна команди запуску в README', 'Низький ризик за умови практичної перевірки'],
          ['Виправлення сортування refund-заявок', 'Review-рівень і regression evidence'],
          ['Зміна публічного refund API', 'Review-рівень через ризик порушення контракту'],
          ['Ручний SQL у production-базі', 'Високий ризик'],
          ['Ротація production-ключа', 'Високий ризик; Claude лише готує план']
        ]
      },
      paragraphs: [
        'Текстовий формат не означає низький вплив: конфігурація може змінити доступи, checkout або сумісність сервісів. Якщо під час роботи зʼявилася production, API чи database зона, перекласифікуйте задачу й оновіть envelope.'
      ]
    },
    {
      heading: 'Режим роботи за рівнем ризику',
      steps: [
        'Для низького ризику обмежте файл або каталог і вимагайте diff.',
        'Для review-рівня спочатку доручіть read-only discovery та короткий план.',
        'Після людського підтвердження виконайте один вузький крок і перевірки.',
        'Для високого ризику дозвольте лише аналіз, checklist, залежності та rollback plan.',
        'Перед зовнішньою або незворотною дією отримайте окреме рішення відповідальної людини.'
      ],
      note: 'Базові командні правила можна зберігати в RISK_CLASSIFICATION.md, посилатися на них із CLAUDE.md, а envelope конкретної задачі додавати до PR.'
    },
    {
      heading: 'Докази перед розширенням можливостей',
      paragraphs: [
        'Надання Claude ширших доступів не замінює перевірку результату. Для кожного дозволу має бути зрозуміло, яку потребу він покриває, який evidence його виправдовує і як можна зупинити роботу.',
        'Практичний baseline: спочатку read-only аналіз, потім мінімальна зміна, targeted verification і review фактичного diff.'
      ],
      bullets: [
        'не надавайте write-доступ «про запас»;',
        'не вважайте успішний prompt доказом коректності;',
        'не дозволяйте high-risk операції лише через green tests;',
        'зупиняйтеся, якщо межі задачі стали ширшими за envelope.'
      ]
    }
  ],
  'l23-02': [
    {
      heading: 'L3 — командний baseline дозволів',
      paragraphs: [
        'L3 визначає правила для всього репозиторію й команди. Він не залежить від особистих налаштувань розробника або конкретного агента. Якщо L3 забороняє редагування payments/**, локальний дозвіл сесії не повинен це скасовувати.',
        'L1 описує можливості поточної сесії, L2 — межі окремого агента або workflow, а L3 — спільну політику проєкту. Ці рівні накладаються, а не замінюють один одного.'
      ],
      table: {
        headers: ['Рівень', 'Фокус'],
        rows: [
          ['L1', 'Поточна сесія та її активні capabilities'],
          ['L2', 'Окремий агент або workflow'],
          ['L3', 'Командний baseline і protected policy репозиторію']
        ]
      }
    },
    {
      heading: 'Allow, Ask і Deny',
      table: {
        headers: ['Режим', 'Коли застосовувати', 'Приклади'],
        rows: [
          ['Allow', 'Низькоризикові дії', 'Read, search, diagnostics, tests'],
          ['Ask', 'Зміна коду або стану репозиторію', 'Edit, write, config change, push'],
          ['Deny', 'Неприйнятний ризик', 'Secrets, destructive commands, protected paths, force push']
        ]
      },
      note: 'Дозволи визначають не кількість підтверджень, а наслідки можливої помилки. Protected paths потребують жорсткого барʼєра, а не лише нагадування в prompt.'
    },
    {
      heading: 'Protected paths і enforcement',
      bullets: [
        'payments/** — фінансові операції та платіжні інтеграції;',
        'migrations/** — зміни структури даних, іноді незворотні;',
        '.env* — ключі, токени та середовищна конфігурація;',
        'infra/** — деплой, доступи й інфраструктура.'
      ],
      steps: [
        'Опишіть командну політику в settings або іншій підтримуваній конфігурації.',
        'Додайте hook перед Edit або Write для критичних шляхів.',
        'Продублюйте очікувану поведінку в CLAUDE.md або rules-файлі.',
        'Перевірте, що deny-rule або hook справді блокує дію.',
        'Залиште audit trail для спроб доступу та схвалень.'
      ],
      note: 'CLAUDE.md пояснює правила, але сам по собі не гарантує enforcement. Критичний захист має бути технічним і командним.'
    },
    {
      heading: 'Де зберігати політику',
      table: {
        headers: ['Scope', 'Роль'],
        rows: [
          ['Project', 'Спільні правила репозиторію'],
          ['Managed', 'Обовʼязкові організаційні обмеження'],
          ['User', 'Особисті налаштування'],
          ['Local', 'Параметри конкретної робочої копії']
        ]
      },
      paragraphs: [
        'Критичні заборони не варто залишати лише в user або local settings: вони не дадуть однакового захисту всій команді. Водночас deny-зона не повинна бути надмірною, інакше люди почнуть обходити систему.'
      ]
    },
    {
      heading: 'Перевірка L3-межі',
      bullets: [
        'чи однаково policy застосовується до різних сесій і агентів;',
        'чи є окремий Ask для змін поза робочою областю;',
        'чи заблоковані secrets, destructive commands і force push;',
        'чи не покладається захист лише на текст CLAUDE.md;',
        'чи документовані permissions для хмарних планувальників та ревʼю.'
      ],
      note: 'Точний синтаксис permission-файлів, hooks і назви команд можуть змінюватися між версіями Claude Code. Звіряйте policy з актуальною документацією та фактичним тестом.'
    }
  ],
  'l23-03': [
    {
      heading: 'Permissions не очищують небезпечні дані',
      paragraphs: [
        'Permissions обмежують дії Claude, а data hygiene визначає, що ви самі передаєте в контекст. Навіть read-only доступ не захищає від небезпечного copy-paste у prompt.',
        'Дані, що потрапили в сесію, можуть зʼявитися в transcript, tool output, summary, screenshot або згенерованому документі. Тому захист починається до запуску аналізу.'
      ],
      table: {
        headers: ['Категорія', 'Приклади', 'Безпечна заміна'],
        rows: [
          ['Secrets', 'API keys, JWT secret, database URL, passwords', 'Назва змінної, маска, .env.example'],
          ['PII', 'Email, телефон, адреса, історія замовлень', 'Synthetic user, masking, узагальнення'],
          ['Operations', 'Внутрішні URL, trace ID, authorization headers', 'Очищений короткий лог'],
          ['Finance', 'Реальні суми, маржа, discount rules', 'Синтетичні значення зі збереженням порогів'],
          ['Support artifacts', 'Тікети, screenshots адмінки, переписка', 'Очищений summary або обрізаний screenshot']
        ]
      }
    },
    {
      heading: 'Redaction зберігає причину, а не особу',
      paragraphs: [
        'Мета redaction — прибрати ідентифікацію, але зберегти інформацію, потрібну для відтворення проблеми. Не замінюйте всі значення однаковими ***: так можна втратити порядок подій, пороги або звʼязок між станами.',
        'Для refund-багу корисно залишити поріг суми, фактичний і очікуваний статус, але замінити справжній order ID та дані клієнта.'
      ],
      bullets: [
        'збережіть пороги та діапазони;',
        'збережіть порядок подій і стани до та після;',
        'за потреби збережіть формат і довжину ідентифікатора;',
        'приберіть токени, email, внутрішні хости та зайві ID.'
      ]
    },
    {
      heading: '.env і логи без витоку',
      code: [
        {
          language: 'dotenv',
          caption: 'Безпечний приклад конфігурації',
          code: `PAYMENT_PROVIDER_MODE=sandbox
PAYMENT_API_KEY=<set-locally-never-commit>`
        }
      ],
      bullets: [
        'не передавайте Claude справжній .env;',
        'не зберігайте ключі в CLAUDE.md або CLAUDE.local.md;',
        'не виводьте cat .env або curl -v із заголовками;',
        'передавайте короткий очищений фрагмент логу;',
        'перевіряйте, що evidence, PR description і handoff не містять secrets.'
      ],
      note: 'Секретом є не лише пароль. Внутрішній URL, trace ID, фінансове правило або підписаний asset також можуть бути чутливими.'
    },
    {
      heading: 'Поверхні можливого витоку',
      table: {
        headers: ['Поверхня', 'Що перевірити'],
        rows: [
          ['Prompt і task spec', 'Чи немає ключів, PII та приватних URL'],
          ['Terminal і transcript', 'Чи не надруковано сирий env або повний production-log'],
          ['Tool outputs і snapshots', 'Чи не скопійовано чутливий файл у результат'],
          ['Screenshots і summaries', 'Чи очищені візуальні та субагентські артефакти'],
          ['Evidence і PR', 'Чи безпечно їх зберігати та поширювати']
        ]
      },
      paragraphs: [
        '/clear очищує поточний діалог, але не видаляє вже створені файли, експорти або переслані summaries. Subagent ізолює міркування, проте його результат також потрібно перевіряти.'
      ]
    },
    {
      heading: 'Якщо секрет уже потрапив у контекст',
      steps: [
        'Зупиніть подальше поширення transcript або output.',
        'Замініть або ротуй­те ключ, token чи пароль відповідно до процесу.',
        'Перевірте згенеровані файли, логи та нотатки.',
        'Видаліть небезпечні копії за внутрішньою процедурою.',
        'Не передавайте сирий матеріал іншим агентам чи колегам.'
      ],
      note: 'Для хмарної поверхні перед запуском перевірте, які файли, diff, metadata та логи можуть залишити локальне середовище.'
    }
  ],
  'l23-04': [
    {
      heading: 'Sandbox зменшує наслідки помилки',
      paragraphs: [
        'Permissions обмежують дозволені дії, а sandbox визначає середовище їх виконання. Пісочниця потрібна не лише для того, щоб заборонити небезпечну команду, а й для зменшення наслідків помилки.',
        'Перед початком визначте дозволені paths і commands, заборонені системні або production-зони, мережеві доступи та тип даних, із якими можна працювати.'
      ],
      table: {
        headers: ['Рівень ізоляції', 'Коли доречний', 'Що не вирішує'],
        rows: [
          ['Окрема гілка', 'Малі зміни та обовʼязковий review', 'Не ізолює локальне оточення'],
          ['Git worktree', 'Великі або експериментальні зміни', 'Не ізолює env, порти й локальні бази'],
          ['Контейнер', 'Залежності, runtime і тестові сервіси', 'Не є повною VM-межею'],
          ['Віртуальна машина', 'Особливо небезпечні системні експерименти', 'Потребує більше ресурсів і часу']
        ]
      }
    },
    {
      heading: 'Ізолюйте код, середовище й дані разом',
      bullets: [
        'використовуйте test DB замість production;',
        'генеруйте synthetic records;',
        'передавайте fake credentials або лише необхідні env;',
        'вмикайте test profile конфігурації;',
        'не вважайте навіть санітизований production dump автоматично безпечним.'
      ],
      note: 'Окрема папка недостатня, якщо процес усе ще підключається до справжньої бази або має production secret.'
    },
    {
      heading: 'Практичний sandbox workflow',
      steps: [
        'Класифікуйте ризик задачі.',
        'Оберіть branch, worktree, container або VM.',
        'Винесіть роботу з основної копії.',
        'Підключіть тільки test DB і синтетичні дані.',
        'Обмежте команди, paths, мережу та secrets.',
        'Запустіть build, тести й перевірку побічних ефектів.',
        'Перегляньте diff і прийміть окреме людське рішення.',
        'Після роботи приберіть тимчасові контейнери, дані, worktree й непотрібні гілки.'
      ]
    },
    {
      heading: 'Вибір ізоляції за сценарієм',
      table: {
        headers: ['Сценарій', 'Рекомендована межа'],
        rows: [
          ['Документація або мала правка', 'Окрема гілка'],
          ['Значна зміна коду', 'Гілка або worktree'],
          ['Оновлення залежностей і складний build', 'Worktree разом із контейнером'],
          ['Міграція або масове оновлення', 'Worktree, test DB і synthetic data'],
          ['Записуваний MCP або неперевірений tool', 'Container або VM'],
          ['Масове видалення', 'Одноразове середовище з контрольним набором']
        ]
      }
    },
    {
      heading: 'Sandbox не замінює інші controls',
      bullets: [
        'dry-run показує план, але не всі побічні ефекти;',
        'backup допомагає відновитися, але не робить помилку безпечною;',
        'staging може бути спільним і недостатньо ізольованим;',
        'Git, тести, review і людський контроль залишаються обовʼязковими.'
      ],
      note: 'Пісочниця готує безпечний експеримент, але не надає автоматичного дозволу на production deployment.'
    }
  ],
  'l23-05': [
    {
      heading: 'Layer 3 — рішення go/no-go',
      paragraphs: [
        'Зелені тести, lint і review ще не означають автоматичного дозволу на production. Layer 3 — це командне рішення відповідального approver щодо конкретного release або production-дії, а не ще один тест.',
        'Процес має три шари: Layer 1 — локальний diff і reviewer-agent, Layer 2 — CI checks, Layer 3 — рішення про випуск і відповідальність за наслідки.'
      ],
      table: {
        headers: ['Шар', 'Що робить'],
        rows: [
          ['Layer 1', 'Перевіряє локальний diff, PR і висновки reviewer-agent'],
          ['Layer 2', 'Запускає CI, tests, type-check, lint і build'],
          ['Layer 3', 'Вирішує, чи дозволити release або production-дію']
        ]
      },
      note: 'L3 permissions і Layer 3 approval — різні механізми: перші визначають доступні capabilities, другий фіксує рішення щодо конкретної зміни.'
    },
    {
      heading: 'Deployment boundary',
      table: {
        headers: ['Claude може підготувати', 'Людина затверджує'],
        rows: [
          ['Release notes і перелік змін', 'Production deploy'],
          ['Rollout і rollback plan', 'Увімкнення feature flag'],
          ['Staging log summary', 'Оголошення релізу'],
          ['PR evidence package', 'Небезпечні config changes'],
          ['Runbook для операції', 'Операції з грошовими або критичними даними']
        ]
      },
      paragraphs: [
        'Protected branches, required checks, environment approvals і deny rules мають технічно ускладнювати обхід deployment boundary. Текстового нагадування в prompt недостатньо.'
      ]
    },
    {
      heading: 'Пакет доказів для release gate',
      artifactIds: ['ai-coding-policy', 'codeowners', 'review-notes'],
      lab: {
        id: 'l23-05-risk-boundary',
        title: 'Перевірити high-risk boundary перед дією',
        goal: 'Зіставити risk classification, permissions, data boundaries і human approval до запуску незворотної дії.',
        inputs: ['Опис запланованої дії', 'Доступні permissions і protected paths', 'Rollback path'],
        steps: ['Назвіть наслідки та risk category.', 'Перевірте, чи permissions реально обмежують capability envelope.', 'Очистіть evidence від secrets і персональних даних.', 'Зіставте дію з policy та CODEOWNERS ownership.', 'Зупиніться до explicit approval, якщо дія high-risk.'],
        outputs: ['Risk/evidence packet', 'Обґрунтоване рішення allow, hold або escalate'],
        verification: ['Немає конфлікту між policy та технічним enforcement.', 'Власник рішення і rollback path названі явно.'],
        stopCondition: 'незрозуміла capability surface, відсутній owner або немає rollback path.',
        artifactIds: ['ai-coding-policy', 'codeowners', 'review-notes'],
        sourceRefs: ['level-23', 'TASK_SPEC4.md']
      },
      bullets: [
        'класифікація ризику;',
        'результати Layer 1 review і Layer 2 CI;',
        'staging smoke logs;',
        'опис і перевірка rollback;',
        'capability envelope;',
        'конкретний approver;',
        'перелік дій, які не делегуються Claude.'
      ],
      code: [
        {
          language: 'text',
          caption: 'Traceability у PR або release issue',
          code: `Risk: review-required
CI: passed
Staging smoke: passed
Rollback: verified in test environment
Envelope: read + bounded analysis only
Approver: named human owner
Not delegated: production deploy, tag, publish`
        }
      ]
    },
    {
      heading: 'High-risk дії без автоматичного виконання',
      bullets: [
        'production deploy;',
        'destructive database migration;',
        'rotation секретів;',
        'force push у protected branch;',
        'зміни IAM або repository permissions;',
        'rollout функцій у money path.'
      ],
      note: 'Claude може перевірити залежності, зібрати конфігурацію та пояснити наслідки, але не повинен одноосібно виконувати такі операції.'
    },
    {
      heading: 'Перед deployment потрібен rollback',
      steps: [
        'Визначте стабільний tag або іншу точку повернення.',
        'Опишіть спосіб скасування версії або вимкнення feature flag.',
        'Призначте відповідального за rollback.',
        'Перевірте recovery у безпечному середовищі.',
        'Зафіксуйте залишковий вплив на дані, міграції та інтеграції.',
        'Після цього approver приймає окреме go/no-go рішення.'
      ],
      paragraphs: [
        'Для релізу зі змінами refund flow Claude може підготувати опис і докази, reviewer-agent — проаналізувати код, а CI і staging — надати сигнали. Release owner все одно особисто вирішує, чи дозволяти production-випуск.'
      ]
    }
  ]
};
