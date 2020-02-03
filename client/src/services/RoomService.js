import Api from "@/services/Api";

export default {
  addRoom(params) {
    return Api().post("add/room", params);
  },
  getRooms() {
    return Api().get("rooms");
  },
  getRoom(id) {
    return Api().post(`room/${id}`);
  },
  editRoom(params) {
    return Api().patch(`edit/student/${params.id}`, params);
  },
  deleteRoom(id) {
    return Api().delete(`delete/room/${id}`);
  }
};
