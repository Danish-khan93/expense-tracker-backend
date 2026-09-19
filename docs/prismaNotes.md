# Prisma Notes

## User Model

model User {
id Int @id @default(autoincrement())
fullName String
email String @unique
password String
refreshToken String
}

- `Int` → whole number data type
- `@id` → marks this field as the primary key
- `@default(autoincrement())` → auto-generates value if none is given (DB handles it)
- `String` → text data type
- `@unique` → prevents duplicate values in this column (not just for email — works on any field)
- `String?` → the `?` makes a field optional/nullable
- `password` → stores a _hashed_ value, never plain text
- Model names use PascalCase (`User`, not `user`) by convention

# Migration Command

- `npx prisma migrate dev --name create_user_table`

## Notes

- Migration = when you change your model (schema.prisma), Prisma creates a step-by-step
  record of that structural change and applies it to the actual SQL database —
  keeping a history of how the DB evolved over time.
- `dev` = tells Prisma this is the development environment (safe to experiment,
  can reset DB if needed). Opposite of `migrate deploy` used in production.
- `create_user_table` = just a descriptive label for this specific migration,
  so it's easy to identify later in your migration history.

# DB.ts

`import { PrismaClient } from "../src/generated/prisma/client.ts";`
`export const prisma = new PrismaClient();`

# when we run migration so it generate a generated folder where we find client.ts

# Prisma Commands

## `npx prisma migrate status`

- Checks the current migration status.
- Shows which migrations are applied/pending.
- **Does not change the database.**

**Think:**

> "Is my database migration history up to date?"

---

## `npx prisma generate`

- Generates/updates the **Prisma Client** from `schema.prisma`.
- Prisma Client is what our TypeScript/Express app uses to communicate with the database.
- **Does not change the database.**

**Think:**

> "Update the Prisma Client based on my schema."

---

### Quick Difference

| Command          | Purpose                | Changes DB? |
| ---------------- | ---------------------- | ----------- |
| `migrate status` | Check migrations       | ❌          |
| `generate`       | Generate Prisma Client | ❌          |
| `migrate dev`    | Create/apply migration | ✅          |
| `db push`        | Push schema to DB      | ✅          |
