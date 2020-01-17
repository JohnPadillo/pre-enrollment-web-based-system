<template>
  <!-- <v-card
    class="mx-auto pa-4"
    max-width="600"
    height="800"
    outlined
  >
    <slot></slot>

    <v-card-action >
        <v-btn>Register</v-btn>
    </v-card-action>
  </v-card> -->
  <v-layout>
    <v-flex xs4 offset-md4>
      <div class="white elevation-2">
        <v-toolbar class="cyan" dark>
          <v-toolbar-title>{{ title }} Form</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-4">
            <slot></slot>
        </div>
        <div class="pl-4 pr-4 pb-4">
           <v-btn block color="cyan" dark height="50" @click="register">{{ title }}</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    props: ['title'],
    methods: {
        register() {
            this.$emit('register')
        }
    }
}
</script>

<style>

</style>