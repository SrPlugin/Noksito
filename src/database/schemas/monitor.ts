import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const monitor = sqliteTable("monitors", {
    id: int().primaryKey({ autoIncrement: true}),
    url: text().notNull(),
});