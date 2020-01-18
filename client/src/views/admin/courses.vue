
<template>
<v-containter fluid>
    <v-layout>
      <v-flex>
          <toolbarNav
        :title='title'
      > 
      <addButton
        :title="title"
        @add="add"
        :loading="true"
      />
      
      <addDialog :dialog="openAddDialog" :title="title">
        <v-text-field
            label="Course Name"
            outlined
        ></v-text-field>
        <v-text-field
            label="Course Code"
            outlined
        ></v-text-field>
        <v-text-field
            label="Department"
            outlined
        ></v-text-field>
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
</v-containter>
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
        }
    },
    data() {
        return {
            title: 'Courses',
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
            ]
        }
    }
}
</script>

<style>

</style>
