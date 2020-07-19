const Class = require('../models').Class

module.exports ={
  async addClass(req, res){
    try {
      let reqData = {
        class_no: req.body.class_no,
        CourseId: req.body.CourseId,
        SubjectId: req.body.SubjectId,
        SectionId: req.body.SectionId,
        RoomId: req.body.RoomId,
        day: req.body.day,
        time_start: req.body.time_start,
        time_end: req.body.time_end
      }

      // check room
      // check day
      // check time

      let response = await Class.findAll({
        where: {
          RoomId: req.body.RoomId
        }
      })

      if(await response){
        // res.send(`Conflict to Class No: ${response.class_no}`)
        let data = response.map(data => {
          return {
            class_no: data.class_no,
            CourseId: data.CourseId,
            SubjectId: data.SubjectId,
            SectionId: data.SectionId,
            RoomId: data.RoomId,
            day: data.day.split("/"),
            time_start: data.time_start,
            time_end: data.time_end
          }
        })
        
        let reqDay = (req.body.day).split("/")
        let conflictArray = []
        
        for(let i = 0 ; i < reqDay.length; i++){
          for(let j = 0 ; j < data.length ; j++){
            for(let k = 0 ; k < data[j].day.length ; k++){
              if(reqDay[i] == data[j].day[k]){
                // console.log(`Class_no: ${data[j].class_no}, Reqday: ${reqDay[i]}, DataDay: ${data[j].day[k]}, Data: ${data[j].day}`)
                if(!conflictArray.some(conflict => conflict.class_no == data[j].class_no)){
                  conflictArray.push(data[j])
                } 
              }
            }
          }
        }
        
       
        let conflicts = []
        
        if(conflictArray){
          // for(let i = 0 ; i < data.length - 1 ; i++){
          let conflict = await conflictArray.filter(conflict => {
            
            // Req.body.time_start 
            let reqTimeStart = req.body.time_start.split(":")
            reqTimeStart = reqTimeStart[0] + "" + reqTimeStart[1] 
            reqTimeStart =  parseInt(reqTimeStart)

            // Req.body.time_end 
            let reqTimeEnd = req.body.time_end.split(":")
            reqTimeEnd = reqTimeEnd[0] + "" + reqTimeEnd[1] 
            reqTimeEnd = parseInt(reqTimeEnd)

            // data.time_start
            let conflictTimeStart = conflict.time_start.split(":")
            conflictTimeStart =  conflictTimeStart[0] + "" + conflictTimeStart[1]
            conflictTimeStart =    parseInt(conflictTimeStart)

            // data.time_end
            let conflictTimeEnd = conflict.time_end.split(":")
            conflictTimeEnd =  conflictTimeEnd[0] + "" + conflictTimeEnd[1]
            conflictTimeEnd =    parseInt(conflictTimeEnd)

              // Logic to check if req.body has conflict to database data
              // (((reqTimeStart >= conflictTimeStart && reqTimeStart < conflictTimeEnd) || (reqTimeEnd > conflictTimeStart && reqTimeEnd < conflictTimeEnd)) || ((reqTimeStart < conflictTimeStart && reqTimeEnd > conflictTimeEnd)))
              return (((reqTimeStart >= conflictTimeStart && reqTimeStart < conflictTimeEnd) || (reqTimeEnd > conflictTimeStart && reqTimeEnd <= conflictTimeEnd)) || ((reqTimeStart < conflictTimeStart && reqTimeEnd > conflictTimeEnd)))
            }
          )
            
          conflicts = await conflict

          if(conflicts.length != 0){
            res.send({
              error: "Unable to add due to conflicts",
              conflict: conflicts
            })
          }
          else{
            let response = await Class.create(reqData)
            res.status(200).send(response)
          }
        }
        
        }
      // } else {
      //   res.send(data)
      // }




    } catch (error) {
      res.status(400).send({
        Error: 'Unable to add class'
      })
      console.log(`Error: ${error}`)
    }
  },

  // get classes
  async getClasses(req, res){
    try {
      let data = await Class.findAll(
        {
          include: ['course', 'subject', 'section', 'room', 'students']
        }
      )

      let response = await Promise.all(
        data.map(data => {
          return {
            id: data.id,
            class_no: data.class_no,
            // CourseId: data.CourseId,
            // SubjectId: data.SubjectId,
            // SectionId: data.SectionId,
            // RoomId: data.RoomId,
            course: {
              id: data.course.id,
              name: data.course.name,
              code: data.course.code
            },
            subject: {
              id: data.subject.id,
              name: data.subject.name,
              code: data.subject.code,
              units: data.subject.units,
              prerequisites: data.subject.prerequisites
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
              code: data.room.code,
              limit: data.room.limit
            },
            day: data.day,
            time_start: data.time_start,
            time_end: data.time_end,
            students: data.students.map(data => {
              return {
                id: data.id,
                UserId: data.UserId,
                ClassId: data.ClassId
              }
            })
          }
        })
      )
      res.send(response)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to get classes'
      })
      console.log(`Error: ${error}`)
    }
  },

  async getClass(req, res){
    try {
      let response = await Class.findOne(
        {
          include: ['course', 'subject', 'section', 'room'],
          where: {
            id: req.params.id
          }
        }
      )

      res.send(response)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to get class'
      })
      console.log(`Error: ${error}`)
    }
  },

  // update class
  async editClass(req, res){
    try {
      // let data = {
      //   class_no: req.body.class_no,
      //   CourseId: req.body.CourseId,
      //   SubjectId: req.body.SubjectId,
      //   SectionId: req.body.SectionId,
      //   RoomId: req.body.RoomId,
      //   day: req.body.day,
      //   time_start: req.body.time_start,
      //   time_end: req.body.time_end
      // }
      let response = await Class.update(
        {
          class_no: req.body.class_no,
          CourseId: req.body.CourseId,
          SubjectId: req.body.SubjectId,
          SectionId: req.body.SectionId,
          RoomId: req.body.RoomId,
          day: req.body.day,
          time_start: req.body.time_start,
          time_end: req.body.time_end
        },
        {
          where: {
            id: req.params.id
          }
        }
      )

      res.send(response)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to edit class'
      })
      console.log(`Error: ${error}`)
    }
  },

  //delete class
  async deleteClass(req, res){
    try {
      await Class.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to delete class'
      })
      console.log(`Error: ${error}`)
    }
  }
}