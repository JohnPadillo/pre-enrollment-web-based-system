import Api from "@/services/Api";

export default {
  getSections() {
    return Api().get("sections");
  },
  getSection(id) {
    return Api().post(`section/${id}`);
  },
  addSection(params) {
    return Api().post("add/section", params);
  },
  editSection(params) {
    return Api().patch(`edit/section/${params.id}`, params);
  },
  deleteSection(id) {
    return Api().delete(`/delete/section/${id}`);
  }
};
