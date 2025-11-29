'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('counts', {
      countId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      countDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      serviceType: {
        type: Sequelize.ENUM('sunday_service', 'midweek_service', 'special_event', 'conference', 'other'),
        defaultValue: 'sunday_service',
        allowNull: false
      },
      vehicleType: {
        type: Sequelize.ENUM('car', 'bus', 'motorcycle', 'van', 'truck', 'other'),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      countValue: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('counts');
  }
};
