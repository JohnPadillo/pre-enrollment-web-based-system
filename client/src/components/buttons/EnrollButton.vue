<template>
  <v-btn small class="mx-2" dark color="green" @click="enroll">
    <!-- <v-icon dark>mdi-content-save</v-icon> -->
    Enroll
  </v-btn>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    enroll() {
      this.$emit("enroll");
    }
  }
};
</script>

<style></style>
