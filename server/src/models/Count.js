const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Count = sequelize.define('Count', {
  countId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  countDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  serviceType:{
    type: DataTypes.ENUM('sunday_service', 'midweek_service', 'special_event', 'conference', 'other'),
    // default value is sunday_service
    // improve this later to delineate conference into the different types of conferences we have in cci eg mens conference, womens conference, young and fee, children conference, etc.
    defaultValue: 'sunday_service',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  vehicleType: {
    type: DataTypes.ENUM('car', 'bus', 'motorcycle', 'van', 'truck', 'other'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  countValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
  tableName: 'counts',
  timestamps: true
});

module.exports = Count;
