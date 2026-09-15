зроби окрему сторінку з постановками задач та їх прикладами, задачі повинні посилатись на артефакти та містити заповнені приклади
напириклад
Режим 	Що змінюємо 	Що має залишитися 	Головний артефакт 	Типовий ризик
Modernization 	проблемну legacy-ділянку крок за кроком 	зовнішні контракти й бізнес-сенс 	risk map, baseline, поетапний план 	розповзання scope і надто широкий diff
migration-задачі
# TASK_SPEC
Mode: migration
Goal: підготувати пілотний перехід на Boot 3.x і Java 21
Scope: build-конфіг, security-конфіг, один read-only endpoint
Non-goals: рефакторинг BillingService, нова схема БД, нові фічі
Success: pilot slice проходить поточні перевірки та поводиться як раніше

CLAUDE.md migration-сесії:

## Режим дослідження міграції
- джерело істини: official docs + repo files
- кожен висновок = docs section + file path
- непідтверджене позначати Unknown
- не пропонувати edit, build і version bump без запиту