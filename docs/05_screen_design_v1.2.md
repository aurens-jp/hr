# Aurens HR Platform 画面設計書 Ver1.2

## 1. 目的

本書は Aurens HR Platform の画面設計を定義する。
Ver1.2では、基本設計、業務フロー、機能一覧、画面一覧をもとに、AI開発ツールが実装に利用できる粒度で画面仕様を整理する。

## 2. 共通画面設計方針

### 2.1 共通UI

- 左サイドメニュー、上部ヘッダー、メインコンテンツで構成する。
- PCブラウザを主対象とし、従業員画面はスマートフォン表示にも対応する。
- 管理者画面と従業員画面はメニュー構成を分離する。
- 一覧画面は検索、絞り込み、並び替え、CSV出力に対応する。
- 入力画面は下書き保存、確認、登録、差戻しに対応する。

### 2.2 共通項目

| Item | Description |
|---|---|
| screen_id | 画面ID |
| screen_name | 画面名 |
| user_role | 利用者 |
| purpose | 画面目的 |
| input_items | 入力項目 |
| display_items | 表示項目 |
| buttons | ボタン |
| api | 利用API |
| db | 主な参照・更新テーブル |
| permission | 必要権限 |
| log | 操作ログ |
| notification | 通知 |

### 2.3 画面ID規則

画面IDは `HR-機能区分-連番` とする。

例:

- HR-EMP-001: 従業員一覧
- HR-REQ-004: 申請詳細・承認
- HR-EGV-003: e-Gov送信・結果確認

---

# 3. 認証画面

## HR-AUTH-001 ログイン

| Item | Description |
|---|---|
| 利用者 | 全利用者 |
| 目的 | システムへログインする |
| 入力項目 | ログインID、パスワード |
| ボタン | ログイン、パスワード再設定 |
| API | POST /api/auth/login |
| DB | users, login_histories |
| 権限 | なし |
| ログ | login_success, login_failed |
| 通知 | なし |

### バリデーション

- ログインID必須。
- パスワード必須。
- 一定回数失敗でアカウントロックする。

### 備考

将来的に2段階認証、IP制限、SSOに対応できる設計とする。

---

# 4. ダッシュボード

## HR-DASH-001 管理者ダッシュボード

| Item | Description |
|---|---|
| 利用者 | システム管理者、人事担当者、給与担当者、部門管理者 |
| 目的 | 未処理業務、期限、通知を一覧確認する |
| 表示項目 | 未承認申請、入社予定、給与公開予定、e-Gov状況、契約期限、資格期限、提出状況 |
| ボタン | 詳細、申請一覧へ、入社手続きへ、給与明細へ、電子申請へ |
| API | GET /api/dashboard/admin |
| DB | employee_requests, onboardings, salary_publications, egov_applications, notifications |
| 権限 | dashboard.admin.view |
| ログ | dashboard_view |
| 通知 | なし |

### 表示カード

- 承認待ち申請件数
- 入社予定者件数
- 差戻し中件数
- 給与明細公開予定
- e-Govエラー件数
- マイナンバー提出状況
- 契約期限30日以内
- 在留期限30日以内

## HR-DASH-002 従業員ダッシュボード

| Item | Description |
|---|---|
| 利用者 | 一般従業員 |
| 目的 | 自分に関係する通知、申請、給与明細を確認する |
| 表示項目 | お知らせ、未提出タスク、申請状況、給与明細、差戻し通知 |
| ボタン | 申請する、給与明細を見る、プロフィール確認 |
| API | GET /api/dashboard/employee |
| DB | notifications, employee_requests, salary_statements, employee_tasks |
| 権限 | dashboard.employee.view |
| ログ | dashboard_view |
| 通知 | なし |

---

# 5. 従業員管理

## HR-EMP-001 従業員一覧

