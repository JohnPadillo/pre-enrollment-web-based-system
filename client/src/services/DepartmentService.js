import Api from "@/services/Api";

export default {
  getDepartments() {
    return Api().get("departments");
  },
  addDepartment(params) {
    return Api().post("add/department", params);
  }
};
