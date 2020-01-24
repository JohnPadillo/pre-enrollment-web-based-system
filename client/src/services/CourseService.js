import Api from "@/services/Api";

export default {
  getCourses() {
    return Api().get("courses");
  }
};