| Item | Description |
|---|---|
| 利用者 | 人事担当者、部門管理者 |
| 目的 | 従業員を検索し、詳細情報へ遷移する |
| 検索条件 | 職員ID、氏名、所属、雇用区分、在職区分、入社日、退職日 |
| 一覧項目 | 職員ID、氏名、所属、役職、雇用区分、勤務パターン、在職区分、メール |
| ボタン | 検索、クリア、詳細、CSV出力、勤怠同期 |
| API | GET /api/employees, POST /api/employees/sync-attendance |
| DB | employees, departments, positions, attendance_employee_links |
| 権限 | employee.view, employee.export, employee.sync |
| ログ | employee_list_view, employee_export, attendance_sync |
| 通知 | 同期エラー時に管理者通知 |

### 仕様

- 従業員マスターは既存勤怠管理システムを正とする。
- 本画面の新規登録は原則行わない。
- 手動追加は例外登録権限を持つユーザーのみ許可する。
- 部門管理者は権限設定に応じて自部署または許可部署のみ表示する。

## HR-EMP-002 従業員詳細

| Item | Description |
|---|---|
| 利用者 | 人事担当者、部門管理者、本人 |
| 目的 | 従業員の人事労務情報を確認・編集する |
| 表示タブ | 基本情報、契約、住所、家族、社会保険、雇用保険、資格、免許、口座、添付、履歴、コメント |
| ボタン | 保存、履歴表示、申請作成、CSV出力、PDF出力 |
| API | GET /api/employees/{id}, PUT /api/employees/{id}/hr-profile |
| DB | employees, employee_profiles, employee_histories, employee_custom_values |
| 権限 | employee.detail.view, employee.hr.edit |
| ログ | employee_detail_view, employee_update |
| 通知 | 管理者編集時は必要に応じて本人通知 |

### 仕様

- 勤怠側由来の項目は読み取り専用とする。
- 人事労務側追加項目は権限に応じて編集可能とする。
- 適用日を持つ項目は履歴管理する。

## HR-EMP-003 従業員履歴

| Item | Description |
|---|---|
| 利用者 | 人事担当者 |
| 目的 | 従業員情報の変更履歴を確認する |
| 表示項目 | 適用日、変更項目、変更前、変更後、変更者、変更日時、申請ID |
| ボタン | 詳細、CSV出力 |
| API | GET /api/employees/{id}/histories |
| DB | employee_histories, employee_request_histories |
| 権限 | employee.history.view, employee.history.export |
| ログ | employee_history_view, employee_history_export |
| 通知 | なし |

## HR-EMP-004 添付ファイル管理

| Item | Description |
|---|---|
| 利用者 | 人事担当者、本人、部門管理者 |
| 目的 | 従業員に紐づく書類を管理する |
| 表示項目 | 書類種別、ファイル名、提出者、提出日、承認状態、有効期限 |
| ボタン | アップロード、ダウンロード、プレビュー、削除 |
| API | GET /api/employees/{id}/files, POST /api/employees/{id}/files |
| DB | employee_files, document_types, file_access_logs |
| 権限 | file.view, file.upload, file.delete |
| ログ | file_upload, file_download, file_delete, file_preview |
| 通知 | 必須書類不足時に通知 |

---

# 6. 入社手続き

## HR-ONB-001 入社予定者一覧

| Item | Description |
|---|---|
| 利用者 | 人事担当者 |
| 目的 | 入社予定者と手続き進捗を管理する |
| 検索条件 | 氏名、入社予定日、所属予定、ステータス |
| 一覧項目 | 氏名、メール、入社予定日、所属予定、進捗、最終更新日 |
| ボタン | 新規作成、招待、詳細、CSV出力 |
| API | GET /api/onboardings, POST /api/onboardings |
| DB | onboardings, onboarding_tasks, onboarding_invitations |
| 権限 | onboarding.view, onboarding.create |
| ログ | onboarding_list_view, onboarding_create |
| 通知 | 招待時に本人へメール |

## HR-ONB-002 入社手続き招待

