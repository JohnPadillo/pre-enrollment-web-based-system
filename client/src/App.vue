<template>
  <v-app>
    <v-app-bar clipped-left app color="yellow" dark>
      <div class="d-flex align-center">
        <v-img
          width="80"
          alt="STI Logo"
          class="shrink mr-2"
          contain
          src="./assets/sti_logo.png"
          transition="scale-transition"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        v-if="isLoggedIn"
        color="light-blue darken-4"
      >Hello {{ $store.state.user.first_name }}</v-btn>

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
      <!-- <v-btn
        color="light-blue darken-4"
        text
        :to="{ path: '/register' }"
        v-if="!isLoggedIn"
        >Register</v-btn
      >-->
      <!-- <v-btn
        color="light-blue darken-4"
        text
        :to="{ path: '/' }"
        v-if="!isLoggedIn"
        >Login</v-btn
      >-->
      <v-btn
        color="light-blue darken-4"
        v-show="isLoggedIn"
        text
        :to="{ path: '/' }"
        @click="logout()"
      >Logout</v-btn>
    </v-app-bar>
    <navBar v-if="isLoggedIn" />
    <v-content
      id="main"
      :style="[
        isLoggedIn
          ? {
              background: `url('http://localhost:8081/${
                this.$store.state.user.course
                  ? this.$store.state.user.course.courseImage
                  : ''
              }') no-repeat`,
              backgroundSize: 'cover'
            }
          : { background: 'none' }
      ]"
    >
      <div class="ma-5">
        <router-view id="routerView" />
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
  mounted() {},
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

<style scoped></style>
