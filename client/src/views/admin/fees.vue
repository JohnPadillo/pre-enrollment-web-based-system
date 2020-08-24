<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :action="action"
          :dialog="addDialog"
          :title="title"
          ref="addDialog"
          @close="closeAddDialog()"
          @save="action === 'add' ? addFee() : openConfirmDialog()"
        >
          <v-form ref="feeForm">
            <v-text-field
              :readonly="action == 'view'"
              label="Name"
              v-model="name"
              type="text"
              :rules="[rules.required]"
              outlined
            ></v-text-field>
            <v-text-field
              :readonly="action == 'view'"
              label="Amount"
              v-model="amount"
              :rules="[rules.required]"
              type="number"
              outlined
            ></v-text-field>
          </v-form>
        </addDialog>
        <v-card>
          <v-card-title
            >Fees
            <v-spacer></v-spacer>
            <addButton @add="openAddDialog()" />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="feeItems"
            :loading="loading"
            loading-text="Loading..."
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.name }}</td>
                <td>
                  PHP {{ props.item.amount ? props.item.amount.toFixed(2) : 0 }}
                </td>
                <td align="center">
                  <viewButton @view="viewFee(props.item)" />
                  <editButton @edit="editFee(props.item)" />
                  <deleteButton @delete="openDeleteDialog(props.item)" />
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="action === 'edit' ? saveFee() : deleteFee()"
        ></confirmationDialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FeeService from "@/services/FeeService";
export default {
  mounted() {
    this.getAllFees();
  },
  data() {
    return {
      action: "",
      loading: false,
      addDialog: false,
      confirmationDialog: false,
      selectedItem: null,
      confirmDialogTitle: "",
      title: "Fee",
      name: "",
      feeItems: [],
      amount: 0,
      headers: [
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Amount",
          value: "amount"
        },
        {
          text: "Action",
          align: "center"
        }
      ],
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    async deleteFee() {
      await FeeService.deleteFee(this.selectedItem.id);
      await this.closeConfirmDialog();
      this.getAllFees();
    },
    async saveFee() {
      if (this.$refs.feeForm.validate()) {
        this.closeConfirmDialog();

        const data = {
          id: this.selectedItem.id,
          name: this.name,
          amount: this.amount
        };

        await FeeService.editFee(data);
        await this.getAllFees();
        this.closeAddDialog();
      }
    },
    async editFee(item) {
      this.selectedItem = item;
      (this.name = item.name), (this.amount = item.amount);
      this.openEditDialog();
    },
    async viewFee(item) {
      (this.name = item.name), (this.amount = item.amount);
      this.openViewDialog();
    },
    async addFee() {
      if (this.$refs.feeForm.validate()) {
        const data = {
          name: this.name,
          amount: this.amount
        };

        await FeeService.addFee(data);
        await this.getAllFees();
        this.closeAddDialog();
      }
    },
    async getAllFees() {
      this.loading = true;
      this.feeItems = (await FeeService.getAllFees()).data;
      this.loading = false;
    },

    openDeleteDialog(item) {
      this.action = "delete";
      this.selectedItem = item;
      this.openConfirmDialog();
    },

    closeConfirmDialog() {
      this.confirmationDialog = false;
    },
    openConfirmDialog() {
      this.action === "edit"
        ? (this.confirmDialogTitle = "update")
        : (this.confirmDialogTitle = "delete");
      if (this.action === "edit") {
        if (this.$refs.feeForm.validate()) {
          this.confirmationDialog = true;
        }
        return;
      } else {
        this.confirmationDialog = true;
      }
    },
    openViewDialog() {
      this.addDialog = true;
      this.action = "view";
    },
    openAddDialog() {
      this.addDialog = true;
      this.action = "add";
    },
    openEditDialog() {
      this.addDialog = true;
      this.action = "edit";
    },
    closeAddDialog() {
      this.$refs.feeForm.reset();
      this.addDialog = false;
      this.action = "";
      this.selectedItem = null;
    }
  }
};
</script>

<style></style>