| Item | Description |
|---|---|
| 利用者 | 人事担当者 |
| 目的 | 入社予定者へ入力フォームを送信する |
| 入力項目 | 氏名、メール、入社予定日、テンプレート、提出期限、必要書類 |
| ボタン | 下書き保存、招待メール送信、プレビュー |
| API | POST /api/onboardings/{id}/invite |
| DB | onboarding_invitations, mail_templates, document_requirements |
| 権限 | onboarding.invite |
| ログ | onboarding_invite_sent |
| 通知 | 入社予定者へ招待メール |

## HR-ONB-003 入社手続き本人入力

| Item | Description |
|---|---|
| 利用者 | 入社予定者 |
| 目的 | 入社に必要な情報と書類を本人が提出する |
| 入力項目 | 本人情報、住所、通勤、扶養、口座、社会保険、雇用保険、緊急連絡先、添付書類 |
| ボタン | 一時保存、確認、提出 |
| API | GET /api/onboardings/{token}, PUT /api/onboardings/{token}, POST /api/onboardings/{token}/submit |
| DB | onboardings, onboarding_answers, onboarding_files |
| 権限 | onboarding.employee.input |
| ログ | onboarding_input_save, onboarding_submit |
| 通知 | 提出時に人事担当者へ通知 |

### 必須書類

- 履歴書
- 雇用契約書
- 扶養控除等申告書
- 給与口座確認書類
- 本人確認書類
- 資格証または免許証
- 通勤経路資料
- その他管理者設定書類

## HR-ONB-004 入社手続き承認

| Item | Description |
|---|---|
| 利用者 | 人事担当者 |
| 目的 | 提出内容を確認し、承認または差戻しする |
| 表示項目 | 入力内容、添付書類、不備チェック、コメント履歴 |
| ボタン | 承認、差戻し、コメント追加、従業員情報へ反映、e-Gov届出作成 |
| API | POST /api/onboardings/{id}/approve, POST /api/onboardings/{id}/reject, POST /api/onboardings/{id}/convert-employee |
| DB | onboardings, onboarding_approval_logs, employees, employee_profiles |
| 権限 | onboarding.approve, onboarding.reject, employee.convert |
| ログ | onboarding_approve, onboarding_reject, onboarding_convert_employee |
| 通知 | 承認・差戻し時に本人通知 |

---

# 7. 従業員申請

## HR-REQ-001 申請フォーム一覧

| Item | Description |
|---|---|
| 利用者 | システム管理者、人事担当者 |
| 目的 | 従業員が利用する申請フォームを設定する |
| 一覧項目 | フォーム名、対象項目、承認ルート、公開状態、更新日 |
| ボタン | 新規作成、編集、複製、無効化 |
| API | GET /api/request-forms, POST /api/request-forms |
| DB | request_forms, request_form_items, approval_routes |
| 権限 | request_form.view, request_form.edit |
| ログ | request_form_view, request_form_create, request_form_update |
| 通知 | なし |

## HR-REQ-002 従業員申請入力

| Item | Description |
|---|---|
| 利用者 | 従業員 |
| 目的 | 住所変更、扶養変更、口座変更などを申請する |
| 入力項目 | 申請フォーム設定に従う |
| ボタン | 一時保存、確認、申請、取下げ |
| API | GET /api/employee/requests/forms, POST /api/employee/requests |
| DB | employee_requests, employee_request_items, request_attachments |
| 権限 | request.employee.create |
| ログ | request_draft_save, request_submit, request_cancel |
| 通知 | 申請時に承認者へ通知 |

## HR-REQ-003 申請承認一覧

| Item | Description |
|---|---|
| 利用者 | 人事担当者、部門管理者 |
| 目的 | 承認待ち申請を一覧確認する |
| 検索条件 | 申請種別、申請者、所属、ステータス、申請日 |
| 一覧項目 | 申請ID、申請者、申請種別、ステータス、現在承認者、申請日 |
| ボタン | 詳細、CSV出力、一括承認 |
| API | GET /api/approvals/requests |
| DB | employee_requests, approval_instances, approval_steps |
| 権限 | request.approve.view |
| ログ | approval_list_view, approval_export |
| 通知 | なし |

## HR-REQ-004 申請詳細・承認

