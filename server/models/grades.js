'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grades = sequelize.define('Grades', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    grade: DataTypes.STRING

  }, {});
  // eslint-disable-next-line no-unused-vars
  Grades.associate = function(models) {
    // associations can be defined here
    Grades.belongsTo(models.Subject, { foreignKey: 'SubjectId', as: 'subject'})
    Grades.belongsTo(models.User, {foreignKey: 'StudentId', as : 'student'})
  };
  return Grades;
};