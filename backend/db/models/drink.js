'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define('Drink', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Drink.associate = function(models) {
    // associations can be defined here
    Drink.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Drink.hasMany(models.Checkin, {
      foreignKey: 'drinkId'
    });
  };
  return Drink;
};