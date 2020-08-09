<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card width="100%">
          <v-card-title>
            PRE ENROLLMENT FORM
            <v-spacer></v-spacer>
            <addButton
              v-if="items.length < 1 && action != 'edit'"
              @add="add"
            ></addButton>
            <editButton
              v-if="action != 'edit' && items.length > 0"
              @edit="edit"
            />
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
            </v-list>
            <v-data-table
              :headers="action == 'edit' ? headers : headers2"
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
                    )
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
    headers: Array,
    items: Array
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
