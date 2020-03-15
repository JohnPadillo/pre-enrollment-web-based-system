<template>
  <v-container>
    <v-layout>
      <v-flex>
        <registerForm :title="title" @register="login">
          <v-text-field
            label="Email"
            v-model="email"
            outlined
            :rules="[rules.required]"
            v-on:keyup.enter="login()"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            outlined
            type="password"
            :rules="[rules.required]"
            v-on:keyup.enter="login()"
          ></v-text-field>
        </registerForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RegisterForm from "@/components/Form.vue";
import LoginService from "@/services/Login";
export default {
  components: {
    RegisterForm
  },
  data() {
    return {
      title: "Login",
      email: "",
      password: "",
      rules: {
        required: v => !!v || "Required"
      }
    };
  },
  mounted() {
    this.$store.dispatch("unSetUser");
  },

  methods: {
    hello() {
      console.log("hello");
    },
    async login() {
      let data = {
        email: this.email
      };
      let user = (await LoginService.login(data)).data;

      let checkPassword = password => {
        return password === this.password;
      };
      if (user) {
        if (checkPassword(user.password)) {
          await this.$store.dispatch("setUser", user);

          if (user.status === 0) {
            this.$router.push({ path: "/dashboard" });
          } else {
            this.$router.push({ path: "/admin" });
          }
        }
      }
    },

    reset() {
      (this.email = ""), (this.password = "");
    }
  }
};
</script>

<style></style>
