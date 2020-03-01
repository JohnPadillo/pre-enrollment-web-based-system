import Api from "@/services/Api";

export default {
  addGrade(params) {
    return Api().post("add/grade", params);
  },
  getGrades(params) {
    return Api().get(`grades/${params}`);
  },
  getGrade(params) {
    return Api().post(`grade/${params.StudentId}/${params.SubjectId}`, params);
  },
  editGrade(params) {
    return Api().patch(`edit/grade/${params[0].studentId}`, params);
  }
};
