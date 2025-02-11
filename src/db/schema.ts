import { SQL, sql } from "drizzle-orm";
import { pgTableCreator, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { DATABASE_PREFIX } from "@/config/site";

export const pgTable = pgTableCreator(
  (name: string) => `${DATABASE_PREFIX}_${name}`,
);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username")
    .generatedAlwaysAs((): SQL => sql`substring(${users.email} from '^[^@]+')`)
    .notNull(),
  hashedPassword: text("hashed_password").default("password").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// export const userRelations = relations(users, ({ many }) => ({
//   memberships: many(memberships),
//   accounts: many(accounts),
//   sessions: many(sessions),
//   passwordResetTokens: many(passwordResetTokens),
//   recipes: many(recipes),
//   favorites: many(favorites),
// }));
