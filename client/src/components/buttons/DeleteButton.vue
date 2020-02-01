<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn small class="mx-2" fab dark color="pink" @click="remove" v-on="on">
        <v-icon dark>delete</v-icon>
      </v-btn>
    </template>
    <span>Delete</span>
  </v-tooltip>
</template>

<script>
export default {
  methods: {
    remove() {
      this.$emit("delete");
    }
  }
};
</script>

<style></style>
