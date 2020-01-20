<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <toolbarNav :title="title">
          <addButton :title="title" @add="add" />
        </toolbarNav>

        <addDialog :dialog="openAddDialog" :title="title" ref="addDialog" @close="closeAddDialog">
          <v-text-field label="Stundent Name" v-model="student_name" outlined></v-text-field>
          <v-select
            v-model="student_course"
            :items="courses"
            label="Course"
            item-text="code"
            item-value="code"
            outlined
          ></v-select>
        </addDialog>

        <v-data-table class="mt-5" :headers="headers" :items="students">
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.course }}</td>
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
export default {
  data() {
    return {
      title: "Students",
      openAddDialog: false,
      student_name: "",
      student_course: "",
      students: [
        {
          name: "Katrina Castillo",
          course: "BSIT"
        },
        {
          name: "Vice Ganda",
          course: "POLSCI"
        },
        {
          name: "Marian Rivera",
          course: "BSc Psychology"
        }
      ],
      headers: [
        { text: "Student Name", value: "name" },
        { text: "Student Course", value: "course" },
        { text: "Actions" }
      ],
      courses: [
        {
          code: "BSIT"
        },
        {
          code: "POLSCI"
        },
        {
          code: "BSc Psychology"
        },
        {
          code: "BSED"
        },
        {
          code: "BSCS"
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
    }
  }
};
</script>

<style></style>
