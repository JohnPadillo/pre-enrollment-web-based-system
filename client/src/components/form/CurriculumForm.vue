<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-dialog persistent v-model="dialog" :maxWidth="1200">
          <v-card>
            <v-toolbar dark color="primary">
              <v-card-title>Checklist</v-card-title>
              <v-spacer></v-spacer>
              <v-tooltip
                v-if="
                  $store.state.user.deparment
                    ? $store.state.user.department.id == user.department.id ||
                      $store.state.user.status == 1 ||
                      $store.state.user.status == 3
                    : ''
                "
                top
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="changeEditDialog" v-on="on">
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>

              <v-tooltip v-if="editDialog == true" top>
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="saveEditChecklist" v-on="on">
                    <v-icon dark>mdi-content-save</v-icon>
                  </v-btn>
                </template>
                <span>Save</span>
              </v-tooltip>
              <v-btn icon dark @click="closeChecklistDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-container>
              <v-row v-if="action != 'view'">
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="program_id"
                    :items="programs"
                    label="Program"
                    item-text="code"
                    item-value="id"
                    outlined
                    :readonly="action == 'edit'"
                  ></v-select>
                </v-col>
              </v-row>
              <v-list>
                <strong>Student Name:</strong>
                {{ user.name == null ? "-" : user.name }}
                <br />
                <strong>Program:</strong>
                {{ user.course.code ? user.course.code : "-" }}
              </v-list>

              <!-- 1st Year -->
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-card class="mt-5">
                    <v-card-title>
                      1st Year 1st Term
                      <v-spacer></v-spacer>
                      <addButton v-if="action != 'view'" id="11" ref="add11" @add="add11()"></addButton>
                    </v-card-title>

                    <v-data-table
                      disable-pagination
                      :headers="
                        this.$route.name == 'AdminCurriculum'
                          ? formHeaders2
                          : formHeaders
                      "
                      hide-default-footer
                      :items="getChecklistByYearSem(11)"
                    >
                      <template v-slot:item="props">
                        <tr>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.units }}</td>
                          <td v-if="editDialog == false" align="center">{{ props.item.grade }}</td>
                          <td v-else>
                            <v-edit-dialog
                              :return-value.sync="props.item.grade"
                              @save="saveEditGrade(props.item)"
                              large
                            >
                              {{
                              props.item.grade
                              ? props.item.grade
                              : "------------"
                              }}
                              <template
                                v-slot:input
                              >
                                <v-select :items="grades" v-model="props.item.grade" label="Grades"></v-select>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td></td>
                          <td>{{ getPrerequisites(props.item) }}</td>
                          <td></td>
                          <td>
                            <removeButton
                              v-if="action != 'view'"
                              @delete="removeCourse(props.item)"
                            />
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-card class="mt-5">
                    <v-card-title>
                      1st Year 2nd Term
                      <v-spacer></v-spacer>
                      <addButton v-if="action != 'view'" id="12" ref="add12" @add="add12()"></addButton>
                    </v-card-title>

                    <v-data-table
                      disable-pagination
                      :headers="
                        this.$route.name == 'AdminCurriculum'
                          ? formHeaders2
                          : formHeaders
                      "
                      :items="getChecklistByYearSem(12)"
                      hide-default-footer
                    >
                      <template v-slot:item="props">
                        <tr>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.units }}</td>
                          <td v-if="editDialog == false" align="center">{{ props.item.grade }}</td>
                          <td v-else>
                            <v-edit-dialog
                              :return-value.sync="props.item.grade"
                              @save="saveEditGrade(props.item)"
                              large
                            >
                              {{
                              props.item.grade
                              ? props.item.grade
                              : "------------"
                              }}
                              <template
                                v-slot:input
                              >
                                <v-select :items="grades" v-model="props.item.grade" label="Grades"></v-select>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td></td>
                          <td>{{ getPrerequisites(props.item) }}</td>
                          <td></td>
                          <td>
                            <removeButton
                              v-if="action != 'view'"
                              @delete="removeCourse(props.item)"
                            />
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
              <!-- 2nd Year -->
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-card class="mt-5">
                    <v-card-title>
                      2nd Year 1st Term
                      <v-spacer></v-spacer>
                      <addButton v-if="action != 'view'" id="21" ref="add21" @add="add21()"></addButton>
                    </v-card-title>
                    <v-data-table
                      disable-pagination
                      :headers="
                        this.$route.name == 'AdminCurriculum'
                          ? formHeaders2
                          : formHeaders
                      "
                      :items="getChecklistByYearSem(21)"
                      hide-default-footer
                    >
                      <template v-slot:item="props">
                        <tr>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.units }}</td>
                          <td v-if="editDialog == false" align="center">{{ props.item.grade }}</td>
                          <td v-else>
                            <v-edit-dialog
                              :return-value.sync="props.item.grade"
                              @save="saveEditGrade(props.item)"
                              large
                            >
                              {{
                              props.item.grade
                              ? props.item.grade
                              : "------------"
                              }}
                              <template
                                v-slot:input
                              >
                                <v-select :items="grades" v-model="props.item.grade" label="Grades"></v-select>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td></td>
                          <td>{{ getPrerequisites(props.item) }}</td>
                          <td></td>
                          <td>
                            <removeButton
                              v-if="action != 'view'"
                              @delete="removeCourse(props.item)"
                            />
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-card class="mt-5">
                    <v-card-title>
                      2nd Year 2nd Term
                      <v-spacer></v-spacer>
                      <addButton v-if="action != 'view'" id="22" ref="add22" @add="add22()"></addButton>
                    </v-card-title>
                    <v-data-table
                      disable-pagination
                      :headers="
                        this.$route.name == 'AdminCurriculum'
                          ? formHeaders2
                          : formHeaders
                      "
                      :items="getChecklistByYearSem(22)"
                      hide-default-footer
                    >
                      <template v-slot:item="props">
                        <tr>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.units }}</td>
                          <td v-if="editDialog == false" align="center">{{ props.item.grade }}</td>
                          <td v-else>
                            <v-edit-dialog
                              :return-value.sync="props.item.grade"
                              @save="saveEditGrade(props.item)"
                              large
                            >
                              {{
                              props.item.grade
                              ? props.item.grade
                              : "------------"
                              }}
                              <template
                                v-slot:input
                              >
                                <v-select :items="grades" v-model="props.item.grade" label="Grades"></v-select>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td></td>
                          <td>{{ getPrerequisites(props.item) }}</td>
                          <td></td>
                          <td>
                            <removeButton
                              v-if="action != 'view'"
                              @delete="removeCourse(props.item)"
                            />
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
              <!-- 3rd Year -->
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-card class="mt-5">
                    <v-card-title>
                      3rd Year 1st Term
                      <v-spacer></v-spacer>
                      <addButton v-if="action != 'view'" id="31" ref="add31" @add="add31()"></addButton>
                    </v-card-title>
                    <v-data-table
                      disable-pagination
                      :headers="
                        this.$route.name == 'AdminCurriculum'
                          ? formHeaders2
                          : formHeaders
                      "
                      :items="getChecklistByYearSem(31)"
                      hide-default-footer
                    >
                      <template v-slot:item="props">
                        <tr>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.units }}</td>
                          <td v-if="editDialog == false" align="center">{{ props.item.grade }}</td>
                          <td v-else>
                            <v-edit-dialog
                              :return-value.sync="props.item.grade"
                              @save="saveEditGrade(props.item)"
                              large
                            >
                              {{
                              props.item.grade
                              ? props.item.grade
                              : "------------"
                              }}
                              <template
                                v-slot:input
                              >
                                <v-select :items="grades" v-model="props.item.grade" label="Grades"></v-select>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td></td>
                          <td>{{ getPrerequisites(props.item) }}</td>
                          <td></td>
                          <td>
                            <removeButton
                              v-if="action != 'view'"
                              @delete="removeCourse(props.item)"
                            />
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-card class="mt-5">
                    <v-card-title>
                      3rd Year 2nd Term
                      <v-spacer></v-spacer>
                      <addButton v-if="action != 'view'" id="32" ref="add32" @add="add32()"></addButton>
                    </v-card-title>
                    <v-data-table
                      disable-pagination
                      :headers="
                        this.$route.name == 'AdminCurriculum'
                          ? formHeaders2
                          : formHeaders
                      "
                      :items="getChecklistByYearSem(32)"
                      hide-default-footer
                    >
                      <template v-slot:item="props">
                        <tr>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.units }}</td>
                          <td v-if="editDialog == false" align="center">{{ props.item.grade }}</td>
                          <td v-else>
                            <v-edit-dialog
                              :return-value.sync="props.item.grade"
                              @save="saveEditGrade(props.item)"
                              large
                            >
                              {{
                              props.item.grade
                              ? props.item.grade
                              : "------------"
                              }}
                              <template
                                v-slot:input
                              >
                                <v-select :items="grades" v-model="props.item.grade" label="Grades"></v-select>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td></td>
                          <td>{{ getPrerequisites(props.item) }}</td>
                          <td></td>
                          <td>
                            <removeButton
                              v-if="action != 'view'"
                              @delete="removeCourse(props.item)"
                            />
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
              <!-- 4th Year -->
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-card class="mt-5">
                    <v-card-title>
                      4th Year 1st Term
                      <v-spacer></v-spacer>
                      <addButton v-if="action != 'view'" id="41" ref="add41" @add="add41()"></addButton>
                    </v-card-title>
                    <v-data-table
                      disable-pagination
                      :headers="
                        this.$route.name == 'AdminCurriculum'
                          ? formHeaders2
                          : formHeaders
                      "
                      :items="getChecklistByYearSem(41)"
                      hide-default-footer
                    >
                      <template v-slot:item="props">
                        <tr>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.units }}</td>
                          <td v-if="editDialog == false" align="center">{{ props.item.grade }}</td>
                          <td v-else>
                            <v-edit-dialog
                              :return-value.sync="props.item.grade"
                              @save="saveEditGrade(props.item)"
                              large
                            >
                              {{
                              props.item.grade
                              ? props.item.grade
                              : "------------"
                              }}
                              <template
                                v-slot:input
                              >
                                <v-select :items="grades" v-model="props.item.grade" label="Grades"></v-select>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td></td>
                          <td>{{ getPrerequisites(props.item) }}</td>
                          <td></td>
                          <td>
                            <removeButton
                              v-if="action != 'view'"
                              @delete="removeCourse(props.item)"
                            />
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-card class="mt-5">
                    <v-card-title>
                      4th Year 2nd Term
                      <v-spacer></v-spacer>

                      <addButton v-if="action != 'view'" id="42" ref="add42" @add="add42()"></addButton>
                    </v-card-title>
                    <v-data-table
                      disable-pagination
                      :headers="
                        this.$route.name == 'AdminCurriculum'
                          ? formHeaders2
                          : formHeaders
                      "
                      :items="getChecklistByYearSem(42)"
                      hide-default-footer
                    >
                      <template v-slot:item="props">
                        <tr>
                          <td>{{ props.item.code }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.units }}</td>
                          <td v-if="editDialog == false" align="center">{{ props.item.grade }}</td>
                          <td v-else>
                            <v-edit-dialog
                              :return-value.sync="props.item.grade"
                              @save="saveEditGrade(props.item)"
                              large
                            >
                              {{
                              props.item.grade
                              ? props.item.grade
                              : "------------"
                              }}
                              <template
                                v-slot:input
                              >
                                <v-select :items="grades" v-model="props.item.grade" label="Grades"></v-select>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td></td>
                          <td>{{ getPrerequisites(props.item) }}</td>
                          <td></td>
                          <td>
                            <removeButton
                              v-if="action != 'view'"
                              @delete="removeCourse(props.item)"
                            />
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    action: String,
    checklist: Array,
    user: Object
  },
  data() {
    return {
      grades: [
        "1.00",
        "1.25",
        "1.50",
        "1.75",
        "2.00",
        "2.25",
        "2.50",
        "2.75",
        "3.00",
        "5.00"
      ],
      editDialog: false,
      program_id: "",
      programs: [],
      formHeaders: [
        {
          text: "Course Code"
        },
        {
          text: "Course Description"
        },
        {
          text: "Reg. Units"
        },
        {
          text: "Grade"
        },
        {
          text: "Earned Unit"
        },
        {
          text: "Prerequisites"
        },
        {
          text: "Term"
        },
        {
          text: "Action"
        }
      ],
      formHeaders2: [
        {
          text: "Course Code"
        },
        {
          text: "Course Description"
        },
        {
          text: "Reg. Units"
        },
        {
          text: "Earned Unit"
        },
        {
          text: "Prerequisites"
        },
        {
          text: "Term"
        },
        {
          text: "Action"
        }
      ]
    };
  },
  methods: {
    getPrerequisites(data) {
      if (data.prerequisites) {
        let prerequisites = data.prerequisites.map(data => {
          return data.name;
        });
        return prerequisites.toString();
      } else {
        return "";
      }
    },
    getChecklistByYearSem(id) {
      if (id == "11") {
        return this.checklist.filter(data => {
          return data.year == 1 && data.semester == 1;
        });
      }
      if (id == "12") {
        return this.checklist.filter(data => {
          return data.year == 1 && data.semester == 2;
        });
      }
      if (id == "21") {
        return this.checklist.filter(data => {
          return data.year == 2 && data.semester == 1;
        });
      }
      if (id == "22") {
        return this.checklist.filter(data => {
          return data.year == 2 && data.semester == 2;
        });
      }
      if (id == "31") {
        return this.checklist.filter(data => {
          return data.year == 3 && data.semester == 1;
        });
      }
      if (id == "32") {
        return this.checklist.filter(data => {
          return data.year == 3 && data.semester == 2;
        });
      }
      if (id == "41") {
        return this.checklist.filter(data => {
          return data.year == 4 && data.semester == 1;
        });
      }
      if (id == "42") {
        return this.checklist.filter(data => {
          return data.year == 4 && data.semester == 2;
        });
      }
    },
    closeChecklistDialog() {
      // this.dialog = false;
      this.$emit("close");
    },
    changeEditDialog() {
      this.editDialog = !this.editDialog;
    },
    saveEditGrade(data) {
      console.log(data);
    },
    saveEditChecklist() {
      this.$emit("saveChecklist");
    }
  }
};
</script>

<style></style>
