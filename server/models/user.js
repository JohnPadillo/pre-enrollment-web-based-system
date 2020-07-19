'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      first_name: DataTypes.STRING,
      middle_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      permanent_address: DataTypes.STRING,
      password: DataTypes.STRING,
      contact_no: DataTypes.STRING,
      name_of_guardian: DataTypes.STRING,
      contact_no_of_guardian: DataTypes.STRING,
      CourseId: DataTypes.INTEGER,
      SectionId: DataTypes.INTEGER,
      DepartmentId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      type: DataTypes.STRING
    },
    {}
  )
  // eslint-disable-next-line no-unused-vars
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Course, { foreignKey: 'CourseId', as: 'course' })
    User.belongsTo(models.Section, { foreignKey: 'SectionId', as: 'section' })
    User.belongsTo(models.Department, { foreignKey: 'DepartmentId', as: 'department'})
  }
  return User
}
