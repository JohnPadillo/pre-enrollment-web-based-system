<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card width="100%" height="700">
          <v-card-title>PRE ENROLLMENT FORM</v-card-title>
          <v-card-text>
            <v-list>
              <strong>Student Name:</strong>
              {{ name }}
              <br />
              <strong>Program:</strong>
              {{ course }}
            </v-list>
            <v-data-table
              :headers="headers"
              :items="items"
              disable-pagination
              hide-default-footer
              disable-filtering
              disable-sort
            >
              <template v-slot:item="props">
                <tr>
                  <td>{{ props.item.class_no }}</td>
                  <td>{{ props.item.course.name }}</td>
                  <td>{{ props.item.section.name }}</td>
                  <td>{{ props.item.subject.units }}</td>
                  <td>{{ props.item.day }}</td>
                  <td>{{ props.item.time_start }} - {{ props.item.time_end }}</td>
                  <td>{{ props.item.room.code }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    name: String,
    course: String,
    headers: Array,
    items: Array
  }
};
</script>

<style></style>
