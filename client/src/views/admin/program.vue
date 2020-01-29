<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :dialog="openDialog"
          :title="title"
          ref="addDialog"
          @close="closeDialog"
          @save="action === 'add' ? addProgram() : editProgram()"
        >
          <v-text-field label="Course Name" v-model="program_name" outlined></v-text-field>
          <v-text-field v-model="program_code" label="Course Code" outlined></v-text-field>

          <v-select
            v-model="program_department"
            :items="departments"
            label="Department"
            item-text="name"
            item-value="id"
            outlined
          ></v-select>
        </addDialog>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="removeProgram"
        ></confirmationDialog>

        <v-card>
          <v-card-title>
            Programs
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
          <v-data-table :headers="headers" :items="programs" :search="search">
            <template v-slot:item="props">
              <tr>
                <td align="center">{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td align="center">{{ props.item.department }}</td>
                <td align="center">
                  <editButton @edit="edit(props.item.id)" />
                  <deleteButton @delete="remove(props.item.id)" />
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
import DepartmentService from "@/services/DepartmentService";

export default {
  watch: {
    search(val) {
      console.log(val);
    }
  },
  data() {
    return {
      title: "Programs",
      id: null,
      search: "",
      action: "",
      confirmationDialog: false,
      confirmDialogTitle: "delete",
      program_department: "",
      program_name: "",
      program_code: "",
      openDialog: false,
      programs: [],
      departments: [],
      headers: [
        {
          text: "Program Code",
          align: "center",
          value: "code"
        },
        {
          text: "Program Name",
          align: "center",
          value: "name"
        },
        {
          text: "Department",
          align: "center",
          value: "department"
        },
        {
          text: "Action",
          align: "center"
        }
      ]
    };
  },
  mounted() {
    this.getPrograms();
    this.getDepartments();
  },
  methods: {
    async getPrograms() {
      this.programs = (await ProgramService.getPrograms()).data;
    },
    async getDepartments() {
      this.departments = (await DepartmentService.getDepartments()).data;
    },
    add() {
      this.action = "add";
      this.openDialog = !this.openDialog;
    },
    closeDialog() {
      this.openDialog = !this.openDialog;
      this.reset();
    },
    reset() {
      this.program_code = "";
      this.program_name = "";
      this.program_department = "";
    },
    async addProgram() {
      let data = {
        code: this.program_code,
        name: this.program_name,
        department: this.program_department
      };

      let response = await ProgramService.addProgram(data);
      console.log(response);
      this.openDialog = !this.openDialog;
      this.reset();
      this.getPrograms();
    },
    async edit(id) {
      this.action = "edit";
      this.id = id;
      let course = (await ProgramService.getProgram(id)).data;
      this.program_name = course.name;
      this.program_code = course.code;
      this.program_department = course.department.id;
      this.openDialog = !this.openDialog;
    },
    async editProgram() {
      let data = {
        id: this.id,
        name: this.program_name,
        code: this.program_code,
        department: this.program_department
      };
      await ProgramService.editProgram(data);
      this.openDialog = !this.openDialog;
      this.reset();
      this.getPrograms();
    },
    remove(id) {
      this.confirmationDialog = !this.confirmationDialog;
      this.id = id;
    },
    async removeProgram() {
      await ProgramService.deleteProgram(this.id);
      this.confirmationDialog = !this.confirmationDialog;
      this.getPrograms();
    },
    async closeConfirmDialog() {
      this.confirmationDialog = !this.confirmationDialog;
    }
  }
};
</script>

<style></style>