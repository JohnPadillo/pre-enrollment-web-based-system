'use strict'
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    'Subject',
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      units: DataTypes.STRING,
      prerequisites: DataTypes.STRING,
      fee: DataTypes.STRING
    },
    {}
  )
  // eslint-disable-next-line no-unused-vars
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.belongsToMany(models.Course, {
      through: 'CourseSubject',
      foreignKey: 'SubjectId',
      as: 'courses'
    })
    Subject.hasMany(models.CourseSubject, { as: 'curriculum' })
    // Subject.belongsTo(models.Grades, {as: 'grade'})  
  }
  return Subject
}
