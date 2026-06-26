import db from "../db/index.js";
import { linksTable } from "../models/links.schema.js";
import { eq, sql } from "drizzle-orm";

async function getAllLinksByUserId(userId) {
  const links = await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.user_id, userId));
  return links;
}

async function getLinkById(linkId) {
  const [link] = await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.id, linkId));
  return link;
}

async function getLinkByShortCode(shortCode) {
  const [link] = await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.short_code, shortCode));
  return link;
}

async function createLink(userId, originalUrl, shortCode) {
  const newLink = await db
    .insert(linksTable)
    .values({
      user_id: userId,
      original_url: originalUrl,
      short_code: shortCode,
    })
    .returning();
  return newLink[0];
}

async function updateLink(linkId, updatedFields) {
  const updatedLink = await db
    .update(linksTable)
    .set(updatedFields)
    .where(eq(linksTable.id, linkId))
    .returning();
  return updatedLink[0];
}

async function deleteLink(linkId) {
  const deletedLink = await db
    .delete(linksTable)
    .where(eq(linksTable.id, linkId))
    .returning();
  return deletedLink[0];
}

async function incrementLinkViews(linkId) {
  const updatedLink = await db
    .update(linksTable)
    .set({ views: linksTable.views + 1 })
    .where(eq(linksTable.id, linkId))
    .returning();
  return updatedLink[0];
}

async function getLinkByShortCodeAndIncrement(shortCode) {
  const [link] = await db
    .update(linksTable)
    .set({ views: sql`${linksTable.views} + 1` })
    .where(eq(linksTable.short_code, shortCode))
    .returning();
  return link;
}

export {
  getAllLinksByUserId,
  getLinkById,
  getLinkByShortCode,
  getLinkByShortCodeAndIncrement,
  createLink,
  updateLink,
  deleteLink,
  incrementLinkViews,
};
