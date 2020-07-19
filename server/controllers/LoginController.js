const User = require('../models').User

module.exports = {
  async login(req, res){
    try {
      let response = await User.findOne({
        where: {
          email: req.body.email
        },
        include: ['course', 'section', 'department']
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
          name_of_guardian: response.name_of_guardian ? response.name_of_guardian : null,
          contact_no_of_guardian: response.contact_no_of_guardian ? response.contact_no_of_guardian : null,
          course: response.course ? {
            id: response.course.id,
            name: response.course.name,
            code: response.course.code,
            DepartmentId: response.course.DepartmentId,
            courseImage: response.course.courseImage
        } : null,
          section: response.section ? {
            id: response.section.id,
            name: response.section.name,
            year: response.section.year,
            semester: response.section.semester
          } : null,
          status: response.status,
          department: response.department ? {
            id: response.department.id,
            name: response.department.name
          } : null,
          type: response.type ? response.type : ''
      }
      // console.log(data);
      res.status(200).send(data)
    } catch (error) {
      res.status(400).send({
        Error: 'Student Does Not Exist.'
      })
      console.log(error)
    }
  },
}
