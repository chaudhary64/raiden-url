import { getLinkByShortCode } from "../../repositories/links.repository.js";

export default async function redirectController(req, res) {
  try {
    const { short_code } = req.params;

    const link = await getLinkByShortCode(short_code);

    if (!link) {
      return res.status(404).json({ message: "Short link not found" });
    }

    // 301 = permanent redirect (browsers & crawlers cache it)
    return res.redirect(301, link.original_url);
  } catch (error) {
    console.error("Error redirecting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
