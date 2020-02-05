<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :dialog="addDialog"
          :title="title"
          ref="addDialog"
          @close="closeAddDialog"
          @save="action == 'add' ? addSection() : editSection()"
        >
          <v-form ref="sectionForm">
            <v-select
              label="Program"
              :items="programs"
              item-text="code"
              item-value="id"
              v-model="section_programId"
              outlined
            ></v-select>
            <v-text-field label="Section Name" v-model="section_name" outlined></v-text-field>
            <v-text-field label="Section Code" v-model="section_code" outlined></v-text-field>
            <v-select
              label="Year"
              :items="years"
              item-text="name"
              item-value="id"
              v-model="section_year"
              outlined
            ></v-select>
            <v-select
              label="Semester"
              :items="semesters"
              item-text="name"
              item-value="id"
              v-model="section_semester"
              outlined
            ></v-select>
          </v-form>
        </addDialog>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="deleteSection"
        ></confirmationDialog>
        <v-card>
          <v-card-title>
            Sections
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
          <v-data-table :headers="headers" :items="sections" :search="search" dense>
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.course.code }}</td>
                <td>{{ props.item.code }}</td>
                <td align="center">{{ props.item.year }}</td>
                <td align="center">{{ props.item.semester }}</td>
                <td align="center">
                  <editButton @edit="getEditItem(props.item)" />
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
import SectionService from "@/services/SectionService";
import ProgramService from "@/services/ProgramService";
export default {
  mounted() {
    this.getSections();
  },
  data() {
    return {
      title: "Section",
      search: "",
      headers: [
        {
          text: "Program",
          value: "course.code"
        },
        {
          text: "Section",
          value: "code"
        },
        {
          text: "Year",
          align: "center",
          value: "year"
        },
        {
          text: "Semester",
          align: "center",
          value: "semester"
        },
        {
          text: "Action",
          align: "center"
        }
      ],
      addDialog: false,
      action: "",
      sections: [],
      years: [
        {
          name: "1st",
          id: "1"
        },
        {
          name: "2nd",
          id: "2"
        },
        {
          name: "3rd",
          id: "3"
        },
        {
          name: "4th",
          id: "4"
        }
      ],
      semesters: [
        {
          name: "1st",
          id: "1"
        },
        {
          name: "2nd",
          id: "2"
        }
      ],
      section_id: "",
      section_name: "",
      section_code: "",
      section_programId: "",
      section_year: "",
      section_semester: "",
      programs: [],
      confirmationDialog: false,
      confirmDialogTitle: "delete"
    };
  },
  methods: {
    async getSections() {
      this.sections = (await SectionService.getSections()).data;
      console.log(this.sections);
    },
    async getPrograms() {
      this.programs = (await ProgramService.getPrograms()).data;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
    add() {
      this.action = "add";
      this.addDialog = true;
      this.getPrograms();
    },
    async addSection() {
      let data = {
        name: this.section_name,
        code: this.section_code,
        CourseId: this.section_programId,
        year: this.section_year,
        semester: this.section_semester
      };
      await SectionService.addSection(data);
      this.closeAddDialog();
      this.getSections();
      this.resetSectionForm();
    },
    getEditItem(data) {
      this.getPrograms();
      this.action = "edit";
      this.section_id = data.id;
      this.section_programId = data.course.id;
      this.section_name = data.name;
      this.section_code = data.code;
      this.section_year = data.year;
      this.section_semester = data.semester;
      this.addDialog = true;
    },
    async editSection() {
      let data = {
        id: this.section_id,
        name: this.section_name,
        code: this.section_code,
        CourseId: this.section_programId,
        year: this.section_year,
        semester: this.section_semester
      };

      await SectionService.editSection(data);
      this.closeAddDialog();
      this.getSections();
      this.resetSectionForm();
    },
    resetSectionForm() {
      this.$refs.sectionForm.reset();
    },
    closeConfirmDialog() {
      this.confirmationDialog = false;
    },
    getDeleteItem(id) {
      this.confirmationDialog = true;
      this.section_id = id;
    },
    async deleteSection() {
      await SectionService.deleteSection(this.section_id);
      this.confirmationDialog = false;
      this.getSections();
    }
  }
};
</script>

<style></style>
