import { z } from "zod";

const deleteLinkSchema = z.object({
  linkId: z.string().trim().min(1, "linkId is required"),
});

const validateDeleteLink = (req, res, next) => {
  const result = deleteLinkSchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
  }

  next();
};

export default validateDeleteLink;
