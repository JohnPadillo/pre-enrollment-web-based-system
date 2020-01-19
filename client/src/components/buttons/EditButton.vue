<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn class="mx-2" fab dark color="cyan" @click="edit" v-on="on">
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <span>Edit</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    edit() {
      this.$emit("edit");
    }
  }
};
</script>

<style></style>
