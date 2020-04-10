import Api from "@/services/Api";

export default {
  getPrograms() {
    return Api().get("courses");
  },
  getProgram(id) {
    return Api().post(`course/${id}`);
  },
  addProgram(params) {
    const formData = new FormData();
    formData.append("name", `${params.name}`);
    formData.append("code", `${params.code}`);
    formData.append("department", `${params.department}`);
    formData.append("courseImage", params.courseImage);

    return Api().post("add/course", formData, {
      headers: { "content-type": "multipart/form-data" }
    });
  },
  editProgram(params) {
    const formData = new FormData();
    formData.append("name", `${params.name}`);
    formData.append("code", `${params.code}`);
    formData.append("department", `${params.department}`);
    formData.append("courseImage", params.courseImage);

    return Api().patch(`edit/course/${params.id}`, formData, {
      headers: { "content-type": "multipart/form-data" }
    });
  },
  deleteProgram(id) {
    return Api().delete(`delete/course/${id}`);
  }
};
