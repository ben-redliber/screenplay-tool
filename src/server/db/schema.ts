import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  text,
  pgEnum,
  primaryKey,
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
  user_id: varchar("user_id", { length: 256 }).references(
    () => app_users.user_id,
    {
      onDelete: "cascade",
      onUpdate: "cascade",
    },
  ),
});

export const screenplays = createTable("screenplays", {
  screenplay_id: serial("screenplay_id").primaryKey(),
  screenplay_name: varchar("screenplay_name", { length: 256 }),
  screenplay_description: text("screenplay_description"),
  screenplay_r2_key: varchar("screenplay_r2_key", { length: 512 }),
  screenplay_revision: varchar("screenplay_revision", { length: 256 }),
  screenplay_draft: integer("screenplay_draft").notNull().default(1),
  created_at: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  project_id: integer("project_id").references(() => projects.project_id, {
    onDelete: "cascade",
  }),
});

export const stp_categories = pgEnum("stp_categories", [
  "transition",
  "times_of_day",
  "filming",
]);

export const stp = createTable("smart_types", {
  stp_id: serial("stp_id").primaryKey(),
  stp_category: stp_categories("stp_category"),
  stp_content: varchar("stp_content", { length: 256 }).array(),
  user_id: varchar("user_id", { length: 256 }).references(
    () => app_users.user_id,
    {
      onDelete: "cascade",
      onUpdate: "cascade",
    },
  ),
});

export const app_users = createTable("app_users", {
  app_user_id: serial("app_user_id"),
  user_id: varchar("user_id", { length: 256 }).primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
