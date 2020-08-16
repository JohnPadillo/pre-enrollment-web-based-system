<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout>
          <v-spacer></v-spacer>
          <v-col class="d-flex" cols="12" sm="3">
            <v-select
              :items="courses"
              v-model="selected_course"
              label="Program"
              item-text="code"
              item-value="id"
              solo
              clearable
              @click:clear="resetSelectCourse"
              @input="selectCourse"
            ></v-select>
          </v-col>
        </v-layout>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="confirmationDialog = false"
          @yes="approveSchedule()"
        ></confirmationDialog>
        <v-dialog v-if="formDialog" v-model="formDialog" max-width="1000">
          <v-card>
            <v-card-title
              >PRE ENROLLMENT FORM
              <v-spacer></v-spacer>
              <editButton
                v-if="studentData.type === 'irregular'"
                @edit="edit(studentData)"
              />
            </v-card-title>
            <v-card-text>
              <v-list>
                <strong>Student Name:</strong>
                {{ `${studentData.first_name} ${studentData.last_name}` }}
                <br />
                <strong>Program:</strong>
                {{ studentData.course.code }}
                <br />
                <strong>Type:</strong>
                {{
                  studentData.type.charAt(0).toUpperCase() +
                    studentData.type.substr(1)
                }}
                Student
              </v-list>
              <v-data-table
                :headers="
                  action === 'edit' ? editScheduleHeader : scheduleHeader
                "
                :items="items"
                disable-pagination
                hide-default-footer
                disable-filtering
                disable-sort
              >
                <template v-slot:item="props">
                  <tr>
                    <td>{{ props.item.class.class_no }}</td>
                    <td>{{ props.item.class.subject.name }}</td>
                    <td>{{ props.item.class.section.name }}</td>
                    <td>{{ props.item.class.subject.units }}</td>
                    <td>{{ props.item.class.day }}</td>
                    <td>
                      {{ props.item.class.time_start }} -
                      {{ props.item.class.time_end }}
                    </td>
                    <td>{{ props.item.class.room.name }}</td>
                    <td v-if="action === 'edit'">
                      <removeButton @delete="deleteItem(props.item)" />
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                v-if="
                  $store.state.user.status === 1 ||
                    $store.state.user.status === 2
                "
                :disabled="!items.length"
                @click="approve()"
                >Approve</v-btn
              >
              <v-btn color="primary" dark @click="closeFormDialog()"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>

          <v-layout>
            <v-flex>
              <v-card class="available-card" v-if="action == 'edit'">
                <v-card-title text-md-center>Available Classes</v-card-title>
                <v-data-table
                  :headers="editScheduleHeader"
                  :items="availableClasses"
                >
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
        </v-dialog>
        <snackbar
          ref="scheduleSnackbar"
          :color="snackbarColor"
          :text="snackbarText"
          @close="closeSnackBar"
        />
        <v-card>
          <v-card-title>
            Student Pre-enrollment
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="students"
            :search="search"
            :loading="loading"
            loading-text="Loading..."
          >
            <template v-slot:item="props">
              <tr>
                <td>
                  {{ `${props.item.first_name} ${props.item.last_name}` }}
                </td>
                <td>{{ props.item.course.code }}</td>
                <td>
                  {{
                    $store.state.user.status === 2
                      ? props.item.schedule[0].ph_status
                      : props.item.schedule[0].status
                  }}
                </td>
                <td align="center">
                  <editButton
                    v-if="
                      $store.state.user.status === 1 ||
                        $store.state.user.status === 2
                    "
                    @edit="openApproveDialog(props.item)"
                  ></editButton>
                  <viewButton
                    v-if="$store.state.user.status === 3"
                    @view="openApproveDialog(props.item)"
                  ></viewButton>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StudentScheduleService from "@/services/StudentScheduleService";
import StudentService from "@/services/StudentService";
import ClassService from "@/services/ClassService";
import ProgramService from "@/services/ProgramService";
import StudentGradeService from "@/services/GradeService";

