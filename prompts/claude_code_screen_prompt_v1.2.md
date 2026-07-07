# Claude Code 実装指示プロンプト Ver1.2

## 前提

Aurens HR Platform の画面設計書 Ver1.2 に基づき、指定された画面IDの画面を実装する。
既存勤怠管理システムを従業員正マスターとし、人事労務側では追加情報、申請、承認、給与明細、電子申請を管理する。

## 実装依頼テンプレート

```text
以下の設計書に基づいて、画面ID {SCREEN_ID} を実装してください。

参照ファイル:
- docs/05_screen_design_v1.2.md
- screens/screen_design_index_v1.2.md

実装条件:
- フロントエンド: React
- バックエンド: Laravel REST API
- DB: MySQL
- 認証: JWT またはセッション認証
- 権限: permission_code による制御
- 操作ログ: create/update/delete/approve/reject/export/import/view_sensitive を記録
- 入力チェックはフロントとバックエンド双方で実施
- API名、DB名、権限コードは設計書の名称を優先
- 未定義項目は TODO コメントとして残し、勝手に仕様変更しない

対象画面:
{SCREEN_ID}
```
