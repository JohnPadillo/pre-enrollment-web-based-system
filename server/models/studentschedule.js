/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentSchedule = sequelize.define('StudentSchedule', {
    UserId: DataTypes.INTEGER,
    ClassId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    ph_status: DataTypes.STRING
  }, {});
  StudentSchedule.associate = function(models) {
    // associations can be defined here
    StudentSchedule.belongsTo(models.User, { foreignKey: 'UserId', as: 'student'})
    StudentSchedule.belongsTo(models.Class, { foreignKey: 'ClassId', as: 'class'})
  };''
  return StudentSchedule;
};