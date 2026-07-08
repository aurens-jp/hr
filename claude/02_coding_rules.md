# Claude Code Coding Rules

## 1. Language

Use TypeScript. Avoid `any` unless there is a clear reason.

## 2. Framework

Use Next.js App Router.

Prefer Server Components. Use Client Components only when interaction is required.

## 3. UI

Use Tailwind CSS and shadcn/ui.

## 4. Database

Use Supabase PostgreSQL and respect Row Level Security.

## 5. Auth

Use Supabase Auth. Do not implement custom password storage.

## 6. Permissions

Use permission-based checks.

Examples:

- employee.view
- employee.edit
- salary.publish
- egov.send

## 7. Error Handling

User-facing errors must be understandable in Japanese.

## 8. Security

Never commit secrets. Use environment variables.
