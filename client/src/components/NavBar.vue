<template>
  <v-navigation-drawer app clipped>
    <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    <v-divider></v-divider>-->

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="{ path: item.link }"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    items() {
      if (this.$store.state.user.status == 1) {
        return this.items1;
      }
      if (this.$store.state.user.status == 2) {
        return this.programHeadHeader;
      }
      if (this.$store.state.user.status == 3) {
        return this.registrarHeader;
      } else {
        return this.items2;
      }
    }
  },
  data() {
    return {
      items1: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/admin" },
        { title: "Departments", icon: "mdi-store", link: "/admin/department" },
        { title: "Programs", icon: "mdi-school", link: "/admin/programs" },
        { title: "Courses", icon: "subject", link: "/admin/courses" },
        { title: "Students", icon: "assignment_ind", link: "/admin/students" },
        {
          title: "Curriculum",
          icon: "local_library",
          link: "/admin/curriculum"
        },
        { title: "Sections", icon: "view_carousel", link: "/admin/sections" },
        { title: "Rooms", icon: "room", link: "/admin/rooms" },

        {
          title: "Schedules | Classes",
          icon: "mdi-calendar-clock",
          link: "/admin/schedule"
        },

        {
          title: "Admins",
          icon: " mdi-account-check",
          link: "/admin/roles"
        },
        {
          title: "Student Pre Enrollment",
          icon: " mdi-account-check",
          link: "/admin/pre-enrollment"
        }
      ],
      items2: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/dashboard" }
        // { title: "Profile", icon: "mdi-image", link: "" },
      ],
      programHeadHeader: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/admin" },
        { title: "Students", icon: "assignment_ind", link: "/admin/students" },
        { title: "Courses", icon: "subject", link: "/admin/courses" },
        {
          title: "Schedules | Classes",
          icon: "mdi-calendar-clock",
          link: "/admin/schedule"
        },
        {
          title: "Student Pre Enrollment",
          icon: " mdi-account-check",
          link: "/admin/pre-enrollment"
        }
      ],
      registrarHeader: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/admin" },

        {
          title: "Students Checklist",
          icon: "assignment_ind",
          link: "/admin/students"
        },
        {
          title: "Schedules | Classes",
          icon: "mdi-calendar-clock",
          link: "/admin/schedule"
        },
        // { title: "Rooms", icon: "room", link: "/admin/rooms" }
        {
          title: "Student Pre Enrollment",
          icon: " mdi-account-check",
          link: "/admin/pre-enrollment"
        },
        {
          title: "Fees",
          icon: "mdi-cash",
          link: "/admin/fees"
        }
      ],
      right: null
    };
  }
};
</script>

<style></style>
