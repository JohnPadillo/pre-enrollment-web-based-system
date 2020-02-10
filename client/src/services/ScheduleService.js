import Api from "@/services/Api";

export default {
  addSchedule(params) {
    return Api().post("add/schedule", params);
  },
  getSchedules() {
    return Api().get("schedules");
  }
};
