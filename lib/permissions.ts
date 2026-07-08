import { createClient } from "@/lib/supabase/server";

/**
 * ロール権限判定ヘルパー(クライアント側の表示制御用)。
 * 実際のアクセス制御はSupabase RLS(has_permission() SQL関数)で必ず担保し、
 * これはUI表示の出し分けにのみ使う(要: claude/rules/coding.md 6章)。
 */
export async function hasPermission(permissionCode: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("has_permission", {
    permission_code: permissionCode,
  });

  if (error) {
    console.error("hasPermission error:", error);
    return false;
  }

  return Boolean(data);
}
