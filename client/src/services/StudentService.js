import Api from "@/services/Api";

export default {
  getStudents() {
    return Api().get("students");
  },
  getStudent(id) {
    return Api().post(`student/${id}`);
  },
  addStudent(params) {
    return Api().post("add/student", params);
  },
  editStudent(params) {
    return Api().patch(`edit/student/${params.id}`, params);
  },
  deleteStudent(id) {
    return Api().delete(`delete/student/${id}`);
  }
};
