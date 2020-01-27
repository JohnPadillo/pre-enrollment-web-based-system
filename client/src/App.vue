<template>
  <v-app>
    <v-app-bar clipped-left app color="cyan" dark>
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

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
      <v-btn text :to="{ path: '/register' }" v-if="!isLoggedIn">Register</v-btn>
      <v-btn text :to="{ path: '/' }" v-if="!isLoggedIn">Login</v-btn>
      <v-btn text :to="{ path: '/' }" v-if="isLoggedIn" @click="logout">Logout</v-btn>
    </v-app-bar>
    <navBar v-if="isLoggedIn" />
    <v-content>
      <div class="ma-5">
        <router-view />
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
  computed: {
    isLoggedIn() {
      let user = this.$store.state.user;
      if (user) {
        return true;
      } else {
        return false;
      }
    }
  },
  data: () => ({}),
  methods: {
    async logout() {
      await this.$store.dispatch("unSetUser");
    }
  }
};
</script>
