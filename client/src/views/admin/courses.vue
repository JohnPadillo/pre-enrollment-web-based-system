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
            @save="addCourse"
          >
            <v-text-field
              label="Course Name"
              v-model="course_name"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="course_code"
              label="Course Code"
              outlined
            ></v-text-field>

            <v-select
              v-model="course_department"
              :items="departments"
              label="Department"
              item-text="name"
              item-value="name"
              outlined
            ></v-select>
          </addDialog>
        </toolbarNav>
        <v-data-table class="mt-5" :headers="headers" :items="courses">
          <!-- <template v-slot:header="headers">
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="[header.align === align]"
            >
              {{ header.text }}
            </th>
          </template> -->
          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.code }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.department }}</td>

              <td>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="pink"
                  @click="edit(props.item.code)"
                >
                  <v-icon dark>add_circle_outline</v-icon>
                </v-btn>
                <addButton />
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
import ToolbarNav from "@/components/Toolbar.vue";
export default {
  components: {
    ToolbarNav
  },
  methods: {
    add() {
      this.openAddDialog = !this.openAddDialog;
      console.log(this.openAddDialog);
    },
    closeAddDialog() {
      this.openAddDialog = !this.openAddDialog;
      this.reset();
    },
    reset() {
      this.course_code = "";
      this.course_name = "";
      this.course_department = "";
    },
    addCourse() {
      let data = {
        code: this.course_code,
        name: this.course_name,
        department: this.course_department
      };
      this.courses.push(data);
      this.openAddDialog = !this.openAddDialog;
      this.reset();
    },
    edit(data) {
      console.log(data);
    }
  },
  data() {
    return {
      title: "Courses",
      course_department: "",
      course_name: "",
      course_code: "",
      openAddDialog: false,
      courses: [
        {
          code: "BSCS",
          name: "Bachelor of Science in Computer Science",
          department: "IT Dept"
        },
        {
          code: "BSIT",
          name: "Bachelor of Science in Information Technology",
          department: "IT Dept."
        },
        {
          code: "BSIS",
          name: "Bachelor of Science in Information Science",
          department: "IT Dept"
        },
        {
          code: "BSEE",
          name: "Bachelor of Secondary Education",
          department: "Education Dept."
        },
        {
          code: "BSIS",
          name: "Bachelor of Science in Information Science",
          department: "IT Dept"
        },
        {
          code: "BSEE",
          name: "Bachelor of Secondary Education",
          department: "Education Dept."
        }
      ],
      headers: [
        {
          text: "Course Code",
          value: "code",
          align: "center"
        },
        {
          text: "Course Name",
          value: "name",
          align: "center"
        },
        {
          text: "Department",
          value: "department",
          align: "center"
        },
        {
          text: "Action",
          align: "center"
        }
      ],
      departments: [
        {
          name: "IT Department"
        },
        {
          name: "Education Department"
        }
      ]
    };
  }
};
</script>

<style></style>
