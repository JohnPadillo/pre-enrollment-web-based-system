<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :dialog="addDialog"
          :title="title"
          ref="addDialog"
          @close="closeAddDialog"
          @save="action == 'add' ? addRoom() : editRoom()"
        >
          <v-form ref="roomForm">
            <v-text-field label="Room Name" v-model="room_name" outlined></v-text-field>
            <v-text-field label="Room Code" v-model="room_code" outlined></v-text-field>
          </v-form>
        </addDialog>
        <confirmationDialog
          :dialog="confirmationDialog"
          :title="confirmDialogTitle"
          @no="closeConfirmDialog"
          @yes="deleteRoom"
        ></confirmationDialog>
        <v-card>
          <v-card-title>
            Rooms
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              clearable
            ></v-text-field>
            <addButton :title="title" @add="add" />
          </v-card-title>
          <v-data-table :headers="headers" :items="rooms" :search="search" dense>
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td align="center">
                  <editButton @edit="getEditItem(props.item)" />
                  <deleteButton @delete="getDeleteItem(props.item.id)" />
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
import RoomService from "@/services/RoomService";
export default {
  data() {
    return {
      title: "Room",
      search: "",
      action: "",
      rooms: [],
      headers: [
        {
          text: "Code"
        },
        {
          text: "Name"
        },
        {
          text: "Actions"
        }
      ],
      addDialog: false,
      room_name: "",
      room_code: "",
      room_id: "",
      confirmationDialog: false,
      confirmDialogTitle: "delete"
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      this.rooms = (await RoomService.getRooms()).data;
      console.log(this.rooms);
    },
    closeAddDialog() {
      this.addDialog = false;
    },
    add() {
      this.action = "add";
      this.addDialog = true;
    },
    async addRoom() {
      let data = {
        name: this.room_name,
        code: this.room_code
      };

      await RoomService.addRoom(data);
      this.getRooms();
      this.closeAddDialog();
      this.resetRoomForm();
    },
    getEditItem(data) {
      this.action = "edit";
      this.addDialog = true;
      this.room_id = data.id;
      this.room_name = data.name;
      this.room_code = data.code;
    },

    async editRoom() {
      let data = {
        id: this.room_id,
        name: this.room_name,
        code: this.room_code
      };

      await RoomService.editRoom(data);
      this.getRooms();
      this.closeAddDialog();
      this.resetRoomForm();
    },
    getDeleteItem(id) {
      this.room_id = id;
      this.confirmationDialog = true;
    },
    async deleteRoom() {
      await RoomService.deleteRoom(this.room_id);
      this.confirmationDialog = false;
      this.getRooms();
    },
    closeConfirmDialog() {
      this.confirmationDialog = false;
    },

    resetRoomForm() {
      this.$refs.roomForm.reset();
    }
  }
};
</script>

<style></style>
