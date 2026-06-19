import db from "../../db/index.js";
import { usersTable } from "../../models/user.schema.js";
import { eq } from "drizzle-orm";
import { updateUser } from "../../repositories/user.repository.js";

export async function updateInfoController(req, res) {
  try {
    const { id, name } = req.query;

    const updatedUser = await updateUser(id, { name });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
