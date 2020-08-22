const LoginController = require('../controllers/LoginController')
const CourseController = require('../controllers/CourseController')
const StudentController = require('../controllers/StudentController')
const DepartmentController = require('../controllers/DepartmentController')
const SubjectController = require('../controllers/SubjectController')
const CurriculumController = require('../controllers/CurriculumController')
const RoomController = require('../controllers/RoomController')
const SectionController = require('../controllers/SectionController')
const ClassController = require('../controllers/ClassController')
const ScheduleController = require('../controllers/ScheduleController')
const GradeController = require('../controllers/GradeController')
const StudentScheduleController = require('../controllers/StudentScheduleController.js')
const AdminController = require('../controllers/AdminController')

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
})
const upload = multer({
  storage: storage
})

// const config = {
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//   }
// };


module.exports = app => {
  app.post('/login', LoginController.login)

  // Courses
  app.get('/courses', CourseController.getCourses) // get all course
  app.post('/course/:id', CourseController.getCourse) // get single course
  app.post('/add/course', upload.single('courseImage'), CourseController.addCourse) // add course
  app.patch('/edit/course/:id', upload.single('courseImage'), CourseController.editCourse) // edit course
  app.delete('/delete/course/:id', CourseController.deleteCourse)

  // Students
  app.get('/students', StudentController.getStudents) // Get All Students
  app.post('/student/:id', StudentController.getStudent)  // Get Single Student
  app.post('/add/student', StudentController.addStudent) // Add Student
  app.patch('/edit/student/:id', StudentController.editStudent) // edit student
  app.delete('/delete/student/:id', StudentController.deleteStudent)

  // Department 
  app.get('/departments', DepartmentController.getDepartments) // Get All Department
  app.post('/department/:id', DepartmentController.getDepartment) // Get Single Department
  app.post('/add/department', DepartmentController.addDepartment) // Add Deparment
  app.patch('/edit/department/:id', DepartmentController.editDepartment) // Edit Department
  app.delete('/delete/deparment/:id', DepartmentController.deleteDepartment) // Delete Department

  // Subject
  app.get('/subjects', SubjectController.getSubjects) // Get all subjects
  app.get('/subject/:id', SubjectController.getSubject) // Get single subject
  app.post('/add/subject', SubjectController.addSubject) // Add subject
  app.patch('/edit/subject/:id', SubjectController.editSubject) // Edit Subject
  app.delete('/delete/subject/:id', SubjectController.deleteSubject) // Delete Subject

  // Curriculum
  app.post('/add/curriculum', CurriculumController.addCurriculum) // add curriculum
  app.get('/curriculums', CurriculumController.getCurriculums) // get all curriculum
  app.post('/curriculum/:id', CurriculumController.getCurriculum) // get single curriculum
  app.patch('/edit/curriculum/:id', CurriculumController.editCurriculum) // edit curriculum
  app.delete('/delete/curriculum/:id', CurriculumController.deleteCurriculum) // delete curriculum

  // Room
  app.post('/add/room', RoomController.addRoom) // add room
  app.get('/rooms', RoomController.getRooms) // get all rooms
  app.post('/room/:id', RoomController.getRoom) // get single room
  app.patch('/edit/room/:id', RoomController.editRoom) // update room
  app.delete('/delete/room/:id', RoomController.deleteRoom) // delete room

  // Section 
  app.post('/add/section', SectionController.addSection) // add section
  app.get('/sections', SectionController.getSections) // get all section
  app.post('/section/:id', SectionController.getSection) // get one section
  app.patch('/edit/section/:id', SectionController.editSection) // edit section
  app.delete('/delete/section/:id', SectionController.deleteSection) // delete section

  // Class
  app.post('/add/class', ClassController.addClass) // add class
  app.get('/classes', ClassController.getClasses) // get all classes
  app.post('/class/:id', ClassController.getClass) // get class
  app.patch('/edit/class/:id', ClassController.editClass) // edit class 
  app.delete('/delete/class/:id', ClassController.deleteClass) // delete class

  // Schedule
  app.post('/add/schedule', ScheduleController.addSchedule) // add schedule
  app.get('/schedules', ScheduleController.getSchedules) // get all schedule
  app.patch('/edit/schedule/:courseId/:sectionId', ScheduleController.editSchedule) // edit schedule
  app.delete('/delete/schedule/:courseId/:sectionId', ScheduleController.deleteSchedule) // delete schedule

  // Grade
  app.post('/add/grade', GradeController.addGrade) // add grade
  app.get('/grades/:studentId', GradeController.getGrades) // get all grades
  app.post('/grade/:studentId/:subjectId', GradeController.getGrade) // get grade
  app.patch('/edit/grade/:studentId', GradeController.editGrade) // edit grade

  // Student Schedule 
  app.get('/student-schedules', StudentScheduleController.getSchedules)
  app.post('/add/student-schedule', StudentScheduleController.addSchedule)
  app.get('/student-schedule/:studentId', StudentScheduleController.getSchedule)
  app.patch('/edit/student-schedule/:studentId', StudentScheduleController.editSchedule),
  app.delete('/delete/student-schedule/:studentId', StudentScheduleController.deleteSchedule)

  // Admins 
  app.post('/add/admin', AdminController.addAdmin)
  app.get('/admins', AdminController.getAdmins)
  app.post('/admin/:id', AdminController.getAdmin)
  app.patch('/edit/admin/:id', AdminController.editAdmin)
  app.delete('/delete/admin/:id', AdminController.deleteAdmin)
}
