import type { GuideSection } from '../types/guide';

export const levelThirtyContent: Record<string, GuideSection[]> = {
  'l30-01': [
    {
      heading: 'AI-native MVP як bounded learning loop',
      paragraphs: [
        'AI-native MVP — це не список функцій із доданим чат-інтерфейсом. Це найменший перевірюваний цикл, у якому конкретний користувач отримує обіцяний outcome за допомогою AI capability, а команда може побачити, де виникає цінність і де потрібен human review.',
        'Починайте з одного core flow: trigger користувача, один AI-assisted крок, очікуваний результат і спосіб перевірити якість. Якщо ідея потребує одразу кількох ролей, каналів, інтеграцій і режимів, це сигнал розділити гіпотезу, а не розширювати MVP.'
      ],
      artifactIds: ['capstone-brief', 'value-proposition', 'release-slice']
    },
    {
      heading: 'Від feature-first до outcome-first',
      table: {
        headers: ['Питання', 'Слабка відповідь', 'Bounded відповідь'],
        rows: [
          ['Для кого?', 'Для всіх команд', 'Для reviewer-а, який перевіряє один repository workflow'],
          ['Яка проблема?', 'Потрібен AI', 'Потрібно швидше отримати evidence для одного типу зміни'],
          ['Що робить MVP?', 'Має багато AI-функцій', 'Приймає один вхід, допомагає скласти plan і повертає перевірюваний draft'],
          ['Що доведе цінність?', 'Виглядає розумно', 'Користувач завершує flow із визначеним quality signal']
        ]
      },
      artifactIds: ['task-spec']
    },
    {
      heading: 'Перший контур MVP',
      steps: [
        'Назвіть одного primary user і одну ситуацію, у якій виникає проблема.',
        'Опишіть один job і outcome мовою користувача, а не мовою моделі.',
        'Зафіксуйте AI capability, human checkpoint і core flow.',
        'Відкладіть усе, що не потрібне для першого перевірюваного release slice.',
        'Сформулюйте evidence, яке дозволить reviewer-у відрізнити результат від красивої демонстрації.'
      ],
      note: 'Це documented example для навчального capstone. Він не доводить наявність реального продукту, user research, AI quality або product-market fit.'
    }
  ],
  'l30-02': [
    {
      heading: 'Ціннісна пропозиція — не slogan',
      paragraphs: [
        'Ціннісна пропозиція зʼєднує конкретного користувача, його ситуацію, незручну альтернативу та результат, який можна перевірити. Формула «AI допомагає всім працювати краще» не задає ні межі, ні способу оцінки.',
        'Для capstone корисно розділити promise і evidence: promise описує очікувану користь, а evidence plan показує, які спостереження можуть її підтвердити або спростувати. До фактичної перевірки такі твердження мають статус assumption або Unknown.'
      ],
      artifactIds: ['value-proposition', 'capstone-brief', 'evidence']
    },
    {
      heading: 'Компоненти value proposition',
      bullets: [
        'problem: яка повторювана втрата часу, якості або впевненості виникає;',
        'audience: хто відчуває проблему і приймає рішення про використання;',
        'alternative: як користувач вирішує її зараз, включно з ручною роботою;',
        'promised outcome: що має змінитися в поведінці або результаті;',
        'proof plan: який сигнал і за яких обмежень можна спостерігати;',
        'limits: які claims не можна робити без user validation або production evidence.'
      ]
    },
    {
      heading: 'Перевірка формулювання',
      code: [
        {
          language: 'markdown',
          caption: 'VALUE_PROPOSITION.md — documented example',
          code: `# VALUE_PROPOSITION.md
User: reviewer of a bounded repository change
Problem: evidence is scattered across notes and command output
Alternative: manual search through the diff and task thread
Promise: produce one reviewable evidence outline before implementation
Proof signal: reviewer can locate scope, checks and Unknowns in one pass
Status: documented example; user validation and outcome are Unknown.`
        }
      ],
      artifactIds: ['spec']
    }
  ],
  'l30-03': [
    {
      heading: 'Користувач і JTBD',
      paragraphs: [
        'JTBD описує не демографічний портрет, а ситуацію, у якій користувач «наймає» продукт для певної роботи. Добрий job містить trigger, контекст, бажаний progress і обмеження. Формулювання «користувач хоче AI» не пояснює, що має змінитися.',
        'Відокремлюйте observed fact, assumption і desired outcome. Навіть дуже конкретний JTBD у capstone залишається навчальною гіпотезою, доки не має підтвердженого дослідження або фактичного usage evidence.'
      ],
      artifactIds: ['user-jtbd', 'capstone-brief']
    },
    {
      heading: 'JTBD у перевірюваному форматі',
      table: {
        headers: ['Поле', 'Приклад documented example'],
        rows: [
          ['When', 'Коли reviewer отримує малу, але неоднозначну зміну'],
          ['I want to', 'Швидко зрозуміти scope, перевірки й залишкові Unknowns'],
          ['So I can', 'Прийняти наступний review decision без повторного discovery'],
          ['Constraint', 'Немає доступу до непідтверджених production claims'],
          ['Success signal', 'Потрібні evidence anchors знайдені в одному review pass']
        ]
      },
      artifactIds: ['success-metric']
    },
    {
      heading: 'Метрика успіху та межі інтерпретації',
      paragraphs: [
        'Метрика має назву, одиницю вимірювання, baseline, target, observation window і спосіб збору. Для early MVP не підміняйте outcome metric vanity metric на кшталт кількості AI-викликів. Якщо baseline або реальний observation window відсутні, це потрібно записати явно.',
        'Одна leading metric може показувати проходження flow, а одна outcome metric — чи став результат кориснішим для користувача. Guardrail metric потрібна, якщо оптимізація швидкості може погіршити якість або безпеку.'
      ],
      artifactIds: ['success-metric', 'evidence'],
      note: 'Метрики в прикладі не є фактичними результатами й не підтверджують user adoption, retention або business value.'
    }
  ],
  'l30-04': [
    {
      heading: 'Scope, non-goals і release slice',
      paragraphs: [
        'Release slice — це найменша завершена послідовність, яку можна показати, перевірити й окремо переглянути. Scope відповідає на питання «що входить», non-goals — «що свідомо не робимо», а release criteria — «яка умова дозволяє перейти до review decision».',
        'Non-goals не є списком майбутніх побажань. Вони захищають перший slice від непомітного розширення: multi-user, billing, масштабування, додаткові інтеграції та production deployment мають залишатися поза межами, якщо не потрібні для core flow.'
      ],
      artifactIds: ['release-slice', 'task-spec', 'backlog-roadmap']
    },
    {
      heading: 'Матриця меж',
      table: {
        headers: ['Область', 'In scope', 'Non-goal', 'Release criterion'],
        rows: [
          ['Input', 'Один структурований сценарій', 'Універсальний intake для всіх команд', 'Вхід має явну схему'],
          ['AI step', 'Один bounded draft або classification крок', 'Автономне рішення без review', 'Output має confidence/Unknown boundary'],
          ['Review', 'Один reviewer і checklist', 'Організаційна approval automation', 'Критерії перевірки видимі'],
          ['Evidence', 'Один reproducible record', 'Claims про production impact', 'Кожен результат має source або статус Unknown']
        ]
      },
      artifactIds: ['release-slice', 'contract-md']
    },
    {
      heading: 'Release slice як послідовність',
      steps: [
        'Заморозити user, JTBD і core flow до початку реалізації.',
        'Перевірити, що кожен included item підтримує обіцяний outcome.',
        'Записати dependencies, risks, stop conditions і deferred work.',
        'Визначити reviewer-ready acceptance та evidence до demo.',
        'Не розширювати slice без нового рішення й оновленого task contract.'
      ],
      note: 'Release plan — documented example. Жоден deploy, release або production readiness claim не випливає з цієї схеми.'
    }
  ],
  'l30-05': [
    {
      heading: 'Специфікація для reviewerʼа',
      paragraphs: [
        'Reviewer-oriented specification пишеться не як рекламний опис, а як компактний contract для незалежного рішення. Вона має дозволити іншій людині зрозуміти проблему, replay-нути bounded flow, перевірити acceptance і побачити, що залишилося Unknown.',
        'SPEC.md може бути довгоживучим project contract, TASK_SPEC.md — постановкою конкретної роботи, а EVIDENCE.md — записом фактичних перевірок. Не змішуйте ці ролі в один текст і не називайте filled documented example evidence фактичного виконання.'
      ],
      artifactIds: ['spec', 'task-spec', 'contract-md', 'evidence', 'review-notes']
    },
    {
      heading: 'Reviewer checklist',
      bullets: [
        'Чи зрозуміло, хто користувач і який JTBD має бути покращений?',
        'Чи узгоджені value proposition, scope, non-goals і release slice?',
        'Чи має кожен acceptance criterion спосіб verification?',
        'Чи відділені факти, assumptions, Unknowns і claims про майбутнє?',
        'Чи можна переглянути один core flow без прихованих залежностей?',
        'Чи має reviewer достатньо evidence для GO, HOLD або запиту на зміну scope?'
      ],
      artifactIds: ['review-notes', 'evidence']
    },
    {
      heading: 'Мінімальний reviewer-ready contract',
      code: [
        {
          language: 'markdown',
          caption: 'SPEC.md — documented example',
          code: `# SPEC.md
Problem: reviewers lose context while checking a bounded AI-assisted change
User: reviewer of one repository workflow
Core flow: intake -> AI-assisted outline -> human review -> evidence note
In scope: one flow, one metric, one review checklist
Non-goals: autonomous merge, production deployment, broad product roadmap
Acceptance: reviewer can reproduce the outline and locate Unknowns
Verification: static checks and documented review steps; execution status: Unknown
Status: documented example; no product outcome is claimed.`
        }
      ],
      note: 'Це reviewer contract example, а не approval, completed MVP, customer validation або production evidence.'
    }
  ]
};
