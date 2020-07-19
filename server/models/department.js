'use strict'
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      name: DataTypes.STRING
    },
    {}
  )
  // eslint-disable-next-line no-unused-vars
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Course, { as: 'courses' })
  }
  return Department
}
