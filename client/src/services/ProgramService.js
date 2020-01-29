import Api from "@/services/Api";

export default {
  getPrograms() {
    return Api().get("courses");
  },
  getProgram(id) {
    return Api().post(`course/${id}`);
  },
  addProgram(params) {
    return Api().post("add/course", params);
  },
  editProgram(params) {
    return Api().patch(`edit/course/${params.id}`, params);
  },
  deleteProgram(id) {
    return Api().delete(`delete/course/${id}`);
  }
};
