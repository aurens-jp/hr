import { createBrowserClient } from "@supabase/ssr";

/**
 * ブラウザ(クライアントコンポーネント)用Supabaseクライアント。
 * 接続情報は環境変数から取得する(coding.md 8章: secretsはハードコードしない)。
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
