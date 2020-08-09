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
            <v-card-title>PRE ENROLLMENT FORM</v-card-title>

            <v-card-text>
              <v-list>
                <strong>Student Name:</strong>
                <!-- {{ `${studentData.first_name} ${studentData.last_name}` }} -->
                <br />
                <strong>Program:</strong>
                <!-- {{ studentData.course.code }} -->
              </v-list>
              <v-data-table
                :headers="scheduleHeader"
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
                dark
                @click="approve()"
                >Approve</v-btn
              >
              <v-btn color="primary" dark @click="formDialog = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
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

export default {
  mounted() {
    this.getStudentSchedule();
    this.getCourses();
  },

  data() {
    return {
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
      confirmationDialog: false,
      defaultStudents: [],
      confirmDialogTitle: "Approve",
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
      ]
    };
  },

  methods: {
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

    openApproveDialog(item) {
      this.formDialog = true;
      this.items = item.schedule;
    },

    approve() {
      this.confirmationDialog = true;
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

<style></style>
