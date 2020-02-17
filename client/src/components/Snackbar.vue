<template>
  <div class="text-center">
    <v-snackbar v-model="dialog" :timeout="timeout" :color="color" right>
      {{ text }}
      <v-btn color="white" text @click="close">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    color: String
  },
  data() {
    return {
      timeout: 2000,
      dialog: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style></style>
