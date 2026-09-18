import type { GuideSection } from '../types/guide';

export const levelThirtyTwoContent: Record<string, GuideSection[]> = {
  'l32-01': [
    {
      heading: 'Submission package як boundary захисту',
      paragraphs: [
        'Submission package — це не архів усього repository, а компактний набір, з якого reviewer може зрозуміти проблему, запустити bounded core flow, побачити evidence і відрізнити факт від Unknown. Пакет має бути достатнім для відтворення, але не повинен приховувати відсутні перевірки за красивою презентацією.',
        'Repro audit перевіряє шлях від чистого checkout до очікуваного сигналу: передумови, команда старту, безпечні fixtures, expected output, observed output і відомі environment gaps. У навчальному прикладі результат аудиту завжди відокремлюється від самого checklist: опис процедури не доводить, що її виконано.'
      ],
      artifactIds: ['submission-package', 'repro-audit', 'handoff-package', 'evidence']
    },
    {
      heading: 'Що має пройти через audit',
      table: {
        headers: ['Шар', 'Питання reviewer-а', 'Як позначити прогалину'],
        rows: [
          ['Entry point', 'Чи зрозуміло, з якого стану й командою почати?', 'Needs verification або конкретна missing prerequisite'],
          ['Inputs', 'Чи є безпечні fixtures без secrets і PII?', 'Unknown input dependency; не вигадувати дані'],
          ['Observable output', 'Який сигнал означає, що core flow пройдено?', 'Acceptance signal не визначений'],
          ['Evidence', 'Де diff, checks, notes і limitations?', 'Посилання відсутнє або result Unknown'],
          ['Boundary', 'Що пакет не доводить?', 'Явно виключити deployment, adoption і production readiness']
        ]
      },
      artifactIds: ['repro-audit', 'evidence-log']
    },
    {
      heading: 'Submission package',
      code: [{
        language: 'markdown',
        caption: 'SUBMISSION_PACKAGE.md — documented example',
        code: `# SUBMISSION_PACKAGE.md
Problem: <bounded problem>
Core flow: <one observable scenario>
Start: <safe command or manual entry point>
Inputs: <fixtures without secrets>
Expected signal: <observable output>
Evidence: <diff, checks and notes>
Repro audit: <REPRO_AUDIT.md anchor>
Known limits: <unsupported cases and Unknowns>
Status: documented example; submission and reproducibility result: Unknown.`
      }],
      note: 'Submission package і repro audit є навчальними documented examples. Вони не доводять фактичний запуск, submission, review або reproducibility outcome.'
    }
  ],
  'l32-02': [
    {
      heading: 'Наратив захисту без хаосу',
      paragraphs: [
        'Захист capstone має вести reviewer-а від проблеми до observable outcome, а не відтворювати весь transcript роботи. Сильний narrative називає аудиторію, bounded scope, один core flow, ключові рішення, evidence anchors і чесні limitations.',
        'Порядок розповіді — це контроль cognitive load. Спочатку поясніть, що перевіряється і чому це важливо, потім покажіть короткий flow, після цього відкрийте докази та заверште запитом на рішення. Якщо демонстрація відхиляється від сценарію, зупиніться й запишіть Unknown замість імпровізованого claim.'
      ],
      artifactIds: ['defense-narrative', 'demo', 'capstone-defense-handoff']
    },
    {
      heading: 'Чотири опори defense narrative',
      steps: [
        'Context: назвати проблему, primary user, bounded outcome і non-goals.',
        'Walkthrough: показати три–пʼять кроків core flow з очікуваними сигналами.',
        'Evidence: відкрити релевантний diff, check або record і пояснити його межу.',
        'Decision: попросити GO, HOLD, feedback або наступний bounded slice; не називати це approval без фактичного рішення.'
      ],
      artifactIds: ['defense-narrative', 'demo-quality-gate', 'review-notes']
    },
    {
      heading: 'Defense narrative',
      code: [{
        language: 'markdown',
        caption: 'DEFENSE_NARRATIVE.md — documented example',
        code: `# DEFENSE_NARRATIVE.md
Audience: <reviewer or evaluator>
Problem: <bounded problem and user>
Claim: <what this capstone slice demonstrates>
Path:
1. <action> -> <expected signal>
2. <action> -> <expected signal>
3. <action> -> <expected signal>
Evidence anchors: <files, commands or notes>
Known limits: <Unknowns and unsupported cases>
Decision requested: <GO / HOLD / feedback>
Status: documented example; defense outcome: Unknown.`
      }],
      note: 'Narrative — це структура показу, а не transcript фактичного захисту або доказ reviewer approval.'
    }
  ],
  'l32-03': [
    {
      heading: 'Критерії оцінювання capstone',
      paragraphs: [
        'Rubric перетворює загальне «покажи проєкт» на прозорі dimensions, evidence expectations і decision boundary. Критерій має описувати observable quality, а не враження від кількості коду чи polish.',
        'Оцінювання потрібно відділяти від непідтверджених claims. Наявність rubric не означає, що evaluator застосував її, а заповнений приклад із Unknown не є score або approval.'
      ],
      artifactIds: ['capstone-rubric', 'demo-quality-gate', 'evidence']
    },
    {
      heading: 'Приклад dimensions',
      table: {
        headers: ['Dimension', 'Evidence question', 'Boundary'],
        rows: [
          ['Problem and user', 'Чи зрозуміло, для кого і яку проблему вирішує slice?', 'Не доводить market demand або adoption'],
          ['Core flow', 'Чи можна пройти сценарій від entry до output?', 'Не доводить production scale'],
          ['Scope discipline', 'Чи видно non-goals і відкладені рішення?', 'Не винагороджувати необмежений feature scope'],
          ['Verification', 'Чи повʼязані checks із acceptance?', 'Planned check не є pass result'],
          ['Evidence and limits', 'Чи може reviewer знайти facts і Unknowns?', 'Unknown не перетворювати на score без рішення'],
          ['Communication', 'Чи захист має послідовний narrative?', 'Polish не замінює working evidence']
        ]
      },
      artifactIds: ['capstone-rubric', 'review-notes']
    },
    {
      heading: 'Rubric record',
      code: [{
        language: 'markdown',
        caption: 'CAPSTONE_RUBRIC.md — documented example',
        code: `# CAPSTONE_RUBRIC.md
Dimension: <problem / flow / scope / verification / evidence / communication>
Expected signal: <observable criterion>
Evidence required: <file, command or demo anchor>
Status scale: <not shown / partial / shown / needs verification>
Weight: <agreed value or Unknown>
Reviewer note: <feedback or Unknown>
Decision boundary: <GO / HOLD / remediation>
Status: documented example; rubric application and score: Unknown.`
      }],
      note: 'Rubric описує спосіб оцінювання, але не містить фактичного score, mentor decision або approval.'
    }
  ],
  'l32-04': [
    {
      heading: 'Mentor review як feedback loop',
      paragraphs: [
        'Mentor review має перетворити спостереження на рішення, а не на загальний список побажань. Для кожного finding потрібні evidence anchor, severity, owner, next action, acceptance signal і статус. Це дозволяє відрізнити Must fix від Should fix та Later без маскування невизначеності.',
        'Remediation backlog не є доказом, що mentor review відбувся. У навчальному пакеті findings і пріоритети заповнюються як documented example, а фактичні оцінки та ownership залишаються Unknown, якщо вони не підтверджені записом review.'
      ],
      artifactIds: ['remediation-backlog', 'review-notes', 'backlog-roadmap']
    },
    {
      heading: 'Від finding до remediation item',
      steps: [
        'Зафіксувати observed finding і посилання на evidence, не замінюючи його гіпотезою.',
        'Визначити severity та decision impact: Must fix, Should fix або Later.',
        'Призначити owner лише після фактичного рішення; інакше записати owner як Unknown.',
        'Сформулювати одну next action і acceptance signal.',
        'Оновити статус після перевірки або залишити Needs verification із причиною.'
      ],
      artifactIds: ['remediation-backlog', 'evidence-log']
    },
    {
      heading: 'Remediation backlog',
      code: [{
        language: 'markdown',
        caption: 'REMEDIATION_BACKLOG.md — documented example',
        code: `# REMEDIATION_BACKLOG.md
Source review: <mentor/reviewer note or Unknown>

| Priority | Finding | Evidence | Owner | Acceptance signal | Status |
| --- | --- | --- | --- | --- | --- |
| Must fix | <blocking gap> | <anchor or Unknown> | <role or Unknown> | <observable check> | Needs verification |
| Should fix | <quality improvement> | <anchor or Unknown> | <role or Unknown> | <observable check> | Planned documented example |
| Later | <deferred improvement> | <reason> | <role or Unknown> | <future signal> | Deferred |

Boundary: this backlog does not prove mentor approval or completed remediation.`
      }],
      note: 'Backlog є структурою наступних дій. Він не доводить проведений mentor review, виконаний remediation або готовність до submission.'
    }
  ],
  'l32-05': [
    {
      heading: 'Portfolio packaging після ревʼю',
      paragraphs: [
        'Portfolio package — це curated історія reviewed capstone для зовнішнього читача: проблема, роль, core flow, selected evidence, рішення після feedback і відомі обмеження. Він має бути коротшим за repository та прозоро показувати, що є фактом, а що — навчальним прикладом або Unknown.',
        'Після review не потрібно переписувати історію так, ніби всі рекомендації виконані. Пакет може містити remediation backlog, відкриті питання й відкладені claims. Якість упаковки визначається traceability і чесною межею доказів, а не маркетинговою впевненістю.'
      ],
      artifactIds: ['portfolio-package', 'submission-package', 'capstone-defense-handoff', 'handoff-package']
    },
    {
      heading: 'Структура portfolio package',
      bullets: [
        'One-line context: для кого capstone і яку bounded проблему він адресує.',
        'Role and contribution: що саме було спроєктовано або виконано, із позначкою Unknown для непідтверджених деталей.',
        'Core flow: короткий demo path із expected signals і посиланням на submission package.',
        'Evidence map: selected diff, checks, rubric і mentor notes; кожен anchor має межу.',
        'Review outcome: фактичне рішення або `Unknown`, без вигаданого approval.',
        'Limitations and next step: remediation, deferred scope і наступне рішення.'
      ],
      artifactIds: ['portfolio-package', 'remediation-backlog', 'evidence']
    },
    {
      heading: 'Portfolio package',
      code: [{
        language: 'markdown',
        caption: 'PORTFOLIO_PACKAGE.md — documented example',
        code: `# PORTFOLIO_PACKAGE.md
Title: <capstone name>
Problem and audience: <bounded context>
Role/contribution: <verified contribution or Unknown>
Core flow: <short observable scenario>
Selected evidence: <submission, demo, checks and review anchors>
Evaluation: <rubric summary or Unknown>
Review outcome: <observed decision or Unknown>
Limitations: <unsupported claims and open questions>
Next step: <remediation item or bounded follow-up>
Status: documented example; portfolio publication and external validation: Unknown.`
      }],
      note: 'Portfolio package — це reusable documented example. Він не підтверджує публікацію portfolio, зовнішній review, працевлаштування, user validation або production outcome.'
    }
  ]
};
