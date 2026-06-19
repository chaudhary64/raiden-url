import { updateLink } from "../../repositories/links.repository.js";

export default async function editLinkController(req, res) {
  try {
    const { linkId, originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original URL is required",
      });
    }

    const updatedLink = await updateLink(linkId, {
      original_url: originalUrl,
    });

    return res.status(200).json({
      message: "Link updated successfully",
      link: updatedLink,
    });
  } catch (error) {
    console.error("Error updating link:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
