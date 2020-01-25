import Api from "@/services/Api";

export default {
  getStudents() {
    return Api().get("students");
  },
  getStudent(params) {
    return Api().post("student", params);
  },
  addStudent(params) {
    return Api().post("add/student", params);
  }
};
