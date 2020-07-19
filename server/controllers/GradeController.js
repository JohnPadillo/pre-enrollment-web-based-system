const Grades =  require('../models').Grades

module.exports = {
  // add grade 
  async addGrade(req, res){
    try {
      let data = {
        StudentId: req.body.StudentId,
        SubjectId: req.body.SubjectId,
        grade: req.body.grade
      }
      let response = await Grades.create(data)
      res.status(200).send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send(
        {
          Error: `Unable to add grade due to ${error}`
        }
      )
    }
  },

  async getGrades(req, res){
    try {
      let response = await Grades.findAll(
        {
          include: ['subject', 'student'],
          where: {
            StudentId: req.params.studentId,
          }
        }
      )

      response = response.map(data => {
        return {
          id: data.id,
          grade: data.grade,
          student: {
            id: data.student.id,
            name: data.student.first_name + ' ' + data.student.last_name,
            courseId: data.student.CourseId,
            sectionId: data.student.SectionId
          },
          subject: {
            id: data.subject.id,
            code: data.subject.code,
            name: data.subject.name,
            units: data.subject.units,
            prerequisites: data.subject.prerequisites
          }
        }
      })
      res.send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send(
        {
          Error: `Unable to get all grades due to ${error}`
        }
      )
    }
  },
  // get grade
  async getGrade(req, res){
    try {
      let response = await Grades.findAll(
        {
          include: ['subject', 'student'],
          where: {
            StudentId: req.params.studentId,
            SubjectId: req.params.subjectId
          }
        }
      )

      response = response.map(data => {
        return {
          id: data.id,
          grade: data.grade,
          student: {
            id: data.student.id,
            name: data.student.first_name + ' ' + data.student.last_name,
            courseId: data.student.CourseId,
            sectionId: data.student.SectionId
          },
          subject: {
            id: data.subject.id,
            code: data.subject.code,
            name: data.subject.name,
            units: data.subject.units,
            prerequisites: data.subject.prerequisites
          }
        }
      })
      res.send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send(
        {
          Error: `Unable to get grade due to ${error}`
        }
      )
    }
  },
  // update grade
  async editGrade(req, res){
    try {
      let gradesData = await Grades.findAll(
        {
          include: ['subject', 'student'],
          where: {
            StudentId: req.params.studentId
          }
        }
      )

      gradesData = await Promise.all(
        gradesData.map(data => {
          return {
            id: data.id,
            grade: data.grade,
            student: {
            id: data.student.id,
            name: data.student.first_name + ' ' + data.student.last_name,
            courseId: data.student.CourseId,
            sectionId: data.student.SectionId
            },
            subject: {
              id: data.subject.id,
              code: data.subject.code,
              name: data.subject.name,
              units: data.subject.units,
              prerequisites: data.subject.prerequisites
            }
          }
        })
      )

      let reqData = req.body

      let gradesAdded = reqData.filter(function(obj) {
        return !gradesData.some(function(obj2) {
          return obj.subjectId == obj2.subject.id
        })
      })

      if(gradesAdded.length > 0){
        let gradesToBeAdd = gradesAdded.map(data => {
          return {
            StudentId: req.params.studentId,
            SubjectId: data.subjectId,
            grade: data.grade
          }
        })
        await Grades.bulkCreate(gradesToBeAdd)

        let updateExistingData = gradesData.filter(grade => {
          return reqData.some(data => {
            return data.subjectId == grade.subject.id
          })
        })

        // console.log(updateExistingData)
        reqData = req.body.filter(data => {
          return updateExistingData.some(existData => {
            return data.subjectId == existData.subject.id
          })
        })

        for(let i = 0; i < updateExistingData.length; i++){
            console.log(reqData[i])
            let data = {
              SubjectId: reqData[i].subjectId,
              grade: reqData[i].grade
            }

            Grades.update(data, {
              where: {
                StudentId: req.params.studentId,
                SubjectId: data.SubjectId
              }
            })
        }
        res.sendStatus(201)
      } else {
        let bodyLength = req.body.length

      for(let i = 0; i < bodyLength; i++){
        let data = {
          SubjectId: req.body[i].subjectId,
          grade: req.body[i].grade
        }
         Grades.update(data, {
          where: {
            StudentId: req.params.studentId,
            SubjectId: data.SubjectId
          }
        })
      }
      res.sendStatus(200)
      }
      

      res.send(gradesData)
    } catch (error) {
      console.log(error)
      res.status(400).send(
        {
          Error: `Unable to edit grade due to ${error}`
        }
      )
    }
  }
  // delete grade
}