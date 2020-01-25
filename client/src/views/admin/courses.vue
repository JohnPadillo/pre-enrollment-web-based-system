<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <toolbarNav :title="title">
          <addButton :title="title" @add="add" />

          <addDialog
            :dialog="openAddDialog"
            :title="title"
            ref="addDialog"
            @close="closeAddDialog"
            @save="addCourse"
          >
            <v-text-field label="Course Name" v-model="course_name" outlined></v-text-field>
            <v-text-field v-model="course_code" label="Course Code" outlined></v-text-field>

            <v-select
              v-model="course_department"
              :items="departments"
              label="Department"
              item-text="name"
              item-value="id"
              outlined
            ></v-select>
          </addDialog>
        </toolbarNav>
        <v-data-table class="mt-5" :headers="headers" :items="courses">
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.code }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.department.name }}</td>

              <td>
                <editButton />
                <deleteButton />
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CourseService from "@/services/CourseService";
import DepartmentService from "@/services/DepartmentService";

export default {
  mounted() {
    this.getCourses();
    this.getDepartments();
  },
  methods: {
    async getCourses() {
      this.courses = (await CourseService.getCourses()).data;
      console.log(this.courses);
    },
    async getDepartments() {
      this.departments = (await DepartmentService.getDepartments()).data;
    },
    add() {
      this.openAddDialog = !this.openAddDialog;
      console.log(this.openAddDialog);
    },
    closeAddDialog() {
      this.openAddDialog = !this.openAddDialog;
      this.reset();
    },
    reset() {
      this.course_code = "";
      this.course_name = "";
      this.course_department = "";
    },
    async addCourse() {
      let data = {
        code: this.course_code,
        name: this.course_name,
        department: this.course_department
      };

      let response = await CourseService.addCourse(data);
      console.log(response);
      this.openAddDialog = !this.openAddDialog;
      this.reset();
      this.getCourses();
    },
    edit(data) {
      console.log(data);
    }
  },
  data() {
    return {
      title: "Courses",
      course_department: "",
      course_name: "",
      course_code: "",
      openAddDialog: false,
      courses: [],
      departments: [],
      headers: [
        {
          text: "Course Name",
          value: "name",
          align: "center"
        },
        {
          text: "Course Code",
          value: "name",
          align: "center"
        },
        {
          text: "Department",
          value: "name",
          align: "center"
        },
        {
          text: "Action",
          align: "center"
        }
      ]
    };
  }
};
</script>

<style></style>
