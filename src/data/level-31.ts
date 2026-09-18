import type { GuideSection } from '../types/guide';

export const levelThirtyOneContent: Record<string, GuideSection[]> = {
  'l31-01': [
    {
      heading: 'Controlled vibe coding як керований цикл',
      paragraphs: [
        'Vibe coding стає інженерним workflow лише тоді, коли AI має bounded input, дозволену область змін, короткий feedback loop і людську контрольну точку. Мета — не отримати найбільший diff, а швидко перевірити одну гіпотезу без втрати traceability.',
        'Перед кожною ітерацією зафіксуйте task contract, affected paths, expected signal і stop condition. Якщо модель пропонує зміну поза межами, додає непотрібний cleanup або не може пояснити verification path, цикл потрібно зупинити, а не розширювати prompt.'
      ],
      artifactIds: ['controlled-vibe-coding', 'task-spec', 'ai-coding-policy']
    },
    {
      heading: 'Small diff як quality boundary',
      table: {
        headers: ['Сигнал', 'Контрольований варіант', 'HOLD / stop'],
        rows: [
          ['Scope', 'Одна поведінка або один reviewable slice', 'Несподівані модулі чи redesign'],
          ['Diff', 'Малі повʼязані зміни з поясненням', 'Масовий cleanup або змішані concerns'],
          ['Verification', 'Targeted check визначений до редагування', 'Немає oracle або результат Unknown'],
          ['Decision', 'Людина переглядає diff і наступний крок', 'Автоматичне продовження без checkpoint']
        ]
      },
      artifactIds: ['git-review-artifacts', 'review-notes']
    },
    {
      heading: 'Контракт ітерації',
      code: [{
        language: 'markdown',
        caption: 'CONTROLLED_VIBE_CODING.md — documented example',
        code: `# CONTROLLED_VIBE_CODING.md
Goal: implement one bounded change
Allowed paths: <explicit files or directories>
Expected diff: one behavior, no unrelated cleanup
Check: <targeted command or review step>
Stop when: scope expands, contract is unclear, or check is unavailable
Human gate: inspect diff and decide continue / revise / HOLD
Status: documented example; execution result: Unknown.`
      }],
      note: 'Це documented example контракту. Він не доводить фактичного AI execution, якість коду або approval.'
    }
  ],
  'l31-02': [
    {
      heading: 'Implementation sprint як короткий delivery loop',
      paragraphs: [
        'Implementation sprint — це не дозвіл працювати безмежно, а короткий відрізок delivery з одним outcome, обмеженим набором slices і наперед визначеним exit. Sprint має перетворити approved plan на reviewable increment, а не приховати невизначеність за календарною назвою.',
        'Кожен slice повинен мати owner, input, expected output, verification і checkpoint. Якщо slice виявляється більшим за запланований або змінює контракт, його потрібно розділити чи повернути на planning, а не тихо додати до sprint.'
      ],
      artifactIds: ['implementation-sprint-plan', 'release-slice', 'backlog-roadmap']
    },
    {
      heading: 'Ритм sprint',
      steps: [
        'Сформулювати sprint outcome і non-goals мовою observable behavior.',
        'Розкласти outcome на малі slices із послідовністю та stop conditions.',
        'На кожному checkpoint перевірити diff, targeted signals і залишкові Unknowns.',
        'Завершити sprint одним із рішень: DONE, CONTINUE WITH APPROVAL або HOLD.',
        'Оновити evidence/handoff record, навіть якщо результатом став HOLD.'
      ],
      artifactIds: ['workflow-md', 'run-status-yaml', 'evidence']
    },
    {
      heading: 'Sprint plan',
      code: [{
        language: 'markdown',
        caption: 'IMPLEMENTATION_SPRINT_PLAN.md — documented example',
        code: `# IMPLEMENTATION_SPRINT_PLAN.md
Outcome: one reviewable capstone slice
Slices: contract -> implementation -> targeted verification -> review
Checkpoint: inspect diff and command status after each slice
Owner: <role>
Exit: acceptance met, evidence linked, or HOLD with reason
Deferred: unrelated cleanup and unverified integrations
Status: documented example; sprint execution: Unknown.`
      }],
      note: 'План не є доказом фактичного sprint, completed implementation або delivery result.'
    }
  ],
  'l31-03': [
    {
      heading: 'Demo quality gate як рішення, а не прикраса',
      paragraphs: [
        'Capstone demo має показати bounded core flow і дозволити reviewer-у відрізнити observed behavior від narration. Quality gate повинен назвати blocking checks, advisory signals, evidence anchor і рішення GO або HOLD.',
        'Demo може бути технічно переконливим і водночас не доводити production readiness, user adoption або масштабованість. Тому gate має включати межі claims, відсутні докази й питання, які переходять у наступний крок.'
      ],
      artifactIds: ['demo-quality-gate', 'evidence', 'success-metric']
    },
    {
      heading: 'Blocking та advisory checks',
      table: {
        headers: ['Тип', 'Приклад', 'Якщо не виконано'],
        rows: [
          ['Blocking', 'Core flow запускається за documented steps', 'HOLD; demo не називається готовим'],
          ['Blocking', 'Expected output і acceptance видимі reviewer-у', 'Зупинити та уточнити contract'],
          ['Advisory', 'Optional polish або non-critical speed signal', 'Зафіксувати limitation і не приховувати'],
          ['Boundary', 'Deployment/user outcome evidence', 'Позначити Unknown, не робити claim']
        ]
      },
      artifactIds: ['review-notes', 'capstone-brief']
    },
    {
      heading: 'Demo gate example',
      code: [{
        language: 'markdown',
        caption: 'DEMO_QUALITY_GATE.md — documented example',
        code: `# DEMO_QUALITY_GATE.md
Core flow: <bounded scenario>
Blocking: startup path, expected output, acceptance evidence
Advisory: polish, optional latency signal, deferred edge cases
Evidence: <commands, diff or reviewer anchors>
Decision: GO for documented demo / HOLD
Claims excluded: production readiness, adoption, scale
Status: documented example; gate result: Unknown.`
      }],
      note: 'Gate template описує спосіб рішення, але не є результатом проведеного demo або фактичного approval.'
    }
  ],
  'l31-04': [
    {
      heading: 'Readiness до демо не дорівнює deployment',
      paragraphs: [
        'Demo readiness означає, що reviewer має відтворюваний startup path, потрібні inputs, fallback і відомі limitations для bounded показу. Це локальна або навчальна готовність сценарію, а не дозвіл на publish, release чи production deploy.',
        'Розділіть environment assumptions, data fixtures, operational permissions і deployment decision. Якщо одна з передумов не підтверджена, записуйте Unknown або HOLD замість заміни факту оптимістичним статусом.'
      ],
      artifactIds: ['demo-readiness', 'runbook-md', 'commands-md']
    },
    {
      heading: 'Readiness checklist',
      steps: [
        'Зафіксувати стартову команду або manual entry point без credentials.',
        'Описати fixtures, inputs і очікуваний observable output.',
        'Перевірити fallback для відсутньої інтеграції чи нестабільного середовища.',
        'Позначити, які checks фактично виконані, а які залишилися Unknown.',
        'Окремо передати deployment decision authorized owner-у; не включати deploy у demo script.'
      ],
      artifactIds: ['commands-md', 'run-status-yaml', 'rollback']
    },
    {
      heading: 'Readiness record',
      code: [{
        language: 'markdown',
        caption: 'DEMO_READINESS.md — documented example',
        code: `# DEMO_READINESS.md
Scenario: <bounded capstone flow>
Start: <command or manual entry point>
Inputs: <safe fixtures; no secrets>
Expected signal: <observable output>
Fallback: <manual or static path if dependency is unavailable>
Blocking unknowns: <environment, data or permission gaps>
Deployment boundary: no publish/deploy claim; decision owner: <role>
Status: documented example; readiness result: Unknown.`
      }],
      note: 'Readiness record не доводить запуск, доступність середовища, deployment або production readiness.'
    }
  ],
  'l31-05': [
    {
      heading: 'Capstone handoff для захисту',
      paragraphs: [
        'Handoff має скоротити час reviewer-а до першого корисного рішення: що показати, де evidence, які межі claims і яке питання потрібно вирішити далі. Це не рекламний текст і не заміна фактичному evidence record.',
        'Починайте з narrative core flow, потім дайте exact entry point, acceptance, known limitations, open questions і recommended next decision. Усі неперевірені результати маркуйте Unknown, а не заповнюйте правдоподібними числами.'
      ],
      artifactIds: ['capstone-defense-handoff', 'handoff-note', 'handoff-review', 'evidence']
    },
    {
      heading: 'Структура reviewer handoff',
      bullets: [
        'Context: проблема, primary user і bounded capstone outcome.',
        'Demo path: коротка послідовність дій та expected signals.',
        'Evidence map: links на diff, checks, notes і documented examples.',
        'Limitations: що не перевірено, не підтримується або не є production claim.',
        'Decision request: GO, HOLD, feedback або наступний bounded slice.',
        'Owner and next step: хто приймає рішення і де продовжується робота.'
      ],
      artifactIds: ['review-notes', 'pr-description']
    },
    {
      heading: 'Defense handoff example',
      code: [{
        language: 'markdown',
        caption: 'CAPSTONE_DEFENSE_HANDOFF.md — documented example',
        code: `# CAPSTONE_DEFENSE_HANDOFF.md
Problem: <bounded user problem>
Demo path: <three to five observable steps>
Evidence: <links or file anchors>
Known limits: <unsupported cases and Unknowns>
Claims excluded: production deployment, user validation, scale
Decision requested: GO / HOLD / feedback on next slice
Next owner: <role>; next step: <bounded action>
Status: documented example; defense outcome: Unknown.`
      }],
      note: 'Handoff packet є навчальним documented example і не доводить проведений захист, reviewer approval або завершений capstone.'
    }
  ]
};
