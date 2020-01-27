<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <preEnrollmentForm :name="name"></preEnrollmentForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name:
        this.$store.state.user.first_name +
        " " +
        this.$store.state.user.last_name
    };
  }
};
</script>

<style></style>
