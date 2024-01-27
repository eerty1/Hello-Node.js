'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class portfolio extends Model {
    static associate(models) {
    }
  }
  portfolio.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    photos: DataTypes.TEXT,
    dragNdrop: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'portfolio',
    timestamps: false
  });
  return portfolio;
};