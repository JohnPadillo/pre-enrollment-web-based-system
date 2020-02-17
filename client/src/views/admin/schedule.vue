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
              <v-btn
                @click="
                  selectedCategory = 2;
                  getClasses();
                "
              >
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
              </v-card-title>
              <scheduleForm
                ref="scheduleForm"
                :dialog="openScheduleDialog"
                :action="action"
                @save="action == 'add' ? saveSchedule() : saveEditSchedule()"
                @close="closeScheduleDialog"
              ></scheduleForm>
              <snackbar
                ref="scheduleSnackbar"
                :color="snackbarColor"
                :text="snackbarText"
                @close="closeSnackBar"
              />
              <confirmationDialog
                :dialog="scheduleConfirmationDialog"
                :title="scheduleConfirmDialogTitle"
                @no="closeScheduleConfirmDialog"
                @yes="deleteSchedule"
              ></confirmationDialog>
              <v-data-table
                :headers="scheduleHeaders"
                :items="schedules"
                dense
                :loading="scheduleLoading"
                loading-text="Loading..."
                :search="search"
              >
                <template v-slot:item="props">
                  <tr>
                    <td>{{ props.item.course.code }}</td>
                    <td>{{ props.item.code }}</td>
                    <td align="center">
                      <viewButton @view="viewSchedule(props.item)" />
                      <editButton @edit="editSchedule(props.item)" />
                      <deleteButton @delete="getDeleteSchedule(props.item)" />
                    </td>
                  </tr>
                </template>
              </v-data-table>
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
              <confirmationDialog
                :dialog="classConfirmationDialog"
                :title="classConfirmDialogTitle"
                @no="closeClassConfirmDialog"
                @yes="deleteClass"
              ></confirmationDialog>
              <v-data-table :headers="classHeaders" :items="classes" :search="searchClass">
                <template v-slot:item="props">
                  <tr>
                    <td>{{ props.item.class_no }}</td>
                    <td>{{ props.item.subject.name }}</td>
                    <td>{{ props.item.section.code }}</td>
                    <td>{{ props.item.subject.units }}</td>
                    <td>{{ props.item.day }}</td>
                    <td>{{ props.item.time_start + " - " + props.item.time_end }}</td>
                    <td>{{ props.item.room.code }}</td>
                    <td>
                      <editButton @edit="editClass(props.item)" />
                      <deleteButton @delete="deleteItem(props.item.id)" />
                    </td>
                  </tr>
                </template>
              </v-data-table>
              <snackbar
                ref="snackbar"
                :color="snackbarColor"
                :text="snackbarText"
                @close="closeSnackBar"
              />
              <v-row justify="center">
                <v-dialog v-model="classDialog" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Create Class</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form ref="classForm">
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="classProgramId"
                                :rules="[classRules.required]"
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
                              <v-text-field
                                label="Class No."
                                v-model="classClassNo"
                                type="number"
                                :rules="[classRules.required]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="classSectionId"
                                :rules="[classRules.required]"
                                :items="classSections"
                                label="Section"
                                item-text="code"
                                item-value="id"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="classCourseId"
                                :rules="[classRules.required]"
                                :items="classCourses"
                                label="Course"
                                item-text="code"
                                item-value="id"
                                @input="setClassUnits()"
                              >
                                <template slot="item" slot-scope="data">
                                  {{ data.item.code }} -
                                  {{ data.item.name }}
                                </template>
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field label="Units" readonly v-model="classUnits"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                v-model="classRoomId"
                                :rules="[classRules.required]"
                                :items="classRooms"
                                label="Room"
                                item-text="code"
                                item-value="id"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-autocomplete
                                v-model="classDay"
                                :rules="[classRules.required]"
                                :items="days"
                                item-text="text"
                                item-value="value"
                                dense
                                chips
                                small-chips
                                label="Days"
                                multiple
                              ></v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="3">
                              <v-dialog
                                ref="startTimedialog"
                                v-model="classStartTimeDialog"
                                :return-value.sync="classTimeStart"
                                persistent
                                width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    :rules="[classRules.required]"
                                    v-model="classTimeStart"
                                    label="Time Start"
                                    prepend-icon="access_time"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-time-picker
                                  v-if="classStartTimeDialog"
                                  scrollable
                                  @update:period="clickPeriod"
                                  @click:hour="changeHour"
                                  :allowed-hours="allowedHours"
                                  :allowed-minutes="
                                    timeHourPick == 21
                                      ? limitedMinutes
                                      : allowedMinutes
                                  "
                                  v-model="classTimeStart"
                                  full-width
                                  :max="classTimeEnd"
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="classStartTimeDialog = false"
                                  >Cancel</v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="
                                      $refs.startTimedialog.save(classTimeStart)
                                    "
                                  >OK</v-btn>
                                </v-time-picker>
                              </v-dialog>
                            </v-col>

                            <v-col cols="12" sm="3">
                              <v-dialog
                                ref="endTimedialog"
                                v-model="classEndTimeDialog"
                                :return-value.sync="classTimeEnd"
                                persistent
                                width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    :disabled="classTimeStart ? false : true"
                                    v-model="classTimeEnd"
                                    :rules="[classRules.required]"
                                    label="Time End"
                                    prepend-icon="access_time"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-time-picker
                                  v-if="classEndTimeDialog"
                                  @update:period="clickPeriod"
                                  @click:hour="changeHour"
                                  :allowed-hours="allowedHours"
                                  :allowed-minutes="
                                    timeHourPick == 21
                                      ? limitedMinutes
                                      : allowedMinutes
                                  "
                                  scrollable
                                  v-model="classTimeEnd"
                                  full-width
                                  :min="classTimeStart"
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="classEndTimeDialog = false"
                                  >Cancel</v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="
                                      $refs.endTimedialog.save(classTimeEnd)
                                    "
                                  >OK</v-btn>
                                </v-time-picker>
                              </v-dialog>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeClassDialog">Close</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="
                          action == 'add' ? saveAddClass() : saveEditClass()
                        "
                      >Save</v-btn>
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
import RoomService from "@/services/RoomService";
import ClassService from "@/services/ClassService";
import ScheduleService from "@/services/ScheduleService";

