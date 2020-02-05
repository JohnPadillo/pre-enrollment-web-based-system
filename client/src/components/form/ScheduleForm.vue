<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="headline">Schedule</span>
          <v-spacer></v-spacer>
          <addButton :title="title" @add="add" />
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
              ></v-select>
            </v-col>
          </v-row>
          <v-data-table :headers="headers" :items="schedules" hide-default-footer>
            <template v-slot:item="props">
              <tr>
                <td>
                  <v-edit-dialog
                    :return-value.sync="props.item.class_no"
                    @save="saveEdit"
                    @cancel="cancelEdit"
                    @open="openEdit"
                    @close="closeEdit"
                  >
                    {{
                    props.item.class_no ? props.item.class_no : "------------"
                    }}
                    <template
                      v-slot:input
                    >
                      <v-text-field v-model="props.item.class_no" label="Class No" single-line></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>
                  <v-edit-dialog
                    :return-value.sync="props.item.course_name"
                    @save="saveEdit"
                    @cancel="cancelEdit"
                    @open="openEdit"
                    @close="closeEdit"
                    large
                  >
                    {{ props.item.course_name }}
                    <template v-slot:input>
                      <v-select
                        :items="courses"
                        v-model="props.item.course_name"
                        label="Course Description"
                        item-text="code"
                        item-value="code"
                      ></v-select>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>{{ props.item.section ? props.item.section : sectionId }}</td>
                <td>{{ props.item.units }}</td>
                <td>{{ props.item.day }}</td>
                <td>{{ props.item.time }}</td>
                <td>{{ props.item.room }}</td>
                <td>
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
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ProgramService from "@/services/ProgramService";
import SectionService from "@/services/SectionService";
import CurriculumService from "@/services/CurriculumService";

export default {
  props: {
    dialog: Boolean
  },
  mounted() {
    this.getPrograms();
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
      schedules: [],
      programs: [],
      programId: "",
      sections: [],
      sectionId: "",
      courses: [],
      course_name: "",
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
      let data = {
        class_no: "",
        course_name: "",
        section: "",
        units: "",
        day: "",
        time: "",
        room: ""
      };

      this.schedules.push(data);
    },
    saveEdit() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
      console.log(this.schedules);
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
      console.log("Dialog closed");
    },

    // get all programs
    async getPrograms() {
      this.programs = (await ProgramService.getPrograms()).data;
    },

    // get all sections
    async getSections() {
      this.sections = (await SectionService.getSections()).data;
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
    }

    // saveEditCourse(data) {
    //   let index = this.schedules.indexOf(data);
    //   this.schedules[index].course_name = data.course_name;
    // }
  }
};
</script>

<style></style>