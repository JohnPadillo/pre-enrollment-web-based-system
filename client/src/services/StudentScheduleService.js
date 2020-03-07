import Api from "@/services/Api";

export default {
  getSchedule(id) {
    return Api().get(`student-schedule/${id}`);
  },
  addSchedule(params) {
    return Api().post("add/student-schedule", params);
  },
  editSchedule(params) {
    return Api().patch(`edit/student-schedule/${params[0].UserId}`, params);
  }
};
