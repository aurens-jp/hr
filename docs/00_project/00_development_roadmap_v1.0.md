# Aurens HR Platform 開発ロードマップ Ver1.0

対象: Ver1.4+Ver1.5統合後の開発順序・Issue一覧・リスク・不足している設計。

## 7. 開発順序

| Phase | 内容 |
|---|---|
| Phase0 | 環境構築(GitHub/Vercel/Supabase接続、雛形作成)※承認後に着手 |
| Phase1(MVP) | 認証・権限土台・ダッシュボード・従業員一覧/詳細・仮同期・操作ログ |
| Phase2 | positions / organization_unit_types マスタ整備 → 機構表表示・年度別機構表・部署/職員ドラッグ&ドロップ・組織集計(自部門スコープRLS込み) |
| Phase3 | 経歴管理 |
| Phase4 | ライフイベントYes/Noナビ・電子決裁(ルートテンプレート・先着承認)・人事タスク自動生成・マスター自動反映キュー |
| Phase5 | 公開用PDF/画像/Excel出力、PCA反映タスク、e-Gov連携タスク(中優先度) |
| Phase6以降 | 給与・マイナンバー状態管理・e-Gov電子申請・給与計算・AI機能(開発標準Phase5〜9相当) |

## 8. GitHub Issues一覧

**基盤構築**
- infra: Next.js + TypeScript + Tailwind + shadcn/ui 雛形作成
- infra: Supabase新規プロジェクト作成・接続設定
- infra: 標準ディレクトリ構成作成
- infra: Vercelプロジェクト作成・環境変数設定・初回デプロイ
- infra: GitHub Issue/PRテンプレート設置

**認証・権限**
- db: roles / permissions / role_permissions / user_roles 作成
- auth: ログイン画面実装(HR-AUTH-001)
- auth: has_permission()関数・RLS基本ポリシー実装
- auth: 初期adminブートストラップ手順整備

**ダッシュボード・従業員管理**
- feature: ダッシュボード実装(HR-DASH-001)
- db: employee_sync, employee_profile 作成
- feature: 従業員一覧・詳細実装(HR-EMP-001 / 002)
- feature: CSV取込同期実装(API-SYNC-001)

**操作ログ**
- db: audit_logs 作成
- infra: services層への共通監査ログ組み込み

**組織機構表(Ver1.5 Phase2)**
- db: positions, organization_unit_types マスタ作成
- db: organization_fiscal_years, organization_units, organization_assignments 作成
- db: is_manager_of_unit() 関数実装(自部門スコープ判定)
- feature: 機構表一覧・詳細・編集実装(HR-ORG-001〜003)
- feature: 部署編集・職員配置編集実装(HR-ORG-004〜005)
- feature: 組織集計実装(HR-ORG-006)
- feature: 組織履歴実装(HR-ORG-007)

**経歴管理**
- db: employee_careers 作成
- feature: 経歴一覧・登録実装(HR-CAREER-001〜002)

**ライフイベント・電子決裁**
- db: life_event_types / questions / rules / applications / answers 作成
- db: life_event_master_update_queue 作成
- db: approval_route_templates / approval_route_template_steps 作成
- db: approval_requests, approval_steps(改), approval_step_candidates 作成
- db: hr_tasks 作成
- feature: ライフイベント選択・Yes/Noナビ実装(HR-LIFE-001〜002)
- feature: 申請内容確認・書類アップロード実装(HR-LIFE-003〜004)
- feature: 電子決裁一覧・詳細実装(HR-APPROVAL-001〜002)
- feature: 人事タスク一覧・詳細実装(HR-TASK-001〜002)
- infra: マスター自動反映処理の実装(承認完了トリガー)

**ドキュメント**
- docs: 実装後に docs/03_database, docs/05_screen, docs/04_api を更新

## 9. リスク

- 既存勤怠(kintai)とのAPI/CSV連携が未実装のため、Aurens HR側の初期データが揃うまで機構表・従業員管理のテストができない
- 自部門スコープRLS(is_manager_of_unit)は再帰CTEを伴い、組織階層が深くなるとパフォーマンス劣化のリスクがある。将来的にmaterialized path等への見直しが必要になる可能性がある
- 先着承認方式は同時操作時の競合(2人が同時にボタンを押す)への対処を `WHERE status='pending'` 条件での更新で担保する必要があり、実装時の考慮漏れリスクがある
- マスター自動反映は、誤入力や虚偽申告があった場合の訂正・取消フローが未設計であり、運用開始前に必ず整備が必要
- 添付書類(住民票等)の保存・暗号化・保持期間ポリシーが未定義のまま個人情報を扱う機能を作ると、情報漏洩・法令違反リスクがある
- 画面が120画面規模になる見込みであり、詳細設計が追いつかないまま実装が先行するとやり直しコストが発生するリスクがある

## 10. 不足している設計

- Ver1.5全テーブルへの共通カラム(uuid, deleted_at, created_by, updated_by等)適用
- positions, organization_unit_types マスタテーブルの正式定義
- 未着手10画面(HR-ORG-004〜007, HR-CAREER-001〜002, HR-LIFE-003〜004, HR-APPROVAL-002, HR-TASK-002)の詳細設計
- 添付書類のSupabase Storageバケット設計・保持期間・暗号化方針
- マスター自動反映の誤反映時の訂正・取消フロー
- fixed_role複数候補時の通知・UI設計(誰が対応中か周知する仕組み)
- 機構表編集(ドラッグ&ドロップ)と組織異動決裁の関係の仕様書内表現統一
