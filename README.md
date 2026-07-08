# Aurens HR Platform

人事労務・勤怠・給与・電子申請を統合するクラウドHRプラットフォーム。

## 技術スタック
Next.js(App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase(PostgreSQL/Auth/Storage) + Vercel

## 重要ドキュメント
- `docs/00_project/00_architecture_overview_v1.0.md` … アーキテクチャ図・ディレクトリ構成・モジュール一覧・DB一覧・API一覧・画面一覧
- `docs/00_project/00_development_roadmap_v1.0.md` … 開発順序・GitHub Issues一覧・リスク・不足している設計
- `claude/architecture/` `claude/rules/` `claude/prompts/` … Claude Code用ルール・プロンプト集

## Supabase接続情報
- プロジェクト名: aurens-hr
- project_id: `iflrhqvacuihmpocjgrl`
- URL: `https://iflrhqvacuihmpocjgrl.supabase.co`
- リージョン: ap-northeast-1(東京)
- 組織: aurens-jp's Org

既存勤怠システム(kintai、project_id: `rsmiifvtxaxeviczxsxq`)とは別プロジェクト。直接のクロスプロジェクトDB参照はせず、`employee_sync` テーブルへのAPI/CSV連携のみで接続する。

## セットアップ

```bash
npm install
cp .env.local.example .env.local  # 値は既に埋まっているのでSUPABASE_SERVICE_ROLE_KEYのみ各自設定
npm run dev
```

## 現在の状態(Phase0)
- [x] Supabaseプロジェクト作成
- [x] Next.js雛形・ディレクトリ構成・claude/ルール・Issue/PRテンプレート作成
- [ ] GitHubリポジトリ作成・push
- [ ] Vercelプロジェクト作成・デプロイ
- [ ] Supabaseスキーマ(テーブル・RLS)作成
- [ ] shadcn/ui初期化(`npx shadcn@latest init`)
