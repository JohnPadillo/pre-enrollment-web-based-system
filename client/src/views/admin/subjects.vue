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
            @save="addSubject"
          >
            <v-text-field label="Subject Code" v-model="subject_code" outlined></v-text-field>
            <v-text-field label="Subject Name" v-model="subject_name" outlined></v-text-field>
            <!-- <v-select
              v-model="course_department"
              :items="departments"
              label="Department"
              item-text="name"
              item-value="name"
              outlined
            ></v-select>-->
          </addDialog>
        </toolbarNav>

        <v-data-table class="mt-5" :headers="headers" :items="subjects">
          <template v-slot:item="props">
            <td>{{ props.item.code }}</td>
            <td>{{ props.item.name }}</td>
            <td>
              <editButton />
              <deleteButton />
            </td>
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
      openAddDialog: false,
      subject_name: "",
      subject_code: "",
      subjects: [
        {
          name: "General Science 1",
          code: "GenSci1"
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
      this.openAddDialog = true;
    },
    closeAddDialog() {
      this.openAddDialog = false;
    },
    addSubject() {
      let data = {
        name: this.subject_name,
        code: this.subject_code
      };

      this.subjects.push(data);
      this.openAddDialog = false;
    }
  }
};
</script>

<style></style>
