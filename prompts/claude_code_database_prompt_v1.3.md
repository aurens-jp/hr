# Claude Code向け DB実装指示 Ver1.3

あなたは Aurens HR Platform のDB設計を実装するエンジニアです。

## 前提

- DBは MySQL を使用する。
- バックエンドは Laravel を想定する。
- 従業員マスターは既存勤怠システムを正マスターとする。
- Aurens HR側では `employees.employee_code` を勤怠側職員IDとして保持する。
- 論理削除は `deleted_at` を使用する。
- 作成日時、更新日時は `created_at`, `updated_at` とする。

## 実装対象

以下のMarkdownを参照してmigrationを作成する。

- `database/06_database_design_v1.3.md`
- `database/er_v1.3.md`

## 実装ルール

1. テーブル名はスネークケース複数形にする。
2. 主キーは `id` bigint unsigned auto increment とする。
3. 外部キーは可能な範囲で設定する。
4. 外部システム連携IDは varchar で保持する。
5. ステータスは varchar(30) とし、アプリ側定数で管理する。
6. 金額は decimal(12,2) を基本とする。
7. 操作ログはJSONカラムで詳細情報を保持できるようにする。
8. マイナンバー番号そのものは初期版では保存しない。
9. 将来の暗号化保存に備え、マイナンバー関連テーブルは分離する。

## 最初に作成するmigration

優先順位は以下とする。

1. companies
2. offices
3. departments
4. positions
5. employment_types
6. employees
7. employee_profiles
8. employee_addresses
9. employee_contracts
10. employee_families
11. employee_bank_accounts
12. employee_requests
13. employee_request_items
14. approval_routes
15. approval_steps
16. approval_logs
17. onboarding_cases
18. onboarding_tasks
19. onboarding_documents
20. salary_import_batches
21. salary_statements
22. salary_statement_items
23. mynumber_statuses
24. egov_applications
25. egov_application_documents
26. egov_status_logs
27. users
28. roles
29. permissions
30. user_roles
31. role_permissions
32. notifications
33. files
34. audit_logs
35. change_histories

## 出力してほしいもの

- Laravel migration files
- Model files
- Factory files
- Seeder files
- Enum or Const class for status values
- README for migration order
