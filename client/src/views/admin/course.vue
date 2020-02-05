<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-select
        label="Program"
        v-model="programId"
        :items="programs"
        item-text="code"
        item-value="id"
        clearable
        @click:clear="resetCourses"
        @input="filterCourseByProgramId"
        >
        </v-select>
        <addDialog
          :dialog="openAddDialog"
          :title="title"
          ref="addDialog"
          @close="closeAddDialog"
          @save="action === 'edit' ? saveEditCourse() : addCourse()"
        >
          <v-text-field
            label="Course Code"
            :readonly="action === 'edit'"
            v-model="course_code"
            outlined
          ></v-text-field>
          <v-text-field
            label="Course Name"
            v-model="course_name"
            outlined
          ></v-text-field>
        </addDialog>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="deleteCourse"
        ></confirmationDialog>

        <v-card>
          <v-card-title>
            Courses
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              clearable
            ></v-text-field>
            <addButton :title="title" @add="add" />
          </v-card-title>
          <v-data-table :headers="headers" :items="subjects" :search="search" dense>
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td align="center">
                  <editButton @edit="editCourse(props.item.id)" />
                  <deleteButton @delete="remove(props.item.id)" />
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
import CourseService from "@/services/CourseService.js";
import ProgramService from "@/services/ProgramService.js"
import CurriculumService from "@/services/CurriculumService.js"
export default {
  data() {
    return {
      title: "Courses",
      id: "",
      search: "",
      action: "",
      openAddDialog: false,
      confirmationDialog: false,
      confirmDialogTitle: "delete",
      course_name: "",
      course_code: "",
      subjects: [],
      programId: null,
      programs: [],
      curriculums: [],
      defaultSubjects: [],
      headers: [
        {
          text: "Course Code",
          value: "code"
        },
        {
          text: "Course Description",
          value: "name",
          align: "center"
        },
        {
          text: "Actions",
          align: "center"
        }
      ]
    };
  },
  mounted() {
    this.getCourses();
    this.getPrograms();
    this.getCurriculum()
  },
  methods: {
    async filterCourseByProgramId(){
      let response = this.curriculums.filter(data => {
        return data.CourseId == this.programId
      })

      let data = await response.map(data => {
        let id = data.subjects.id
        let code = data.subjects.code
        let name = data.subjects.name
        let units = data.subjects.units
        let prerequisites = data.subjects.prerequisites

        return {
          id: id,
          code: code,
          name: name,
          units: units,
          prerequisites: prerequisites
        }
      })

      this.subjects = data
    },
    async getCurriculum() {
      this.curriculums = (await CurriculumService.getCurriculums()).data
      console.log(this.curriculums)
    },
    async getPrograms() {
      this.programs = (await ProgramService.getPrograms()).data
    },
    async getCourses() {
      this.subjects = (await CourseService.getCourses()).data;
      this.defaultSubjects = this.subjects 
    },
    async resetCourses() {
      this.getCourses()
    },
    add() {
      this.action = "add";
      this.openAddDialog = true;
    },
    closeAddDialog() {
      this.openAddDialog = false;
      this.reset();
    },
    reset() {
      this.course_code = "";
      this.course_name = "";
    },
    async addCourse() {
      let data = {
        name: this.course_name,
        code: this.course_code
      };

      await CourseService.addCourse(data);
      this.getCourses();
      this.openAddDialog = false;
      this.reset();
    },
    async editCourse(id) {
      this.action = "edit";
      let subject = (await CourseService.getCourse(id)).data;
      this.id = subject.id;
      this.course_code = subject.code;
      this.course_name = subject.name;
      this.openAddDialog = true;
    },
    async saveEditCourse() {
      let data = {
        name: this.course_name,
        id: this.id
      };

      await CourseService.editCourse(data);

      this.openAddDialog = false;
      this.getCourses();
      this.reset();
    },

    remove(id) {
      this.confirmationDialog = !this.confirmationDialog;
      this.id = id;
    },

    async deleteCourse() {
      await CourseService.deleteCourse(this.id);
      this.confirmationDialog = !this.confirmationDialog;
      this.getCourses();
    },
    async closeConfirmDialog() {
      this.confirmationDialog = !this.confirmationDialog;
    }
  }
};
</script>

<style></style>
