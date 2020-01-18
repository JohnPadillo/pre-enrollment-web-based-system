
<template>
<v-layout>
      <v-flex>
      <h1>Subjects</h1>

          <v-data-table
            :headers="headers"
            :items="subjects"
          >  
          </v-data-table>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
    data() {
        return {
            subjects: [
               {
                   name: 'English or English for ESL Learners (4, SA)',
                   code: 'EN4',
                   prereqeuisite: [
                       'English',
                       'Literature', 
                       'English and Literature, or English as an Additional Language (Units 3 & 4 C)'
                   ]
               }
            ],
            headers: [
                {
                    text: 'Subject Name',
                    value: 'name'
                },
                {
                    text: 'Sunject Code',
                    value: 'code'
                },
                {
                    text: 'Prerequisite',
                    value: 'prereqeuisite'
                }
            ]
        }
    }
}
</script>

<style>

</style>
