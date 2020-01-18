
<template>
<v-container fluid>
    <v-layout>
      <v-flex>
          <toolbarNav
        :title='title'
      > 
      <addButton
        :title="title"
        @add="add"
      />
      
      <addDialog :dialog="openAddDialog" :title="title" ref="addDialog" @close="closeAddDialog" @save="addCourse">
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
              v-model="department_name"
              :items="departments"
              label="Department"
              item-text="name"
              item-value="name"
              outlined
            ></v-select>
      </addDialog>

      </toolbarNav>
          <v-data-table
            class="mt-5"
            :headers="headers"
            :items="courses"
          >  
          </v-data-table>
      </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import ToolbarNav from '@/components/Toolbar.vue'
export default {
    components: {
        ToolbarNav
    },
    methods: {
        add() {
            this.openAddDialog = !this.openAddDialog
            console.log(this.openAddDialog)  
        },
        closeAddDialog() {
            this.openAddDialog = !this.openAddDialog
            console.log(this.department_name)
        },
        addCourse() {
            let data = {
                code: this.course_code,
                name: this.course_name,
                department: this.department_name 
            }
            this.courses.push(data)
            this.openAddDialog = !this.openAddDialog
        }
    },
    data() {
        return {
            title: 'Courses',
            department_name: '',
            course_name: '',
            course_code: '',
            openAddDialog: false,
            courses: [
                {
                    code: 'BSCS',
                    name: 'Bachelor of Science in Computer Science',
                    department: 'IT Dept'
                },
                {
                    code: 'BSIT',
                    name: 'Bachelor of Science in Information Technology',
                    department: 'IT Dept.'


                },
                {
                    code: 'BSIS',
                    name: 'Bachelor of Science in Information Science',
                    department: 'IT Dept'
                },
                {
                    code: 'BSEE',
                    name: 'Bachelor of Secondary Education',
                    department: 'Education Dept.'
                },
                                {
                    code: 'BSIS',
                    name: 'Bachelor of Science in Information Science',
                    department: 'IT Dept'
                },
                {
                    code: 'BSEE',
                    name: 'Bachelor of Secondary Education',
                    department: 'Education Dept.'
                }
            ],
            headers: [
                {
                    text: 'Course Code',
                    value: 'code'
                },
                {
                    text: 'Course Name',
                    value: 'name'
                },
                {
                    text: 'Department',
                    value: 'department'
                }
            ],
            departments: [
                {
                    name: 'IT Department'
                },
                {
                    name: 'Education Department'
                }
            ]
        }
    }
}
</script>

<style>

</style>