| Item | Description |
|---|---|
| 利用者 | 承認者、人事担当者 |
| 目的 | 申請内容を確認し、承認または差戻しを行う |
| 表示項目 | 申請内容、変更前、変更後、添付、コメント、承認履歴 |
| ボタン | 承認、差戻し、却下、コメント、マスター反映 |
| API | GET /api/requests/{id}, POST /api/requests/{id}/approve, POST /api/requests/{id}/reject |
| DB | employee_requests, employee_request_items, approval_logs, employee_histories |
| 権限 | request.approve, request.reject |
| ログ | request_approve, request_reject, request_apply |
| 通知 | 承認・差戻し・却下時に申請者へ通知 |

---

# 8. Web給与明細

## HR-SAL-001 給与明細CSV取込

| Item | Description |
|---|---|
| 利用者 | 給与担当者 |
| 目的 | 外部給与計算ソフトのCSVを取り込む |
| 入力項目 | 支給年月、明細種別、CSVファイル、レイアウト |
| ボタン | ファイル選択、検証、取込、エラーCSV出力 |
| API | POST /api/salary/import, POST /api/salary/import/validate |
| DB | salary_imports, salary_statements, salary_statement_items |
| 権限 | salary.import |
| ログ | salary_import_validate, salary_import_execute |
| 通知 | 取込エラー時に給与担当者へ通知 |

## HR-SAL-002 給与明細公開設定

| Item | Description |
|---|---|
| 利用者 | 給与担当者 |
| 目的 | 給与明細の公開日・通知を設定する |
| 入力項目 | 支給年月、公開日時、対象者、通知有無 |
| ボタン | 保存、公開、公開取消、プレビュー |
| API | POST /api/salary/publications, POST /api/salary/publications/{id}/publish |
| DB | salary_publications, salary_statements, notifications |
| 権限 | salary.publish |
| ログ | salary_publish_setting, salary_publish_execute |
| 通知 | 公開時に対象従業員へ通知 |

## HR-SAL-003 従業員給与明細閲覧

| Item | Description |
|---|---|
| 利用者 | 従業員 |
| 目的 | 自分の給与・賞与明細を閲覧する |
| 表示項目 | 支給年月、支給項目、控除項目、勤怠項目、差引支給額 |
| ボタン | PDF表示、PDFダウンロード、過去明細 |
| API | GET /api/employee/salary-statements |
| DB | salary_statements, salary_statement_items |
| 権限 | salary.employee.view |
| ログ | salary_statement_view, salary_statement_pdf_download |
| 通知 | なし |

---

# 9. マイナンバー管理

## HR-MYN-001 マイナンバー提出状況一覧

| Item | Description |
|---|---|
| 利用者 | マイナンバー管理者、人事担当者 |
| 目的 | 従業員・扶養家族の提出状況を管理する |
| 検索条件 | 氏名、所属、提出状況、対象区分 |
| 一覧項目 | 職員ID、氏名、本人提出状況、扶養家族提出状況、最終更新日 |
| ボタン | 依頼、確認済、差戻し、CSV出力 |
| API | GET /api/my-number/statuses, POST /api/my-number/statuses/request |
| DB | my_number_statuses, my_number_request_logs |
| 権限 | mynumber.status.view, mynumber.request |
| ログ | mynumber_status_view, mynumber_request |
| 通知 | 提出依頼時に従業員へ通知 |

### 初期版方針

- 番号そのものは保存しない。
- 提出状況、確認状況、差戻し状況のみ管理する。
- 将来の暗号化保存に備えて、テーブル設計は拡張可能にする。

## HR-MYN-002 マイナンバー提出依頼

| Item | Description |
|---|---|
| 利用者 | マイナンバー管理者 |
| 目的 | 対象者に提出依頼を送る |
| 入力項目 | 対象者、提出期限、依頼文、添付要否 |
| ボタン | 送信、下書き、プレビュー |
| API | POST /api/my-number/requests |
| DB | my_number_requests, notifications |
| 権限 | mynumber.request.create |
| ログ | mynumber_request_create, mynumber_request_send |
| 通知 | 対象従業員へ提出依頼 |

