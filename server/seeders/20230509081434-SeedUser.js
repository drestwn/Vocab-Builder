'use strict';
const { hashPassword } = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/user.json')
    data.map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPassword(el.password)
    })
    await queryInterface.bulkInsert('Users', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', {}, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
