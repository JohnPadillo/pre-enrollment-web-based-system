<template>
  <registerForm :title="title" @register="register">
    <v-text-field
      label="First Name"
      v-model="firstName"
      outlined
    ></v-text-field>
    <v-text-field label="Last Name" v-model="lastName" outlined></v-text-field>
    <v-text-field label="Address" v-model="address" outlined></v-text-field>
    <v-text-field label="Email" v-model="email" outlined></v-text-field>
    <v-text-field
      label="Contact No."
      v-model="contact_no"
      outlined
    ></v-text-field>
    <v-text-field label="Username" v-model="username" outlined></v-text-field>
    <v-text-field
      type="password"
      v-model="password"
      label="Password"
      outlined
    ></v-text-field>
  </registerForm>
</template>

<script>
import RegisterForm from "@/components/Form.vue";
export default {
  name: "Register",
  data() {
    return {
      title: "Register",
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      contact_no: "",
      username: "",
      password: ""
    };
  },
  methods: {
    register() {
      let data = {
        first_name: this.firstName,
        last_name: this.lastName,
        address: this.address,
        email: this.email,
        contact_no: this.contact_no,
        username: this.username,
        password: this.password
      };
      console.log(data);
    }
  },
  components: {
    RegisterForm
  }
};
</script>

<style></style>
