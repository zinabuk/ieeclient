import API from "../config/ApiConfig.js";
// import axios from "axios"
class UserService {
  getUsers() {
    return API.get("/users");
  }
  saveUser(user) {
    return API.post(`/users/signup`, user);
  }
  logIn(form) {
    return API.post("/auth/login", form);
  }
  getUser(id) {
    return API.get(`/${id}`);
  }
  updateUser(id) {
    return API.patch("/users", id);
  }
  deleteUser(id) {
    return API.delete(`/users/${id}`, id);
  }
}
export default new UserService();
