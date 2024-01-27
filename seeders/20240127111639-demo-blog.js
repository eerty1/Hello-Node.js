'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('blogs', [{
        title: "test title",
        subtitle: "test subtitle",
        short_description: "test short-description",
        description: "test description",
        photos: "test photos"
      }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('blogs', null, {});
  }
};