---

# 10. e-Gov電子申請

## HR-EGV-001 e-Gov電子申請一覧

| Item | Description |
|---|---|
| 利用者 | 電子申請管理者、人事担当者 |
| 目的 | 電子申請の一覧と進捗を管理する |
| 検索条件 | 申請種別、対象者、ステータス、申請日、到達番号 |
| 一覧項目 | 申請ID、申請種別、対象者、ステータス、到達番号、更新日 |
| ボタン | 詳細、届出作成、送信、状況取得、公文書取得 |
| API | GET /api/egov/applications |
| DB | egov_applications, egov_status_histories |
| 権限 | egov.view |
| ログ | egov_list_view |
| 通知 | エラー発生時に電子申請管理者へ通知 |

## HR-EGV-002 e-Gov届出作成

| Item | Description |
|---|---|
| 利用者 | 電子申請管理者、人事担当者 |
| 目的 | 入社・扶養・資格取得等の届出データを作成する |
| 入力項目 | 申請種別、対象従業員、事業所、資格取得日、扶養情報、添付ファイル |
| ボタン | 下書き保存、入力チェック、申請データ作成 |
| API | POST /api/egov/applications, POST /api/egov/applications/{id}/validate |
| DB | egov_applications, egov_application_items, employees, employee_family |
| 権限 | egov.create |
| ログ | egov_create, egov_validate |
| 通知 | 入力エラー時に作成者へ通知 |

## HR-EGV-003 e-Gov送信・結果確認

| Item | Description |
|---|---|
| 利用者 | 電子申請管理者 |
| 目的 | e-Govへ申請送信し、結果・公文書を取得する |
| 表示項目 | 申請内容、入力チェック結果、送信結果、ステータス履歴、公文書 |
| ボタン | 送信、状況取得、公文書取得、再送、取下げ |
| API | POST /api/egov/applications/{id}/send, GET /api/egov/applications/{id}/status, GET /api/egov/applications/{id}/official-documents |
| DB | egov_applications, egov_status_histories, egov_documents |
| 権限 | egov.send, egov.status.fetch, egov.document.download |
| ログ | egov_send, egov_status_fetch, egov_document_download |
| 通知 | 審査終了・エラー時に管理者通知 |

---

# 11. システム設定

## HR-SET-001 会社情報設定

| Item | Description |
|---|---|
| 利用者 | システム管理者 |
| 目的 | 会社・事業所の基本情報を管理する |
| 入力項目 | 会社名、法人番号、所在地、代表者、事業所、社労士情報 |
| ボタン | 保存、履歴、CSV出力 |
| API | GET /api/settings/company, PUT /api/settings/company |
| DB | companies, offices, social_insurance_offices |
| 権限 | setting.company.view, setting.company.edit |
| ログ | company_setting_view, company_setting_update |
| 通知 | なし |

## HR-SET-002 部署・役職設定

| Item | Description |
|---|---|
| 利用者 | システム管理者、人事担当者 |
| 目的 | 部署、役職、雇用区分を管理する |
| 入力項目 | 部署名、親部署、役職名、雇用区分、表示順、利用状態 |
| ボタン | 新規、保存、削除、並び替え、勤怠同期 |
| API | GET /api/settings/organizations, POST /api/settings/organizations/sync-attendance |
| DB | departments, positions, employment_types |
| 権限 | setting.organization.view, setting.organization.edit, setting.organization.sync |
| ログ | organization_update, organization_sync |
| 通知 | 同期エラー時に管理者通知 |

## HR-SET-003 権限設定

| Item | Description |
|---|---|
| 利用者 | システム管理者 |
| 目的 | ユーザーごとの閲覧・編集・承認権限を設定する |
| 入力項目 | ロール名、対象ユーザー、対象部署、権限コード、利用状態 |
| ボタン | 新規、保存、複製、無効化 |
| API | GET /api/settings/roles, PUT /api/settings/roles/{id} |
| DB | roles, permissions, role_permissions, user_roles |
| 権限 | setting.permission.view, setting.permission.edit |
| ログ | permission_setting_view, permission_setting_update |
| 通知 | 権限変更時に対象ユーザーへ通知可能 |

