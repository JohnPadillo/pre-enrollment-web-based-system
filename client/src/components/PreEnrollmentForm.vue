<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card width="100%" height="700">
          <v-card-title>PRE ENROLLMENT FORM</v-card-title>
          <v-card-text>
            <v-list>
              <strong>Student Name:</strong>
              {{ name }}
              <br />
              <strong>Program:</strong>
              {{ course }}
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    name: String,
    course: String
  }
};
</script>

<style></style>
