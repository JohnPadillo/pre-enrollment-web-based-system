<template>
  <v-container fluid>
    <!-- <v-layout> -->
    <div style="margin: auto; display: flex; align-items: center; height: 100%">
      <v-row justify="center" align="center" class="pa-5">
        <v-col cols="8">
          <p style="font-size: 100px; text-align: center">
            Pre-enrollment Web-based System
          </p>
        </v-col>
        <v-col cols="4" align="center" style="margin-top: 80px">
          <registerForm style="width: 80%" :title="title" @register="login">
            <v-text-field
              label="Email"
              v-model="email"
              outlined
              :rules="[rules.required]"
              v-on:keyup.enter="login()"
              class="pt-8"
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
        </v-col>
      </v-row>
      <snackbar
        ref="snackbar"
        :color="snackbarColor"
        :text="snackbarText"
        @close="closeSnackBar"
      />
    </div>
    <!-- </v-layout> -->
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
      },
      snackbarColor: "",
      snackbarText: ""
    };
  },
  mounted() {
    this.$store.dispatch("unSetUser");
  },

  methods: {
    async login() {
      try {
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
      } catch (error) {
        this.snackbarColor = "error";
        this.snackbarText = "Incorrect Email and Password!";
        this.$refs.snackbar.dialog = true;
      }
    },

    reset() {
      (this.email = ""), (this.password = "");
    },

    closeSnackBar() {
      this.$refs.snackbar.dialog = false;
    }
  }
};
</script>

<style></style>
