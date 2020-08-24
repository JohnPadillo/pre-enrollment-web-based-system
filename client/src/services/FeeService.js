import Api from "@/services/Api";

export default {
  addFee(params) {
    return Api().post("add/fee", params);
  },
  getAllFees() {
    return Api().get("fees");
  },
  getFee(id) {
    return Api().post(`fee/${id}`);
  },
  editFee(params) {
    return Api().patch(`edit/fee/${params.id}`, params);
  },
  deleteFee(id) {
    return Api().delete(`delete/fee/${id}`);
  }
};
