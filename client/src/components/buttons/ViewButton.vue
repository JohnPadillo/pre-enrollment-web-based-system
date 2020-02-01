<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn
        small
        class="mx-2"
        fab
        dark
        color="yellow darken-3"
        @click="view"
        v-on="on"
      >
        <v-icon dark>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <span>View</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    view() {
      this.$emit("view");
    }
  }
};
</script>

<style></style>
