import Api from "@/services/Api";

export default {
  getStudents() {
    return Api().get("students");
  }
};
