'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fee = sequelize.define('Fee', {
    name: DataTypes.STRING,
    amount: DataTypes.NUMBER
  }, {});
  // eslint-disable-next-line no-unused-vars
  Fee.associate = function(models) {
    // associations can be defined here
  };
  return Fee;
};