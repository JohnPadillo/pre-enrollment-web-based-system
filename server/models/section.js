'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    CourseId: DataTypes.INTEGER,
    year: DataTypes.STRING,
    semester: DataTypes.STRING
  }, {});
  // eslint-disable-next-line no-unused-vars
  Section.associate = function(models) {
    // associations can be defined here
    Section.belongsTo(models.Course, { foreignKey: 'CourseId', as: 'course'})
    Section.hasMany(models.User, {as: "students"})
  };
  return Section;
};