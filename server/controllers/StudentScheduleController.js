const StudentSchedule = require('../models').StudentSchedule

module.exports = {
  async getSchedules(req, res){
    try {
      let response = await StudentSchedule.findAll({
        include: ['student', 'class']
      })

    res.send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send(
        'Unable to get students schedule'
      )
    }
  },

  async addSchedule(req, res) {
    try {
      let response = await StudentSchedule.bulkCreate(req.body)
      res.status(201).send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send(
        'Unable to add student schedule'
      )
    }
  },

  // get student schedule 
  async getSchedule(req, res){
    try {
      let response = await StudentSchedule.findAll(
        {
          include: ['student', 'class'],
          where: {
            UserId: req.params.studentId
          }
        }
      )

      response = await Promise.all(
        response.map(data => {
          return {
            id: data.id,
            student: {
              id: data.student.id,
              courseId: data.student.CourseId,
              sectionId: data.student.SectionId
            },
            class: {
              id: data.class.id,
              class_no: data.class.class_no,
              course_id: data.class.CourseId,
              subject_id: data.class.SubjectId,
              section_id: data.class.SectionId,
              room_id: data.class.RoomId,
              day: data.class.day,
              time_start: data.class.time_start,
              time_end: data.class.time_end
            }
          }
        })
      )

      res.status(200).send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send(
        'Unable to get student schedule'
      )
    }
  },

  // edit schedule

  async editSchedule(req,res){
    console.log(req.body);
    try {
      let data = await StudentSchedule.findAll(
        {
          where: {
            UserId: req.params.studentId
          }
        }
      )
      
      let reqData = req.body
      // data removed 
      let removedData = data.filter(function(obj){
        return !reqData.some(function(obj2){
          return obj.ClassId == obj2.ClassId
        })
      })

      for(let item of removedData){
        await StudentSchedule.destroy(
          {
            where: {
              UserId: item.UserId,
              ClassId: item.ClassId,
            }
          }
        )
      }

      // data added 
      let addedData = reqData.filter(function(obj){
        return !data.some(function(obj2){
          return obj.ClassId == obj2.ClassId
        })
      })

      if(addedData.length < 1) {
        console.log(data);
        req.body.forEach(async data => {
          await StudentSchedule.update(data, 
            {
              where: {
                UserId: data.UserId,
                ClassId: data.ClassId,
              }
            }
          );
        })
      }
      
      await StudentSchedule.bulkCreate(addedData)

      let newData = await StudentSchedule.findAll(
        {
          where: {
            UserId: req.params.studentId
          }
        }
      )
      res.send(newData)
      // res.send(data)
    } catch (error) {
      console.log(error)
      res.status(400).send(
        'Unable to edit student schedule'
      )
    }
  },
}