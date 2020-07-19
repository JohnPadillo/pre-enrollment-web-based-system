'use strict'
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Class',
    {
      class_no: DataTypes.STRING,
      CourseId: DataTypes.INTEGER,
      SubjectId: DataTypes.INTEGER,
      SectionId: DataTypes.INTEGER,
      RoomId: DataTypes.INTEGER,
      day: DataTypes.STRING,
      time_start: DataTypes.STRING,
      time_end: DataTypes.STRING
    },
    {}
  )
  // eslint-disable-next-line no-unused-vars
  Class.associate = function(models) {
    // associations can be defined here
    Class.belongsTo(models.Course, { foreignKey: 'CourseId', as: 'course' })
    Class.belongsTo(models.Subject, { foreignKey: 'SubjectId', as: 'subject' })
    Class.belongsTo(models.Section, { foreignKey: 'SectionId', as: 'section' })
    Class.belongsTo(models.Room, { foreignKey: 'RoomId', as: 'room' })
    Class.hasMany(models.StudentSchedule, { as: 'students'}) 

    // Class.belongsTo(models.Schedule, { foreignKey: 'id', as: 'classes' })
  }
  return Class
}
