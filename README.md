# Aurens HR Platform Design

Aurens HR Platform は、既存勤怠管理システムを正マスターとして連携し、人事労務、入社手続き、従業員申請、Web給与明細、マイナンバー提出状況管理、e-Gov電子申請を統合するWebシステムの設計リポジトリです。

## Current Version

- Version: 1.2
- Scope: 画面設計書の追加
- Status: 基本設計・業務フロー・機能一覧・画面一覧・画面詳細設計を整備中

## Directory Structure

```text
README.md
docs/
  01_basic_design.md
  02_business_flow.md
  03_function_list.md
  04_screen_list.md
  05_screen_design_v1.2.md
screens/
  screen_design_index_v1.2.md
prompts/
  claude_code_screen_prompt_v1.2.md
changelog/
  CHANGELOG.md
```

## Design Policy

1. 既存勤怠管理システムを従業員正マスターとする。
2. 人事労務側は追加情報・申請・承認・帳票・電子申請を管理する。
3. 申請フォーム、承認ルート、通知、権限は設定で変更可能にする。
4. 画面ID・API・DB・権限コードを明確にし、AI開発ツールへ渡しやすい仕様にする。
5. マイナンバーは初期版ではステータス管理のみとし、将来の暗号化保存に対応できる設計にする。

## Latest Added Files

- docs/05_screen_design_v1.2.md
- screens/screen_design_index_v1.2.md
- prompts/claude_code_screen_prompt_v1.2.md
- changelog/CHANGELOG.md
