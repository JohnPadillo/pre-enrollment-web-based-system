<template>
  <registerForm :title="title" @register="register">
    <v-text-field label="First Name" v-model="firstName" outlined :rules="[rules.required]"></v-text-field>
    <v-text-field label="Middle Name" v-model="middleName" outlined :rules="[rules.required]"></v-text-field>
    <v-text-field label="Last Name" v-model="lastName" outlined :rules="[rules.required]"></v-text-field>
    <v-text-field
      label="Permanent Address"
      v-model="permanentAddress"
      outlined
      :rules="[rules.required]"
    ></v-text-field>
    <v-text-field
      label="Contact No."
      v-model="contact_no"
      type="number"
      outlined
      counter="11"
      maxlength="11"
      :rules="[rules.required, rules.number]"
    ></v-text-field>
    <v-text-field label="Email" v-model="email" outlined :rules="[rules.required, rules.email]"></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      outlined
      type="password"
      :rules="[rules.required]"
    ></v-text-field>
    <v-text-field
      label="Name of Parents(s)/Guardian"
      v-model="name_of_guardian"
      outlined
      :rules="[rules.required]"
    ></v-text-field>
    <v-text-field
      label="Contact No. of Parent(s)/Guardian"
      v-model="contact_no_of_guardian"
      outlined
      counter="11"
      maxlength="11"
      type="number"
      :rules="[rules.required, rules.number]"
    ></v-text-field>

    <v-select
      :items="courses"
      v-model="courseSelected"
      label="Course"
      item-text="code"
      item-value="id"
      solo
      clearable
      @input="selectCourse"
      :rules="[rules.required]"
    ></v-select>
  </registerForm>
</template>

<script>
import RegisterForm from "@/components/Form.vue";
import CourseService from "@/services/CourseService";
import StudentService from "@/services/StudentService";
export default {
  mounted() {
    this.getCourse();
  },
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
      permanentAddress: "",
      password: "",
      name_of_guardian: "",
      contact_no_of_guardian: "",
      contact_no: "",
      courseSelected: "",
      courses: [],
      rules: {
        required: value => !!value || "Required.",
        email: v => /.+@.+\..+/.test(v) || "Email must be valid",
        number: v => v.length <= 11 || "Maximum of 11 Digits"
      }
    };
  },
  methods: {
    async getCourse() {
      this.courses = (await CourseService.getCourses()).data;
      console.log(this.courses);
    },
    async register() {
      let data = {
        first_name: this.firstName,
        middle_name: this.middleName,
        last_name: this.lastName,
        email: this.email,
        permanent_address: this.permanentAddress,
        password: this.password,
        contact_no: this.contact_no,
        course: this.courseSelected,
        name_of_guardian: this.name_of_guardian,
        contact_no_of_guardian: this.contact_no_of_guardian
      };
      const response = await StudentService.addStudent(data);
      this.$router.push({ path: "/" });
      console.log(response.data);
    },
    selectCourse() {
      console.log(this.courseSelected);
    }
  }
};
</script>

<style></style>
