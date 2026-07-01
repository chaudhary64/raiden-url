import { deleteLink, getLinkById } from "../../repositories/links.repository.js";

export default async function removeLinkController(req, res) {
  try {
    const { linkId } = req.query;
    const userId = req.user.id;
    const link = await getLinkById(linkId);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    if (link.user_id !== userId) {
      return res.status(403).json({ message: "Forbidden: You do not own this link" });
    }

    const result = await deleteLink(linkId);

    return res
      .status(200)
      .json({ message: "Link deleted successfully", link: result });
  } catch (error) {
    console.error("Error deleting link:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
