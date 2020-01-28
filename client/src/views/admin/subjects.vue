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
            @save="action === 'edit' ? saveEditSubject() : addSubject()"
          >
            <v-text-field label="Subject Code" :readonly="action === 'edit'" v-model="subject_code" outlined></v-text-field>
            <v-text-field
              label="Subject Name"
              v-model="subject_name"
              outlined
            ></v-text-field>
          </addDialog>
        </toolbarNav>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="deleteSubjectNow"
        ></confirmationDialog>
        <v-data-table class="mt-5" :headers="headers" :items="subjects">
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.code }}</td>
              <td>{{ props.item.name }}</td>
              <td>
                <editButton @edit="editSubject(props.item.id)" />
                <deleteButton @delete="deleteSubject(props.item.id)" />
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SubjectService from "@/services/SubjectService.js"
export default {
  data() {
    return {
      title: "Subjects",
      id: "",
      action: "",
      openAddDialog: false,
      confirmationDialog: false,
      confirmDialogTitle: 'delete',
      subject_name: "",
      subject_code: "",
      subjects: [],
      headers: [
        {
          text: "Subject Code",
          value: "code"
        },
        {
          text: "Subject Name",
          value: "name"
        },
        {
          text: "Actions"
        }
      ]
    };
  },
  mounted(){
    this.getSubjects()
  },
  methods: {
    async getSubjects() {
      this.subjects = (await SubjectService.getSubjects()).data
    },
    add() {
      this.action = "add";
      this.openAddDialog = true;
    },
    closeAddDialog() {
      this.openAddDialog = false;
      this.reset();
    },
    reset() {
      this.subject_code = "";
      this.subject_name = "";
    },
    async addSubject() {
      let data = {
        name: this.subject_name,
        code: this.subject_code
      }

      await SubjectService.addSubject(data)
      this.getSubjects()
      this.openAddDialog = false;
      this.reset();
      
    },
    async editSubject(id) {
      this.action = "edit";
      let subject = (await SubjectService.getSubject(id)).data
      this.id = subject.id
      this.subject_code = subject.code;
      this.subject_name = subject.name;
      this.openAddDialog = true;
    },
    async saveEditSubject() {
      let data = {
        name: this.subject_name,
        id: this.id
      }

      await SubjectService.editSubject(data)

      this.openAddDialog = false;
      this.getSubjects()
      this.reset();
    },

    deleteSubject(id) {
      this.confirmationDialog = !this.confirmationDialog
      this.id = id
    },

    async deleteSubjectNow(){
      await SubjectService.deleteSubject(this.id)
      this.confirmationDialog = !this.confirmationDialog
      this.getSubjects()
    },
    async closeConfirmDialog() {
      this.confirmationDialog = !this.confirmationDialog
    }
  }
};
</script>

<style></style>
