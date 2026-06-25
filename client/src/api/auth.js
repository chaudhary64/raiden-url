import api from "./axios";

export async function SignUpUser({ name, email, password }) {
  const res = await api.post("/auth/signup", { name, email, password });
  return res;
}

export async function LoginUser({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  return res;
}

export async function updateUser({ name }) {
  const res = await api.put("/auth/user", { name });
  return res;
}

export async function deleteUser() {
  const res = await api.delete("/auth/user");
  return res;
}
