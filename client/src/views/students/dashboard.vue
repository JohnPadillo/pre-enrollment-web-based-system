<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <preEnrollmentForm :name="name" :course="course" :headers="headers" :items="items"></preEnrollmentForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassService from "@/services/ClassService";
export default {
  mounted() {
    this.getClasses();
  },
  data() {
    return {
      name:
        this.$store.state.user.first_name +
        " " +
        this.$store.state.user.last_name,
      course: this.$store.state.user.course.code,
      headers: [
        {
          text: "Class No."
        },
        {
          text: "Course Description"
        },
        {
          text: "Section"
        },
        {
          text: "Units"
        },
        {
          text: "Day"
        },
        {
          text: "Time"
        },
        {
          text: "Room"
        }
      ],
      items: []
    };
  },
  methods: {
    async getClasses() {
      let response = (await ClassService.getClasses()).data;

      let data = await Promise.all(
        response.filter(data => {
          return (
            data.course.id == this.$store.state.user.course.id &&
            data.section.id == this.$store.state.user.section.id
          );
        })
      );
      this.items = await data;
      console.log(this.items);
    }
  }
};
</script>

<style></style>
