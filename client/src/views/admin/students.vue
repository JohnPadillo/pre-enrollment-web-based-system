<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :dialog="openAddDialog"
          :title="title"
          ref="addDialog"
          @save="action == 'add' ? addStudent() : editStudent()"
          @close="closeAddDialog"
        >
          <!-- <v-text-field label="Stundent Name" v-model="student_name" outlined></v-text-field>
          <v-select
            v-model="student_course"
            :items="courses"
            label="Course"
            item-text="code"
            item-value="code"
            outlined
          ></v-select>-->

          <v-form ref="registerForm">
            <v-text-field label="First Name" v-model="firstName" outlined :rules="[rules.required]"></v-text-field>
            <v-text-field
              label="Middle Name"
              v-model="middleName"
              outlined
              :rules="[rules.required]"
            ></v-text-field>
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
            <v-text-field
              label="Email"
              v-model="email"
              outlined
              :rules="[rules.required, rules.email]"
            ></v-text-field>
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
              :rules="[rules.required]"
            ></v-select>
          </v-form>
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
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="deleteStudent"
        ></confirmationDialog>
        <checklist
          ref="checklist"
          :dialog="checklistDialog"
          @saveChecklist="saveEditChecklist"
          :action="action"
          :user="user"
          :checklist="checklist"
          @close="closeChecklistDialog"
        ></checklist>
        <v-card>
          <v-card-title>
            Students
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <addButton :title="title" @add="add" />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="students"
            :search="search"
            :loading="studentLoading"
            loading-text="Loading..."
            dense
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.course.code }}</td>
                <td align="center">
                  <viewButton @view="viewChecklist(props.item)" />
                  <editButton @edit="getEditItem(props.item.id)" />
                  <deleteButton @delete="getDeleteItem(props.item.id)" />
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
import CurriculumService from "@/services/CurriculumService";
import GradeService from "@/services/GradeService";
import CourseService from "@/services/CourseService";
import Checklist from "@/components/form/CurriculumForm";

export default {
  components: {
    Checklist
  },
  mounted() {
    this.getData();
    this.getCourses();
  },

  data() {
    return {
      title: "Students",
      checklistDialog: false,
      checklist: [],
      user: null,
      action: "",
      id: "",
      search: "",
      openAddDialog: false,
      confirmationDialog: false,
      studentLoading: false,
      confirmDialogTitle: "delete",
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
      selected_course: "",
      rules: {
        required: value => !!value || "Required.",
        email: v => /.+@.+\..+/.test(v) || "Email must be valid",
        number: v => v.length <= 11 || "Maximum of 11 Digits"
      },
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
      this.studentLoading = true;
      this.students = (await StudentService.getStudents()).data;
      this.defaultStudents = this.students;
      this.studentLoading = false;
    },
    async getStudent(id) {
      return (await StudentService.getStudent(id)).data;
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
      this.action = "add";
      this.openAddDialog = true;
    },
    async closeAddDialog() {
      this.reset();
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
    },

    async addStudent() {
      if (this.$refs.registerForm.validate()) {
        this.saveStudent();
      }
    },

    async saveStudent() {
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
      await StudentService.addStudent(data);
      this.getData();
      this.closeAddDialog();
      this.reset();
    },

    async getEditItem(id) {
      this.openAddDialog = true;
      this.action = "edit";
      this.id = id;
      let data = await this.getStudent(id);
      this.firstName = data.first_name;
      this.middleName = data.middle_name;
      this.lastName = data.last_name;
      this.permanentAddress = data.permanent_address;
      this.contact_no = data.contact_no;
      this.email = data.email;
      this.password = data.password;
      this.name_of_guardian = data.name_of_guardian;
      this.contact_no_of_guardian = data.contact_no_of_guardian;
      this.courseSelected = data.course.id;
    },

    async editStudent() {
      let data = {
        id: this.id,
        first_name: this.firstName,
        middle_name: this.middleName,
        last_name: this.lastName,
        email: this.email,
        permanent_address: this.permanentAddress,
        password: this.password,
        contact_no: this.contact_no,
        name_of_guardian: this.name_of_guardian,
        contact_no_of_guardian: this.contact_no_of_guardian,
        course: this.courseSelected
      };

      await StudentService.editStudent(data);
      this.reset();
      this.getData();
      this.closeAddDialog();
    },

    async getDeleteItem(id) {
      this.id = id;
      this.confirmationDialog = true;
    },

    async deleteStudent() {
      await StudentService.deleteStudent(this.id);
      this.closeConfirmDialog();
      this.getData();
    },

    closeConfirmDialog() {
      this.reset();
      this.confirmationDialog = false;
    },

    reset() {
      this.$refs.registerForm.reset();
    },

    async viewChecklist(data) {
      let response = (await CurriculumService.getCurriculum(data.course.id))
        .data;

      let grades = (await GradeService.getGrades(data.id)).data;
      this.checklist = await Promise.all(
        response.map(async data => {
          let id = data.subject.id;
          let code = data.subject.code;
          let name = data.subject.name;
          let prerequisites = data.subject.prerequisites;
          let prerequisitesName = [];
          if (prerequisites) {
            let prerequisitesData = prerequisites.split(",");
            for (let prerequisite of prerequisitesData) {
              let data = (await CourseService.getCourse(prerequisite)).data;
              prerequisitesName.push(data);
            }
          }

          let grade = await grades
            .filter(data => {
              return data.subject.id == id;
            })
            .map(data => {
              return data.grade;
            });
          let units = data.subject.units;
          let year = data.subject.year;
          let semester = data.subject.semester;

          return {
            id: id,
            code: code,
            name: name,
            grade: grade[0] ? grade[0] : "-",
            prerequisites: prerequisites ? prerequisitesName : "",
            units: units,
            year: year,
            semester: semester
          };
        })
      );

      this.user = {
        id: data.id,
        name: data.name,
        email: data.email,
        course: {
          id: data.course.id,
          name: data.course.name,
          code: data.course.code
        },
        contact_no: data.contact_no
      };
      this.action = "view";
      this.checklistDialog = true;
    },

    closeChecklistDialog() {
      this.checklistDialog = false;
    },
    async saveEditChecklist() {
      let data = this.$refs.checklist.checklist.map(data => {
        return {
          studentId: this.$refs.checklist.user.id,
          subjectId: data.id,
          grade: data.grade
        };
      });

      await GradeService.editGrade(data);
      this.checklistDialog = false;
      this.$refs.checklist.changeEditDialog();
      this.getData();
    }
  }
};
</script>

<style></style>
