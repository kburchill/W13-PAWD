'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectJoin = sequelize.define('ProjectJoin', {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  ProjectJoin.associate = function(models) {
    // associations can be defined here
  };
  return ProjectJoin;
};