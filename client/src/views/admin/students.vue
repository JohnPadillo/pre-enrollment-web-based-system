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
              item-value="code"
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
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.course }}</td>
              <td>{{ props.item.year }}</td>
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
export default {
  data() {
    return {
      title: "Students",
      openAddDialog: false,
      student_name: "",
      student_course: "",
      selected_course: "",
      defaultStudents: "",
      students: [
        {
          name: "Katrina Castillo",
          course: "BSIT",
          year: "4th Year"
        },
        {
          name: "Vice Ganda",
          course: "POLSCI",
          year: "2nd Year"
        },
        {
          name: "Marian Rivera",
          course: "BSc Psychology",
          year: "3rd Year"
        }
      ],
      headers: [
        { text: "Student Name", value: "name" },
        { text: "Student Course", value: "course" },
        { text: "Student Year", value: "year" },
        { text: "Actions" }
      ],
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
  created() {
    this.defaultStudents = this.students;
  },
  methods: {
    add() {
      this.openAddDialog = true;
    },
    closeAddDialog() {
      this.openAddDialog = false;
    },
    selectCourse() {
      this.students = this.defaultStudents;
      let data = this.students.filter(student => {
        return student.course === this.selected_course;
      });

      this.students = data;
    },
    async resetSelectCourse() {
      this.students = await this.defaultStudents;
    }
  }
};
</script>

<style></style>
