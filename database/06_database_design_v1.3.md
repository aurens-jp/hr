# Aurens HR Platform DB設計書 Ver1.3

## 1. 目的

本書は Aurens HR Platform のデータベース設計方針、主要テーブル、リレーション、拡張方針を定義する。

本システムでは、既存勤怠管理システムの従業員マスターを正マスターとし、人事労務側では追加情報、申請、入社手続き、給与明細、マイナンバー提出状況、e-Gov電子申請、通知、権限、操作ログを管理する。

---

## 2. DB設計基本方針

### 2.1 正マスター

従業員の基本マスターは既存勤怠管理システムを正とする。

Aurens HR側では、勤怠側の職員IDを `employee_code` として保持し、各人事労務情報と紐づける。

### 2.2 履歴管理

人事情報は、過去・現在・未来の情報を管理できるように、適用開始日と適用終了日を持たせる。

対象例：

- 所属
- 役職
- 住所
- 雇用区分
- 契約
- 扶養
- 社会保険
- 雇用保険
- 口座

### 2.3 削除方針

原則として物理削除は行わず、`deleted_at` による論理削除とする。

### 2.4 監査ログ

重要操作は操作ログへ保存する。

対象例：

- 従業員情報の閲覧
- 登録
- 更新
- 削除
- 承認
- 差戻し
- 給与明細公開
- e-Gov送信
- マイナンバー状況変更

---

## 3. テーブル分類

| 分類 | 内容 |
|---|---|
| core | 会社、事業所、部署、役職などの基本マスター |
| employee | 従業員、人事情報、履歴、扶養、契約 |
| onboarding | 入社手続き、招待、提出書類、ToDo |
| request | 従業員申請、承認、差戻し |
| salary | Web給与明細、賞与明細、公開設定 |
| mynumber | マイナンバー提出状況、将来保存対応 |
| egov | e-Gov電子申請、届出、ステータス、公文書 |
| auth | ユーザー、権限、ロール、アクセス制御 |
| notification | 通知、メールテンプレート、期限通知 |
| file | 添付ファイル、文書種別、保管先 |
| audit | 操作ログ、変更履歴 |
| system | システム設定、CSV設定、帳票設定 |

---

## 4. 主要テーブル一覧

| テーブル名 | 用途 |
|---|---|
| companies | 会社情報 |
| offices | 事業所情報 |
| departments | 部署マスター |
| positions | 役職マスター |
| employment_types | 雇用区分マスター |
| employees | Aurens HR側従業員参照情報 |
| employee_profiles | 人事労務追加情報 |
| employee_addresses | 住所履歴 |
| employee_contracts | 雇用契約履歴 |
| employee_families | 扶養家族 |
| employee_bank_accounts | 給与振込口座 |
| employee_social_insurances | 社会保険情報 |
| employee_employment_insurances | 雇用保険情報 |
| employee_qualifications | 資格・免許 |
| employee_custom_fields | カスタム項目定義 |
| employee_custom_values | カスタム項目値 |
| onboarding_cases | 入社手続き案件 |
| onboarding_tasks | 入社手続きToDo |
| onboarding_documents | 入社手続き提出書類 |
| employee_requests | 従業員申請 |
| employee_request_items | 申請項目 |
| approval_routes | 承認ルート |
| approval_steps | 承認ステップ |
| approval_logs | 承認履歴 |
| salary_statements | 給与明細ヘッダー |
| salary_statement_items | 給与明細明細行 |
| salary_import_batches | 給与CSV取込履歴 |
| salary_publish_settings | 給与明細公開設定 |
| mynumber_statuses | マイナンバー提出状況 |
| egov_applications | e-Gov申請 |
| egov_application_documents | e-Gov公文書 |
| egov_status_logs | e-Govステータス履歴 |
| users | ログインユーザー |
| roles | ロール |
| permissions | 権限マスター |
| role_permissions | ロール権限 |
| user_roles | ユーザーロール |
| notifications | 通知 |
| email_templates | メールテンプレート |
| files | 添付ファイル |
| audit_logs | 操作ログ |
| change_histories | 変更履歴 |
| system_settings | システム設定 |
| csv_import_settings | CSV取込設定 |
| document_templates | 帳票テンプレート |

