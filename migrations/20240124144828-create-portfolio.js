'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('portfolios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('portfolios');
  }
};