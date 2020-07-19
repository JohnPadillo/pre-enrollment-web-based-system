const Schedule = require('../models').Schedule

module.exports = { 
  // add schedule
  async addSchedule(req, res) {
    try {
      let response = await Schedule.bulkCreate(req.body)
      res.send(response)
    } catch (error) {
      res.status(400).send({
        message: 'Unable to add schedule.',
        error: `${error}`
      })
    }
  },

  //get all schedules
  async getSchedules(req, res) {
    try {
      let data = await Schedule.findAll({
        include: ['class','course','section','room']
      })

      let response = await data.map(data => {
        return {
          id: data.id,
          ClassId: data.ClassId,
          CourseId: data.CourseId,
          SectionId: data.SectionId,
          RoomId: data.RoomId,
          class: {
            id: data.class.id,
            class_no: data.class.class_no,
            day: data.class.day,
            time_start: data.class.time_start,
            time_end: data.class.time_end
          },
          course: {
            id: data.course.id,
            name: data.course.name,
            code: data.course.code
          },
          section: {
            id: data.section.id,
            name: data.section.name,
            code: data.section.code,
            year: data.section.year,
            semester: data.section.semester
          },
          room: {
            id: data.room.id,
            name: data.room.name,
            code: data.room.code
          }
        }
      })
      res.send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        message: 'Unable to get all schedule.',
        error: `${error}`
      })
    }
  },

  async editSchedule(req, res){
    try {
      let data = await Schedule.findAll(
        {
          where: {
            CourseId: req.params.courseId,
            SectionId: req.params.sectionId
          }
        }
      )

      data = await data.map(data => {
        return {
          CourseId: data.CourseId,
          SectionId: data.SectionId,
          ClassId: data.ClassId,
          RoomId: data.RoomId
        }
      })
      
      console.log(data)
      // find data that has been remove
        let dataRemove = data.filter(function(obj) {
          return !req.body.some(function(obj2) {
            return obj2.ClassId == obj.ClassId
          })
        })
      
        // remove dataToRemove
        for(let i = 0 ; i < dataRemove.length ; i++){
          await Schedule.destroy({
            where: {
              CourseId: dataRemove[i].CourseId,
              SectionId: dataRemove[i].SectionId,
              ClassId: dataRemove[i].ClassId,
              // RoomId: dataRemove[i].RoomId
            }
          })
        }


      // find data that has been added
      let dataAdded = req.body.filter(function(obj) {
        return !data.some(function(obj2) {
          return obj2.ClassId == obj.ClassId
        })
      })

      await Schedule.bulkCreate(dataAdded)

      let newSchedule = await Schedule.findAll({
        include: ['class','course','section','room']
      })

      newSchedule = await newSchedule.map(data => {
        return {
          id: data.id,
          ClassId: data.ClassId,
          CourseId: data.CourseId,
          SectionId: data.SectionId,
          RoomId: data.RoomId,
          class: {
            id: data.class.id,
            class_no: data.class.class_no,
            day: data.class.day,
            time_start: data.class.time_start,
            time_end: data.class.time_end
          },
          course: {
            id: data.course.id,
            name: data.course.name,
            code: data.course.code
          },
          section: {
            id: data.section.id,
            name: data.section.name,
            code: data.section.code,
            year: data.section.year,
            semester: data.section.semester
          },
          room: {
            id: data.room.id,
            name: data.room.name,
            code: data.room.code
          }
        }
      })

      res.send(newSchedule)
      
      // res.send(dataAdded)
    } catch (error) {
      res.status(400).send({
        message: 'Unable to edit schedule.',
        error: `${error}`
      })
    }
  },

  async deleteSchedule(req, res){
    try {
      let response = await Schedule.destroy({
        where: {
          CourseId: req.params.courseId,
          SectionId: req.params.sectionId,
        }
      })
      res.sendStatus(200).send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        Error: `Unable to delete schedule`
      })
    }
  }
}