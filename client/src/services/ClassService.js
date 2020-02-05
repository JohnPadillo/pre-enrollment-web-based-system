import Api from "@/services/Api";

export default {
  addClass(params) {
    return Api().post("add/class", params);
  },
  getClasses() {
    return Api().get("classes");
  }
};
