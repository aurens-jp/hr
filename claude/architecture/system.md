# システムアーキテクチャ概要

詳細は `docs/00_project/00_architecture_overview_v1.0.md` を参照。

## 技術スタック
Next.js(App Router) / TypeScript / Tailwind CSS / shadcn/ui / Supabase(PostgreSQL, Auth, Storage) / Supabase Client(Prisma不採用) / Vercel

## 外部連携
既存勤怠システム(kintai, 別Supabaseプロジェクト)とは `employee_sync` テーブルを介したAPI/CSV連携のみ。クロスプロジェクトの直接DB参照はしない。

## 認証・権限
- Supabase Auth(招待制、オープンサインアップなし)
- 9ロール: system_admin / hr / department_manager / leader / general_employee / auditor / external_consultant / api / system
- department_managerの権限は自部門(配下含む)限定。`is_manager_of_unit()` 関数で判定
- 決裁承認は候補者複数の場合、先着1名の承認で完了

## 従業員データ
`employees`は作らない(勤怠システム側の概念のため)。`employee_sync`(仮同期)→`employee_profile`(正マスター)を中心に、family/contract/account/document/skill/licenseを衛星テーブルとして持つ。

## ライフイベント・電子決裁
ライフイベント申請の承認完了時、マスターへの反映は自動反映方式(`life_event_master_update_queue`経由)。
