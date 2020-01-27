<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <toolbarNav :title="title">
          <addButton :title="title" @add="add" />

          <addDialog
            :dialog="openDialog"
            :title="title"
            ref="addDialog"
            @close="closeDialog"
            @save="action === 'edit' ? saveEditDepartment() : addDepartment()"
          >
            <v-text-field label="Department Name" v-model="department_name" outlined></v-text-field>

            <!-- <v-select
              v-model="course_department"
              :items="departments"
              label="Department"
              item-text="name"
              item-value="id"
              outlined
            ></v-select>-->
          </addDialog>
        </toolbarNav>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="deleteDepartment"
        ></confirmationDialog>
        <v-data-table class="mt-5" :headers="headers" :items="departments">
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>
                <editButton @edit="getEditDepartment(props.item.id)" />
                <deleteButton @delete="getDeleteDepartment(props.item.id)" />
              </td>
            </tr>
          </template>
        </v-data-table>
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
      confirmDialogTitle: "",
      action: "",
      title: "Department",
      department_name: "",
      openDialog: false,
      confirmationDialog: false,
      // courses: [],
      departments: [],
      headers: [
        {
          text: "Department Name",
          value: "name",
          align: "center"
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
    }
  }
};
</script>

<style></style>
