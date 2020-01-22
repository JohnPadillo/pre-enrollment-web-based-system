<template>
  <registerForm :title="title" @register="register">
    <v-text-field
      label="First Name"
      v-model="firstName"
      outlined
    ></v-text-field>
    <v-text-field
      label="Middle Name"
      v-model="middleName"
      outlined
    ></v-text-field>
    <v-text-field label="Last Name" v-model="lastName" outlined></v-text-field>
    <v-text-field label="Email" v-model="email" outlined></v-text-field>
    <v-text-field
      label="Contact No."
      v-model="contact_no"
      outlined
      counter="11"
      maxlength="11"
    ></v-text-field>

    <v-select
      :items="courses"
      v-model="courseSelected"
      label="Course"
      item-text="code"
      item-value="code"
      solo
      clearable
      @input="selectCourse"
    ></v-select>
    <!-- @click:clear="" -->

    <!-- <v-select
      :items="studentType"
      v-model="student_type"
      label="Student Type"
      item-text="name"
      item-value="name"
      solo
      clearable
      @input="selectStudentType"
    ></v-select>
    <v-select
      :items="semester"
      v-model="sem"
      label="Semester"
      item-text="name"
      item-value="name"
      solo
      clearable
      @input="selectSemester"
    ></v-select>-->
  </registerForm>
</template>

<script>
import RegisterForm from "@/components/Form.vue";
import AuthenticationService from "@/services/AuthenticationService";
export default {
  components: {
    RegisterForm
  },
  data() {
    return {
      title: "Register",
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      contact_no: "",
      courseSelected: "",
      courses: [
        {
          code: "BSIT"
        },
        {
          code: "POLSCI"
        },
        {
          code: "BSc Psychology"
        },
        {
          code: "BSED"
        },
        {
          code: "BSCS"
        }
      ]
    };
  },
  methods: {
    async register() {
      let data = {
        first_name: this.firstName,
        middle_name: this.middleName,
        last_name: this.lastName,
        email: this.email,
        contact_no: this.contact_no,
        course: this.courseSelected
      };
      // console.log(data);

      //   this.$router.push({ path: "/dashboard" });
      const response = await AuthenticationService.register(data);

      console.log(response.data);
    },
    selectCourse() {
      console.log(this.courseSelected);
    }
  }
};
</script>

<style></style>
