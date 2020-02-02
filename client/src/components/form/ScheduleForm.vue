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
                  >
                    {{ props.item.course_name }}
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.course_name"
                        label="Course Description"
                        single-line
                        counter
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </td>
                <td>{{ props.item.section }}</td>
                <td>{{ props.item.units }}</td>
                <td>{{ props.item.day }}</td>
                <td>{{ props.item.time }}</td>
                <td>{{ props.item.room }}</td>
                <td>
                  <removeButton></removeButton>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ProgramService from "@/services/ProgramService";
import SectionService from "@/services/SectionService";
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
      sectionId: ""
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    add() {
      console.log("add");
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
      console.log(this.schedules);
    },
    cancelEdit() {
      console.log("cancel");
    },
    openEdit() {
      console.log("edit");
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

    async programIdSelected() {
      console.log(this.programId);
      await this.getSections();
      console.log(this.sections);
      this.sections = await this.sections.filter(data => {
        return this.programId == data.course.id;
      });
    }
  }
};
</script>

<style></style>
