# Aurens HR Platform 開発標準 Ver1.4

## 1. 目的

本標準は、Aurens HR Platform の設計・開発・運用を一貫したルールで進めるための開発標準である。

## 2. 基本方針

### 2.1 クラウドネイティブ

ローカルPCに依存しない開発・運用を目指す。

標準構成：

- GitHub：ソースコード、設計書、Issue、変更履歴
- Vercel：Next.jsアプリケーションのホスティング
- Supabase：PostgreSQL、Auth、Storage、RLS
- Claude Code：AI開発支援

### 2.2 既存勤怠マスターを正マスターとする

従業員マスターは既存勤怠管理システムを正とする。  
Aurens HR Platform 側では、職員IDをキーとして勤怠側の従業員情報と連携し、人事労務に必要な追加情報のみ保持する。

### 2.3 設定で動くシステム

以下は可能な限り管理画面から設定可能とする。

- 申請フォーム
- 承認ルート
- 通知
- メールテンプレート
- 権限
- 帳票テンプレート
- カスタム項目
- CSV取込レイアウト

### 2.4 AIファースト

Claude Code、ChatGPT、GitHub Copilot等が理解しやすいように、設計書、画面ID、API ID、テーブル名、権限コードを明確に定義する。

## 3. 技術スタック

| 区分 | 採用技術 |
|---|---|
| フロントエンド | Next.js |
| 言語 | TypeScript |
| UI | React |
| CSS | Tailwind CSS |
| コンポーネント | shadcn/ui |
| DB | Supabase PostgreSQL |
| 認証 | Supabase Auth |
| ファイル | Supabase Storage |
| ホスティング | Vercel |
| ソース管理 | GitHub |
| API | Next.js Route Handlers |
| ORM | Prisma または Supabase Client |

## 4. 標準ディレクトリ構成

```text
aurens-hr/
├─ app/
├─ components/
├─ features/
│  ├─ employee/
│  ├─ onboarding/
│  ├─ request/
│  ├─ salary/
│  ├─ egov/
│  ├─ notification/
│  ├─ master/
│  └─ settings/
├─ lib/
├─ hooks/
├─ types/
├─ services/
├─ supabase/
├─ docs/
├─ database/
├─ screens/
├─ api/
├─ prompts/
├─ claude/
├─ scripts/
├─ tests/
└─ public/
```

## 5. 命名規則

DBは `snake_case`、テーブル名は複数形とする。

共通カラム：

- id
- uuid
- created_at
- updated_at
- deleted_at
- created_by
- updated_by

画面ID例：

- HR-DASH-001
- HR-EMP-001
- HR-REQ-001
- HR-SAL-001
- HR-EGO-001

API ID例：

- API-EMP-001
- API-REQ-001
- API-SAL-001
- API-EGO-001

権限コード例：

- employee.view
- employee.create
- employee.edit
- employee.delete
- request.approve
- salary.publish
- egov.send
- settings.manage

## 6. Git運用

ブランチ：

- main
- develop
- feature/*
- fix/*
- hotfix/*
- release/*

コミットメッセージ：

- feat:
- fix:
- docs:
- db:
- api:
- refactor:
- chore:

## 7. Issue運用

Issueは原則として1機能1Issueとする。

記載項目：

- 目的
- 対象画面ID
- 対象API ID
- 対象テーブル
- 権限
- 受け入れ条件
- テスト観点

## 8. セキュリティ標準

- HTTPS必須
- Supabase RLSを利用
- 最小権限
- 操作ログ必須
- 個人情報へのアクセス制御
- マイナンバーは初期版では番号保存しない
- 本番環境の秘密情報はGitHubへ保存しない

## 9. ログ標準

重要操作は必ずログを残す。

保存項目：

- 操作者
- 操作日時
- 操作対象
- 操作内容
- 変更前
- 変更後
- IPアドレス
- User Agent

## 10. 開発フェーズ

| Phase | 内容 |
|---|---|
| Phase 1 | 基盤構築、認証、権限、ダッシュボード |
| Phase 2 | 従業員管理 |
| Phase 3 | 入社手続き |
| Phase 4 | 従業員申請・承認 |
| Phase 5 | Web給与明細 |
| Phase 6 | マイナンバー状態管理 |
| Phase 7 | e-Gov電子申請 |
| Phase 8 | 給与計算・年末調整 |
| Phase 9 | AI機能 |

## 11. 完了条件

各機能は以下が揃ったら完了とする。

- 画面
- API
- DB接続
- 権限判定
- 入力チェック
- 操作ログ
- 基本テスト
- ドキュメント更新
