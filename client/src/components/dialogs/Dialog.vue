<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent :max-width="max">
      <v-card>
        <v-card-title>
          <span class="headline">New {{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <slot></slot>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  // props: ["dialog", "title", "add", ],

  props: {
    dialog: Boolean,
    title: String,
    maxWidth: {
      type: Number,
      default: 600
    }
  },
  computed: {
    max() {
      return this.maxWidth + "" + "px";
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    }
  }
};
</script>

<style></style>
