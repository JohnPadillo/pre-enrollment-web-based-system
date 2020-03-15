import Api from "@/services/Api";

export default {
  getAdmins() {
    return Api().get("admins");
  },

  addAdmin(params) {
    return Api().post("add/admin", params);
  },

  getAdmin(id) {
    return Api().post(`admin/${id}`);
  },

  updateAdmin(params) {
    return Api().patch(`edit/admin/${params.id}`, params);
  },

  deleteAdmin(id) {
    return Api().delete(`delete/admin/${id}`);
  }
};
