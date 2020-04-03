<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :dialog="addDialog"
          :title="title"
          ref="addAdmin"
          :action="action"
          @close="closeAddDialog"
          @save="action == 'edit' ? saveEditAdmin() : addAdmin()"
        >
          <v-form ref="registerForm">
            <v-text-field
              label="First Name"
              v-model="firstName"
              :readonly="action == 'view'"
              outlined
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Middle Name"
              v-model="middleName"
              outlined
              :readonly="action == 'view'"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              :readonly="action == 'view'"
              v-model="lastName"
              outlined
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Permanent Address"
              v-model="permanentAddress"
              outlined
              :rules="[rules.required]"
              :readonly="action == 'view'"
            ></v-text-field>
            <v-text-field
              label="Contact No."
              v-model="contact_no"
              type="number"
              outlined
              counter="11"
              maxlength="11"
              :rules="[rules.number, rules.required]"
              :readonly="action == 'view'"
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="email"
              outlined
              :rules="[rules.required, rules.email]"
              :readonly="action == 'view'"
            ></v-text-field>
            <v-text-field
              v-if="action != 'view'"
              label="Password"
              v-model="password"
              outlined
              type="password"
              :rules="[rules.required]"
              :readonly="action == 'view'"
            ></v-text-field>

            <v-select
              v-model="selected_department"
              :items="departments"
              label="Department"
              item-text="name"
              item-value="id"
              outlined
              :rules="[rules.required]"
              :readonly="action == 'view'"
            ></v-select>

            <v-select
              v-model="selected_role"
              :items="roles"
              label="Role"
              item-text="name"
              item-value="id"
              outlined
              :rules="[rules.required]"
              :readonly="action == 'view'"
            ></v-select>
          </v-form>
        </addDialog>

        <v-layout>
          <v-spacer></v-spacer>
          <v-col class="d-flex" cols="12" sm="3">
            <v-select
              :items="roles"
              v-model="roleId"
              label="Roles"
              item-text="name"
              item-value="id"
              outlined
              clearable
              @click:clear="resetRoleFilter"
              @input="filterRole()"
            ></v-select>
          </v-col>
        </v-layout>

        <v-card>
          <v-card-title>
            Roles
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <addButton :title="title" @add="openAddDialog" />
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="admins"
            :search="search"
            dense
            :loading="programLoading"
            loading-text="Loading..."
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.department.name }}</td>
                <td>{{ props.item.status == 2 ? "Program Head" : "Registrar" }}</td>
                <td align="center">
                  <viewButton @view="viewAdmin(props.item.id)" />
                  <editButton @edit="editAdmin(props.item.id)" />
                  <deleteButton @delete="deleteAdmin(props.item.id)" />
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <snackbar
          ref="adminSnackbar"
          :color="snackbarColor"
          :text="snackbarText"
          @close="closeSnackBar()"
        />
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog()"
          @yes="saveDeleteAdmin()"
        ></confirmationDialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DepartmentService from "@/services/DepartmentService";
