# 画面設計インデックス Ver1.2

## 画面ID体系

| Prefix | Area | Description |
|---|---|---|
| HR-AUTH | 認証 | ログイン、パスワード、2段階認証 |
| HR-DASH | ダッシュボード | 管理者・従業員トップ |
| HR-EMP | 従業員管理 | 従業員一覧、詳細、履歴、添付 |
| HR-ONB | 入社手続き | 入社予定、招待、本人入力、承認 |
| HR-REQ | 従業員申請 | 各種変更申請、承認、履歴 |
| HR-SAL | Web給与明細 | CSV取込、公開、閲覧、PDF |
| HR-MYN | マイナンバー | 提出状況、依頼、確認 |
| HR-EGV | e-Gov | 電子申請、送信、状況取得、公文書 |
| HR-DOC | 帳票・書類 | 帳票テンプレート、書類管理 |
| HR-SET | システム設定 | 会社、部署、権限、通知、マスター |
| HR-LOG | ログ | 操作ログ、監査ログ |

## Ver1.2 詳細設計対象

| Screen ID | Screen Name | Priority |
|---|---|---|
| HR-AUTH-001 | ログイン | High |
| HR-DASH-001 | 管理者ダッシュボード | High |
| HR-DASH-002 | 従業員ダッシュボード | High |
| HR-EMP-001 | 従業員一覧 | High |
| HR-EMP-002 | 従業員詳細 | High |
| HR-EMP-003 | 従業員履歴 | High |
| HR-EMP-004 | 添付ファイル管理 | Medium |
| HR-ONB-001 | 入社予定者一覧 | High |
| HR-ONB-002 | 入社手続き招待 | High |
| HR-ONB-003 | 入社手続き本人入力 | High |
| HR-ONB-004 | 入社手続き承認 | High |
| HR-REQ-001 | 申請フォーム一覧 | High |
| HR-REQ-002 | 従業員申請入力 | High |
| HR-REQ-003 | 申請承認一覧 | High |
| HR-REQ-004 | 申請詳細・承認 | High |
| HR-SAL-001 | 給与明細CSV取込 | High |
| HR-SAL-002 | 給与明細公開設定 | High |
| HR-SAL-003 | 従業員給与明細閲覧 | High |
| HR-MYN-001 | マイナンバー提出状況一覧 | Medium |
| HR-MYN-002 | マイナンバー提出依頼 | Medium |
| HR-EGV-001 | e-Gov電子申請一覧 | Medium |
| HR-EGV-002 | e-Gov届出作成 | Medium |
| HR-EGV-003 | e-Gov送信・結果確認 | Medium |
| HR-SET-001 | 会社情報設定 | High |
| HR-SET-002 | 部署・役職設定 | High |
| HR-SET-003 | 権限設定 | High |
| HR-SET-004 | 通知設定 | Medium |
| HR-SET-005 | メールテンプレート設定 | Medium |
| HR-LOG-001 | 操作ログ一覧 | Medium |
