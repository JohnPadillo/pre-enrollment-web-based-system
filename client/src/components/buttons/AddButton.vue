<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn small class="mx-2" fab dark color="green" @click="add" v-on="on">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>Add</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    add() {
      this.$emit("add");
    }
  }
};
</script>

<style></style>
