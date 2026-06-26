import { pgTable, integer, varchar, unique } from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema.js";

export const linksTable = pgTable(
  "links",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),

    user_id: integer("user_id")
      .references(() => usersTable.id, {
        onDelete: "CASCADE",
      })
      .notNull(),

    original_url: varchar("original_url", { length: 255 }).notNull(),

    short_code: varchar("short_code", { length: 255 }).notNull().unique(),

    views: integer("views").default(0).notNull(),
  },
  (table) => [unique("user_url_unique").on(table.user_id, table.original_url)],
);
