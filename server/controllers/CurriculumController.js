const CourseSubject = require('../models').CourseSubject
// const Course = require('../models').Course
// const Subject = require('../models').Subject


module.exports = {

  // create courseSubject
  async addCurriculum(req, res){
    try {

      let response = await CourseSubject.bulkCreate(req.body)
      res.send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        Error: `Unable to create curriculum`
      })
    }
  },
  // get all courseSubject
  async getCurriculums(req, res) {
    try {
      let response = await CourseSubject.findAll(
        {include: ['courses', 'subjects'] }
      )
      // let data = response.map( async data => {

      //   let subject = await Subject.findAll()
      //   return {
      //     subject: data.SubjectId,
      //     data: subject
      //   }
      // })
      // let course = await Course.findOne({
      //   where: {
      //     id: req.params.id
      //   }
      // })

      res.send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        Error: `Unable to get all curriculum`
      })
    }
  },


  // get single courseSubject
  async getCurriculum(req, res){
    try {
      let response = await CourseSubject.findAll({
        include: ['courses', 'subjects'],
        where: {
          CourseId: req.params.id
        }
      })

      response = response.map(data => {
        let subjects = {
          id: data.subjects.id,
          code: data.subjects.code,
          name: data.subjects.name,
          units: data.subjects.units,
          prerequisites: data.subjects.prerequisites,
          year: data.year,
          semester: data.semester
        }

        return {
          subject: subjects
       
        }
      })
      res.send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        Error: `Unable to get single curriculum`
      })
    }
  },


  // edit courseSubject

  async editCurriculum(req, res){
    try {
     let response = await CourseSubject.findAll({
       where: {
         CourseId: req.params.id
       }
     })

     response = response.map(data => {
       let CourseId = data.CourseId
       let SubjectId = data.SubjectId
       let year = data.year
       let semester = data.semester
       return {
         CourseId: CourseId,
         SubjectId: SubjectId,
         year: year,
         semester: semester
       }
     })

     let arrayData = []
     let data = req.body
     for(let i = 0; i < data.length ; i++){
      arrayData.push(data[i])
     }


     // Find data to be remove
    let toRemove = response.filter(function(obj) {
      return !arrayData.some(function(obj2) {
          return obj.SubjectId == obj2.SubjectId && obj.year == obj2.year && obj.semester == obj2.semester;
      });
  });


  let dataToRemove = toRemove.map(data => {
    let SubjectId = data.SubjectId
    let CourseId = data.CourseId
    let year = data.year
    let semester = data.semester
    return {
      SubjectId: SubjectId,
      CourseId: CourseId,
      year: year,
      semester: semester
    }
  })

  for(let i = 0; i < dataToRemove.length ; i++){
    await CourseSubject.destroy({
      where: {
        CourseId: dataToRemove[i].CourseId,
        SubjectId: dataToRemove[i].SubjectId,
        year: dataToRemove[i].year,
        semester: dataToRemove[i].semester
      }
    })
  }


  // Find data to add
  let toAdd = arrayData.filter(function(obj) {
    return !response.some(function(obj2) {
        return obj.SubjectId == obj2.SubjectId && obj.year == obj2.year && obj.semester == obj2.semester;
    });
  });


  await CourseSubject.bulkCreate(toAdd) 

  let newArray = await CourseSubject.findAll({
    where: {
      CourseId: req.params.id
    }
  })

     res.send(newArray)
    console.log(dataToRemove.length)
    res.send(dataToRemove)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        Error: `Unable to edit curriculum`
      })
    }
  },


  // delete courseSubject

  async deleteCurriculum(req, res){
    try {
      let response = await CourseSubject.destroy({
        where: {
          CourseId: req.params.id
        }
      })

      res.sendStatus(200).send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        Error: `Unable to delete curriculum`
      })
    }
  }

  
}
