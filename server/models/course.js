'use strict'
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      DepartmentId: DataTypes.INTEGER,
      courseImage: DataTypes.STRING
    },
    {}
  )
  // eslint-disable-next-line no-unused-vars
  Course.associate = function(models) {
    // associations can be defined here
    Course.hasMany(models.User, { as: 'students' })
    Course.belongsTo(models.Department, {
      foreignKey: 'DepartmentId',
      as: 'department'
    })
    Course.belongsToMany(models.Subject, {
      through: 'CourseSubject',
      foreignKey: 'CourseId',
      as: 'subjects'
    })
    Course.hasMany(models.CourseSubject, { as: 'curriculum' })  
    // relation to section model
    Course.hasMany(models.Section, { as: 'sections' })
  }
  return Course
}
