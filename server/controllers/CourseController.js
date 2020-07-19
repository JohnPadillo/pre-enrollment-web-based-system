const Course = require('../models').Course
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: '../src/public/uploads/',
//   filename: function(req, file, cb) {
//     cb(null, file.filename)
//   }
// })

// // init upload
// const upload = multer({
//   storage: storage
// }).single('courseImage')


module.exports = {
  // get all course
  async getCourses(req, res) {
    try {
      let response = await Course.findAll({
        include: ['students', 'subjects', 'department', 'curriculum']
      })
      let data =  await Promise.all(
        response.map(data => {
          let id = data.id
          let name = data.name
          let code = data.code
          let department = {
            id: data.department.id,
            name: data.department.name
          }
          let students = data.students.map(data => {
            let name = data.first_name + ' ' + data.last_name
            let email = data.email
            return {
              name: name,
              email: email
            }
            })
          let subjects =  data.subjects.map( data => {
            let id = data.id
            let code = data.code
            let name = data.name
            let units = data.units
            let prerequisites = data.prerequisites
            // let year =  curriculum.year
            // let semester =  curriculum.semester
            
            return {
              id: id,
              code: code,
              name: name,
              units: units,
              prerequisites: prerequisites,
              // year: year,
              // semester: semester
            }
  
          })
  
          let curriculum = data.curriculum.map(data => {
            let course_id = data.CourseId
            let subject_id = data.SubjectId
            let year = data.year
            let semester = data.semester
  
            return {
              course_id: course_id,
              subject_id: subject_id,
              year: year,
              semester: semester
            }
          })

          let courseImage = data.courseImage

  
  
          return {
            id: id,
            name: name,
            code: code,
            department: department,
            students: students,
            subjects: subjects,
            curriculum: curriculum,
            courseImage: courseImage
          }
        })
      )
      res.send(data)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to get all course'
      })
      console.log(`Error: ${error}`)
    }
    
  },

  async getCourse(req, res) {
    try {
      let response = await Course.findOne(
        {
          include: [
            'department'
          ],
          where: {
            id: req.params.id
          }
        }
      )
    

      let data = {
        id: response.id,
        name: response.name,
        code: response.code,
        department: {
          id: response.department.id,
          name: response.department.name
        },
        courseImage: req.courseImage
      }

      res.send(data)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to edit this course'
      })
      console.log(`Error: ${error}`)
    }
  },

  // Add course
  async addCourse(req, res) {
    try {
      let data = {
        code: req.body.code,
        name: req.body.name,
        DepartmentId: req.body.department,
        courseImage: req.file.filename
      }
      let response = await Course.create(data)
      
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        Error: 'Can`t Add Course'
      })
      console.log(`Error: ${error}`)
    }
  },

  // Edit course
  async editCourse(req, res){
    try {
     await Course.update(
        {
          name: req.body.name,
          code: req.body.code,
          DepartmentId: req.body.department,
          courseImage: req.file.filename
        },
        {
        where: {
          id: req.params.id
        }
      })

      let response = await Course.findOne ({
        where: {
          id: req.params.id
        }
      })
      res.send(response)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to edit this course'
      })
      console.log(`Error: ${error}`)
    }
  },

  // Delete Course
  async deleteCourse(req, res){
    try {
      let response = Course.destroy({
        where: {
          id: req.params.id
        }
      })

      res.send(response)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to delete this course'
      })
    }
  }
  
}
