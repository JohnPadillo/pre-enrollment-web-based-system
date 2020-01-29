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
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="courseId"
                :items="courses"
                label="Course"
                item-text="code"
                item-value="id"
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </addDialog>
        <!-- form -->
        <formDialog
          :dialog="openDialog"
          :title="title"
          :maxWidth="1000"
          @close="closeDialog"
          @save="saveCurriculum"
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
                  <addButton id="11" ref="add11" @add="add11()"></addButton>
                </v-card-title>

                <v-data-table
                  :headers="formHeaders"
                  :items="getChecklistByYearSem(11)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton @delete="removeCourse(props.item.id)" />
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
                  <addButton id="12" ref="add12" @add="add12()"></addButton>
                </v-card-title>

                <v-data-table
                  :headers="formHeaders"
                  :items="getChecklistByYearSem(12)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton @delete="removeCourse(props.item.id)" />
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
                  <addButton id="21" ref="add21" @add="add21()"></addButton>
                </v-card-title>
                <v-data-table
                  :headers="formHeaders"
                  :items="getChecklistByYearSem(21)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton @delete="removeCourse(props.item.id)" />
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
                  <addButton id="22" ref="add22" @add="add22()"></addButton>
                </v-card-title>
                <v-data-table
                  :headers="formHeaders"
                  :items="getChecklistByYearSem(22)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton @delete="removeCourse(props.item.id)" />
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
                  <addButton id="31" ref="add31" @add="add31()"></addButton>
                </v-card-title>
                <v-data-table
                  :headers="formHeaders"
                  :items="getChecklistByYearSem(31)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton @delete="removeCourse(props.item.id)" />
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
                  <addButton id="32" ref="add32" @add="add32()"></addButton>
                </v-card-title>
                <v-data-table
                  :headers="formHeaders"
                  :items="getChecklistByYearSem(32)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton @delete="removeCourse(props.item.id)" />
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
                  <addButton id="41" ref="add41" @add="add41()"></addButton>
                </v-card-title>
                <v-data-table
                  :headers="formHeaders"
                  :items="getChecklistByYearSem(41)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton @delete="removeCourse(props.item.id)" />
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

                  <addButton id="42" ref="add42" @add="add42()"></addButton>
                </v-card-title>
                <v-data-table
                  :headers="formHeaders"
                  :items="getChecklistByYearSem(42)"
                  hide-default-footer
                >
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.code }}</td>
                      <td>{{ props.item.name }}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <removeButton @delete="removeCourse(props.item.id)" />
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
          <v-data-table :headers="headers" :items="curriculums" :search="search">
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.name }}</td>
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
import ProgramService from "@/services/ProgramService";
import CourseService from "@/services/CourseService";

export default {
  watch: {
    programId(value) {
      console.log(value);
    }
  },
  data() {
    return {
      title: "Curriculum",
      search: "",
      openDialog: false,
      openAddDialog: false,
      courses: [],
      programId: null,
      courseId: null,
      programs: [],
      curriculums: [],
      checklist: [],

      yearSemId: null,
      headers: [
        {
          text: "Course Code",
          value: "course"
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
          text: "Prequisites"
        },
        {
          text: "Term"
        },
        {
          text: "Action"
        }
      ]
    };
  },
  methods: {
    closeDialog() {
      this.openDialog = false;
      this.checklist = [];
    },
    closeAddDialog() {
      this.openAddDialog = false;
    },
    async getPrograms() {
      this.programs = (await ProgramService.getPrograms()).data;
    },
    async add() {
      this.getPrograms();
      this.openDialog = true;
    },
    async getCourses() {
      this.courses = (await CourseService.getCourses()).data;
    },
    async add11() {
      console.log(this.$refs.add11.$options._parentVnode.data.attrs.id);
      this.yearSemId = this.$refs.add11.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add12() {
      console.log(this.$refs.add12.$options._parentVnode.data.attrs.id);
      this.yearSemId = this.$refs.add12.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add21() {
      console.log(this.$refs.add21.$options._parentVnode.data.attrs.id);
      this.yearSemId = this.$refs.add21.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add22() {
      console.log(this.$refs.add22.$options._parentVnode.data.attrs.id);
      this.yearSemId = this.$refs.add22.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add31() {
      console.log(this.$refs.add31.$options._parentVnode.data.attrs.id);
      this.yearSemId = this.$refs.add31.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add32() {
      console.log(this.$refs.add32.$options._parentVnode.data.attrs.id);
      this.yearSemId = this.$refs.add32.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add41() {
      console.log(this.$refs.add41.$options._parentVnode.data.attrs.id);
      this.yearSemId = this.$refs.add41.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async add42() {
      console.log(this.$refs.add42.$options._parentVnode.data.attrs.id);
      this.yearSemId = this.$refs.add42.$options._parentVnode.data.attrs.id;
      this.getCourses();
      this.openAddDialog = true;
    },
    async resetAddCourse() {
      this.courseId = null;
    },
    async addCourse() {
      let course = (await CourseService.getCourse(this.courseId)).data;
      let data = {
        id: this.courseId,
        yearSemId: this.yearSemId,
        name: course.name,
        code: course.code
      };
      this.checklist.push(data);

      // if (
      //   data.yearSemId == this.$refs.add11.$options._parentVnode.data.attrs.id
      // ) {
      //   this.getChecklistByYearSem(data.yearSemId);
      // }
      // console.log(data);
      this.closeAddDialog();
      this.resetAddCourse();
    },
    async removeCourse(id) {
      let index = await this.checklist.filter(course => {
        return course.id == id;
      });
      await this.checklist.splice(index[0], 1);
      // console.log(this.firstYearfirstSem);
    },
    getChecklistByYearSem(id) {
      let response = this.checklist.filter(data => {
        return data.yearSemId == id;
      });

      console.log(response);
      return response;
    },
    async saveCurriculum() {
      console.log(this.programId);
      console.log(this.checklist);
    }
  }
};
</script>

<style></style>
