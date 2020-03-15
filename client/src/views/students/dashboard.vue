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
        <snackbar
          ref="scheduleSnackbar"
          :color="snackbarColor"
          :text="snackbarText"
          @close="closeSnackBar"
        />
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
      studentGrades: [],
      snackbarColor: "",
      snackbarText: ""
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

      // check time if conflict
      let conflicts = await this.formItems.filter(conflict => {
        // data.time_start
        let reqTimeStart = data.time_start.split(":");
        reqTimeStart = reqTimeStart[0] + "" + reqTimeStart[1];
        reqTimeStart = parseInt(reqTimeStart);

        // data.time_end
        let reqTimeEnd = data.time_end.split(":");
        reqTimeEnd = reqTimeEnd[0] + "" + reqTimeEnd[1];
        reqTimeEnd = parseInt(reqTimeEnd);

        // formitems.time_start
        let conflictTimeStart = conflict.time_start.split(":");
        conflictTimeStart = conflictTimeStart[0] + "" + conflictTimeStart[1];
        conflictTimeStart = parseInt(conflictTimeStart);

        // formitems.time_end
        let conflictTimeEnd = conflict.time_end.split(":");
        conflictTimeEnd = conflictTimeEnd[0] + "" + conflictTimeEnd[1];
        conflictTimeEnd = parseInt(conflictTimeEnd);

        return (
          (reqTimeStart >= conflictTimeStart &&
            reqTimeStart < conflictTimeEnd) ||
          (reqTimeEnd > conflictTimeStart && reqTimeEnd <= conflictTimeEnd) ||
          (reqTimeStart < conflictTimeStart && reqTimeEnd > conflictTimeEnd)
        );
      });

      if (conflicts.length > 0) {
        let conflictClass = "";
        for (let i = 0; i < conflicts.length; i++) {
          conflictClass +=
            "" + conflicts[i].class_no + (i < conflicts.length - 1 ? "," : "");
        }

        this.$refs.scheduleSnackbar.dialog = true;
        this.snackbarColor = "error";
        this.snackbarText = `Conflict to Class No: ${conflictClass}`;

        // for (let conflict of conflicts) {
        //   console.log(conflict);
        //   conflictClass += "" + conflict.class_no +
        // }
        // console.log("conflict", conflict);
      } else {
        this.formItems.push(data);

        let classToRemove = this.items.filter(item => {
          return data.subject.code == item.subject.code;
        });

        for (let removeClass of classToRemove) {
          let index = this.items.indexOf(removeClass);
          this.items.splice(index, 1);
        }
      }

      // _____________________________________________________________________
      // this.formItems.push(data);

      // let classToRemove = this.items.filter(item => {
      //   return data.subject.code == item.subject.code;
      // });

      // for (let removeClass of classToRemove) {
      //   let index = this.items.indexOf(removeClass);
      //   this.items.splice(index, 1);
      // }
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

      // filter classForm thru grades
      let studentGrades = this.studentGrades;
      console.log(filterClassForm);

      let studentSubjectWithGrades = await Promise.all(
        studentGrades.filter(data => {
          return data.grade <= 3;
        })
      );

      let classGrade = await Promise.all(
        filterClassForm.filter(obj => {
          return !studentSubjectWithGrades.some(obj2 => {
            return obj.subject.code == obj2.subject.code;
          });
        })
      );

      console.log(studentSubjectWithGrades);
      console.log(classGrade);

      this.items = classGrade;
      // console.log(classesTobeTaken);
      // console.log("form items", this.formItems);
    },

    closeSaveConfirmDialog() {
      this.saveConfirmDialog = false;
    },

    closeSnackBar() {
      this.$refs.snackbar.dialog = false;
    }
  }
};
</script>

<style></style>
