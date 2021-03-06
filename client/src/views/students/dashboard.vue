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
          :status="enrollmentStatus"
          :user="user"
          @add="add"
          @edit="edit"
          @delete="deleteItem"
          @saveEdit="saveEdit"
        ></preEnrollmentForm>
        <tuitionFee v-if="enrollmentStatus" :items="fees" />
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
        <v-container v-if="this.$store.state.user.type === 'irregular'">
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
                      <td>
                        {{ props.item.time_start + " " + props.item.time_end }}
                      </td>
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
import CourseSectionScheduleService from "@/services/ScheduleService";
import FeeService from "@/services/FeeService";

export default {
  async mounted() {
    // await this.getStudentGrades();
    // await this.getStudentSchedule();
    // await this.getCourseSectionSchedule();
    // await this.getStudentCurriculum();
    // await this.getStudentType();
    await this.getPreEnrollmentData();
    // this.getFees();
  },
  data() {
    return {
      name:
        this.$store.state.user.first_name +
        " " +
        this.$store.state.user.last_name,
      course: this.$store.state.user.course.code,
      user: this.$store.state.user,
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
      availableClasses: [],
      items: [],
      fees: [],
      formItems: [],
      itemsToSave: [],
      saveConfirmDialog: false,
      saveConfirmDialogTitle: "save",
      studentChecklist: [],
      courseSectionSchedule: [],
      studentGrades: [],
      snackbarColor: "",
      snackbarText: "",
      subjectsToTake: [],
      enrollmentStatus: ""
    };
  },
  methods: {
    async getFees() {
      const tuitionfee = this.formItems.reduce((total, fee) => {
        return (total += Number(fee.subject.fee));
      }, 0);
      this.fees.push({
        name: "Tuition Fee",
        amount: tuitionfee
      });

      const otherfees = (await FeeService.getAllFees()).data;
      if (!otherfees.length) {
        return;
      }

      otherfees.forEach(async item => {
        await this.fees.push(item);
      });
    },
    async getPreEnrollmentData() {
      // get student type
      const studentType = await this.getStudentType();

      // get student current schedule
      let schedule = (
        await StudentScheduleService.getSchedule(this.$store.state.user.id)
      ).data;

      const grades = (
        await StudentGradeService.getGrades(this.$store.state.user.id)
      ).data;

      // ----------------------------------------------------------------------

      // display current schedule
      if (schedule.length) {
        const subjectsToTake = schedule.filter(schedule => {
          return grades.some(grade => {
            return (
              grade.subject.name == schedule.subject.name &&
              (grade.grade === "-" || grade.grade > 3)
            );
          });
        });

        if (subjectsToTake.length) {
          // filter subjects in form with grade and save schedule
          let itemsToSave = [];

          subjectsToTake.forEach(item => {
            let data = {
              UserId: this.$store.state.user.id,
              ClassId: item.class.id,
              ph_status: item.ph_status,
              status: item.status
            };

            itemsToSave.push(data);
          });

          await StudentScheduleService.editSchedule(itemsToSave);

          schedule = (
            await StudentScheduleService.getSchedule(this.$store.state.user.id)
          ).data;

          // new schedule
          schedule = (
            await StudentScheduleService.getSchedule(this.$store.state.user.id)
          ).data;
        } else {
          await StudentScheduleService.deleteSchedule(
            this.$store.state.user.id
          );
          await this.getPreEnrollmentData();
        }

        // set enrollment status
        if (
          schedule.length &&
          schedule[0].ph_status === "APPROVED" &&
          schedule[0].status === "APPROVED"
        ) {
          this.enrollmentStatus = schedule[0].status;
        } else if (
          schedule.length &&
          (schedule[0].ph_status === "PENDING" ||
            schedule[0].status === "PENDING")
        ) {
          this.enrollmentStatus = schedule[0].ph_status;
        } else if (schedule.length && schedule[0].status === "DISAPPROVED") {
          this.enrollmentStatus = schedule[0].status;
        } else {
          this.enrollmentStatus = null;
        }

        let data = await Promise.all(
          schedule.map(async item => {
            return (await ClassService.getClass(item.class.id)).data;
          })
        );

        this.formItems = data;
      }

      if (studentType === "irregular") {
        // get student grades
        const grades = (
          await StudentGradeService.getGrades(this.$store.state.user.id)
        ).data;

        // filter subjects with grade of 5.00 or greater than 3 (it means failed)
        const subjectsToTake = grades.filter(subject => {
          return subject.grade === "-" || subject.grade > 3;
        });

        this.subjectsToTake = subjectsToTake.map(subject => subject.subject);

        this.getAvailableClasses();
      } else {
        if (schedule.length) {
          // console.log("sched", schedule);
          // return;
          await this.getCourseSectionSchedule();
          let courseSchedule = await Promise.all(
            this.courseSectionSchedule.map(async item => {
              return (await ClassService.getClass(item.class.id)).data;
            })
          );

          const subjectsToTake = courseSchedule.filter(schedule => {
            return grades.some(grade => {
              return (
                grade.subject.name == schedule.subject.name &&
                (grade.grade === "-" || grade.grade > 3)
              );
            });
          });

          console.log(subjectsToTake);
        } else {
          await this.getCourseSectionSchedule();
          let schedule = await Promise.all(
            this.courseSectionSchedule.map(async item => {
              return (await ClassService.getClass(item.class.id)).data;
            })
          );

          const subjectsToTake = schedule.filter(schedule => {
            return grades.some(grade => {
              return (
                grade.subject.name == schedule.subject.name &&
                (grade.grade === "-" || grade.grade > 3)
              );
            });
          });

          this.formItems = subjectsToTake;
        }
      }
      // list breakdown

      if (this.enrollmentStatus) {
        this.getFees();
      }
    },

    // --------------------------------------------------------------------------------------

    async getAvailableClasses() {
      const classes = (await ClassService.getClasses()).data;

      this.availableClasses = classes.filter(studentClass => {
        return this.subjectsToTake.some(classes => {
          return classes.name === studentClass.subject.name;
        });
      });

      // filter classes already in schedule
      const classesToShow = await this.availableClasses.filter(
        classes =>
          !this.formItems.some(
            formItem => formItem.subject.name === classes.subject.name
          )
      );

      // get classes with available slot
      const hasSlot = await classesToShow.filter(
        classItem => classItem.room.limit > classItem.students.length
      );

      const conflict = await this.getConflictClasses(hasSlot);

      // filter available classes with no conflicts
      if (conflict.length) {
        this.items = hasSlot.filter(
          item => !conflict.some(conflictItem => item.id === conflictItem.id)
        );
      } else {
        this.items = hasSlot;
      }
    },

    // --------------------------------------------------------------------------------------

    async getConflictClasses(availableItem) {
      const conflict = await availableItem.filter(item => {
        const itemStartTime = parseInt(
          item.time_start.split(":")[0] + "" + item.time_start.split(":")[1]
        );

        const itemEndTime = parseInt(
          item.time_end.split(":")[0] + "" + item.time_end.split(":")[1]
        );

        const itemDay = item.day.split("/");

        return this.formItems.some(formItem => {
          const formDay = formItem.day.split("/");

          const formStartTime = parseInt(
            formItem.time_start.split(":")[0] +
              "" +
              formItem.time_start.split(":")[1]
          );

          const formEndTime = parseInt(
            formItem.time_end.split(":")[0] +
              "" +
              formItem.time_end.split(":")[1]
          );

          // check day conflict
          const dayConflict = itemDay.filter(day =>
            formDay.some(formItemDay => formItemDay.includes(day))
          );

          // will return classes with conflicts
          return (
            ((itemStartTime >= formStartTime && itemEndTime <= formEndTime) ||
              (itemStartTime <= formStartTime &&
                itemEndTime > formStartTime &&
                itemEndTime <= formEndTime) ||
              (itemStartTime > formStartTime && itemStartTime < formEndTime) ||
              (itemStartTime <= formStartTime && itemEndTime >= formEndTime)) &&
            dayConflict.length
          );
        });
      });

      return conflict;
    },

    // --------------------------------------------------------------------------------------

    async addClassToForm(item) {
      // Check if there is no conflict to the Classes in the schedules
      this.formItems.push(item);
    },

    async getStudentType() {
      return this.$store.state.user.type;
    },

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

    async getCourseSectionSchedule() {
      let courseSectionSchedule = (
        await CourseSectionScheduleService.getSchedules()
      ).data;

      this.courseSectionSchedule = courseSectionSchedule.filter(
        item =>
          item.course.id === this.$store.state.user.course.id &&
          item.section.id === this.$store.state.user.section.id
      );
    },

    async saveEditSchedule() {
      await StudentScheduleService.editSchedule(this.itemsToSave);
      this.closeSaveConfirmDialog();
      this.getPreEnrollmentData();
      this.action = "";
    },
    async saveEdit() {
      let itemsToSave = [];

      for (let item of this.$refs.preForm.items) {
        let data = {
          UserId: this.$store.state.user.id,
          ClassId: item.id,
          ph_status: "PENDING"
        };
        itemsToSave.push(data);
      }

      this.itemsToSave = await itemsToSave;

      this.saveConfirmDialog = true;
    },
    async getStudentSchedule() {
      const studentType = this.$store.state.user.type;
      if (studentType === "regular") {
        await this.getCourseSectionSchedule();
        let schedule = await Promise.all(
          this.courseSectionSchedule.map(async item => {
            return (await ClassService.getClass(item.class.id)).data;
          })
        );

        this.formItems = schedule;
      } else {
        let response = (
          await StudentScheduleService.getSchedule(this.$store.state.user.id)
        ).data;

        if (response) {
          let data = await Promise.all(
            response.map(async item => {
              return (await ClassService.getClass(item.class.id)).data;
            })
          );

          this.formItems = data;
        }

        this.getClasses();
      }
    },
    async addClass(data) {
      if (this.formItems.length > 0) {
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

          const formItemDay = conflict.day.split("/");
          const dataDay = data.day.split("/");

          const dayConflict = formItemDay.some(formItem =>
            formItem.includes(dataDay)
          );

          return (
            ((reqTimeStart >= conflictTimeStart &&
              reqTimeStart < conflictTimeEnd) ||
              (reqTimeEnd > conflictTimeStart &&
                reqTimeEnd <= conflictTimeEnd) ||
              (reqTimeStart < conflictTimeStart &&
                reqTimeEnd > conflictTimeEnd)) &&
            dayConflict
          );
        });

        if (conflicts.length > 0) {
          let conflictClass = "";
          for (let i = 0; i < conflicts.length; i++) {
            conflictClass +=
              "" +
              conflicts[i].class_no +
              (i < conflicts.length - 1 ? "," : "");
          }

          this.$refs.scheduleSnackbar.dialog = true;
          this.snackbarColor = "error";
          this.snackbarText = `Conflict to Class No: ${conflictClass}`;
        } else {
          this.formItems.push(data);

          this.items = this.items.filter(item => {
            return data.subject.name !== item.subject.name;
          });
        }
      } else {
        this.formItems.push(data);
        this.items = this.items.filter(item => {
          return data.subject.name !== item.subject.name;
        });
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
      this.getAvailableClasses();
      // // this.items.push(data);
      // this.getClasses();
    },
    async getClasses() {
      let response = (await ClassService.getClasses()).data;

      let filteredResponse = await Promise.all(
        response.filter(data => {
          return data.students.length < parseInt(data.room.limit);
        })
      );

      await this.getStudentCurriculum();

      // filter classes by checklist
      let classesTobeTaken = await Promise.all(
        filteredResponse.filter(data => {
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

      this.items = classGrade;
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
