<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <toolbarNav :title="title">
          <addButton :title="title" @add="add" />
        </toolbarNav>

        <addDialog :dialog="openAddDialog" :title="title" ref="addDialog" @close="closeAddDialog">
          <v-text-field label="Stundent Name" v-model="student_name" outlined></v-text-field>
          <v-select
            v-model="student_course"
            :items="courses"
            label="Course"
            item-text="code"
            item-value="code"
            outlined
          ></v-select>
        </addDialog>
        <v-layout>
          <v-spacer></v-spacer>
          <v-col class="d-flex" cols="12" sm="3">
            <v-select
              :items="courses"
              v-model="selected_course"
              label="Course"
              item-text="code"
              item-value="id"
              solo
              clearable
              @click:clear="resetSelectCourse"
              @input="selectCourse"
            ></v-select>
          </v-col>
        </v-layout>
        <v-data-table class="mt-1" :headers="headers" :items="students">
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.first_name }} {{ props.item.last_name }}</td>
              <td>{{ props.item.course.code }}</td>
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
import StudentService from "@/services/StudentService";
import CourseService from "@/services/CourseService";

export default {
  mounted() {
    this.getData();
    this.getCourses();
  },

  data() {
    return {
      title: "Students",
      openAddDialog: false,
      student_name: "",
      student_course: "",
      selected_course: "",
      students: [],
      defaultStudents: [],
      courses: [],
      headers: [
        { text: "Student Name", value: "name" },
        { text: "Student Course", value: "course" },
        { text: "Actions" }
      ]
    };
  },
  methods: {
    async getData() {
      this.students = (await StudentService.getStudents()).data;
      this.defaultStudents = this.students;
    },
    async getCourses() {
      let courses = (await CourseService.getCourses()).data;

      this.courses = courses.map(course => {
        return {
          code: course.code,
          name: course.name,
          id: course.id
        };
      });
    },
    add() {
      this.openAddDialog = true;
    },
    closeAddDialog() {
      this.openAddDialog = false;
    },
    selectCourse() {
      this.students = this.defaultStudents;
      let data = this.students.filter(student => {
        return student.course.id === this.selected_course;
      });
      this.students = data;
    },
    async resetSelectCourse() {
      this.students = (await StudentService.getStudents()).data;
    }
  }
};
</script>

<style></style>