import AdminService from "@/services/AdminService";
export default {
  mounted() {
    this.getAdmins();
    this.getDepartments();
  },
  data() {
    return {
      id: null,
      action: null,
      title: "",
      roleId: null,
      defaultData: [],
      roles: [
        {
          name: "Program Head",
          id: 2
        },
        {
          name: "Registrar",
          id: 3
        }
      ],
      headers: [
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Department",
          value: "department.name"
        },
        {
          text: "Position"
        },
        {
          text: "Actions",
          align: "center"
        }
      ],
      admins: [],
      departments: [],
      search: null,
      addDialog: false,
      programLoading: false,
      firstName: null,
      middleName: null,
      lastName: null,
      permanentAddress: null,
      contact_no: null,
      email: null,
      password: null,
      selected_department: null,
      selected_role: null,
      snackbarColor: "",
      snackbarText: "",
      confirmationDialog: false,
      confirmDialogTitle: "",

      rules: {
        required: value => !!value || "Required.",
        email: v => /.+@.+\..+/.test(v) || "Email must be valid",
        number: v => (v ? v.length <= 11 : "" || "Maximum of 11 Digits")
      }
    };
  },

  methods: {
    async getAdmins() {
      let response = (await AdminService.getAdmins()).data;
      this.admins = await response
        .map(response => {
          return {
            id: response.id,
            name: response.first_name + " " + response.last_name,
            email: response.email,
            password: response.password,
            permanent_address: response.permanent_address,
            contact_no: response.contact_no,
            department: {
              id: response.department.id,
              name: response.department.name
            },
            status: response.status
          };
        })
        .filter(data => {
          return data.status != 1;
        });
      this.defaultData = this.admins;
    },
    async getDepartments() {
      this.departments = (await DepartmentService.getDepartments()).data;
    },
    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
      this.$refs.registerForm.reset();
    },

    async resetRoleFilter() {
      this.admins = await this.defaultData;
    },

    addAdmin() {
      this.action = "add";
      if (this.$refs.registerForm.validate()) {
        this.saveAddAdmin();
      }
    },

    async saveAddAdmin() {
      let data = {
        first_name: this.firstName,
        middle_name: this.middleName,
        last_name: this.lastName,
        email: this.email,
        permanent_address: this.permanentAddress,
        password: this.password,
        contact_no: this.contact_no,
        departmentId: this.selected_department,
        role: this.selected_role
      };

      let response = (await AdminService.getAdmins()).data;

      let error = response.filter(response => {
        return response.email == data.email;
      });

      if (error.length > 0) {
        this.$refs.adminSnackbar.dialog = true;
        this.snackbarText = "Email already exist!";
        this.snackbarColor = "error";
      } else {
        await AdminService.addAdmin(data);
        this.getAdmins();
        this.closeAddDialog();
      }
    },

    closeSnackbar() {
      this.$refs.adminSnackbar.dialog = false;
    },

    async viewAdmin(id) {
      this.action = "view";
      this.openAddDialog();

      let data = (await AdminService.getAdmin(id)).data;
      (this.firstName = data.first_name),
        (this.middleName = data.middle_name),
        (this.lastName = data.last_name),
        (this.email = data.email),
        (this.permanentAddress = data.permanent_address),
        (this.contact_no = data.contact_no),
        (this.selected_department = data.department.id),
        (this.selected_role = data.status);
    },

    async editAdmin(id) {
      this.action = "edit";
      let data = (await AdminService.getAdmin(id)).data;
      (this.id = id),
        (this.firstName = data.first_name),
        (this.middleName = data.middle_name),
        (this.lastName = data.last_name),
        (this.email = data.email),
        (this.permanentAddress = data.permanent_address),
        (this.password = data.password),
        (this.contact_no = data.contact_no),
        (this.selected_department = data.department.id),
        (this.selected_role = data.status);

      this.addDialog = true;
    },

    async saveEditAdmin() {
      let data = {
        id: this.id,
        first_name: this.firstName,
        middle_name: this.middleName,
        last_name: this.lastName,
        email: this.email,
        permanent_address: this.permanentAddress,
        password: this.password,
        contact_no: this.contact_no,
        departmentId: this.selected_department,
        role: this.selected_role
      };

      await AdminService.updateAdmin(data);
      this.getAdmins();
      this.closeAddDialog();
    },

    deleteAdmin(id) {
      this.action = "delete";
      this.id = id;
      this.openConfirmationDialog();
    },
    async saveDeleteAdmin() {
      this.closeConfirmDialog();
      await AdminService.deleteAdmin(this.id);
      this.getAdmins();
    },

    openConfirmationDialog() {
      this.confirmDialogTitle = "delete";
      this.confirmationDialog = true;
    },
    closeConfirmDialog() {
      this.confirmationDialog = false;
    },

    async filterRole() {
      this.admins = this.defaultData.filter(admin => {
        return admin.status === this.roleId;
      });
    }
  }
};
</script>

<style></style>
