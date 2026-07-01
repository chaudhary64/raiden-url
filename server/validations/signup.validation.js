import { z } from "zod";

const signUpSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z.email({ error: "Email is required" }),

  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

const validateSignup = (req, res, next) => {
  const result = signUpSchema.safeParse(req.body);

  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten();

    return res.status(400).json({
      message: "Validation failed",
      errors: Object.keys(fieldErrors).length ? fieldErrors : formErrors,
    });
  }

  next();
};

export default validateSignup;
