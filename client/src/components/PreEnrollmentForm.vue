<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card width="100%">
          <v-card-title>
            PRE ENROLLMENT FORM
            <v-spacer></v-spacer>
            <addButton
              v-if="
                items.length < 1 &&
                  action != 'edit' &&
                  $store.state.user.type === 'irregular'
              "
              @add="add"
            ></addButton>
            <editButton
              v-if="
                action != 'edit' &&
                  items.length > 0 &&
                  status !== 'PENDING' &&
                  status !== 'APPROVED' &&
                  status !== 'DISAPPROVED' &&
                  $store.state.user.type === 'irregular'
              "
              @edit="edit"
            />

            <enrollButton
              v-if="
                $store.state.user.type === 'regular' &&
                  status !== 'PENDING' &&
                  status !== 'APPROVED' &&
                  items.length
              "
              @enroll="saveEdit()"
            >
            </enrollButton>
            <saveButton
              v-if="action == 'edit' && items.length > 0"
              @save="saveEdit()"
            />
          </v-card-title>
          <v-card-text>
            <v-list>
              <strong>Student Name:</strong>
              {{ name }}
              <br />
              <strong>Program:</strong>
              {{ course }}
              <br />
              <div v-if="user">
                <strong>Year:</strong>
                {{
                  user.section.year == 1
                    ? "1st "
                    : user.section.year == 2
                    ? "2nd "
                    : user.section.year == 3
                    ? "3rd "
                    : user.section.year == 4
                    ? "4th "
                    : "-"
                }}
                <br />
                <strong>Semester:</strong>
                {{
                  user.section.semester == 1
                    ? "1st"
                    : user.section.semester == 2
                    ? "2nd"
                    : "3rd"
                }}
              </div>

              <br />
              <div v-if="status">
                <strong>Status:</strong>
                {{ status }}
              </div>
            </v-list>
            <v-data-table
              :headers="
                action == 'edit' && $store.state.user.type === 'irregular'
                  ? headers
                  : headers2
              "
              :items="items"
              disable-pagination
              hide-default-footer
              disable-filtering
              disable-sort
            >
              <template v-slot:item="props">
                <tr>
                  <td>{{ props.item.class_no }}</td>
                  <td>{{ props.item.subject.name }}</td>
                  <td>{{ props.item.section.name }}</td>
                  <td>{{ props.item.subject.units }}</td>
                  <td>{{ props.item.day }}</td>
                  <td>
                    {{ props.item.time_start }} - {{ props.item.time_end }}
                  </td>
                  <td>{{ props.item.room.name }}</td>
                  <td
                    v-if="
                      action == 'edit' && $store.state.user.type === 'irregular'
                    "
                  >
                    <removeButton @delete="deleteItem(props.item)" />
                  </td>
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
    action: String,
    name: String,
    course: String,
    user: Object,
    headers: Array,
    items: Array,
    status: String,
    type: String
  },

  data() {
    return {
      headers2: [
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

  mounted() {
    console.log(this.items);
  },

  methods: {
    add() {
      this.$emit("add");
    },
    edit() {
      this.$emit("edit");
    },
    deleteItem(data) {
      this.$emit("delete", data);
    },
    saveEdit() {
      this.$emit("saveEdit");
    }
  }
};
</script>

<style></style>
