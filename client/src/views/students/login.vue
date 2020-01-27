<template>
  <v-container>
    <v-layout>
      <v-flex>
        <!-- <h1>login</h1> -->
        <registerForm :title="title" @register="login">
          <v-text-field label="Email" v-model="email" outlined></v-text-field>
          <v-text-field label="Password" v-model="password" outlined type="password"></v-text-field>
        </registerForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RegisterForm from "@/components/Form.vue";
export default {
  components: {
    RegisterForm
  },
  data() {
    return {
      title: "Login",
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      console.log(this.email);
      console.log(this.password);
      this.$router.push({ path: "/dashboard" });
    }
  }
};
</script>

<style></style>
