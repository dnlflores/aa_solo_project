'use strict';

module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    userId: DataTypes.INTEGER,
    drinkId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    location: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {});
  Checkin.associate = function(models) {
    // associations can be defined here
    Checkin.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    
    Checkin.belongsTo(models.Drink, {
      foreignKey: 'drinkId'
    });
  };
  return Checkin;
};