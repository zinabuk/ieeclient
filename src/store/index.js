import { createStore } from "vuex";
import UserService from "@/services/usersService";

export default createStore({
  state: {
    users: [],
    message: "",
    token: "",
    success: false,
    error: "",
    user: {},
    axiosError: "",
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    addUser(state, payload) {
      state.users = [...state.users, payload];
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    SET_SUCCESS(state, payload) {
      state.success = payload;
      alert(state.success)

    },
  },

  actions: {
    async fetchUsers({ commit }) {
      const res = await UserService.getUsers();
      if (res.data.status === "success") {
        commit("setUsers", res.data.data.users);
      } else {
        alert("No data");
      }
    },
    async createUser({ commit, state }, user) {
      try {
        const res = await UserService.saveUser(user);
        // console.log(res.data);
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          commit("addUser", res.data);
        }
      } catch (err) {
        state.message = err.message;
        console.error(err.message);
      }
    },

    async logIn({ commit, state }, form) {
      try {
       
        const response = await UserService.logIn(form);
        if (response && response.data.status === "success") {
          commit("SET_TOKEN", response.data.token);
          commit("SET_USER", response.data.data.user);
          commit("SET_SUCCESS", true);
        } else {
          commit("SET_ERROR", response.data.message);
        }
      } catch (err) {
        state.error = err.message;
      }
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
    getError(state) {
      return state.error;
    },
  },
  getSuccess(state) {
    return state.success;
  },
});
