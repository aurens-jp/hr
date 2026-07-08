# Issue実装プロンプト テンプレート

以下の形式でIssueを渡すと、Claude Codeがそのまま実装に着手できる。

```text
Issue #<番号>

<Issueタイトル>

上記Issueの内容(画面ID/API/DB/権限/画面設計/受入条件/テスト/完了条件)に従って実装してください。
まだ未確定の設計判断がある場合は、実装前に確認してください。
```

## 前提
- 1Issue = 1機能単位で実装する(まとめて実装しない)
- 実装前に `claude/rules/coding.md` `claude/rules/ui.md` `claude/rules/git.md` を確認する
- 権限チェックとRLSは必ずセットで実装する
