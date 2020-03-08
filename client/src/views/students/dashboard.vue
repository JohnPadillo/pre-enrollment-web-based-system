<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <preEnrollmentForm
          ref="preForm"
          :action="action"
          :name="name"
          :course="course"
          :headers="headers"
          :items="formItems"
          @add="add"
          @edit="edit"
          @delete="deleteItem"
          @saveEdit="saveEdit"
        ></preEnrollmentForm>
        <confirmationDialog
          :dialog="saveConfirmDialog"
          :title="saveConfirmDialogTitle"
          @no="closeSaveConfirmDialog"
          @yes="saveEditSchedule"
        ></confirmationDialog>
        <v-container>
          <v-layout>
            <v-flex>
              <v-card v-if="action == 'edit'">
                <v-card-title text-md-center>Available Classes</v-card-title>
                <v-data-table :headers="headers" :items="items">
                  <template v-slot:item="props">
                    <tr>
                      <td>{{ props.item.class_no }}</td>
                      <td>{{ props.item.subject.name }}</td>
                      <td>{{ props.item.section.name }}</td>
                      <td>{{ props.item.subject.units }}</td>
                      <td>{{ props.item.day }}</td>
                      <td>{{ props.item.time_start + " " + props.item.time_end }}</td>
                      <td>{{ props.item.room.name }}</td>
                      <td>
                        <addButton @add="addClass(props.item)" />
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassService from "@/services/ClassService";
import StudentScheduleService from "@/services/StudentScheduleService";
import StudentChecklistService from "@/services/CurriculumService";
import StudentGradeService from "@/services/GradeService";
export default {
  mounted() {
    this.getStudentGrades();
    this.getSchedules();
    this.getStudentCurriculum();
  },
  data() {
    return {
      name:
        this.$store.state.user.first_name +
        " " +
        this.$store.state.user.last_name,
      course: this.$store.state.user.course.code,
      action: "",
      headers: [
        {
          text: "Class No."
        },
        {
          text: "Course Description"
        },
        {
          text: "Section"
        },
        {
          text: "Units"
        },
        {
          text: "Day"
        },
        {
          text: "Time"
        },
        {
          text: "Room"
        },
        {
          text: "Action"
        }
      ],
      items: [],
      formItems: [],
      itemsToSave: [],
      saveConfirmDialog: false,
      saveConfirmDialogTitle: "save",
      studentChecklist: [],
      studentGrades: []
    };
  },
  methods: {
    async getStudentCurriculum() {
      this.studentChecklist = (
        await StudentChecklistService.getCurriculum(
          this.$store.state.user.course.id
        )
      ).data;
    },
    async getStudentGrades() {
      this.studentGrades = (
        await StudentGradeService.getGrades(this.$store.state.user.id)
      ).data;
    },
    async saveEditSchedule() {
      await StudentScheduleService.editSchedule(this.itemsToSave);
      this.getSchedules();
      this.closeSaveConfirmDialog();
      this.action = "";
    },
    async saveEdit() {
      let itemsToSave = [];

      for (let item of this.$refs.preForm.items) {
        let data = {
          UserId: this.$store.state.user.id,
          ClassId: item.id
        };
        itemsToSave.push(data);
      }

      this.itemsToSave = itemsToSave;

      this.saveConfirmDialog = true;
    },
    async getSchedules() {
      let response = (
        await StudentScheduleService.getSchedule(this.$store.state.user.id)
      ).data;

      let data = await Promise.all(
        response.map(async item => {
          return (await ClassService.getClass(item.class.id)).data;
        })
      );
      this.formItems = data;
      this.getClasses();
    },
    async addClass(data) {
      // const index = this.items.indexOf(data);
      // this.items.splice(index, 1);
      // this.formItems.push(data);
      this.formItems.push(data);

      let classToRemove = this.items.filter(item => {
        return data.subject.code == item.subject.code;
      });

      for (let removeClass of classToRemove) {
        let index = this.items.indexOf(removeClass);
        this.items.splice(index, 1);
      }
    },
    edit() {
      this.action = "edit";
    },
    add() {
      this.action = "edit";
    },

    deleteItem(data) {
      const index = this.formItems.indexOf(data);
      this.formItems.splice(index, 1);
      // this.items.push(data);
      this.getClasses();
    },
    async getClasses() {
      let response = (await ClassService.getClasses()).data;

      // let data = await Promise.all(
      //   response.filter(data => {
      //     return (
      //       data.course.id == this.$store.state.user.course.id &&
      //       data.section.id == this.$store.state.user.section.id
      //     );
      //   })
      // );

      // let formItems = await this.formItems;
      // let items = await Promise.all(
      //   data.filter(function(obj) {
      //     return !formItems.some(function(obj2) {
      //       return obj.class_no == obj2.class_no;
      //     });
      //   })
      // );

      // this.items = await items;
      // console.log("student grades", this.studentGrades);
      // console.log(`Class: ${response.length}`, response);
      // console.log("form items", this.formItems);

      // filter grades from class
      // let studentGrades = await this.studentGrades;
      // let classesTobeTaken = await Promise.all(
      //   response.filter(function(obj) {
      //     return !studentGrades.some(function(obj2) {
      //       return obj.subject.code == obj2.subject.code;
      //     });
      //   })
      // );
      console.log("classes", response);
      console.log("checklist", this.studentChecklist);
      // this.items = classesTobeTaken;

      // filter classes by checklist
      let classesTobeTaken = await Promise.all(
        response.filter(data => {
          return this.studentChecklist.some(checklist => {
            return data.subject.code == checklist.subject.code;
          });
        })
      );

      // filter classesTobeTaken from form items
      let formItems = await this.formItems;
      let filterClassForm = await Promise.all(
        classesTobeTaken.filter(classes => {
          return !formItems.some(formItem => {
            return classes.subject.code == formItem.subject.code;
          });
        })
      );

      this.items = filterClassForm;
      // console.log(classesTobeTaken);
      // console.log("form items", this.formItems);
    },

    closeSaveConfirmDialog() {
      this.saveConfirmDialog = false;
    }
  }
};
</script>

<style></style>
