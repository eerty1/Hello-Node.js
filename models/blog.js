'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    static associate(models) {
    }
  }
  blog.init({
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    short_description: DataTypes.TEXT,
    description: DataTypes.TEXT,
    photos: DataTypes.TEXT,
    dragNdrop: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'blog',
    timestamps: false
  });
  return blog;
};