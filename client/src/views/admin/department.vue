<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <toolbarNav :title="title">
          <addButton :title="title" @add="add" />

          <addDialog
            :dialog="openAddDialog"
            :title="title"
            ref="addDialog"
            @close="closeAddDialog"
            @save="addDepartment"
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
        <v-data-table class="mt-5" :headers="headers" :items="departments">
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>
                <editButton />
                <deleteButton />
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
      title: "Department",
      department_name: "",
      openAddDialog: false,
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
      console.log(this.departments);
    },
    add() {
      this.openAddDialog = !this.openAddDialog;
    },
    closeAddDialog() {
      this.openAddDialog = !this.openAddDialog;
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
      this.openAddDialog = !this.openAddDialog;
      this.reset();
      this.getDepartments();
    },
    edit(data) {
      console.log(data);
    }
  }
};
</script>

<style></style>
