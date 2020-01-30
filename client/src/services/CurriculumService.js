import Api from "@/services/Api";

export default {
  getCurriculums() {
    return Api().get("curriculums");
  },
  getCurriculum(id) {
    return Api().post(`curriculum/${id}`);
  },
  addCurriculum(params) {
    return Api().post("add/curriculum", params);
  },
  editCurriculum(params) {
    return Api().patch(`edit/curriculum/${params.id}`, params);
  },
  deleteCurriculum(id) {
    return Api().delete(`/delete/curriculum/${id}`);
  }
};
