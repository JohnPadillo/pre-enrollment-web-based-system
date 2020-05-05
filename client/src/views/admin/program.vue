<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :dialog="openDialog"
          :title="title"
          :action="action"
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
          <v-file-input
            v-if="action === 'edit'"
            type="file"
            accept="image/*"
            label="Upload Image"
            outlined
            @change="onFileInput"
          ></v-file-input>
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
          <v-data-table
            :headers="headers"
            :items="programs"
            :search="search"
            dense
            :loading="programLoading"
            loading-text="Loading..."
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.department.name }}</td>
                <td align="center">
                  <viewButton @view="viewProgram(props.item.id)" />
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
      image: "",
      id: null,
      search: "",
      action: "",
      confirmationDialog: false,
      programLoading: false,
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
      this.programLoading = true;
      this.programs = (await ProgramService.getPrograms()).data;
      this.programLoading = false;
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
        department: this.program_department,
        courseImagePath: this.image.path,
        courseImage: this.image
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
      this.courseImage = course.courseImage;
      this.openDialog = !this.openDialog;
    },
    async editProgram() {
      let data = {
        id: this.id,
        name: this.program_name,
        code: this.program_code,
        department: this.program_department,
        courseImage: this.image
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
    },

    async viewProgram(id) {
      this.action = "view";
      this.id = id;
      let course = (await ProgramService.getProgram(id)).data;
      this.program_name = course.name;
      this.program_code = course.code;
      this.program_department = course.department.id;
      this.openDialog = true;
    },

    onFileInput(event) {
      this.image = event;
    }
  }
};
</script>

<style></style>
