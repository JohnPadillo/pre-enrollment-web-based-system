const User = require('../models').User

module.exports = {
  async addAdmin(req, res){

     try {
      let data = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        permanent_address: req.body.permanent_address,
        password: req.body.password,
        contact_no: req.body.contact_no,
        DepartmentId: req.body.departmentId,
        status: req.body.role
      }

      let response = await User.create(data)
      res.status(200).send(response)
     } catch (error) {
      res.status(400).send({
        Error: 'Unable to create admin.'
      })
     }
    
  },

  async getAdmin(req, res){
    try {
      let response = await User.findOne({
        include: ['department'],
        where: {
          id: req.params.id
        }
      })

      let data = {
           id: response.id,
            first_name: response.first_name,
            middle_name: response.middle_name,
            last_name: response.last_name,
            email: response.email,
            password: response.password,
            permanent_address: response.permanent_address,
            contact_no: response.contact_no,
            department: {
              id: response.department.id,
              name: response.department.name
            },
            status: response.status
      }

      res.status(200).send(data)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        Error: 'Unable to find admin.'
      })
    }
  },

  async getAdmins(req, res){
    let response = await User.findAll(
      {
        include: ['department']
      }
    )

    let data = await Promise.all(
      response.filter(data => {
        return data.status == 2 || data.status == 3 || data.status == 1
      })
    )

    let finalData = await Promise.all(
      data.map(response => {
        return {
          id: response.id,
          first_name: response.first_name,
          middle_name: response.middle_name,
          last_name: response.last_name,
          email: response.email,
          password: response.password,
          permanent_address: response.permanent_address,
          contact_no: response.contact_no,
          department: response.department ? {
            id: response.department.id,
            name: response.department.name
          } : "",
          status: response.status
        }
      })
    )

    res.send(finalData)
  },

  async editAdmin(req, res){
    try {
      let response = await User.update(
        {
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          email: req.body.email ,
          permanent_address: req.body.permanent_address,
          password: req.body.password,
          contact_no: req.body.contact_no,
          DepartmentId: req.body.departmentId,
          status: req.body.role
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.send(response)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        Error: 'Unable to edit admin'
      })
    }
  },

  async deleteAdmin(req, res){
    try {
      let response = User.destroy({
        where: {
          id: req.params.id
        }
      })

      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to delete admin.'
      })
    }
  }
}