# CHANGELOG

## Ver1.3 - DB設計・ER図

### Added

- DB設計書 `database/06_database_design_v1.3.md` を追加。
- Mermaid形式ER図 `database/er_v1.3.md` を追加。
- Claude Code向けDB実装プロンプト `prompts/claude_code_database_prompt_v1.3.md` を追加。
- 従業員、入社手続き、従業員申請、給与明細、マイナンバー、e-Gov、権限、通知、操作ログの主要テーブルを定義。

### Design Policy

- 既存勤怠システムの従業員マスターを正マスターとする方針をDB設計に反映。
- Aurens HR側では `employee_code` を連携キーとして保持。
- マイナンバーは初期版では番号保存せず、提出状況のみ管理。
- 将来的なe-Gov送信、公文書取得、履歴管理に対応できる構成とした。
