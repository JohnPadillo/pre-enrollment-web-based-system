<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="headline">Schedule</span>
          <v-spacer></v-spacer>
          <!-- <addButton v-if="action != 'view'" :title="title" @add="add" /> -->
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <v-select
                v-model="programId"
                :items="programs"
                label="Program"
                item-text="code"
                item-value="id"
                :readonly="this.action == 'view'"
                @input="programIdSelected"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-select
                v-model="sectionId"
                :items="sections"
                label="Section"
                item-text="code"
                item-value="id"
                :readonly="this.action == 'view'"
                :disabled="!this.programId"
                @input="sectionIdSelected"
              ></v-select>
            </v-col>
          </v-row>
          <v-data-table
            :headers="action != 'view' ? headers : headers2"
            :items="schedules"
            disable-filtering
            disable-sort
            hide-default-footer
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.class_no }}</td>
                <td>{{ props.item.course_name }}</td>
                <td>{{ props.item.section }}</td>
                <td>{{ props.item.units }}</td>
                <td>{{ props.item.day }}</td>
                <td>{{ props.item.time }}</td>
                <td>{{ props.item.room }}</td>
                <td v-if="action != 'view'">
                  <removeButton @delete="removeClass(props.item)"></removeButton>
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
          </v-snackbar>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn v-if="action != 'view'" color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ProgramService from "@/services/ProgramService";
import SectionService from "@/services/SectionService";
import CurriculumService from "@/services/CurriculumService";
import ClassService from "@/services/ClassService";

export default {
  props: {
    dialog: Boolean,
    action: String
  },
  watch: {
    programId: function() {
      this.programIdSelected();
    }
  },
  mounted() {
    this.getPrograms();
    this.getSections();
  },
  data() {
    return {
      title: "Add",
      headers: [
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
      headers2: [
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
        }
      ],
      schedules: [],
      programs: [],
      programId: "",
      sections: [],
      sectionId: "",
      courses: [],
      course_name: "",
      classes: [],
      snack: false,
      snackText: "",
      snackColor: ""
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    },
    add() {
      // this.getClasses();
      let data = {
        id: null,
        class_no: "",
        course_name: "",
        section: "",
        units: "",
        day: "",
        time: "",
        room: "",
        roomId: ""
      };
      this.schedules.push(data);
    },
    saveEdit() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancelEdit() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    openEdit() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    closeEdit() {
      // console.log("Dialog closed");
    },

    // get all programs
    async getPrograms() {
      this.programs = (await ProgramService.getPrograms()).data;
    },

    // get all sections
    async getSections() {
      this.sections = (await SectionService.getSections()).data;
    },

    // get classes
    async getClasses() {
      this.classes = (await ClassService.getClasses()).data;
    },

    // get all courses according to its program
    async getCourses() {
      let data = (await CurriculumService.getCurriculums()).data;
      this.courses = data
        .filter(data => {
          return this.programId == data.CourseId;
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

    async programIdSelected() {
      await this.getSections();
      this.sections = await this.sections.filter(data => {
        return this.programId == data.course.id;
      });
      await this.getCourses();
    },

    async removeClass(item) {
      const index = this.schedules.indexOf(item);
      this.schedules.splice(index, 1);
    },

    setCourse(data) {
      console.log(data.course_name);
      let index = this.schedules.indexOf(data);
      console.log("index", index);
      this.schedules[index].course_name = data.course_name;
    },

    setClass(data) {
      let response = this.classes.filter(response => {
        return response.class_no == data.class_no;
      });

      let index = this.schedules.indexOf(data);

      this.schedules[index].id = response[0].id;
      this.schedules[index].course_name = response[0].subject.name;
      this.schedules[index].section = response[0].section.code;
      this.schedules[index].units = response[0].subject.units;
      this.schedules[index].day = response[0].day;
      this.schedules[
        index
      ].time = `${response[0].time_start} - ${response[0].time_end}`;
      this.schedules[index].room = response[0].room.name;
      this.schedules[index].roomId = response[0].room.id;
    },

    async sectionIdSelected() {
      this.schedules = await [];
      await this.getClasses();
      this.classes = await this.classes.filter(data => {
        return data.section.id == this.sectionId;
      });

      let classesLength = await this.classes.length;
      let scheduleArray = [];
      for (let i = 0; i < classesLength; i++) {
        scheduleArray.push(this.classes[i]);
      }

      scheduleArray = await scheduleArray.map(data => {
        return {
          id: data.id,
          class_no: data.class_no,
          course_name: data.subject.name,
          section: data.section.name,
          units: data.subject.units,
          day: data.day,
          time: `${data.time_start} - ${data.time_end}`,
          room: data.room.name,
          roomId: data.room.id
        };
      });

      this.schedules = await scheduleArray;
      console.log(scheduleArray);
    }

    // saveEditCourse(data) {
    //   let index = this.schedules.indexOf(data);
    //   this.schedules[index].course_name = data.course_name;
    // }
  }
};
</script>

<style></style>