export default {
  mounted() {
    this.getSchedules();
  },
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
          text: "Program",
          value: "course.code"
        },
        {
          text: "Section",
          value: "code"
        },
        {
          text: "Action",
          align: "center"
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
          text: "Class No.",
          value: "class_no"
        },
        {
          text: "Course Description",
          value: "subject.name"
        },
        {
          text: "Section",
          value: "section.code"
        },
        {
          text: "Units"
        },
        {
          text: "Day",
          value: "day"
        },
        {
          text: "Time"
        },
        {
          text: "Room",
          value: "room.code"
        },
        {
          text: "Action"
        }
      ],
      selectedCategory: 1,
      toggle_exclusive: undefined,
      class_id: null,
      classes: [],
      classProgramId: null, // v-model for class v-select
      classPrograms: [], // items for class v-select
      classSectionId: null,
      classSections: [],
      classCourseId: null,
      classCourses: [],
      classRoomId: null,
      classRooms: [],
      classClassNo: "",
      classUnits: "",
      classConfirmationDialog: false,
      classConfirmDialogTitle: "delete",
      scheduleConfirmationDialog: false,
      scheduleConfirmDialogTitle: "delete",
      scheduleToDelete: null,
      days: [
        {
          text: "Monday",
          value: "M"
        },
        {
          text: "Tuesday",
          value: "T"
        },
        {
          text: "Wednesday",
          value: "W"
        },
        {
          text: "Thursday",
          value: "TH"
        },
        {
          text: "Friday",
          value: "F"
        },
        {
          text: "Saturday",
          value: "SAT"
        },
        {
          text: "Sunday",
          value: "SUN"
        }
      ],
      classDay: null,
      classStartTimeDialog: false,
      classEndTimeDialog: false,
      classTimeStart: null,
      classTimeEnd: null,
      classRules: {
        required: value => !!value || "Required."
      },
      schedules: [],
      scheduleLoading: false,
      snackbarDialog: false,
      snackbarText: "",
      snackbarColor: "",
      timeHourPick: null
    };
  },
  methods: {
    changeHour(eventData) {
      this.timeHourPick = eventData;
    },

    clickPeriod(eventData) {
      if (eventData == "am") {
        this.timeHourPick -= 12;
      } else {
        this.timeHourPick += 12;
      }
    },
    allowedHours: v => v >= 7 && v <= 21,
    allowedMinutes: v => v >= 0,
    limitedMinutes: v => v < 1,

    async getSchedules() {
      this.scheduleLoading = true;
      let response = (await ScheduleService.getSchedules()).data;
      console.log(response);

      let data = [...new Set(response.map(item => item.section.id))];
      console.log(data);

      let scheduleArray = [];

      for (let i = 0; i < data.length; i++) {
        scheduleArray.push((await SectionService.getSection(data[i])).data);
      }
      this.schedules = scheduleArray;
      this.scheduleLoading = false;
    },
    async getClasses() {
      this.classes = (await ClassService.getClasses()).data;
    },
    async getPrograms() {
      this.classPrograms = (await ProgramService.getPrograms()).data;
    },
    async getSections() {
      this.classSections = (await SectionService.getSections()).data;
    },
    async getCourses() {
      let data = await Promise.all(
        (await CurriculumService.getCurriculums()).data
      );

      this.classCourses = data
        .filter(data => {
          return this.classProgramId == data.CourseId;
        })
        .map(data => {
          let id = data.subjects.id;
          let code = data.subjects.code;
          let name = data.subjects.name;
          let units = data.subjects.units;

          return {
            id: id,
            code: code,
            name: name,
            units: units
          };
        });
    },
    async getRooms() {
      this.classRooms = (await RoomService.getRooms()).data;
    },
    async classProgramSelected() {
      await this.getSections();
      this.classSections = await this.classSections.filter(data => {
        return this.classProgramId == data.course.id;
      });
      await this.getCourses();
    },
    openTimePicker() {
      this.timePicker = true;
    },
    addSchedule() {
      this.action = "add";
      this.openScheduleDialog = true;
    },
    addClass() {
      this.action = "add";
      this.classDialog = true;
      this.getPrograms();
      this.getRooms();
    },
    closeScheduleDialog() {
      this.resetSchedule();
      this.openScheduleDialog = false;
    },
    closeClassDialog() {
      this.resetClassForm();
      this.classDialog = false;
    },
    resetSchedule() {
      this.$refs.scheduleForm.schedules = [];
      this.$refs.scheduleForm.programId = "";
      this.$refs.scheduleForm.sectionId = "";
    },
    async saveSchedule() {
      // let data = {
      //   programId: this.$refs.scheduleForm.programId,
      //   sectionId: this.$refs.scheduleForm.sectionId
      // };

      let data = this.$refs.scheduleForm.schedules.map(data => {
        return {
          CourseId: this.$refs.scheduleForm.programId,
          SectionId: this.$refs.scheduleForm.sectionId,
          ClassId: data.id,
          RoomId: data.roomId
        };
      });

      if (
        this.schedules.some(
          schedule =>
            schedule.id == this.$refs.scheduleForm.sectionId &&
            schedule.course.id == this.$refs.scheduleForm.programId
        )
      ) {
        this.$refs.scheduleSnackbar.dialog = true;
        this.snackbarColor = "error";
        this.snackbarText = `Program and Section Schedule Already Exist!`;
      } else {
        console.log(data);
        if (data.length > 0) {
          await ScheduleService.addSchedule(data);

          this.closeScheduleDialog();
          this.resetSchedule();
          this.getSchedules();

          this.$refs.scheduleSnackbar.dialog = true;
          this.snackbarColor = "success";
          this.snackbarText = `Schedule Added`;
        } else {
          this.$refs.scheduleSnackbar.dialog = true;
          this.snackbarColor = "error";
          this.snackbarText = `Please add class/ classes !`;
        }
      }
    },

    async editSchedule(data) {
      this.action = "edit";
      this.openScheduleDialog = true;
      this.$refs.scheduleForm.programId = data.course.id;
      this.$refs.scheduleForm.sectionId = data.id;

      let response = (await ScheduleService.getSchedules()).data;

      let schedules = await Promise.all(
        response
          .filter(reponse => {
            return reponse.SectionId == data.id;
          })
          .map(async data => {
            let response = (await ClassService.getClass(data.ClassId)).data;
            return {
              id: response.id,
              class_no: response.class_no,
              course_name: response.subject.name,
              section: response.section.name,
              units: response.subject.units,
              day: response.day,
              time: `${response.time_start} - ${response.time_end}`,
              room: response.room.code,
              roomId: response.room.id
            };
          })
      );

      this.$refs.scheduleForm.schedules = schedules;
    },

    async saveEditSchedule() {
      let data = this.$refs.scheduleForm.schedules.map(data => {
        return {
          CourseId: this.$refs.scheduleForm.programId,
          SectionId: this.$refs.scheduleForm.sectionId,
          ClassId: data.id,
          RoomId: data.roomId
        };
      });

      if (data.length > 0) {
        await ScheduleService.editSchedule(data);

        this.closeScheduleDialog();
        this.resetSchedule();
        this.getSchedules();

        this.$refs.scheduleSnackbar.dialog = true;
        this.snackbarColor = "success";
        this.snackbarText = `Schedule Updated`;
      } else {
        this.$refs.scheduleSnackbar.dialog = true;
        this.snackbarColor = "error";
        this.snackbarText = `Please add class/ classes !`;
      }
    },
    async saveAddClass() {
      if (this.$refs.classForm.validate()) {
        let classDays = "";
        for (let i = 0; i < this.classDay.length; i++) {
          classDays +=
            "" + this.classDay[i] + (i < this.classDay.length - 1 ? "/" : "");
        }

        this.classDay = await classDays;
        let data = {
          class_no: this.classClassNo,
          CourseId: this.classProgramId,
          SubjectId: this.classCourseId,
          SectionId: this.classSectionId,
          RoomId: this.classRoomId,
          day: this.classDay,
          time_start: this.classTimeStart,
          time_end: this.classTimeEnd
        };

        let validClassNo = (await ClassService.getClasses()).data.filter(
          data => {
            return data.class_no == this.classClassNo;
          }
        );
        if (validClassNo.length > 0) {
          this.$refs.snackbar.dialog = true;
          this.snackbarColor = "error";
          this.snackbarText = `Class No. Already Exist !`;
        } else {
          let response = (await ClassService.addClass(data)).data;
          if (response.error) {
            let conflict = "";
            for (let i = 0; i < response.conflict.length; i++) {
              console.log(response.conflict[i]);
              conflict +=
                "" +
                response.conflict[i].class_no +
                (i < response.conflict.length - 1 ? "," : "");
            }
            this.$refs.snackbar.dialog = true;
            this.snackbarColor = "error";
            this.snackbarText = `Conflict to Class No: ${conflict}`;
          } else {
            this.closeClassDialog();
            this.getClasses();
          }
        }
      }
    },

    // set units when course is selected
    async setClassUnits() {
      let data = await Promise.all(
        this.classCourses.filter(course => {
          return course.id == this.classCourseId;
        })
      );
      this.classUnits = data[0].units;
    },

    async editClass(data) {
      console.log(data);
      this.action = "edit";
      this.getPrograms();
      this.getSections();
      this.getCourses();
      this.getRooms();
      this.class_id = data.id;
      this.classProgramId = data.course.id;
      this.classClassNo = data.class_no;
      (this.classCourseId = data.subject.id),
        (this.classSectionId = data.section.id),
        (this.classRoomId = data.room.id);
      this.classUnits = data.subject.units;

      let classday = data.day.split("/");

      this.classDay = classday;
      this.classTimeStart = data.time_start;
      this.classTimeEnd = data.time_end;

      this.classDialog = true;
    },

    async saveEditClass() {
      let classDays = "";
      for (let i = 0; i < this.classDay.length; i++) {
        classDays +=
          "" + this.classDay[i] + (i < this.classDay.length - 1 ? "/" : "");
      }

      this.classDay = await classDays;
      let data = {
        id: this.class_id,
        class_no: this.classClassNo,
        CourseId: this.classProgramId,
        SubjectId: this.classCourseId,
        SectionId: this.classSectionId,
        RoomId: this.classRoomId,
        day: this.classDay,
        time_start: this.classTimeStart,
        time_end: this.classTimeEnd
      };
      await ClassService.editClass(data);
      this.closeClassDialog();
      this.getClasses();
    },

    closeClassConfirmDialog() {
      this.classConfirmationDialog = false;
    },

    closeScheduleConfirmDialog() {
      this.scheduleConfirmationDialog = false;
    },

    deleteItem(id) {
      this.classConfirmationDialog = true;
      this.class_id = id;
    },

    async getDeleteSchedule(data) {
      this.scheduleConfirmationDialog = true;
      this.scheduleToDelete = {
        CourseId: data.course.id,
        SectionId: data.id
      };
    },

    async deleteSchedule() {
      await ScheduleService.deleteSchedule(this.scheduleToDelete);
      this.closeScheduleConfirmDialog();
      this.getSchedules();

      this.$refs.scheduleSnackbar.dialog = true;
      this.snackbarColor = "success";
      this.snackbarText = "Schedule has been deleted.";
    },

    async deleteClass() {
      await ClassService.deleteClass(this.class_id);
      this.closeClassConfirmDialog();
      this.getClasses();
    },

    // reset classform
    resetClassForm() {
      (this.classClassNo = ""), (this.classCourseId = null);
      this.classProgramId = null;
      this.classUnits = "";
      this.classSectionId = null;
      this.classRoomId = null;
      this.classDay = null;
      this.classTimeStart = null;
      this.classTimeEnd = null;
    },

    // view schedule
    async viewSchedule(data) {
      this.action = "view";
      this.openScheduleDialog = true;
      this.$refs.scheduleForm.programId = data.course.id;
      this.$refs.scheduleForm.sectionId = data.id;
      let response = (await ScheduleService.getSchedules()).data;

      let schedules = await Promise.all(
        response
          .filter(reponse => {
            return reponse.SectionId == data.id;
          })
          .map(async data => {
            let response = (await ClassService.getClass(data.ClassId)).data;
            return {
              id: response.id,
              class_no: response.class_no,
              course_name: response.subject.name,
              section: response.section.name,
              units: response.subject.units,
              day: response.day,
              time: `${response.time_start} - ${response.time_end}`,
              room: response.room.code,
              roomId: response.room.id
            };
          })
      );

      this.$refs.scheduleForm.schedules = schedules;
      console.log(schedules);
    },

    closeSnackBar() {
      this.$refs.snackbar.dialog = false;
    }
  }
};
</script>

<style></style>
