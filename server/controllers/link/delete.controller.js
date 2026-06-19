import { deleteLink } from "../../repositories/links.repository.js";

export default async function removeLinkController(req, res) {
  try {
    const { linkId } = req.query;

    const result = await deleteLink(linkId);

    return res
      .status(200)
      .json({ message: "Link deleted successfully", link: result });
  } catch (error) {
    console.error("Error deleting link:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
