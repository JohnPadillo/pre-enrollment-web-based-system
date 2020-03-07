<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn small class="mx-2" fab dark color="green" @click="save" v-on="on">
        <v-icon dark>mdi-content-save</v-icon>
      </v-btn>
    </template>
    <span>Save</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    save() {
      this.$emit("save");
    }
  }
};
</script>

<style></style>
