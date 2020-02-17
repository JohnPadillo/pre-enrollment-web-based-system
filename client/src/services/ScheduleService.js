import Api from "@/services/Api";

export default {
  addSchedule(params) {
    return Api().post("add/schedule", params);
  },
  getSchedules() {
    return Api().get("schedules");
  },
  editSchedule(params) {
    return Api().patch(
      `edit/schedule/${params[0].CourseId}/${params[0].SectionId}`,
      params
    );
  },
  deleteSchedule(params) {
    return Api().delete(
      `delete/schedule/${params.CourseId}/${params.SectionId}`
    );
  }
};
