import { getAllLinksByUserId } from "../../repositories/links.repository.js";

export default async function getLinkController(req, res) {
  try {
    const userId = req.query.userId;

    const links = await getAllLinksByUserId(userId);

    if (!links.length) {
      return res.status(404).json({
        error: "No links found",
      });
    }

    return res.status(200).json({ links });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