---

## 5. 主要テーブル定義

## 5.1 employees

勤怠管理システムの従業員マスターと連携するための参照テーブル。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| employee_code | varchar(50) | ○ | 勤怠側職員ID |
| attendance_employee_id | varchar(100) |  | 勤怠システム側ID |
| last_name | varchar(100) | ○ | 姓 |
| first_name | varchar(100) | ○ | 名 |
| last_name_kana | varchar(100) |  | 姓カナ |
| first_name_kana | varchar(100) |  | 名カナ |
| department_id | bigint |  | 部署ID |
| position_id | bigint |  | 役職ID |
| employment_type_id | bigint |  | 雇用区分ID |
| hire_date | date |  | 入社日 |
| retirement_date | date |  | 退職日 |
| status | varchar(30) | ○ | 在職区分 |
| email | varchar(255) |  | メールアドレス |
| synced_at | datetime |  | 勤怠側同期日時 |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |
| deleted_at | datetime |  | 論理削除 |

制約：

- `employee_code` は一意。
- 勤怠システムから同期される項目は原則Aurens HR側で直接編集しない。

---

## 5.2 employee_profiles

人事労務側で追加管理する従業員情報。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| employee_id | bigint | ○ | employees.id |
| birth_date | date |  | 生年月日 |
| gender | varchar(30) |  | 性別 |
| phone | varchar(50) |  | 電話番号 |
| emergency_contact_name | varchar(100) |  | 緊急連絡先氏名 |
| emergency_contact_phone | varchar(50) |  | 緊急連絡先電話番号 |
| note | text |  | 備考 |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |

---

## 5.3 employee_requests

従業員本人からの情報変更申請を管理する。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| request_no | varchar(50) | ○ | 申請番号 |
| employee_id | bigint | ○ | 申請者 |
| request_type | varchar(50) | ○ | 住所変更、扶養変更など |
| title | varchar(255) | ○ | 申請タイトル |
| status | varchar(30) | ○ | draft, submitted, approved, rejected, canceled |
| applied_on | date |  | 適用日 |
| submitted_at | datetime |  | 申請日時 |
| approved_at | datetime |  | 承認日時 |
| current_step | int |  | 現在承認ステップ |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |
| deleted_at | datetime |  | 論理削除 |

---

## 5.4 employee_request_items

申請内容の項目単位の変更前・変更後を保持する。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| employee_request_id | bigint | ○ | 申請ID |
| item_key | varchar(100) | ○ | 項目キー |
| item_label | varchar(255) | ○ | 表示名 |
| before_value | text |  | 変更前 |
| after_value | text |  | 変更後 |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |

---

## 5.5 onboarding_cases

入社手続き案件を管理する。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| case_no | varchar(50) | ○ | 案件番号 |
| candidate_name | varchar(200) | ○ | 入社予定者氏名 |
| candidate_email | varchar(255) | ○ | 招待先メール |
| planned_hire_date | date | ○ | 入社予定日 |
| status | varchar(30) | ○ | invited, inputting, submitted, reviewing, approved, rejected |
| invitation_token | varchar(255) |  | 招待トークン |
| invited_at | datetime |  | 招待日時 |
| submitted_at | datetime |  | 提出日時 |
| approved_at | datetime |  | 承認日時 |
| created_employee_id | bigint |  | 承認後に作成・紐付く従業員ID |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |

---

## 5.6 salary_statements

給与・賞与明細のヘッダー情報。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| employee_id | bigint | ○ | 対象従業員 |
| statement_type | varchar(30) | ○ | salary, bonus |
| payment_date | date | ○ | 支給日 |
| period_year | int | ○ | 対象年 |
| period_month | int |  | 対象月 |
| gross_amount | decimal(12,2) |  | 総支給額 |
| deduction_amount | decimal(12,2) |  | 控除額 |
| net_amount | decimal(12,2) |  | 差引支給額 |
| publish_status | varchar(30) | ○ | unpublished, scheduled, published |
| published_at | datetime |  | 公開日時 |
| import_batch_id | bigint |  | CSV取込履歴ID |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |

