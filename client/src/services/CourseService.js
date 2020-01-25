import Api from "@/services/Api";

export default {
  getCourses() {
    return Api().get("courses");
  },
  addCourse(params) {
    return Api().post("add/course", params);
  }
};
