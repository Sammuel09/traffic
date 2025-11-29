'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vehicles', [
      {
        vehicleId: '00000000-0000-0000-0000-000000000001',
        vehicleType: 'car',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleId: '00000000-0000-0000-0000-000000000002',
        vehicleType: 'bus',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleId: '00000000-0000-0000-0000-000000000003',
        vehicleType: 'motorcycle',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleId: '00000000-0000-0000-0000-000000000004',
        vehicleType: 'van',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleId: '00000000-0000-0000-0000-000000000005',
        vehicleType: 'truck',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', null, {});
  }
};
