const User = require('../models').User

module.exports = {
  async getStudents(req, res) {
    try {
      let response = await User.findAll({
        where: {
          status: 0
        },
        include: ['course', 'section']
      })

     

      let students = response.map(student => {
        let id = student.id
        let name = student.first_name + ' ' + student.last_name
        let email = student.email;
        let permanent_address = student.permanent_address
        let contact_no = student.contact_no
        let name_of_guardian = student.name_of_guardian
        let contact_no_of_guardian = student.contact_no_of_guardian
        let course = { id: student.CourseId, name: student.course.name, code: student.course.code }
        let section = student.section
        let status = student.status
        let type = student.type
        let departmentId = student.DepartmentId
        // student.section ? { id: student.SectionId ? student.SectionId : "", name: student.section.name ? student.section.name : ""} : null
        return {
          id: id,
          name: name,
          email: email,
          permanent_address: permanent_address,
          contact_no: contact_no,
          name_of_guardian: name_of_guardian,
          contact_no_of_guardian: contact_no_of_guardian,
          course: course,
          section: section,
          status: status,
          type: type,
          departmentId
        }
      })
    
      res.send(students)
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  },

  async addStudent(req, res) {
    try {
  
        let data = {
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          email: req.body.email,
          permanent_address: req.body.permanent_address,
          password: req.body.password,
          contact_no: req.body.contact_no,
          name_of_guardian: req.body.name_of_guardian,
          contact_no_of_guardian: req.body.contact_no_of_guardian,
          CourseId: req.body.course,
          SectionId: req.body.section,
          status: 0,
          type: req.body.type,
          DepartmentId: req.body.departmentId
        }
        
        let response = await User.create(data)
  
        res.status(200).send(response)

      
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to add student.'
      })
      console.log(error)
    }
  },

  async getStudent(req, res){
    try {
      let response = await User.findOne({
        where: {
          id: req.params.id
        },
        include: ['course','section']
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
          name_of_guardian: response.name_of_guardian,
          contact_no_of_guardian: response.contact_no_of_guardian,
          course: {
              id: response.course.id,
              name: response.course.name,
              code: response.course.code
          },
          section: response.section ? {
            id: response.section.id,
            name: response.section.name
          } : null,
          status: response.status,
          type: response.type,
          departmentId: response.DepartmentId
      }

      res.status(200).send(data)
    } catch (error) {
      res.status(400).send({
        Error: 'Student Does Not Exist.'
      })
      console.log(error)
    }
  },

  async editStudent(req, res){
    try {
      let response = User.update(
        {
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          email: req.body.email,
          permanent_address: req.body.permanent_address,
          password: req.body.password,
          contact_no: req.body.contact_no,
          name_of_guardian: req.body.name_of_guardian,
          contact_no_of_guardian: req.body.contact_no_of_guardian,
          CourseId: req.body.course,
          SectionId: req.body.section,
          type: req.body.type,
          status: req.body.status,
          DepartmentId: req.body.departmentId
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
        Error: 'Unable to edit.'
      })
    }
  },

  async deleteStudent(req, res){
    try {
      let response = User.destroy({
        where: {
          id: req.params.id
        }
      })

      res.status(200).send(response)
    } catch (error) {
      res.status(400).send({
        Error: 'Unable to delete student.'
      })
    }
  }
}
