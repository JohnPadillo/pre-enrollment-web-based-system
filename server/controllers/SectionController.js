const Section = require('../models').Section

module.exports = {

  // add section
  async addSection(req, res){
    try {
      let data = {
        name: req.body.name,
        code: req.body.code,
        CourseId: req.body.CourseId,
        year: req.body.year,
        semester: req.body.semester
      }
      let response = await Section.create(data)

      res.status(201).send(response)
    } catch (error) {
      res.status(400).send({
        error: `Unable to add section`
      })
    }
  },

  // get all section
  async getSections(req, res){
    try {
      let response = await Section.findAll({
        include: 'course'
      })

      let data = response.map(data => {
        return {
          id: data.id,
          name: data.name,
          code: data.code,
          course: {
            id: data.course.id,
            name: data.course.name,
            code: data.course.code
          },
          year: data.year,
          semester: data.semester
        }
      })
      res.status(200).send(data)
    } catch (error) {
      res.status(400).send({
        error: `Unable to get all section`
      })
    }
  },

  // get one section
  async getSection(req, res){
    try {
      let response = await Section.findOne(
        {
          where: {
            id: req.params.id
          },
          include: ['course']
        }
      )

      let data = {
          id: response.id,
          name: response.name,
          code: response.code,
          course: {
            id: response.course.id,
            name: response.course.name,
            code: response.course.code
          },
          year: response.year,
          semester: response.semester
        }
   
      res.status(200).send(data)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        error: `Unable to get section`
      })
    }
  },

  // update section
  async editSection(req, res){
    try {
      let data = {
        name: req.body.name,
        code: req.body.code,
        CourseId: req.body.CourseId,
        year: req.body.year,
        semester: req.body.semester
      }

      let response = Section.update(
        data,
        {
          where: {
            id: req.params.id
          }
        }
      )
      
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        error: `Unable to edit section`
      })
    }
  },

  // delete section
  async deleteSection(req, res){
    try {
      await Section.destroy({
        where: {
          id: req.params.id
        }
      })
      res.sendStatus(200)
    } catch (error) {
      res.status(400).send({
        error: `Unable to delete section`
      })
    }
  }
}