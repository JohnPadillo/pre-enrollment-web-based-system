<template>
  <v-container>
    <v-layout>
      <v-flex>
        <registerForm :title="title" @register="login">
          <v-text-field label="Email" v-model="email" outlined :rules="[rules.required]"></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            outlined
            type="password"
            :rules="[rules.required]"
          ></v-text-field>
        </registerForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RegisterForm from "@/components/Form.vue";
import StudentService from "@/services/StudentService";
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
  methods: {
    async login() {
      let data = {
        email: this.email
      };
      let user = (await StudentService.getStudent(data)).data;

      let checkPassword = password => {
        return password === this.password;
      };

      if (user) {
        if (checkPassword(user.password)) {
          this.$router.push({ path: "/dashboard" });
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
