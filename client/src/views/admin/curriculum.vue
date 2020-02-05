<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :dialog="openAddDialog"
          :title="title"
          ref="addDialog"
          @close="closeAddDialog"
          @save="addCourse"
        >
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="courseId"
                :items="courses"
                label="Course"
                item-text="code"
                item-value="id"
                outlined
              >
                <!-- <template slot="selection" slot-scope="data">
                  // HTML that describe how select should render selected items
                  {{ data.item.name }} - {{ data.item.description }}
                </template>-->
                <template slot="item" slot-scope="data">
                  <!-- // HTML that describe how select should render items when the
                  select is open-->
                  {{ data.item.code }} - {{ data.item.name }}
                </template>
              </v-select>
            </v-col>
          </v-row>
        </addDialog>

        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="removeCurriculum"
        ></confirmationDialog>
        <!-- form -->
        <formDialog
          :dialog="openDialog"
          :title="title"
          :maxWidth="1000"
          @close="closeDialog"
          @save="action == 'add' ? saveCurriculum() : saveEditCurriculum()"
        >
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="programId"
                :items="programs"
                label="Program"
                item-text="code"
                item-value="id"
                outlined
                :readonly="action == 'edit'"
              ></v-select>
            </v-col>
          </v-row>

          <!-- 1st Year -->
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mt-5">
                <v-card-title>
                  1st Year 1st Sem
                  <v-spacer></v-spacer>
                  <addButton v-if="action != 'view'" id="11" ref="add11" @add="add11()"></addButton>
                </v-card-title>

                <v-data-table
                  disable-pagination
                  :headers="
                    this.$route.name == 'AdminCurriculum'
                      ? formHeaders2
                      : formHeaders
                  "
                  hide-default-footer
                  :items="getChecklistByYearSem(11)"
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td align="center">{{ props.item.units }}</td>
                      <td></td>
                      <td>{{ props.item.prerequisites }}</td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton v-if="action != 'view'" @delete="removeCourse(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mt-5">
                <v-card-title>
                  1st Year 2nd Sem
                  <v-spacer></v-spacer>
                  <addButton v-if="action != 'view'" id="12" ref="add12" @add="add12()"></addButton>
                </v-card-title>

                <v-data-table
                  disable-pagination
                  :headers="
                    this.$route.name == 'AdminCurriculum'
                      ? formHeaders2
                      : formHeaders
                  "
                  :items="getChecklistByYearSem(12)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td align="center">{{ props.item.units }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton v-if="action != 'view'" @delete="removeCourse(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <!-- 2nd Year -->
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mt-5">
                <v-card-title>
                  2nd Year 1st Sem
                  <v-spacer></v-spacer>
                  <addButton v-if="action != 'view'" id="21" ref="add21" @add="add21()"></addButton>
                </v-card-title>
                <v-data-table
                  disable-pagination
                  :headers="
                    this.$route.name == 'AdminCurriculum'
                      ? formHeaders2
                      : formHeaders
                  "
                  :items="getChecklistByYearSem(21)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td align="center">{{ props.item.units }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton v-if="action != 'view'" @delete="removeCourse(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mt-5">
                <v-card-title>
                  2nd Year 2nd Sem
                  <v-spacer></v-spacer>
                  <addButton v-if="action != 'view'" id="22" ref="add22" @add="add22()"></addButton>
                </v-card-title>
                <v-data-table
                  disable-pagination
                  :headers="
                    this.$route.name == 'AdminCurriculum'
                      ? formHeaders2
                      : formHeaders
                  "
                  :items="getChecklistByYearSem(22)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td align="center">{{ props.item.units }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton v-if="action != 'view'" @delete="removeCourse(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <!-- 3rd Year -->
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mt-5">
                <v-card-title>
                  3rd Year 1st Sem
                  <v-spacer></v-spacer>
                  <addButton v-if="action != 'view'" id="31" ref="add31" @add="add31()"></addButton>
                </v-card-title>
                <v-data-table
                  disable-pagination
                  :headers="
                    this.$route.name == 'AdminCurriculum'
                      ? formHeaders2
                      : formHeaders
                  "
                  :items="getChecklistByYearSem(31)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td align="center">{{ props.item.units }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton v-if="action != 'view'" @delete="removeCourse(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mt-5">
                <v-card-title>
                  3rd Year 2nd Sem
                  <v-spacer></v-spacer>
                  <addButton v-if="action != 'view'" id="32" ref="add32" @add="add32()"></addButton>
                </v-card-title>
                <v-data-table
                  disable-pagination
                  :headers="
                    this.$route.name == 'AdminCurriculum'
                      ? formHeaders2
                      : formHeaders
                  "
                  :items="getChecklistByYearSem(32)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td align="center">{{ props.item.units }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton v-if="action != 'view'" @delete="removeCourse(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <!-- 4th Year -->
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mt-5">
                <v-card-title>
                  4th Year 1st Sem
                  <v-spacer></v-spacer>
                  <addButton v-if="action != 'view'" id="41" ref="add41" @add="add41()"></addButton>
                </v-card-title>
                <v-data-table
                  disable-pagination
                  :headers="
                    this.$route.name == 'AdminCurriculum'
                      ? formHeaders2
                      : formHeaders
                  "
                  :items="getChecklistByYearSem(41)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td align="center">{{ props.item.units }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton v-if="action != 'view'" @delete="removeCourse(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mt-5">
                <v-card-title>
                  4th Year 2nd Sem
                  <v-spacer></v-spacer>

                  <addButton v-if="action != 'view'" id="42" ref="add42" @add="add42()"></addButton>
                </v-card-title>
                <v-data-table
                  disable-pagination
                  :headers="
                    this.$route.name == 'AdminCurriculum'
                      ? formHeaders2
                      : formHeaders
                  "
                  :items="getChecklistByYearSem(42)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td align="center">{{ props.item.units }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton v-if="action != 'view'" @delete="removeCourse(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </formDialog>
        <!-- --------------------------------------------------------------------------------------------- -->
        <!-- table -->
        <v-card>
          <v-card-title>
            Curriculums
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
          <v-data-table
            :loading="curriculumLoading"
            loading-text="Loading..."
            :headers="headers"
            :items="curriculums"
            :search="search"
            dense
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td align="center">
                  <viewButton @view="viewCurriculum(props.item.id)" />
                  <editButton @edit="editCurriculum(props.item)" />
                  <deleteButton @delete="deleteCurriculum(props.item)" />
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
import ProgramService from "@/services/ProgramService";
import CourseService from "@/services/CourseService";
import CurriculumService from "@/services/CurriculumService";

export default {
  data() {
    return {
      title: "Curriculum",
      search: "",
      delete_id: "",
      openDialog: false,
      confirmationDialog: false,
      confirmDialogTitle: "delete",
      action: "",
      openAddDialog: false,
      courses: [],
      programId: null,
      courseId: null,
      programs: [],
      curriculums: [],
      checklist: [],
      subjects: [],
      yearSemId: null,
      headers: [
        {
          text: "Program Code"
        },
        {
          text: "Program Name"
        },
        {
          text: "Action",
          align: "center"
        }
      ],
      formHeaders: [
        {
          text: "Course Code"
        },
        {
          text: "Course Description"
        },
        {
          text: "Reg. Units"
        },
        {
          text: "Grade"
        },
        {
          text: "Earned Unit"
        },
        {
          text: "Prerequisites"
        },
        {
          text: "Term"
        },
        {
          text: "Action"
        }
      ],
      formHeaders2: [
        {
          text: "Course Code"
        },
        {
          text: "Course Description"
        },
        {
          text: "Reg. Units"
        },
        {
          text: "Earned Unit"
        },
        {
          text: "Prerequisites"
        },
        {
          text: "Term"
        },
        {
          text: "Action"
        }
      ],
      curriculumLoading: false
    };
  },
  mounted() {
    this.getCurriculums();
    this.getPrograms();
  },
  methods: {
    async getCurriculums() {
      this.curriculumLoading = true
      let response = (await CurriculumService.getCurriculums()).data;
      // console.log(response)
      let data = [...new Set(response.map(item => item.CourseId))];
      // console.log(data)
      let curriculumArray = [];
      for (let i = 0; i < data.length; i++) {
        curriculumArray.push((await ProgramService.getProgram(data[i])).data);
      }
      this.curriculums = curriculumArray;
      this.curriculumLoading = false
    },
    closeDialog() {
      this.openDialog = false;
      this.subjects = [];
      this.programId = null;
      this.action = "";
    },
    closeAddDialog() {
      this.courseId = null;
      this.openAddDialog = false;
    },
    async getPrograms() {
      this.programs = (await ProgramService.getPrograms()).data;
    },
    async add() {
      this.action = "add";
      this.getPrograms();
      this.openDialog = true;
    },
    async getCourses() {
      this.courses = (await CourseService.getCourses()).data;
    },
    async add11() {
      this.yearSemId = this.$refs.add11.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add12() {
      this.yearSemId = this.$refs.add12.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add21() {
      this.yearSemId = this.$refs.add21.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add22() {
      this.yearSemId = this.$refs.add22.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add31() {
      this.yearSemId = this.$refs.add31.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add32() {
      this.yearSemId = this.$refs.add32.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add41() {
      this.yearSemId = this.$refs.add41.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add42() {
      this.yearSemId = this.$refs.add42.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async resetAddCourse() {
      this.courseId = null;
    },
    async addCourse() {
      let course = (await CourseService.getCourse(this.courseId)).data;
      let year, semester;
      if (this.yearSemId == 11) {
        (year = 1), (semester = 1);
      }
      if (this.yearSemId == 12) {
        (year = 1), (semester = 2);
      }
      if (this.yearSemId == 21) {
        (year = 2), (semester = 1);
      }
      if (this.yearSemId == 22) {
        (year = 2), (semester = 2);
      }
      if (this.yearSemId == 31) {
        (year = 3), (semester = 1);
      }
      if (this.yearSemId == 32) {
        (year = 3), (semester = 2);
      }
      if (this.yearSemId == 41) {
        (year = 4), (semester = 1);
      }
      if (this.yearSemId == 42) {
        (year = 4), (semester = 2);
      }
      let data = {
        program_id: this.programId,
        course_id: this.courseId,
        year: year,
        semester: semester,
        name: course.name,
        code: course.code,
        yearSemId: this.yearSemId
      };
      this.subjects.push(data);
      this.closeAddDialog();
      this.resetAddCourse();
    },
    async removeCourse(data) {
      // let response = await this.subjects.filter(course => {
      //   return course.course_id == data.course_id && course.id == data.id;
      // });

      let index = this.subjects.findIndex(response => {
        return response.course_id == data.course_id && response.id == data.id;
      });

      await this.subjects.splice(index, 1);

      // console.log(this.subjects)
      // if (this.action == "edit") {
      //   let data = await this.subjetcs.find(course => {
      //     return course.id == id;
      //   });
      //   console.log(data);
      // }
    },
    getChecklistByYearSem(id) {
      if (id == "11") {
        return this.subjects.filter(data => {
          return data.year == 1 && data.semester == 1;
        });
      }
      if (id == "12") {
        return this.subjects.filter(data => {
          return data.year == 1 && data.semester == 2;
        });
      }
      if (id == "21") {
        return this.subjects.filter(data => {
          return data.year == 2 && data.semester == 1;
        });
      }
      if (id == "22") {
        return this.subjects.filter(data => {
          return data.year == 2 && data.semester == 2;
        });
      }
      if (id == "31") {
        return this.subjects.filter(data => {
          return data.year == 3 && data.semester == 1;
        });
      }
      if (id == "32") {
        return this.subjects.filter(data => {
          return data.year == 3 && data.semester == 2;
        });
      }
      if (id == "41") {
        return this.subjects.filter(data => {
          return data.year == 4 && data.semester == 1;
        });
      }
      if (id == "42") {
        return this.subjects.filter(data => {
          return data.year == 4 && data.semester == 2;
        });
      }

      // let response = this.checklist.filter(data => {
      //   return data.yearSemId == id;
      // });

      // console.log(this.subjects);
      // return response;
    },
    async saveCurriculum() {
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjects[i].program_id = this.programId;
      }

      let data = this.subjects.map(data => {
        let CourseId = data.program_id;
        let SubjectId = data.course_id;
        let year = data.year;
        let semester = data.semester;

        return {
          CourseId: CourseId,
          SubjectId: SubjectId,
          year: year,
          semester: semester
        };
      });

      await CurriculumService.addCurriculum(data);
      this.closeDialog();
      this.subjects = [];
      this.getCurriculums();
    },

    async saveEditCurriculum() {
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjects[i].program_id = this.programId;
      }

      let data = this.subjects.map(data => {
        let CourseId = data.program_id;
        let SubjectId = data.course_id;
        let year = data.year;
        let semester = data.semester;

        return {
          id: CourseId,
          CourseId: CourseId,
          SubjectId: SubjectId,
          year: year,
          semester: semester
        };
      });
      console.log(data);
      await CurriculumService.editCurriculum(data);
      this.subjects = [];
      this.getCurriculums();
      this.closeDialog();
    },

    async viewCurriculum(id) {
      this.action = "view";
      this.openDialog = true;
      this.programId = id;
      this.subjects = (await CurriculumService.getCurriculum(id)).data;
      console.log(this.subjects)

      let data = await this.subjects.map(data => {
        let name = data.subject.name;
        let code = data.subject.code;
        let units = data.subject.units;
        let prerequisites = data.subject.prerequisites;
        let year = data.subject.year;
        let semester = data.subject.semester;

        return {
          name: name,
          code: code,
          units: units,
          prerequisites: prerequisites,
          year: year,
          semester: semester
        };
      });
      this.subjects = data;
      console.log(this.subjects)

    },

    async editCurriculum(data) {
      this.action = "edit";
      this.openDialog = true;
      this.programId = data.id;
      this.subjects = (await CurriculumService.getCurriculum(data.id)).data;

      let response = this.subjects.map(data => {
        let name = data.subject.name;
        let code = data.subject.code;
        let year = data.subject.year;
        let semester = data.subject.semester;
        let id = year + "" + semester;
        let course_id = data.subject.id;

        return {
          name: name,
          code: code,
          year: year,
          semester: semester,
          id: id,
          course_id: course_id
        };
      });
      this.subjects = response;
    },

    async deleteCurriculum(data) {
      this.delete_id = data.id;
      this.confirmationDialog = true;
    },

    closeConfirmDialog() {
      this.confirmationDialog = false;
    },

    async removeCurriculum() {
      await CurriculumService.deleteCurriculum(this.delete_id);
      this.getCurriculums();
      this.closeConfirmDialog();
      this.delete_id = "";
    }
  }
};
</script>

<style></style>
