import Api from "@/services/Api";

export default {
  addClass(params) {
    return Api().post("add/class", params);
  },
  getClasses() {
    return Api().get("classes");
  },
  getClass(id) {
    return Api().post(`class/${id}`);
  },
  editClass(params) {
    return Api().patch(`edit/class/${params.id}`, params);
  },
  deleteClass(id) {
    return Api().delete(`delete/class/${id}`);
  }
};
