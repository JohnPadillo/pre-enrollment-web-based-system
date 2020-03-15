<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn small class="mx-2" fab dark color="cyan" @click="view" v-on="on">
        <v-icon dark>mdi-format-list-bulleted</v-icon>
      </v-btn>
    </template>
    <span>View Checklist</span>
  </v-tooltip>
</template>

<script>
export default {
  methods: {
    view() {
      this.$emit("viewChecklist");
    }
  }
};
</script>

<style></style>
