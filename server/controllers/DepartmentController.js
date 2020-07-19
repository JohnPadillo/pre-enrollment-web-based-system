const Department = require('../models').Department

module.exports = {
  async getDepartments(req, res) {
    try {
      let response = await Department.findAll({
        include: 'courses'
      })

      let data = response.map(data => {
        let id  = data.id
        let name = data.name
        let courses = data.courses

        return {
          id: id,
          name: name,
          courses: courses
        }
      })
      res.send(data)
    } catch (error) {
      console.log(error)
    }
  },

  // Get Single Department
  async getDepartment(req, res) {
    try {
      // let response = req.params.id

      let response = await Department.findOne({
        where: {
          id: req.params.id
        }
      })

      if(response){
        res.status(200).send(response)
      } else {
        res.send('Department doesn`t exist')
      }

    } catch (error) {
      res.status(404).send({
        error: `No department found`
      })
    }
  },

  async addDepartment(req, res) {
    try {
      let response = await Department.create(req.body)
      res.status(201).send(response)
    } catch (error) {
      res.status()
    }
  }, 

  async editDepartment(req,res) {
    try {
      // let response = req.params.id
      Department.update(
       {
         name: req.body.name,
       },
       {where: {
        id: req.params.id
      }}
      )

      let response = Department.findOne({
        where: {
          id: req.params.id
        }
      })

      res.send(response)
    } catch (error) {
      res.status(400).send({
        Error: `Unable to edit this department ${error}`
      })
      console.log(error)
    }
  },

  async deleteDepartment(req, res){
    try {
      let response = Department.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        Error: `Unable to delete this department. Due to ${error}`
      })
    }
  }
}
