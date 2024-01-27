'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('portfolios', [{
      name: "test title",
      description: "test description",
      photos: "test photos"
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('portfolios', null, {});
  }
};
