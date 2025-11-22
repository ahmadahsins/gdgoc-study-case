import { pgTable, serial, text, integer, decimal, jsonb, timestamp } from "drizzle-orm/pg-core";

export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  calories: integer("calories").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  ingredients: jsonb("ingredients").notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

