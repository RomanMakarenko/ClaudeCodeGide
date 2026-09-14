import type { GuideSection } from '../types/guide';

export const levelTwentyFourContent: Record<string, GuideSection[]> = {
  'l24-01': [
    {
      heading: 'Decision gate — це командне рішення',
      paragraphs: [
        'Production decision gate відповідає не на питання «чи написав Claude код», а на питання «чи готова команда прийняти наслідки цієї зміни». Він доповнює тести, CI та review і фіксує відповідального за рішення.',
        'Типовий порядок такий: автор готує diff і докази, локальний review перевіряє зміни, CI запускає детерміновані checks, а команда приймає рішення GO або HOLD з урахуванням ризику, approvals і можливості відкату.'
      ],
      table: {
        headers: ['Етап', 'Результат'],
        rows: [
          ['Особиста готовність', 'Автор перевірив вимоги, diff, тести й залишкові ризики'],
          ['Local review', 'Знайдені або відхилені зауваження до фактичних змін'],
          ['CI / quality gate', 'Підтверджені автоматичні checks'],
          ['Team decision gate', 'Командне рішення GO або HOLD і названий approver']
        ]
      },
      note: 'HOLD — нормальний результат, якщо немає staging-перевірки, власника ризику, rollback path або потрібного approval.'
    },
    {
      heading: 'Рівень ризику визначає пакет доказів',
      table: {
        headers: ['Категорія', 'Мінімальний пакет'],
        rows: [
          ['Low-risk', 'Короткий опис, релевантний diff і фінальне рішення'],
          ['Review-required', 'Ризик, checks, evidence, потрібні approvals і рішення'],
          ['High-risk', 'Усе перелічене, а також rollback path, обмеження та конкретні approverʼи']
        ]
      },
      paragraphs: [
        'Для малого PR gate може бути частиною опису PR або release checklist. Окремий файл виправданий тоді, коли рішення потребує ширшої traceability або повторного використання.'
      ]
    },
    {
      heading: 'Risk classification і permissions мають різні ролі',
      bullets: [
        'risk classification визначає суворість процесу та необхідний рівень review;',
        'permissions технічно обмежують доступні дії Claude або агента;',
        'decision gate фіксує остаточне людське рішення щодо merge або release;',
        'міграція бази, auth path або інший новий наслідок вимагають re-classification;',
        'зниження ризику не можна робити мовчки або лише через поспіх.'
      ],
      note: 'L3 permissions не є схваленням PR: вони задають capability envelope, а gate приймає рішення щодо конкретної зміни.'
    },
    {
      heading: 'Як оформити GO або HOLD',
      steps: [
        'Назвіть зміну, affected area та початкову risk category.',
        'Додайте результати local review, CI і staging checks, якщо вони потрібні.',
        'Зафіксуйте approvals, rollback path і залишкові обмеження.',
        'Перевірте, що нові наслідки не вимагають re-classification.',
        'Назвіть відповідального approver і запишіть GO або HOLD.',
        'Якщо evidence неповний, залиште рішення HOLD до усунення прогалини.'
      ]
    },
    {
      heading: 'Приклад gate для refund-зміни',
      paragraphs: [
        'Зміна refund flow має high-risk профіль, якщо зачіпає гроші, support roles або audit log. Тоді green CI недостатньо: потрібні regression tests, diff review, staging smoke і approvals від відповідальних власників домену.',
        'Rollback може включати revert, вимкнення feature flag або повернення попереднього handler. Merge варто утримати, доки не завершено перевірки, а фінальне рішення не зафіксував release owner.'
      ]
    }
  ],
  'l24-02': [
    {
      heading: 'Auditability і traceability — не одне й те саме',
      paragraphs: [
        'Auditability означає, що зміну можна перевірити за збереженими артефактами. Traceability додає послідовний звʼязок від задачі до результату, а chain of accountability показує, хто схвалив рішення і на яких підставах.',
        'Повний transcript Claude часто надто шумний і може містити чутливі дані. Для команди корисніші короткі curated notes, які залишають релевантні докази та прибирають зайвий контекст.'
      ],
      code: [
        {
          language: 'text',
          caption: 'Ланцюжок артефактів',
          code: 'Задача → TASK_SPEC.md → EVIDENCE_LOG.md → diff/коміти\n→ тести/REVIEW_NOTES.md → PR_DESCRIPTION.md → фінальне рішення'
        }
      ]
    },
    {
      heading: 'Призначення основних артефактів',
      table: {
        headers: ['Артефакт', 'Що фіксує'],
        rows: [
          ['TASK_SPEC.md', 'Мету, межі та критерії приймання'],
          ['CODEBASE_INVENTORY.md / API_MAP.md', 'Джерела аналізу та контекст системи'],
          ['EVIDENCE_LOG.md', 'Симптом, гіпотези, файли, перевірки й обґрунтування'],
          ['Git diff і коміти', 'Фактичний обсяг та історію змін'],
          ['REVIEW_NOTES.md / QUALITY_GATES.md', 'Результати review і quality checks'],
          ['PR та decision gate', 'Докази approvals і остаточне людське рішення']
        ]
      },
      note: 'Ланцюг має починатися з постановки задачі, а не з відкриття PR.'
    },
    {
      heading: 'Curated AI-assisted notes у PR',
      bullets: [
        'де саме допомагав Claude: discovery, планування, тест або редагування;',
        'що людина перевірила або схвалила до внесення змін;',
        'які checks фактично виконано та з яким результатом;',
        'який залишковий ризик або scope залишився поза зміною;',
        'хто прийняв фінальне рішення.'
      ],
      paragraphs: [
        'Повний transcript можна зберігати локально для розслідування, але команді слід показувати лише релевантний і очищений підсумок. Traceability не виправдовує публікацію secrets, PII або сирих production-виводів.'
      ]
    },
    {
      heading: 'Покрокова перевірка історії змін',
      steps: [
        'Зіставте PR із початковим TASK_SPEC і acceptance criteria.',
        'Перегляньте фактичний diff і переконайтеся, що він не вийшов за scope.',
        'Перевірте історію комітів і зрозумілий порядок інженерних кроків.',
        'Зіставте заявлені тести з реальними логами або CI results.',
        'Переконайтеся, що approval належить відповідальній ролі.',
        'Очистіть evidence від чутливих даних перед поширенням.'
      ],
      code: [
        {
          language: 'bash',
          caption: 'Приклади read-only команд для огляду',
          code: 'git diff origin/main...HEAD\ngit log --oneline --decorate -5\ngit show --stat HEAD'
        }
      ]
    },
    {
      heading: 'Малий diff робить рішення відтворюваним',
      paragraphs: [
        'Незрозумілий коміт на кшталт «fix stuff» погіршує audit trail. Окремі коміти для regression test, мінімальної правки та оновлення PR-нотаток допомагають побачити причинно-наслідковий звʼязок і безпечно відкотити частину роботи.',
        'Якщо diff став надто широким, його потрібно розділити або повернути до меж початкової задачі, а не пояснювати зайвий код лише summary від AI.'
      ]
    }
  ],
  'l24-03': [
    {
      heading: 'AI_CODING_POLICY.md задає командний baseline',
      paragraphs: [
        'AI_CODING_POLICY.md — це коротка командна домовленість про безпечне застосування Claude Code, а не заміна детальним RISK_CLASSIFICATION.md, QUALITY_GATES.md чи Production Decision Gate. Її мета — прибрати різне трактування дозволених, контрольованих і заборонених дій.',
        'Policy має бути достатньо короткою, щоб нею користувалися у щоденній роботі, і достатньо конкретною, щоб зрозуміло було, коли потрібен review або явне людське схвалення.'
      ],
      table: {
        headers: ['Категорія', 'Приклади'],
        rows: [
          ['Дозволено', 'Аналіз, пояснення коду, чернетки docs, PR-нотатки, локальний refactor із тестами'],
          ['Потрібен review', 'Функціональний код, config, dependencies, shared hooks/plugins, write-capable MCP, public API'],
          ['Human approval', 'Production deploy, destructive DB actions, force push, IAM, secrets, shared infrastructure']
        ]
      }
    },
    {
      heading: 'Що повинна охоплювати policy',
      bullets: [
        'класи використання AI та дозволені permission modes;',
        'обмеження для secrets, personal data і customer data;',
        'вимоги до PR та attribution AI assistance;',
        'правила схвалення plugins і MCP;',
        'межі CI/CD automation і захист гілок;',
        'дозволені середовища для експериментів: branch, worktree, staging;',
        'відповідальність людини за merge і release.'
      ],
      note: 'Policy не повинна дублювати детальні процедури: вона має посилатися на спеціалізовані артефакти.'
    },
    {
      heading: 'Policy потребує технічного enforcement',
      paragraphs: [
        'Документ сам по собі не блокує небезпечну дію. Командний baseline слід підсилювати session permissions, team-level settings, hooks, protected paths, branch protection і посиланням із CLAUDE.md.',
        'Наприклад, force push і редагування .env можна блокувати, а публікацію пакета або зміни платіжного коду переводити в режим explicit approval.'
      ],
      bullets: [
        'текст policy пояснює очікувану поведінку;',
        'permissions і hooks забезпечують технічну межу;',
        'quality gates перевіряють результат;',
        'human owner приймає фінальне рішення.'
      ]
    },
    {
      heading: 'Як оновлювати policy за сигналами процесу',
      table: {
        headers: ['Повторювана проблема', 'Місце покращення'],
        rows: [
          ['Відсутні AI-нотатки в PR', 'PR template і policy'],
          ['Хибне спрацювання reviewer-agent', 'SKILL.md або конфігурація агента'],
          ['Force push або доступ до protected path', 'Policy, permissions і hooks'],
          ['Невдалий shared workflow asset', 'README, changelog і rollout rules']
        ]
      },
      paragraphs: [
        'Policy варто змінювати через повторювані командні проблеми, а не через одиничну помилку. Командні зміни оформлюйте через PR і короткий changelog, щоб було видно, чому правило зʼявилося.'
      ]
    },
    {
      heading: 'Перевірка готовності policy',
      artifactIds: ['ai-coding-policy', 'codeowners', 'postmortem'],
      lab: {
        id: 'l24-03-policy-review',
        title: 'Перевірити командну AI policy',
        goal: 'Переконатися, що policy має однозначні межі, технічне enforcement і відповідального за оновлення.',
        inputs: ['Чернетка AI_CODING_POLICY.md', 'Наявні settings, hooks і gates', 'Приклад повторюваної процесної проблеми'],
        steps: ['Розділіть allowed, review-required і human-approval actions.', 'Перевірте правила для secrets, PII та customer data.', 'Зіставте policy з permissions, hooks і protected paths.', 'Назвіть owner, review cadence і rollback/disable path.', 'Зафіксуйте відсутні controls як відкриті питання.'],
        outputs: ['Перевірена policy draft', 'Список конкретних control gaps'],
        verification: ['Policy не обіцяє того, чого не enforce-ить tooling.', 'Кожна high-risk дія має явну точку людського рішення.'],
        stopCondition: 'правило неоднозначне, enforcement відсутній або потрібні неперевірені production твердження.',
        artifactIds: ['ai-coding-policy', 'codeowners', 'postmortem'],
        sourceRefs: ['level-24', 'TASK_SPEC4.md']
      },
      bullets: [
        'чи однозначно зрозуміло, що дозволяється без додаткового погодження;',
        'чи названі дії, для яких потрібен review;',
        'чи визначено, що неможливо без human approval;',
        'чи описано заборонені дані та середовища;',
        'чи вказано перевірки перед merge;',
        'чи названо відповідального за фінальне рішення;',
        'чи відомо, якими технічними механізмами policy enforced.'
      ]
    }
  ],
  'l24-04': [
    {
      heading: 'Коли локальний workflow стає командним активом',
      paragraphs: [
        'Governance — це спосіб зробити командні активи зрозумілими, повторюваними, контрольованими та такими, що легко вимикаються. Особистий script або skill стає shared asset лише після документації, перевірки користі для інших і визначення owner.',
        'Не починайте з plugin, hook або MCP, якщо команда ще не має спільних правил, шаблонів і зрозумілого процесу review.'
      ],
      table: {
        headers: ['Сходинка', 'Командна практика'],
        rows: [
          ['1', 'Особиста дисципліна: clean Git, task spec, plan і diff review'],
          ['2', 'Спільна база: CLAUDE.md та єдині команди запуску й тестування'],
          ['3', 'Спільні шаблони задач, review checklist і PR style'],
          ['4', 'Shared skills, hooks, plugins або MCP для повторюваних потреб'],
          ['5', 'Gates, policy та визначені approvals'],
          ['6', 'Feedback loop: changelog, оновлення або вилучення невдалих рішень']
        ]
      }
    },
    {
      heading: 'П’ять питань до shared asset',
      steps: [
        'Чи є короткий README із призначенням і способом використання?',
        'Чи визначено конкретний owner за підтримку?',
        'Чи випробував asset хтось, крім автора?',
        'Чи поводиться він достатньо стабільно на реальних задачах?',
        'Чи існує зрозумілий rollback path або спосіб вимкнення?'
      ],
      note: 'Негативна відповідь означає, що ідею краще залишити кандидатом і не поширювати на всю команду.'
    },
    {
      heading: 'Мінімальні опори управління',
      table: {
        headers: ['Артефакт', 'Мінімальний вміст'],
        rows: [
          ['README', 'Призначення, scope, owner, запуск і спосіб вимкнення'],
          ['CHANGELOG.md', 'Зміни версій, нова поведінка та команда або кроки rollback'],
          ['Workflow Kit', 'Версія shared asset і правила використання'],
          ['Feedback record', 'Проблеми, хибні спрацювання та рішення команди']
        ]
      },
      paragraphs: [
        'Rollback залежить від типу активу: видалити skill, вимкнути hook, повернути версію plugin або обмежити MCP до read-only. Відповідальність має належати конкретній ролі чи owner, а не абстрактній «команді».'
      ]
    },
    {
      heading: 'Пілот перед масштабуванням',
      steps: [
        'Оберіть повторювану потребу та вузький scope активу.',
        'Додайте README, owner, критерії успіху й rollback path.',
        'Протягом трьох тижнів перевірте актив щонайменше на реальних задачах двох розробників.',
        'Зберіть feedback і виправте документацію, налаштування та хибні спрацювання.',
        'Прийміть рішення: масштабувати, доопрацювати або відкотити asset.'
      ],
      note: 'Пілот є експериментом із критеріями оцінки, а не автоматичним переходом усієї команди.'
    },
    {
      heading: 'Безпечний приклад rollout',
      paragraphs: [
        'Локальний issue-analysis skill може перетворювати нечіткий issue на task spec із goal, scope, non-goals, affected files і verification plan. Спочатку автор тестує його на власних bugfix-задачах, потім інший розробник перевіряє на іншому сценарії.',
        'Після уточнення README і changelog skill можна перенести до Workflow Kit. Shared asset не повинен бути непрозорим або примусовим: невдале застосування має повертатися через feedback і мати спосіб безпечного вимкнення.'
      ]
    }
  ],
  'l24-05': [
    {
      heading: 'Культура AI-інжинірингу проявляється в діях',
      paragraphs: [
        'AI engineering culture — це не декларація, а типові дії команди під тиском: як вона реагує на помилки, широкий diff і впевнені відповіді AI. Відповідальність за межі задачі, ризик і merge залишається за розробником.',
        'Практичний цикл виглядає так: задача → план і межі → невелика зміна → перевірки → людський review → документація → покращення workflow.'
      ]
    },
    {
      heading: 'Шість принципів команди',
      table: {
        headers: ['Принцип', 'Практична поведінка'],
        rows: [
          ['Відповідальність людини', 'Людина визначає межі, ризик і рішення про merge'],
          ['Фактичний diff', 'Summary AI не замінює перегляд файлів, scope і конфігурації'],
          ['Спочатку докази', 'Тести, smoke-checks, CI та logs важливіші за впевнений тон'],
          ['Першопричина', 'Відтворення та гіпотеза важливіші за patch, що приховує симптом'],
          ['Docs відповідають коду', 'README, runbook і release notes перевіряються фактичним запуском'],
          ['Збій змінює процес', 'Повторна проблема покращує policy, skill, hook, gate або template']
        ]
      }
    },
    {
      heading: 'Перевірка фактичного diff і причин',
      bullets: [
        'порівняйте кількість файлів із початковим scope;',
        'знайдіть сторонній refactor, форматування та зміни конфігурації;',
        'відтворіть баг мінімальним тестом або сценарієм;',
        'перевірте, що regression test фіксує конкретну поведінку;',
        'якщо AI кілька разів лікує сусідній симптом, поверніться до discovery;',
        'не називайте performance або production readiness без відповідного вимірювання.'
      ],
      note: 'Впевнений висновок моделі не є evidence. Доказом є відтворюваний результат перевірки.'
    },
    {
      heading: 'Документація як частина якості',
      paragraphs: [
        'README, runbook, PR description і release notes мають відповідати поточній поведінці системи. Команди запуску потрібно реально виконувати, а не переносити за аналогією з іншого проєкту.',
        'Для змін із повторюваними наслідками корисні AI_CODING_POLICY.md, CLAUDE.md, REVIEW_CHECKLIST.md, EVIDENCE_LOG.md, SKILL.md, CI logs і postmortem. Вони мають пояснювати не лише результат, а й межі та залишкові ризики.'
      ]
    },
    {
      heading: 'Що робити після повторного збою',
      steps: [
        'Зафіксуйте симптом і контекст, у якому він повторюється.',
        'Знайдіть першопричину та відокремте її від поверхневого workaround.',
        'Назвіть workflow-артефакт, який має змінитися: policy, skill, hook, gate або PR template.',
        'Призначте owner і додайте спосіб перевірити, що зміна допомогла.',
        'Оновіть документацію та залиште короткий postmortem.',
        'Перевірте, що нове правило не створило надмірних false positives.'
      ],
      note: 'Мета культури — не заборонити AI, а зробити його використання перевірюваним, керованим і таким, що навчає процес.'
    }
  ]
};
