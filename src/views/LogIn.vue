<template>
  <section
    class="bg-[#008080]/50 bg-gradient-to-r from-bg-[#008080] to-bg-slate-50 flex flex-col justify-center items-center min-h-screen"
  >
    <div
      class="bg-white w-full sm:w-[80%] md:w-[50%] lg:w-[30%] shadow-md py-10 flex flex-col justify-center items-center rounded-2xl"
    >
      <h2 class="text-3xl">
        Welecome Back <span class="text-orange-700 text-4xl"> &hearts;</span>
      </h2>
      <div class="w-full flex flex-col items-center my-6">
        <form @submit.prevent="" action="" class="flex flex-col w-3/4">
          <base-input
            class="border border-[#275df5] p-2 space-y-4 rounded-md"
            type="text"
            label="Username"
            v-model="form.email"
            placeholder="Enter your username"
          ></base-input>
          <base-input
            class="border p-2 space-y-4 border-[#275df5] rounded-m"
            type="password"
            label="Password"
            v-model="form.password"
            placeholder="Enter your password"
          ></base-input>
          <span v-if="getError" class="text-red-800 flex justify-center">{{
            getError
          }}</span>
          <base-button
            class="border p-2 rounded-full bg-[#275df5] my-4 text-white"
            @handle-button="handleLogin"
            >Login</base-button
          >
        </form>
        <router-link to="/forgetpass" class="text-[#275df5]/80"
          >Forget Password?</router-link
        >
        <div class="flex mt-4">
          <p>Don't have an account?</p>
          <router-link class="text-[#FF5733]" to="/">Register</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getError", "getSuccess"]),
  },
  methods: {
    ...mapActions(["logIn"]),
    handleLogin() {
     
      this.logIn(this.form);
      if (this.getSuccess) {
        this.$router.push("/home");
      }
    },
  },
};
</script>
