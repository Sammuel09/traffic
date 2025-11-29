'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('services', [
      {
        serviceId: '10000000-0000-0000-0000-000000000001',
        serviceName: 'Sunday Morning Service',
        serviceType: 'sunday_service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceId: '10000000-0000-0000-0000-000000000002',
        serviceName: 'Sunday Evening Service',
        serviceType: 'sunday_service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceId: '10000000-0000-0000-0000-000000000003',
        serviceName: 'Wednesday Bible Study',
        serviceType: 'midweek_service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceId: '10000000-0000-0000-0000-000000000004',
        serviceName: 'Easter Service',
        serviceType: 'special_event',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceId: '10000000-0000-0000-0000-000000000005',
        serviceName: 'Annual Conference',
        serviceType: 'conference',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
  }
};
