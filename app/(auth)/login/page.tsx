/**
 * HR-AUTH-001 ログイン画面(プレースホルダ)
 * Supabase Auth(メール+パスワード)を使用。オープンサインアップは無効化し、
 * 管理者招待による作成を前提とする(claude/architecture/system.md参照)。
 */
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">ログイン</h1>
        <p className="text-sm text-gray-500">
          Supabase Auth連携は未実装(Phase1で実装予定)
        </p>
      </div>
    </main>
  );
}
