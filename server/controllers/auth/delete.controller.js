import db from "../../db/index.js";
import { deleteUser } from "../../repositories/user.repository.js";

export async function deleteUserController(req, res) {
  const { id } = req.query;

  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
}
