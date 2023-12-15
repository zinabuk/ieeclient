<template>
  <section
    class="bg-[#008080] min-h-screen mx-auto flex flex-col justify-center items-center py-6"
  >
    <div class="self-start">Total:{{ users.length }}</div>

    <div class="w-2/5 flex justify-center bg-slate-50 py-8 shadow-md">
      <form @submit.prevent="" class="flex flex-col w-3/5">
        <base-input
          v-model="user.fullName"
          type="text"
          class="border p-2"
          id="fname"
          label="First Name"
          must="has"
          required
        ></base-input>
        <base-input
          v-model="user.username"
          type="text"
          class="border p-2"
          id="username"
          label="username"
          required
        ></base-input>
        <base-input
          v-model="user.email"
          type="text"
          class="border p-2"
          id="email"
          label="email"
          required
        ></base-input>
        <base-input
          v-model="user.password"
          type="password"
          class="border p-2"
          id="password"
          label="Password"
          required
        ></base-input>
        <base-input
          v-model="user.passwordConfirm"
          type="password"
          class="border p-2"
          id="cpassword"
          label="Confirm Password"
          required
        ></base-input>
        <base-button
          type="submit"
          class="border rounded-sm bg-blue-500 text-white p-2 w-1/5 mt-2"
          @handle-button="createUser(user)"
          >Save</base-button
        >
        <router-link to="/login">Login</router-link>
      </form>
    </div>
  </section>
</template>

<script>
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RegisterStaff",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      has: true,
      options: [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" },
        { value: "other", label: "Other" },
      ],
      selectOptions: [
        {
          value: "staff",
          label: "Staff",
        },
        {
          value: "admin",
          label: "Admin",
        },
        {
          value: "student",
          label: "Student",
        },
      ],
      user: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",

        role: "",
        remember: false,
        likes: "",
        fullName: "",
        phoneNumber: "",
        photo: "",
        gender: "",
        age: "",
      },
    };
  },
  computed: {
    ...mapGetters(["users"]),
    url() {
      return URL.createObjectURL(this.user.photo);
    },
  },
  methods: {
    ...mapActions(["fetchUsers", "createUser"]),
  },
  created() {
    this.fetchUsers();
  },
};
</script>
