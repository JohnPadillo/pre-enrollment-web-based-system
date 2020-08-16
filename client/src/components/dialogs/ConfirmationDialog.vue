<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title>Do you really want to {{ title }} this ?</v-card-title>
        <!-- <v-card-text>Do you want to {{ title }} this ?</v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="no">No</v-btn>
          <v-btn color="green darken-1" text @click="yes">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    title: String
  },
  methods: {
    no() {
      this.$emit("no");
    },
    yes() {
      this.$emit("yes");
    }
  }
};
</script>

<style></style>
