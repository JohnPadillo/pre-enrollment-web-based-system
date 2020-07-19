'use strict'
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'Schedule',
    {
      ClassId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER,
      SectionId: DataTypes.INTEGER,
      RoomId: DataTypes.INTEGER
    },
    {}
  )
  // eslint-disable-next-line no-unused-vars
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belongsTo(models.Class, {foreignKey: 'ClassId', as: 'class'})
    Schedule.belongsTo(models.Course, {foreignKey: 'CourseId', as: 'course'})
    Schedule.belongsTo(models.Section, {foreignKey: 'SectionId', as: 'section'})
    Schedule.belongsTo(models.Room, {foreignKey: 'RoomId', as: 'room'})

    // Schedule.belongsToMany(models.Room, {through: 'Class', as: 'room'})
    // Schedule.belongsToMany(models.Room, { 
    //     through: 'Class',
    //     foreignKey: 'RoomId',
    //     as: 'room'
    // })
  }
  return Schedule
}
