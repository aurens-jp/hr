import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Aurens HR Platform</h1>
      <p className="text-sm text-gray-500">MVP雛形(Phase0)</p>
      <Link href="/dashboard" className="underline">
        ダッシュボードへ
      </Link>
    </main>
  );
}
