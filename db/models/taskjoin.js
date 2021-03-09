'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskJoin = sequelize.define('TaskJoin', {
    taskId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  TaskJoin.associate = function(models) {
    // associations can be defined here
  };
  return TaskJoin;
};