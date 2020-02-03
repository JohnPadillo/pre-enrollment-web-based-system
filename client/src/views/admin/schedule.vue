<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col cols="12" sm="12" md="3">
            <!-- <v-select
              :items="category"
              v-model="selectedCategory"
              label="Schedule / Class"
              item-text="text"
              item-value="code"
            ></v-select>-->
            <v-btn-toggle color="blue darken-4" v-model="toggle_exclusive" mandatory>
              <v-btn @click="selectedCategory = 1">
                <v-icon>mdi-calendar-blank</v-icon>Schedule
              </v-btn>
              <v-btn @click="selectedCategory = 2">
                <v-icon>mdi-clock</v-icon>Class
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card v-if="selectedCategory == 1">
              <v-card-title>
                Schedules
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  clearable
                ></v-text-field>
                <addButton :title="title" @add="addSchedule" />

                <!-- <v-menu
              ref="menu"
              v-model="timePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-btn id="button" @click="openTimePicker" v-on="on">
                  {{
                  time ? title : "Time"
                  }}
                </v-btn>
              </template>
              <v-time-picker v-if="timePicker" v-model="time" scrollable></v-time-picker>
                </v-menu>-->
              </v-card-title>
              <scheduleForm
                ref="scheduleForm"
                :dialog="openScheduleDialog"
                @save="saveSchedule"
                @close="closeScheduleDialog"
              ></scheduleForm>
              <v-data-table :headers="scheduleHeaders" search></v-data-table>
            </v-card>
            <!-- ================================================================================================================== -->
            <v-card v-if="selectedCategory == 2">
              <v-card-title>
                Class
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchClass"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  clearable
                ></v-text-field>
                <addButton :title="title" @add="addClass" />
              </v-card-title>
              <v-data-table :headers="classHeaders" :items="classes" search></v-data-table>
              <v-row justify="center">
                <v-dialog v-model="classDialog" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Create Class</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="classProgram"
                              :items="classPrograms"
                              label="Program"
                              item-text="code"
                              item-value="id"
                              @input="classProgramSelected"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Class No." required type="number"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="classSectionId"
                              :items="classSections"
                              label="Section"
                              item-text="code"
                              item-value="id"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="classCourseId"
                              :items="classCourses"
                              label="Course"
                              item-text="code"
                              item-value="id"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Units" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="classRoomId"
                              :items="classRooms"
                              label="Room"
                              item-text="code"
                              item-value="id"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="['0-17', '18-29', '30-54', '54+']"
                              label="Age*"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-autocomplete
                              :items="[
                                'Skiing',
                                'Ice hockey',
                                'Soccer',
                                'Basketball',
                                'Hockey',
                                'Reading',
                                'Writing',
                                'Coding',
                                'Basejump'
                              ]"
                              label="Interests"
                              multiple
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeClassDialog">Close</v-btn>
                      <v-btn color="blue darken-1" text @click="saveClass">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ScheduleForm from "@/components/form/ScheduleForm";
import ProgramService from "@/services/ProgramService";
import SectionService from "@/services/SectionService";
import CurriculumService from "@/services/CurriculumService";

export default {
  // watch: {
  //   time(val) {
  //     console.log(val);
  //   }
  // },
  components: {
    ScheduleForm
  },
  data() {
    return {
      title: "Schedule",
      action: "",
      time: "",
      search: "",
      searchClass: "",
      timePicker: false,
      openScheduleDialog: false,
      classDialog: false,
      scheduleHeaders: [
        {
          text: "Program"
        },
        {
          text: "Section"
        },
        {
          text: "Action"
        }
      ],
      category: [
        {
          text: "Schedule",
          code: 1
        },
        {
          text: "Class",
          code: 2
        }
      ],
      classHeaders: [
        {
          text: "Class No."
        },
        {
          text: "Course Description"
        },
        {
          text: "Section"
        },
        {
          text: "Units"
        },
        {
          text: "Day"
        },
        {
          text: "Time"
        },
        {
          text: "Room"
        },
        {
          text: "Action"
        }
      ],
      selectedCategory: 1,
      toggle_exclusive: undefined,
      classes: [],
      classProgram: "", // v-model for class v-select
      classPrograms: [], // items for class v-select
      classSectionId: "",
      classSections: [],
      classCourseId: "",
      classCourses: [],
      classRoomId: "",
      classRooms: []
    };
  },
  methods: {
    async getPrograms() {
      this.classPrograms = (await ProgramService.getPrograms()).data;
    },
    async getSections() {
      this.classSections = (await SectionService.getSections()).data;
    },
    async getCourses() {
      let data = (await CurriculumService.getCurriculums()).data;
      this.classCourses = data
        .filter(data => {
          return this.classProgram == data.CourseId;
        })
        .map(data => {
          let id = data.subjects.id;
          let code = data.subjects.code;
          let name = data.subjects.name;
          let units = data.subjects.unit;

          return {
            id: id,
            code: code,
            name: name,
            units: units
          };
        });
    },
    async classProgramSelected() {
      await this.getSections();
      this.classSections = await this.classSections.filter(data => {
        return this.classProgram == data.course.id;
      });
      await this.getCourses();
    },
    openTimePicker() {
      this.timePicker = true;
    },
    addSchedule() {
      this.openScheduleDialog = true;
    },
    addClass() {
      this.classDialog = true;
      this.getPrograms();
    },
    closeScheduleDialog() {
      this.resetSchedule();
      this.openScheduleDialog = false;
    },
    closeClassDialog() {
      this.classDialog = false;
    },
    resetSchedule() {
      (this.$refs.scheduleForm.programId = ""),
        (this.$refs.scheduleForm.sectionId = ""),
        (this.$refs.scheduleForm.programs = []);
      this.$refs.scheduleForm.schedules = [];
    },
    saveSchedule() {
      let data = {
        programId: this.$refs.scheduleForm.programId,
        sectionId: this.$refs.scheduleForm.sectionId
      };
      console.log(this.$refs.scheduleForm.schedules);
      console.log(data);

      this.closeScheduleDialog();
      this.resetSchedule();
    },
    saveClass() {
      this.closeClassDialog();
    }
  }
};
</script>

<style></style>
