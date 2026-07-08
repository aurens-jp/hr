# Claude Code Coding Rules

## 1. Language
Use TypeScript. Avoid `any` unless there is a clear reason.

## 2. Framework
Use Next.js App Router. Prefer Server Components. Use Client Components only when interaction is required.

## 3. UI
Use Tailwind CSS and shadcn/ui.

## 4. Database
Use Supabase PostgreSQL and respect Row Level Security.

## 5. Auth
Use Supabase Auth. Do not implement custom password storage.

## 6. Permissions
Use permission-based checks (e.g. employee.view, employee.edit, salary.publish, egov.send, organization.edit, approval.approve). UI側の権限チェックは表示制御のみで、実効的なアクセス制御は必ずRLSで担保すること。

## 7. Error Handling
User-facing errors must be understandable in Japanese.

## 8. Security
Never commit secrets. Use environment variables. service_role keyはサーバー専用、クライアントへ絶対に露出しない。
