<template>
  <v-toolbar>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="pa-2">
      <slot></slot>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style></style>
