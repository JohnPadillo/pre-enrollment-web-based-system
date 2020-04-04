<template>
  <v-layout>
    <v-flex>
      <v-form ref="form">
        <div class="white elevation-2" style="height: 500px">
          <v-toolbar class="blue darken-4" dark>
            <v-toolbar-title>{{ title }} Form</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-4">
            <slot></slot>
          </div>
          <div class="pl-4 pr-4 pb-4 pt-12">
            <v-btn block color="blue darken-4" dark height="50" @click="register">{{ title }}</v-btn>
          </div>
          <v-btn text @click="gotoForgotPassword()">Forgot Password</v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.$emit("register");
      }
    },

    gotoForgotPassword() {
      this.$router.push({
        path: "/forgot-password"
      });
    }
  }
};
</script>

<style></style>
