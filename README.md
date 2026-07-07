# Aurens HR Platform

Aurens HR Platform は、既存勤怠管理システムと連携し、人事労務業務をWeb上で一元管理するための設計プロジェクトです。

本リポジトリは、システム開発に必要な仕様書、画面設計、DB設計、API設計、権限設計、通知設計、変更履歴を管理します。

## 基本方針

- 既存勤怠管理システムの従業員マスターを正マスターとする
- 従業員情報の二重管理を避ける
- 職員IDをキーにして勤怠システムと連携する
- 人事労務側では追加情報、申請、入社手続き、給与明細、マイナンバー状況、e-Gov電子申請を管理する
- Webブラウザで動作するシステムとして設計する
- 将来的に給与計算、年末調整、人事評価、AI支援機能へ拡張できる構成とする

## 初期対象機能

- 人事労務管理
- 入社手続き
- 従業員情報の申請
- Web給与明細
- マイナンバー提出状況管理
- e-Gov電子申請
- 権限管理
- 通知管理
- 操作ログ
- CSVインポート・エクスポート

## ディレクトリ構成

```text
aurens-hr-platform/
├─ README.md
├─ docs/
│  ├─ 00_project_overview.md
│  ├─ 01_basic_design.md
│  └─ 99_change_history.md
├─ database/
├─ api/
├─ screens/
├─ prompts/
└─ changelog/
   └─ CHANGELOG.md
```

## 版管理方針

- main: 確定版
- develop: 作業中
- feature/*: 機能追加・仕様追加ごとの作業

## 変更履歴

変更内容は `docs/99_change_history.md` および `changelog/CHANGELOG.md` に記録します。