---

## 5.7 mynumber_statuses

初期版では番号そのものは保存せず、提出状況のみ管理する。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| employee_id | bigint | ○ | 従業員ID |
| target_type | varchar(30) | ○ | employee, family |
| target_id | bigint |  | 家族IDなど |
| status | varchar(30) | ○ | not_requested, requested, submitted, confirmed, rejected, unnecessary |
| requested_at | datetime |  | 依頼日時 |
| submitted_at | datetime |  | 提出日時 |
| confirmed_at | datetime |  | 確認日時 |
| confirmed_by | bigint |  | 確認者 |
| note | text |  | 備考 |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |

将来拡張：

- 暗号化番号保存用テーブルを別途追加する。
- 番号閲覧は専用権限と操作ログを必須とする。

---

## 5.8 egov_applications

電子申請情報を管理する。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| application_no | varchar(50) | ○ | 申請番号 |
| employee_id | bigint |  | 対象従業員 |
| procedure_type | varchar(100) | ○ | 資格取得、扶養異動など |
| status | varchar(30) | ○ | draft, checked, sent, arrived, reviewing, completed, error |
| egov_arrival_id | varchar(100) |  | e-Gov到達番号 |
| sent_at | datetime |  | 送信日時 |
| completed_at | datetime |  | 完了日時 |
| error_message | text |  | エラー内容 |
| created_by | bigint | ○ | 作成者 |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |

---

## 5.9 roles / permissions

ロールと権限を管理する。

### roles

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| role_code | varchar(50) | ○ | ロールコード |
| role_name | varchar(100) | ○ | ロール名 |
| description | text |  | 説明 |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |

### permissions

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| permission_code | varchar(100) | ○ | 権限コード |
| permission_name | varchar(100) | ○ | 権限名 |
| category | varchar(50) | ○ | employee, salary, egovなど |
| created_at | datetime | ○ | 作成日時 |
| updated_at | datetime | ○ | 更新日時 |

---

## 5.10 audit_logs

操作ログ。

| カラム | 型 | 必須 | 内容 |
|---|---|---|---|
| id | bigint | ○ | 主キー |
| user_id | bigint |  | 操作者 |
| employee_id | bigint |  | 対象従業員 |
| action | varchar(100) | ○ | 操作種別 |
| target_table | varchar(100) |  | 対象テーブル |
| target_id | bigint |  | 対象ID |
| ip_address | varchar(50) |  | IPアドレス |
| user_agent | text |  | ユーザーエージェント |
| detail | json |  | 詳細情報 |
| created_at | datetime | ○ | 作成日時 |

---

## 6. ステータス定義

### 6.1 申請ステータス

| 値 | 内容 |
|---|---|
| draft | 下書き |
| submitted | 申請中 |
| approved | 承認済 |
| rejected | 差戻し |
| canceled | 取消 |

### 6.2 入社手続きステータス

| 値 | 内容 |
|---|---|
| invited | 招待済 |
| inputting | 入力中 |
| submitted | 提出済 |
| reviewing | 確認中 |
| approved | 承認済 |
| rejected | 差戻し |

### 6.3 e-Govステータス

| 値 | 内容 |
|---|---|
| draft | 未作成 |
| checked | チェック済 |
| sent | 送信済 |
| arrived | 到達 |
| reviewing | 審査中 |
| completed | 手続終了 |
| error | エラー |

---

## 7. インデックス設計

主要インデックス：

- employees.employee_code
- employees.department_id
- employees.status
- employee_requests.employee_id
- employee_requests.status
- employee_requests.request_type
- onboarding_cases.status
- onboarding_cases.planned_hire_date
- salary_statements.employee_id
- salary_statements.payment_date
- salary_statements.publish_status
- egov_applications.status
- egov_applications.procedure_type
- audit_logs.user_id
- audit_logs.created_at

---

## 8. 今後の詳細化

Ver1.4以降で以下を詳細化する。

- 全テーブルのカラム定義
- 外部キー制約
- unique制約
- migrationファイル作成方針
- 初期データ
- CSV取込マッピング
- APIレスポンス設計との整合
