'use strict'
module.exports = (sequelize, DataTypes) => {
  const CourseSubject = sequelize.define(
    'CourseSubject',
    {
      CourseId: DataTypes.INTEGER,
      SubjectId: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      semester: DataTypes.INTEGER
    },
    {}
  )
  // eslint-disable-next-line no-unused-vars
  CourseSubject.associate = function(models) {
    CourseSubject.belongsTo(models.Course, { foreignKey: 'CourseId' , as: 'courses'})
    CourseSubject.belongsTo(models.Subject, { foreignKey: 'SubjectId' , as: 'subjects'})

    // associations can be defined here
  }
  return CourseSubject
}
