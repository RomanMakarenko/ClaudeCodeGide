import type { GuideSection } from '../types/guide';

export const levelTwentySevenContent: Record<string, GuideSection[]> = {
  'l27-01': [
    {
      heading: 'Modernization починається з safety baseline',
      paragraphs: [
        'Модернізація legacy-модуля не починається з переписування. Спочатку потрібно зафіксувати, як модуль поводиться сьогодні: які має входи, observable outputs, side effects, інтеграції та failure paths. Baseline захищає від непомітної зміни контракту під виглядом технічного покращення.',
        'Baseline — це не твердження, що поточна поведінка правильна. Це зафіксована точка порівняння, яку можна переглянути після кожного малого кроку і окремо зіставити з business expectations.'
      ],
      artifactIds: ['modernization-baseline', 'behavior-inventory'],
    },
    {
      heading: 'Що входить до baseline',
      table: {
        headers: ['Шар', 'Що зафіксувати', 'Evidence anchor'],
        rows: [
          ['Contract', 'публічні входи, outputs, помилки та повідомлення', 'API, public methods, integration contract'],
          ['State', 'зміни стану, записи, events і timestamps', 'tests, persistence code, logs'],
          ['Dependencies', 'зовнішні clients, configuration і feature flags', 'imports, config, environment, callers'],
          ['Checks', 'існуючі тести, build, static checks і manual scenarios', 'command + фактичний результат'],
          ['Recovery', 'rollback point, stop condition і owner рішення', 'Git baseline, runbook, review decision']
        ]
      }
    },
    {
      heading: 'Інваріанти та characterization candidate',
      artifactIds: ['characterization-tests'],
      bullets: [
        'зовнішній API та формат результату не змінюються без окремого scope decision;',
        'коди помилок, повідомлення та важливі side effects залишаються узгодженими;',
        'порядок операцій зберігається, якщо він впливає на гроші, дані або retry behavior;',
        'кожен candidate для characterization має конкретний input, observable output і evidence anchor;',
        'невідома поведінка позначається як unknown, а не заповнюється припущенням.'
      ],
      note: 'Якщо baseline неможливо відтворити або owner не може підтвердити критичний контракт, зупиніться та звузьте modernization scope.'
    },
    {
      heading: 'Послідовність підготовки',
      steps: [
        'Визначте один модуль або business flow, який входить у modernization slice.',
        'Прочитайте current-state карту, tests, configuration, callers і зовнішні boundaries.',
        'Опишіть inputs, outputs, side effects, failure path та invariants.',
        'Запустіть доступні focused checks або позначте їх як unknown, якщо запуск неможливий.',
        'Збережіть baseline та rollback point.',
        'Попросіть reviewer перевірити, чи baseline описує фактичну поведінку, а не бажану архітектуру.'
      ]
    },
    {
      heading: 'Коли не можна переходити до змін',
      paragraphs: [
        'Не переходьте до refactoring, якщо scope охоплює кілька незвʼязаних потоків, немає способу спостерігати результат або невідомо, хто приймає business decision. Відсутність safety net — причина спочатку збирати evidence, а не причина збільшувати patch.',
        'Rollback має бути практичною дією: зрозумілий checkpoint, обмежений diff і перевірка, що повернення не залишає частково переміщеного стану.'
      ],
      artifactIds: ['risk-map'],
    }
  ],
  'l27-02': [
    {
      heading: 'Інкрементальний рефакторинг — це серія контрольованих slices',
      paragraphs: [
        'Legacy-модуль стає безпечнішим не від одного великого rewrite, а від послідовності малих змін із чіткою метою. Кожен slice має обмежений scope, non-goals, safety net, focused check і зрозумілий rollback.',
        'Якщо під час structural refactoring виявлено bugfix, зміну бізнес-правила або новий public contract, роботу потрібно зупинити й винести це в окрему задачу.'
      ],
      artifactIds: ['refactoring-plan', 'modernization-baseline'],
    },
    {
      heading: 'Один slice — одна structural hypothesis',
      table: {
        headers: ['Елемент', 'Приклад питання'],
        rows: [
          ['Goal', 'Яку одну structural проблему усуваємо?'],
          ['Allowed scope', 'Які файли, символи або boundary можна торкнутися?'],
          ['Non-goals', 'Які API, залежності та business rules не змінюємо?'],
          ['Safety net', 'Який observable behavior порівнюємо до і після?'],
          ['Stop condition', 'Коли треба повернутися до baseline або попросити рішення?']
        ]
      }
    },
    {
      heading: 'Цикл малого кроку',
      steps: [
        'Сформулюйте structural goal і перелік заборонених змін.',
        'Перевірте usages, tests, current baseline та dependency direction.',
        'Виконайте найменшу зміну, яка перевіряє гіпотезу.',
        'Запустіть focused check і порівняйте observable output.',
        'Прочитайте повний diff та перевірте список touched files.',
        'Створіть логічний checkpoint або commit лише після review.',
        'Оновіть modernization record фактичним результатом і відкритими ризиками.'
      ]
    },
    {
      heading: 'Що не є інкрементальним refactoring',
      bullets: [
        'масове перейменування разом зі зміною поведінки;',
        'оновлення framework або dependencies без окремого compatibility plan;',
        'переміщення коду через десятки модулів без safety net;',
        'додавання feature під час очищення legacy-класу;',
        'послаблення тесту, щоб приховати regression.'
      ],
      note: 'Кількість змінених рядків сама по собі не визначає розмір slice. Важливі межі контракту, кількість affected flows і здатність швидко пояснити, що саме перевірено.'
    },
    {
      heading: 'Prompt для контрольованого кроку',
      code: [
        {
          language: 'text',
          caption: 'Bounded refactoring request',
          code: `Goal: extract one internal responsibility
Allowed: <one module> and focused tests
Preserve: public API, outputs, errors, side effects
Forbidden: dependency updates, feature work, broad formatting
Check: <focused command>
Stop if: behavior or scope is unclear`
        }
      ]
    }
  ],
  'l27-03': [
    {
      heading: 'Seam — контрольована точка розділення',
      paragraphs: [
        'Seam — це місце, де можна змінити або підмінити частину поведінки без одночасного переписування всього legacy-модуля. Ним може бути interface, adapter, gateway, function boundary, event або routing decision. Хороший seam зменшує blast radius і робить replacement спостережуваним.',
        'Seam не створює безпеку автоматично. Якщо межа лише перейменовує прямий виклик, але не ізолює side effects, configuration або failure path, ризик залишається.'
      ],
      artifactIds: ['seam-map', 'module-inventory'],
    },
    {
      heading: 'Як знайти seam',
      table: {
        headers: ['Сигнал', 'Що дослідити', 'Ризик'],
        rows: [
          ['Stable input/output', 'чи є чіткий формат на межі?', 'приховані поля або state coupling'],
          ['Repeated dependency', 'чи повторюється client або utility?', 'зміна одного caller зачепить багато flows'],
          ['Side-effect boundary', 'де відбувається write, event або external call?', 'часткова міграція і подвійний side effect'],
          ['Routing decision', 'хто вирішує legacy vs new path?', 'розбіжність flags, dates або rollout'],
          ['Test boundary', 'чи можна перевірити seam окремо?', 'неможливо відрізнити regression від integration failure']
        ]
      }
    },
    {
      heading: 'Dependency direction і adapters',
      paragraphs: [
        'Під час декомпозиції зафіксуйте, хто володіє контрактом і в якому напрямку течуть залежності. Adapter може сховати legacy API від нового коду, але не повинен непомітно змінювати semantics, формат помилок або retry behavior.',
        'Інтерфейс має бути достатньо вузьким, щоб описувати потрібну поведінку, а не всю внутрішню поверхню legacy-класу. Якщо seam повторює кожну деталь реалізації, він не створює незалежної точки заміни.'
      ],
      bullets: [
        'позначте producer, consumer і owner контракту;',
        'запишіть data transformation та можливу втрату інформації;',
        'окремо опишіть errors, timeouts, retries і idempotency;',
        'перевірте, чи seam можна вимкнути або обійти під час rollback.'
      ]
    },
    {
      heading: 'Seam map як decision record',
      steps: [
        'Виберіть один flow і знайдіть його entry point та side effects.',
        'Намалюйте фактичний dependency path без бажаних компонентів.',
        'Позначте candidate seams і evidence для кожного.',
        'Вкажіть, яка частина може бути замінена незалежно.',
        'Зазначте unknowns, owner та спосіб focused verification.',
        'Оберіть один seam для першого slice і зафіксуйте, чому інші відкладені.'
      ],
      artifactIds: ['critical-flows', 'risk-map'],
    },
    {
      heading: 'Антипатерни seam-декомпозиції',
      bullets: [
        'створити абстракцію лише заради кількості інтерфейсів;',
        'заховати business rule в adapter без окремого owner;',
        'змішати routing, persistence і форматування в одну нову boundary;',
        'ігнорувати legacy callers, які обходять новий seam;',
        'вважати seam безпечним до того, як перевірено його failure path.'
      ],
      note: 'Кращий seam — не найкрасивіша абстракція, а найменша перевірювана межа, яка справді дозволяє ізолювати наступний modernization slice.'
    }
  ],
  'l27-04': [
    {
      heading: 'Strangler Fig — поступова підміна, не big-bang rewrite',
      paragraphs: [
        'Strangler Fig pattern дозволяє новому фрагменту поступово перехоплювати частину поведінки навколо legacy-системи. Старий і новий paths певний час coexist, а кожен крок має явну boundary, routing rule, ownership, verification і rollback.',
        'Назва pattern не виправдовує приховану міграцію. Якщо немає способу зрозуміти, який path виконався, або rollback залишає подвійні записи, це не контрольована strangler slice.'
      ],
      artifactIds: ['strangler-slice', 'seam-map'],
    },
    {
      heading: 'Мінімальна модель strangler slice',
      table: {
        headers: ['Частина', 'Питання'],
        rows: [
          ['Boundary', 'Який конкретний фрагмент behavior підмінюється?'],
          ['Router', 'За якою стабільною умовою обирається legacy або new path?'],
          ['Coexistence', 'Як paths поводяться поруч без подвійних side effects?'],
          ['Evidence', 'Як побачити path, output, помилку та міграційний стан?'],
          ['Rollback', 'Як вимкнути new path і повернутися без втрати даних?'],
          ['Exit', 'Коли legacy fragment можна видалити?']
        ]
      }
    },
    {
      heading: 'Етапи підміни',
      steps: [
        'Зафіксуйте current behavior і seam для одного fragment.',
        'Додайте нову реалізацію за наявним контрактом, не розширюючи scope.',
        'Визначте routing або feature boundary з явною default поведінкою.',
        'Перевірте old і new path на однакових representative inputs.',
        'Спостерігайте discrepancy, error rate та side effects до розширення охоплення.',
        'Поступово збільшуйте slice лише після risk gate.',
        'Видаляйте legacy code тільки після exit criteria та підтвердженого rollback window.'
      ]
    },
    {
      heading: 'Небезпеки coexistence',
      bullets: [
        'два paths записують один ресурс або відправляють два notifications;',
        'новий path має іншу timezone, rounding, retry або idempotency semantics;',
        'routing rule залежить від неперевіреного flag або configuration precedence;',
        'rollback перемикає код, але не повертає вже змінений state;',
        'legacy path продовжує отримувати traffic, але його більше ніхто не спостерігає.'
      ],
      note: 'Для money, data та external integrations спочатку потрібні explicit side-effect rules і owner approval. Сам факт наявності feature flag не є rollback plan.'
    },
    {
      heading: 'Strangler slice record',
      code: [
        {
          language: 'markdown',
          caption: 'Каркас документа підміни',
          code: `# STRANGLER_SLICE.md

## Fragment and boundary
## Legacy path
## New path
## Routing rule
## Coexistence and side effects
## Verification evidence
## Rollback procedure
## Exit criteria
## Owner and open risks`
        }
      ],
      artifactIds: ['modernization-baseline', 'risk-map'],
    }
  ],
  'l27-05': [
    {
      heading: 'Roadmap модернізації — це послідовність risk gates',
      paragraphs: [
        'Roadmap потрібен не для обіцянки повністю переписати legacy, а для керування невизначеністю. Кожен milestone має конкретний fragment, owner, evidence, exit criteria і рішення: proceed, narrow, hold або rollback.',
        'Порядок етапів визначається не красою архітектури, а поєднанням business criticality, change risk, залежностей і здатності спостерігати результат.'
      ],
      artifactIds: ['modernization-roadmap', 'risk-map'],
    },
    {
      heading: 'Структура milestone',
      table: {
        headers: ['Поле', 'Зміст'],
        rows: [
          ['Target fragment', 'один flow, boundary або модуль'],
          ['Reason', 'який risk або operational pain зменшується'],
          ['Owner', 'хто підтверджує behavior і приймає decision'],
          ['Dependencies', 'seams, data, flags, teams або checks'],
          ['Evidence gate', 'що має бути перевірено до переходу'],
          ['Exit criteria', 'коли slice завершений або готовий до наступного'],
          ['Rollback/hold', 'що робити при regression або недостатньому evidence']
        ]
      }
    },
    {
      heading: 'Приклад порядку без вигаданих результатів',
      steps: [
        'Discovery: підтвердити current behavior, module boundaries і critical flows.',
        'Baseline: зафіксувати observable contract, invariants і available checks.',
        'Seam: обрати одну перевірювану точку розділення та описати dependency direction.',
        'Slice: виконати один incremental refactoring або strangler fragment.',
        'Gate: порівняти behavior, side effects, checks і risk map.',
        'Expand або hold: прийняти рішення на основі evidence, а не календарного плану.',
        'Retire: прибрати legacy fragment лише після окремих exit criteria та rollback window.'
      ]
    },
    {
      heading: 'Анти-патерни modernization roadmap',
      bullets: [
        'Big-bang rewrite із датою завершення, але без проміжних evidence gates;',
        'roadmap як список усіх бажаних refactors без business priority;',
        'один milestone одночасно змінює architecture, dependencies і behavior;',
        'owner вказаний формально, але не має повноважень підтвердити контракт;',
        'успіх вимірюється кількістю переміщених рядків, а не зменшенням risk;',
        'legacy removal заплановано до того, як доведено coverage нового path і rollback.'
      ]
    },
    {
      heading: 'Roadmap review перед наступним кроком',
      paragraphs: [
        'Перед переходом до наступного milestone перевірте, що попередній результат можна пояснити через конкретні докази: які inputs пройшли, які outputs спостерігалися, що змінилося в risk map і які unknowns залишилися. Якщо відповідь залежить від припущення, milestone не готовий до розширення.',
        'У modernization roadmap нормально мати hold або deferred work. Відкладений fragment із чіткою причиною безпечніший за видалення legacy-коду без достатнього контролю.'
      ],
      artifactIds: ['refactoring-plan', 'strangler-slice', 'seam-map', 'modernization-anti-patterns'],
    }
  ]
};
