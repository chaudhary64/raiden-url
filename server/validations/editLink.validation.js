import { z } from "zod";

const editLinkSchema = z.object({
  linkId: z.string().trim().min(1, "linkId is required"),
  originalUrl: z
    .string({ error: "URL is required" })
    .trim()
    .min(1, "URL is required")
    .url("Invalid URL format"),
});

const validateEditLink = (req, res, next) => {
  const result = editLinkSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data;

  next();
};

export default validateEditLink;
