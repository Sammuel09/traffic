'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    await queryInterface.bulkInsert('counts', [
      {
        countId: '20000000-0000-0000-0000-000000000001',
        countDate: today,
        serviceType: 'sunday_service',
        vehicleType: 'car',
        location: 'Main Parking Lot',
        countValue: 45,
        notes: 'Regular Sunday service count',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countId: '20000000-0000-0000-0000-000000000002',
        countDate: today,
        serviceType: 'sunday_service',
        vehicleType: 'bus',
        location: 'Main Parking Lot',
        countValue: 3,
        notes: 'Church buses',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countId: '20000000-0000-0000-0000-000000000003',
        countDate: lastWeek,
        serviceType: 'sunday_service',
        vehicleType: 'car',
        location: 'Main Parking Lot',
        countValue: 52,
        notes: 'Previous week count',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countId: '20000000-0000-0000-0000-000000000004',
        countDate: today,
        serviceType: 'midweek_service',
        vehicleType: 'car',
        location: 'Main Parking Lot',
        countValue: 28,
        notes: 'Wednesday Bible study',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countId: '20000000-0000-0000-0000-000000000005',
        countDate: lastMonth,
        serviceType: 'special_event',
        vehicleType: 'car',
        location: 'Main Parking Lot',
        countValue: 120,
        notes: 'Easter service - high attendance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        countId: '20000000-0000-0000-0000-000000000006',
        countDate: today,
        serviceType: 'sunday_service',
        vehicleType: 'motorcycle',
        location: 'Main Parking Lot',
        countValue: 2,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('counts', null, {});
  }
};
