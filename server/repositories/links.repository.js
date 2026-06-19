import db from "../db/index.js";
import { linksTable } from "../models/links.schema.js";
import { eq } from "drizzle-orm";

async function getAllLinksByUserId(userId) {
    const links = await db.select().from(linksTable).where(eq(linksTable.user_id, userId));
    return links;
}

async function createLink(userId, originalUrl, shortCode) {
    const newLink = await db.insert(linksTable).values({
        user_id: userId,
        original_url: originalUrl,
        short_code: shortCode,
    }).returning();
    return newLink[0];
}

async function updateLink(linkId, updatedFields) {
    const updatedLink = await db.update(linksTable)
        .set(updatedFields)
        .where(eq(linksTable.id, linkId))
        .returning();
    return updatedLink[0];
}

async function deleteLink(linkId) {
    const deletedLink = await db.delete(linksTable)
        .where(eq(linksTable.id, linkId))
        .returning();
    return deletedLink[0];
}

export { getAllLinksByUserId, createLink, updateLink, deleteLink };