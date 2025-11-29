const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Service = sequelize.define('Service', {
  serviceId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  serviceType:{
    type: DataTypes.ENUM('sunday_service', 'midweek_service', 'special_event', 'conference', 'other'),
    defaultValue: 'sunday_service',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
},
  {
  tableName: 'services',
  timestamps: true
});

module.exports = Service;
