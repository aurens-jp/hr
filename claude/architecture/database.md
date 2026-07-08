# データベース設計方針

詳細なテーブル一覧は `docs/00_project/00_architecture_overview_v1.0.md` 4章を参照。

## 命名規則
- DBは snake_case、テーブル名は複数形
- 共通カラム: id, uuid, created_at, updated_at, deleted_at, created_by, updated_by(全テーブル必須)

## RLS
- 全テーブルでRLSを最初から有効化する(無効のまま放置しない)
- `has_permission(permission_code text)` 関数でロール権限を判定
- `is_manager_of_unit(target_unit_id uuid)` 関数で自部門スコープを判定
- 「本人のみ」「担当者のみ」系は `auth.uid() = 対象カラム` の行所有者チェックを組み合わせる

## 決裁・承認
- `approval_route_templates` / `approval_route_template_steps` でルートをテンプレート化し、申請時に `approval_steps` へ実体化する
- 承認候補が複数の場合は `approval_step_candidates` に列挙し、先着1名の承認で完了する
