
import api from "../../api/axios";

const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

const userService = {
  getUsers,
  updateUser,
  deleteUser,
};

export default userService;