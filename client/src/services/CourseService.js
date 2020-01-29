import Api from "@/services/Api";

export default {
  getCourses() {
    return Api().get("subjects");
  },
  getCourse(id) {
    return Api().get(`subject/${id}`);
  },
  addCourse(params) {
    return Api().post("add/subject", params);
  },
  editCourse(params) {
    return Api().patch(`edit/subject/${params.id}`, params);
  },
  deleteCourse(id) {
    return Api().delete(`/delete/subject/${id}`);
  }
};
