// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `screenplay-tool_${name}`);

export const projects = createTable("projects", {
  project_id: serial("project_id").primaryKey(),
  project_name: varchar("project_name", { length: 256 }),
  project_description: text("project_description"),
  created_at: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  user_id: varchar("user_id", { length: 256 }),
});
