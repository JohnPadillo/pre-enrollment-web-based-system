import Api from "@/services/Api";

export default {
  getDepartments() {
    return Api().get("departments");
  },
  getDepartment(id) {
    return Api().post(`department/${id}`);
  },
  addDepartment(params) {
    return Api().post("add/department", params);
  },
  editDepartment(params) {
    // let data = params.id
    return Api().patch(`edit/department/${params.id}`, params);
  },
  deleteDepartment(id) {
    return Api().delete(`/delete/deparment/${id}`);
  }
};