### 権限の考え方

- 部門管理者の権限は固定しない。
- ユーザー設定で、閲覧・編集・承認・CSV・PDF・e-Gov・マイナンバー等を個別付与する。
- 給与明細とマイナンバーは特に強い権限管理を行う。

## HR-SET-004 通知設定

| Item | Description |
|---|---|
| 利用者 | システム管理者、人事担当者 |
| 目的 | メール通知・システム通知の条件を設定する |
| 入力項目 | 通知種別、対象者、通知タイミング、メール送信有無、本文テンプレート |
| ボタン | 保存、テスト送信 |
| API | GET /api/settings/notifications, PUT /api/settings/notifications |
| DB | notification_settings, mail_templates |
| 権限 | setting.notification.view, setting.notification.edit |
| ログ | notification_setting_update, notification_test_send |
| 通知 | テスト送信 |

## HR-SET-005 メールテンプレート設定

| Item | Description |
|---|---|
| 利用者 | システム管理者、人事担当者 |
| 目的 | 入社招待、申請通知、給与公開などのメール文面を管理する |
| 入力項目 | テンプレート名、件名、本文、差込項目、利用状態 |
| ボタン | 新規、保存、プレビュー、テスト送信 |
| API | GET /api/settings/mail-templates, PUT /api/settings/mail-templates/{id} |
| DB | mail_templates |
| 権限 | setting.mail_template.view, setting.mail_template.edit |
| ログ | mail_template_update, mail_template_test_send |
| 通知 | テスト送信 |

---

# 12. 操作ログ

## HR-LOG-001 操作ログ一覧

| Item | Description |
|---|---|
| 利用者 | システム管理者、監査担当者 |
| 目的 | システム操作履歴を確認する |
| 検索条件 | 操作者、操作種別、対象画面、対象ID、期間、IPアドレス |
| 一覧項目 | 操作日時、操作者、画面ID、操作種別、対象ID、IPアドレス、結果 |
| ボタン | 検索、詳細、CSV出力 |
| API | GET /api/audit-logs |
| DB | audit_logs |
| 権限 | audit_log.view, audit_log.export |
| ログ | audit_log_view, audit_log_export |
| 通知 | 不正操作検知時に管理者通知 |

---

# 13. 共通バリデーション

## 13.1 必須チェック

- 必須項目は未入力登録不可。
- ファイル必須項目は添付未完了時に提出不可。

## 13.2 日付チェック

- 入社日、退職日、適用日は日付形式とする。
- 未来日適用を許可する項目は設定で管理する。

## 13.3 ファイルチェック

- 許可拡張子: pdf, jpg, jpeg, png, doc, docx, xls, xlsx, zip
- ファイルサイズ上限はシステム設定で管理する。
- マイナンバー関連書類は初期版では番号保存対象外とする。

## 13.4 権限チェック

- API実行前にpermission_codeを検証する。
- 表示項目単位のマスキングに対応する。
- 給与、マイナンバー、e-Govは権限を分離する。

---

# 14. 共通操作ログ

| Operation | Description |
|---|---|
| view | 閲覧 |
| create | 新規作成 |
| update | 更新 |
| delete | 削除 |
| approve | 承認 |
| reject | 差戻し |
| export | CSV/PDF出力 |
| import | CSV取込 |
| download | ファイルダウンロード |
| upload | ファイルアップロード |
| send | メール送信、e-Gov送信 |
| view_sensitive | 給与、マイナンバー等の機微情報閲覧 |

---

# 15. Ver1.3への引き継ぎ事項

Ver1.3では以下を作成する。

1. DB詳細設計
2. テーブル定義書
3. ER図
4. API詳細設計
5. 権限コード一覧
6. 画面項目定義書
7. バリデーション定義書

