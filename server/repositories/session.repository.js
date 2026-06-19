import { sessionsTable } from "../models/sessions.schema.js";
import db from "../db/index.js";
import { eq } from "drizzle-orm";

async function createSession(sessionData) {
  const [session] = await db
    .insert(sessionsTable)
    .values(sessionData)
    .returning();
}

async function getSessionByRefreshToken(refreshToken) {
  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.refresh_token, refreshToken));
  return session;
}

async function deleteSessionById(sessionId) {
  const [session] = await db
    .delete(sessionsTable)
    .where(eq(sessionsTable.id, sessionId))
    .returning();
  return session;
}

export { createSession, getSessionByRefreshToken, deleteSessionById };
