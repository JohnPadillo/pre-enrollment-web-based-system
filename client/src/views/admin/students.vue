<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
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
              label="Program"
              item-text="code"
              item-value="id"
              solo
              clearable
              @click:clear="resetSelectCourse"
              @input="selectCourse"
            ></v-select>
          </v-col>
        </v-layout>
        <v-card>
          <v-card-title>
            Students
            <v-spacer></v-spacer>
            <!-- <v-row class="d-flex" cols="12" sm="3">
              <v-select
                :items="courses"
                v-model="selected_course"
                label="Program"
                item-text="code"
                item-value="id"
                dense
                clearable
                @click:clear="resetSelectCourse"
                @input="selectCourse"
              ></v-select>
            </v-row>-->
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <addButton :title="title" @add="add" />
          </v-card-title>
          <v-data-table :headers="headers" :items="students" :search="search">
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.course.code }}</td>
                <td align="center">
                  <editButton />
                  <deleteButton />
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StudentService from "@/services/StudentService";
import ProgramService from "@/services/ProgramService";

export default {
  mounted() {
    this.getData();
    this.getCourses();
  },

  data() {
    return {
      title: "Students",
      search: "",
      openAddDialog: false,
      student_name: "",
      student_course: "",
      selected_course: "",
      students: [],
      defaultStudents: [],
      courses: [],
      headers: [
        { text: "Student Name", value: "name" },
        { text: "Student Program", value: "course.code" },
        { text: "Actions", align: "center" }
      ]
    };
  },
  methods: {
    async getData() {
      this.students = (await StudentService.getStudents()).data;
      this.students = this.students.filter(student => {
        return student.status !== 1;
      });
      this.defaultStudents = this.students;
    },
    async getCourses() {
      let courses = (await ProgramService.getPrograms()).data;

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
