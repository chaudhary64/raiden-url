import { z } from "zod";

const linkSchema = z.object({
  originalUrl: z
    .string({ error: "URL is required" })
    .trim()
    .min(1, "URL is required")
    .url("Invalid URL format"),
});

const validateLink = (req, res, next) => {
  const result = linkSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data;

  next();
};

export default validateLink;
