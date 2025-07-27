import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const learningProgress = pgTable("learning_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  moduleId: integer("module_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").default(false),
  score: integer("score").default(0),
  timeSpent: integer("time_spent").default(0), // in seconds
  completedAt: timestamp("completed_at"),
});

export const audioCache = pgTable("audio_cache", {
  id: serial("id").primaryKey(),
  textContent: text("text_content").notNull(),
  audioUrl: text("audio_url").notNull(),
  language: text("language").default("en"),
  voice: text("voice").default("Matthew"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProgressSchema = createInsertSchema(learningProgress).omit({
  id: true,
  completedAt: true,
});

export const insertAudioCacheSchema = createInsertSchema(audioCache).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LearningProgress = typeof learningProgress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type AudioCache = typeof audioCache.$inferSelect;
export type InsertAudioCache = z.infer<typeof insertAudioCacheSchema>;
