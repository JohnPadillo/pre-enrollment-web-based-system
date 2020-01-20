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
            <v-text-field label="Subject Code" v-model="subject_code" outlined></v-text-field>
            <v-text-field
              :readonly="action === 'edit'"
              label="Subject Name"
              v-model="subject_name"
              outlined
            ></v-text-field>
          </addDialog>
        </toolbarNav>

        <v-data-table class="mt-5" :headers="headers" :items="subjects">
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.code }}</td>
              <td>{{ props.item.name }}</td>
              <td>
                <editButton @edit="editSubject(props.item)" />
                <deleteButton @delete="deleteSubject(props.item)" />
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "Subjects",
      action: "",
      openAddDialog: false,
      subject_name: "",
      subject_code: "",
      subjects: [
        {
          name: "General Science 1",
          code: "GenSci1"
        },
        {
          name: "Math 1",
          code: "Math1"
        }
      ],
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
  methods: {
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
    addSubject() {
      let data = {
        name: this.subject_name,
        code: this.subject_code
      };
      this.subjects.push(data);
      this.openAddDialog = false;
      this.reset();
    },
    editSubject(data) {
      this.action = "edit";
      let subject = this.subjects.find(subject => {
        return subject.name === data.name;
      });

      this.subject_code = subject.code;
      this.subject_name = subject.name;
      this.openAddDialog = true;
      console.log(this.action);
    },
    saveEditSubject() {
      let subject = this.subjects.find(subject => {
        return subject.name === this.subject_name;
      });

      subject.code = this.subject_code;
      this.openAddDialog = false;
      this.reset();
    },

    deleteSubject(data) {
      let index = this.subjects.findIndex(subject => {
        return subject.name === data.name;
      });

      this.subjects.splice(index, 1);
    }
  }
};
</script>

<style></style>
