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
          @save="action == 'edit' ? saveEditDepartment() : addDepartment()"
        >
          <v-text-field label="Department Name" v-model="department_name" outlined></v-text-field>
        </addDialog>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="deleteDepartment"
        ></confirmationDialog>

        <v-card>
          <v-card-title>
            Departments
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
            :items="departments"
            :search="search"
            dense
            :loading="departmentLoading"
            loading-text="Loading..."
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.name }}</td>
                <td align="center">
                  <viewButton @view="viewDepartment(props.item.id)" />
                  <editButton @edit="getEditDepartment(props.item.id)" />
                  <deleteButton @delete="getDeleteDepartment(props.item.id)" />
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
import DepartmentService from "@/services/DepartmentService";
export default {
  data() {
    return {
      id: null,
      search: "",
      confirmDialogTitle: "",
      departmentLoading: false,
      action: "",
      title: "Department",
      department_name: "",
      openDialog: false,
      confirmationDialog: false,
      departments: [],
      headers: [
        {
          text: "Department Name",
          value: "name",
          align: "left"
        },
        {
          text: "Action",
          align: "center"
        }
      ]
    };
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      this.departmentLoading = true;
      this.departments = (await DepartmentService.getDepartments()).data;
      this.departmentLoading = false;
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
      this.department_name = "";
    },
    async addDepartment() {
      let data = {
        name: this.department_name
      };

      let response = await DepartmentService.addDepartment(data);
      console.log(response);
      this.closeDialog();
      this.reset();
      this.getDepartments();
    },
    async getEditDepartment(id) {
      this.action = "edit";
      this.openDialog = !this.openDialog;
      let response = (await DepartmentService.getDepartment(id)).data;
      this.department_name = response.name;
      this.id = id;
    },

    async saveEditDepartment() {
      try {
        let data = {
          id: this.id,
          name: this.department_name
        };
        let response = await DepartmentService.editDepartment(data);
        console.log(response);
        this.closeDialog();
        this.reset();
        this.getDepartments();
      } catch (error) {
        console.log(error);
      }
    },
    closeConfirmDialog() {
      this.confirmationDialog = !this.confirmationDialog;
    },
    async getDeleteDepartment(id) {
      this.confirmationDialog = !this.confirmationDialog;
      this.confirmDialogTitle = "delete";
      this.id = id;
    },

    async deleteDepartment() {
      try {
        await DepartmentService.deleteDepartment(this.id);
        this.confirmationDialog = !this.confirmationDialog;
        this.getDepartments();
      } catch (error) {
        console.log(error);
      }
    },

    async viewDepartment(id) {
      this.action = "view";
      this.openDialog = true;
      let response = (await DepartmentService.getDepartment(id)).data;

      this.department_name = response.name;
    }
  }
};
</script>

<style></style>
