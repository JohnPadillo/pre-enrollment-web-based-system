<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn x-small class="mx-2" fab dark color="pink" @click="remove" v-on="on">
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
    </template>
    <span>Remove</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    remove() {
      this.$emit("delete");
    }
  }
};
</script>

<style></style>
