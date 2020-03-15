<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <addDialog
          :action="action"
          :dialog="addDialog"
          :title="title"
          ref="addDialog"
          @close="closeAddDialog"
          @save="action == 'add' ? addRoom() : editRoom()"
        >
          <v-form ref="roomForm">
            <v-text-field
              :readonly="action == 'view'"
              label="Room Name"
              v-model="room_name"
              outlined
            ></v-text-field>
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
            <addButton v-if="$store.state.user.status == 1" :title="title" @add="add" />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="rooms"
            :search="search"
            dense
            :loading="roomLoading"
            loading-text="Loading..."
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.name }}</td>
                <td align="center">
                  <viewButton @view="viewRoom(props.item)" />
                  <editButton v-if="$store.state.user.status == 1" @edit="getEditItem(props.item)" />
                  <deleteButton
                    v-if="$store.state.user.status == 1"
                    @delete="getDeleteItem(props.item.id)"
                  />
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
          text: "Name",
          value: "name"
        },
        {
          text: "Actions",
          align: "center"
        }
      ],
      addDialog: false,
      room_name: "",
      room_id: "",
      confirmationDialog: false,
      roomLoading: false,
      confirmDialogTitle: "delete"
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      this.roomLoading = true;
      this.rooms = (await RoomService.getRooms()).data;
      this.roomLoading = false;
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
        name: this.room_name
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
    },

    viewRoom(data) {
      this.action = "view";
      this.room_id = data.id;
      this.room_name = data.name;
      this.addDialog = true;
    },

    async editRoom() {
      let data = {
        id: this.room_id,
        name: this.room_name
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
