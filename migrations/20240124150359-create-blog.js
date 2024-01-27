'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      short_description: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      photos: {
        type: Sequelize.TEXT
      },
      dragNdrop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blogs');
  }
};