export default {
  mounted() {
    this.getStudentSchedule();
    this.getCourses();
  },

  data() {
    return {
      action: "",
      title: "Student Pre-enrollment",
      search: "",
      headers: [
        { text: "Student Name", value: "name" },
        { text: "Student Program", value: "course.code" },
        { text: "Status" },
        { text: "Actions", align: "center" }
      ],
      items: [],
      selected_course: "",
      courses: [],
      studentSchedules: [],
      students: [],
      loading: false,
      formDialog: false,
      studentData: null,
      availableClasses: [],
      defaultStudentSchedule: [],
      confirmationDialog: false,
      defaultStudents: [],
      confirmDialogTitle: "Approve",
      snackbarColor: "",
      snackbarText: "",
      scheduleHeader: [
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
        }
      ],
      editScheduleHeader: [
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
      ]
    };
  },

  methods: {
    async deleteItem(data) {
      const index = this.items.indexOf(data);
      this.items.splice(index, 1);
      await this.getAvailableClasses(data.student);
      console.log(data);
    },
    async edit(student) {
      this.action = "edit";
      await this.getAvailableClasses(student);
    },

    async getAvailableClasses(student) {
      // get student grades
      const grades = (await StudentGradeService.getGrades(student.id)).data;

      // filter subjects with grade of 5.00 or greater than 3 (it means failed)
      const subjectsToTake = grades.filter(subject => {
        return subject.grade === "-" || subject.grade > 3;
      });

      const classes = (await ClassService.getClasses()).data;

      const unFilteredavailableClasses = classes.filter(studentClass => {
        return subjectsToTake.some(classes => {
          return classes.subject.name === studentClass.subject.name;
        });
      });

      // filter unfilteredAvailable classes with items (Schedule)
      const filteredAvailableClasses = unFilteredavailableClasses.filter(
        classes => {
          return !this.items.some(itemClass => {
            return itemClass.class.subject.name === classes.subject.name;
          });
        }
      );

      const hasSlot = await filteredAvailableClasses.filter(
        classItem => classItem.room.limit > classItem.students.length
      );

      const conflict = await this.getConflictClasses(hasSlot);
      // filter available classes with no conflicts
      if (conflict.length) {
        this.availableClasses = hasSlot.filter(
          item => !conflict.some(conflictItem => item.id === conflictItem.id)
        );
      } else {
        this.availableClasses = hasSlot;
      }
    },

    async addClass(classData) {
      const conflict = await this.items.filter(item => {
        // check if there is day conflict with items
        const itemDay = item.class.day.split("/");
        const classDataDay = classData.day.split("/");

        const dayConflict = itemDay.filter(day => {
          return classDataDay.some(classDay => classDay == day);
        });

        // has day conflict
        if (dayConflict.length) {
          // check time conflict
          const itemStartTime = parseInt(
            item.class.time_start.split(":")[0] +
              "" +
              item.class.time_start.split(":")[1]
          );

          const itemEndTime = parseInt(
            item.class.time_end.split(":")[0] +
              "" +
              item.class.time_end.split(":")[1]
          );

          const dayConflictStartTime = parseInt(
            classData.time_start.split(":")[0] +
              "" +
              classData.time_start.split(":")[1]
          );

          const dayConflictEndTime = parseInt(
            classData.time_end.split(":")[0] +
              "" +
              classData.time_end.split(":")[1]
          );

          if (
            (itemStartTime >= dayConflictStartTime &&
              itemEndTime <= dayConflictEndTime) ||
            (itemStartTime <= dayConflictStartTime &&
              itemEndTime > dayConflictStartTime &&
              itemEndTime <= dayConflictEndTime) ||
            (itemStartTime > dayConflictStartTime &&
              itemStartTime < dayConflictEndTime) ||
            (itemStartTime <= dayConflictStartTime &&
              itemEndTime >= dayConflictEndTime)
          ) {
            return item;
          } else {
            return;
          }
        }
      });

      if (conflict.length) {
        let conflictClass = "";
        for (let i = 0; i < conflict.length; i++) {
          conflictClass +=
            "" +
            conflict[i].class.class_no +
            (i < conflict.length - 1 ? "," : "");
        }

        this.$refs.scheduleSnackbar.dialog = true;
        this.snackbarColor = "error";
        this.snackbarText = `Conflict to Class No: ${conflictClass}`;
      } else {
        // no conflict on time and day
        // check student room limit
        if (classData.room.limit > classData.students.length) {
          const newClass = {
            ClassId: classData.id,
            UserId: this.studentData.id,
            class: classData,
            ph_status: "PENDING",
            status: null,
            student: this.studentData,
            newClass: true
          };
          this.items.push(newClass);
          console.log(this.items);
          console.log(newClass);

          this.availableClasses = this.availableClasses.filter(
            avail => avail.subject.name !== classData.subject.name
          );
        } else {
          return;
        }
      }
    },

    async getConflictClasses(availableItem) {
      const conflict = await availableItem.filter(item => {
        const itemStartTime = parseInt(
          item.time_start.split(":")[0] + "" + item.time_start.split(":")[1]
        );

        const itemEndTime = parseInt(
          item.time_end.split(":")[0] + "" + item.time_end.split(":")[1]
        );

        const itemDay = item.day.split("/");

        return this.items.some(formItem => {
          const formDay = formItem.class.day.split("/");

          const formStartTime = parseInt(
            formItem.class.time_start.split(":")[0] +
              "" +
              formItem.class.time_start.split(":")[1]
          );

          const formEndTime = parseInt(
            formItem.class.time_end.split(":")[0] +
              "" +
              formItem.class.time_end.split(":")[1]
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

    closeSnackBar() {
      this.$refs.snackbar.dialog = false;
    },

    async getStudentSchedule() {
      this.loading = true;
      let response = (await StudentScheduleService.getSchedules()).data;

      if (this.$store.state.user.status === 2) {
        response = response.filter(data => {
          return (
            data.ph_status === "PENDING" &&
            this.$store.state.user.department.id === data.student.DepartmentId
          );
        });
      } else if (this.$store.state.user.status === 1) {
        response = response.filter(data => {
          return data.status === "PENDING";
        });
      } else {
        response = response.filter(data => {
          return data.ph_status === "APPROVED" && data.status === "APPROVED";
        });
      }

      this.loading = false;

      let studentList = [...new Set(response.map(item => item.UserId))];

      this.students = [];

      studentList.forEach(async id => {
        let student = (await StudentService.getStudent(id)).data;

        student = {
          ...student,
          name: student.first_name + " " + student.last_name
        };

        let sched = await Promise.all(
          response
            .filter(data => {
              return data.UserId === id;
            })
            .map(async item => {
              return {
                ...item,
                class: (await ClassService.getClass(item.ClassId)).data
              };
            })
        );

        let data = {
          ...student,
          schedule: sched
        };

        this.students.push(data);
      });

      this.defaultStudents = this.students;
    },

    async getCourses() {
      let courses = (await ProgramService.getPrograms()).data;

      this.courses = await Promise.all(
        courses.map(course => {
          return {
            code: course.code,
            name: course.name,
            id: course.id
          };
        })
      );
    },

    async openApproveDialog(item) {
      this.formDialog = true;
      this.studentData = item;
      this.items = item.schedule;
    },

    closeFormDialog() {
      if (this.action === "edit") {
        this.getStudentSchedule();
        this.getCourses();
      }
      this.action = "";
      this.formDialog = false;
    },

    async approve() {
      await StudentScheduleService.editSchedule(this.items);
      this.confirmationDialog = true;
      this.action = "";
    },

    async approveSchedule() {
      let data = await Promise.all(
        this.items.map(data => {
          if (this.$store.state.user.status === 2) {
            return {
              UserId: data.UserId,
              ClassId: data.ClassId,
              ph_status: "APPROVED",
              status: "PENDING"
            };
          } else {
            return {
              UserId: data.UserId,
              ClassId: data.ClassId,
              status: "APPROVED"
            };
          }
        })
      );

      (await StudentScheduleService.editSchedule(data)).data;
      await this.getStudentSchedule();
      this.confirmationDialog = false;
      this.formDialog = false;
      this.items = [];
    },

    async resetSelectCourse() {
      this.getStudentSchedule();
    },

    async selectCourse() {
      this.students = this.defaultStudents;
      let data = this.students.filter(student => {
        return student.course.id === this.selected_course;
      });
      this.students = data;
    }
  }
};
</script>

<style>
.available-card {
  margin-top: 20px;
}
</style>
