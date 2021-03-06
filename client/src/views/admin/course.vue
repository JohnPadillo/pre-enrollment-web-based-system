<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-row>
          <v-spacer></v-spacer>
          <v-col sm="12" md="2">
            <v-select
              label="Program"
              v-model="programId"
              :items="programs"
              item-text="code"
              item-value="id"
              solo
              clearable
              @click:clear="resetCourses"
              @input="filterCourseByProgramId"
            ></v-select>
          </v-col>
          <v-col sm="12" md="2">
            <v-select
              label="Year"
              v-model="yearId"
              :items="years"
              item-text="name"
              item-value="id"
              clearable
              solo
              :disabled="!this.programId"
              @input="filterCourseByYear"
              @click:clear="resetCourses"
            ></v-select>
          </v-col>
          <v-col sm="12" md="2">
            <v-select
              label="Term"
              v-model="semesterId"
              :items="semesters"
              item-text="name"
              item-value="id"
              clearable
              solo
              :disabled="!this.yearId"
              @input="filterCourseBySemester"
              @click:clear="resetCourses"
            ></v-select>
          </v-col>
        </v-row>
        <addDialog
          :dialog="openAddDialog"
          :title="title"
          :action="action"
          ref="addDialog"
          @close="closeAddDialog"
          @save="action === 'edit' ? saveEditCourse() : addCourse()"
        >
          <v-text-field
            label="Course Code"
            :readonly="action == 'view'"
            v-model="course_code"
            outlined
          ></v-text-field>
          <v-text-field
            :readonly="action == 'view'"
            label="Course Name"
            v-model="course_name"
            outlined
          ></v-text-field>
          <v-text-field
            :readonly="action == 'view'"
            label="Units"
            v-model="course_units"
            type="number"
            outlined
          ></v-text-field>
          <v-autocomplete
            :readonly="action == 'view'"
            outlined
            v-model="course_prerequisites"
            :items="prerequisites"
            item-text="code"
            item-value="id"
            chips
            small-chips
            label="Prerequisites"
            multiple
          ></v-autocomplete>
          <v-text-field
            :readonly="action == 'view'"
            label="Fee"
            v-model="course_fee"
            type="number"
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
            <addButton
              v-if="$store.state.user.status == 1"
              :title="title"
              @add="add"
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="subjects"
            :search="search"
            dense
            :loading="courseLoading"
            loading-text="Loading..."
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.units }}</td>
                <td>{{ props.item.prerequisites }}</td>
                <td align="center">
                  <viewButton @view="viewCourse(props.item.id)" />
                  <editButton
                    v-if="$store.state.user.status == 1"
                    @edit="editCourse(props.item.id)"
                  />
                  <deleteButton
                    v-if="$store.state.user.status == 1"
                    @delete="remove(props.item.id)"
                  />
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
import ProgramService from "@/services/ProgramService.js";
import CurriculumService from "@/services/CurriculumService.js";
export default {
  data() {
    return {
      title: "Course",
      id: "",
      search: "",
      action: "",
      openAddDialog: false,
      confirmationDialog: false,
      courseLoading: false,
      confirmDialogTitle: "delete",
      course_name: "",
      course_code: "",
      course_units: "",
      course_prerequisites: [],
      course_fee: 0,
      subjects: [],
      programId: null,
      programs: [],
      curriculums: [],
      defaultSubjects: [],
      defaultSubjectsByProgramId: [],
      defaultSubjectsByYearId: [],
      prerequisites: [],
      headers: [
        {
          text: "Code",
          value: "code"
        },
        {
          text: "Description",
          value: "name",
          align: "center"
        },
        {
          text: "Units"
        },
        {
          text: "Prerequisites"
        },
        {
          text: "Actions",
          align: "center"
        }
      ],
      yearId: null,
      years: [
        {
          name: "1st",
          id: 1
        },
        {
          name: "2nd",
          id: 2
        },
        {
          name: "3rd",
          id: 3
        },
        {
          name: "4th",
          id: 4
        }
      ],
      semesterId: null,
      semesters: [
        {
          name: "1st",
          id: 1
        },
        {
          name: "2nd",
          id: 2
        }
      ]
    };
  },
  mounted() {
    this.getCourses();
    this.getPrograms();
    this.getCurriculum();
  },
  methods: {
    async filterCourseByProgramId() {
      let response = this.curriculums.filter(data => {
        return data.CourseId == this.programId;
      });
      let data = await Promise.all(
        response.map(async data => {
          let id = data.subjects.id;
          let code = data.subjects.code;
          let name = data.subjects.name;
          let units = data.subjects.units;
          // let prerequisites = data.subjects.prerequisites;
          let year = data.year;
          let semester = data.semester;

          let prerequisiteArray = [];

          if (data.subjects.prerequisites) {
            let prerequisites = await data.subjects.prerequisites.split(",");

            for (let prerequisite of prerequisites) {
              let data = (await CourseService.getCourse(prerequisite)).data;
              prerequisiteArray.push(data);
            }
          }

          let prerequisites = data.subjects.prerequisites
            ? prerequisiteArray.map(data => {
                return {
                  id: data.id,
                  code: data.code,
                  name: data.name,
                  units: data.units
                };
              })
            : data.subjects.prerequisites;

          let displayPrerequisites = "";
          if (prerequisites) {
            for (let i = 0; i < prerequisites.length; i++) {
              displayPrerequisites +=
                "" +
                prerequisites[i].code +
                (i < prerequisites.length - 1 ? ", " : "");
            }
          }

          return {
            id: id,
            code: code,
            name: name,
            units: units,
            // prerequisites: prerequisites,
            prerequisites: data.subjects.prerequisites
              ? displayPrerequisites
              : data.subjects.prerequisites,
            year: year,
            semester: semester
          };
        })
      );
      this.defaultSubjectsByProgramId = data;
      this.subjects = data;
    },
    async getPrerequisites() {
      this.prerequisites = await this.subjects.filter(data => {
        return data.id != this.id;
      });
    },
    async getCurriculum() {
      this.curriculums = (await CurriculumService.getCurriculums()).data;
    },
    async getPrograms() {
      this.programs = (await ProgramService.getPrograms()).data;
    },
    async getCourses() {
      this.courseLoading = true;
      let response = (await CourseService.getCourses()).data;
      this.subjects = await Promise.all(
        response.map(async data => {
          let id = data.id;
          let code = data.code;
          let name = data.name;
          let units = data.units;
          let courses = data.courses.map(course => {
            return {
              id: course.id,
              name: course.name,
              code: course.code
            };
          });

          let prerequisiteArray = [];

          if (data.prerequisites) {
            let prerequisites = await data.prerequisites.split(",");

            for (let prerequisite of prerequisites) {
              let data = (await CourseService.getCourse(prerequisite)).data;
              prerequisiteArray.push(data);
            }
          }
          let prerequisites = data.prerequisites
            ? prerequisiteArray.map(data => {
                return {
                  id: data.id,
                  code: data.code,
                  name: data.name,
                  units: data.units
                };
              })
            : data.prerequisites;

          let displayPrerequisites = "";
          if (prerequisites) {
            for (let i = 0; i < prerequisites.length; i++) {
              displayPrerequisites +=
                "" +
                prerequisites[i].code +
                (i < prerequisites.length - 1 ? ", " : "");
            }
          }

          return {
            id: id,
            code: code,
            name: name,
            units: units,
            prerequisites: data.prerequisites
              ? displayPrerequisites
              : data.prerequisites,
            courses: courses
          };
        })
      );
      this.defaultSubjects = this.subjects;
      this.courseLoading = false;
    },
    async resetCourses() {
      if (this.programId) {
        await this.filterCourseByProgramId();
      }
      if (!this.programId) {
        this.yearId = null;
        this.semesterId = null;
        this.getCourses();
      }

      if (this.yearId) {
        await this.filterCourseByYear();
      }

      if (!this.yearId) {
        this.semesterId = null;
      }

      // if (!this.programId) {
      //   this.yearId = null;
      //   this.semesterId = null;
      // }
    },
    add() {
      this.getPrerequisites();

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
      this.course_units = "";
      this.course_prerequisites = [];
    },
    async addCourse() {
      let prerequisites = "";
      for (let i = 0; i < this.course_prerequisites.length; i++) {
        prerequisites +=
          "" +
          this.course_prerequisites[i] +
          (i < this.course_prerequisites.length - 1 ? "," : "");
      }

      let data = {
        name: this.course_name,
        code: this.course_code,
        units: this.course_units,
        prerequisites: await prerequisites,
        fee: this.course_fee
      };

      console.log(data);

      // await CourseService.addCourse(data);
      // this.getCourses();
      // this.openAddDialog = false;
      // this.reset();
    },
    async editCourse(id) {
      this.action = "edit";
      let subject = (await CourseService.getCourse(id)).data;
      this.id = subject.id;
      await this.getPrerequisites();
      this.course_code = subject.code;
      this.course_name = subject.name;
      this.course_units = subject.units;
      this.course_fee = subject.fee;
      let prerequisiteArray = []; // we can pass object here

      if (subject.prerequisites) {
        let prerequisites = subject.prerequisites.split(","); // Convert string to array separating by comma

        for (let prerequisite of prerequisites) {
          let data = (await CourseService.getCourse(prerequisite)).data;
          prerequisiteArray.push(data);
        }
      }

      this.course_prerequisites = subject.prerequisites
        ? prerequisiteArray
        : "";
      this.openAddDialog = true;
    },
    async saveEditCourse() {
      if (typeof this.course_prerequisites[0] == "object") {
        this.course_prerequisites = await Promise.all(
          this.course_prerequisites.map(data => {
            return data.id;
          })
        );
      }

      let prerequisites = "";
      for (let i = 0; i < this.course_prerequisites.length; i++) {
        prerequisites +=
          "" +
          this.course_prerequisites[i] +
          (i < this.course_prerequisites.length - 1 ? "," : "");
      }

      let data = {
        id: this.id,
        name: this.course_name,
        code: this.course_code,
        units: this.course_units,
        prerequisites: prerequisites,
        fee: this.course_fee
      };

      await CourseService.editCourse(data);

      this.getCourses();
      this.openAddDialog = false;
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
    },

    async filterCourseByYear() {
      let data = this.defaultSubjectsByProgramId.filter(data => {
        return data.year == this.yearId;
      });
      this.defaultSubjectsByYearId = data;
      this.subjects = data;
    },

    async filterCourseBySemester() {
      let data = this.defaultSubjectsByYearId.filter(data => {
        return data.semester == this.semesterId;
      });

      this.subjects = data;
    },

    async viewCourse(id) {
      this.action = "view";
      let subject = (await CourseService.getCourse(id)).data;
      this.id = subject.id;
      await this.getPrerequisites();
      this.course_code = subject.code;
      this.course_name = subject.name;
      this.course_units = subject.units;
      let prerequisiteArray = []; // we can pass object here

      if (subject.prerequisites) {
        let prerequisites = subject.prerequisites.split(","); // Convert string to array separating by comma

        for (let prerequisite of prerequisites) {
          let data = (await CourseService.getCourse(prerequisite)).data;
          prerequisiteArray.push(data);
        }
      }

      this.course_prerequisites = subject.prerequisites
        ? prerequisiteArray
        : "";
      this.openAddDialog = true;
    }
  }
};
</script>

<style></style>
