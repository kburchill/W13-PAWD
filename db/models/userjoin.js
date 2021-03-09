'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserJoin = sequelize.define('UserJoin', {
    userId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER
  }, {});
  UserJoin.associate = function(models) {
    // associations can be defined here
  };
  return UserJoin;
};