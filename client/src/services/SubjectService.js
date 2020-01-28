import Api from "@/services/Api";

export default {
  getSubjects() {
    return Api().get("subjects");
  },
  getSubject(id) {
    return Api().get(`subject/${id}`);
  },
  addSubject(params) {
    return Api().post("add/subject", params);
  },
  editSubject(params) {
      return Api().patch(`edit/subject/${params.id}`, params)
  },
  deleteSubject(id){
      return Api().delete(`/delete/deparment/${id}`)
  }
};
