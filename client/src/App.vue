<template>
  <v-app>
    <v-app-bar app color="cyan" dark>
      <div class="d-flex align-center">
        <v-img
          alt="STI Logo"
          class="shrink mr-2"
          contain
          src="./assets/sti_logo.png"
          transition="scale-transition"
          width="80"
        />

      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>
    <navBar/>
    <v-content>
      <div class="mt-5">
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import NavBar from "./components/NavBar";

export default {
  name: "App",

  components: {
    // HelloWorld
    NavBar
  },

  data: () => ({
    //
  })
};
</script>
