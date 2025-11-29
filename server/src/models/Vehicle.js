const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  vehicleId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  vehicleType: {
    type: DataTypes.ENUM('car', 'bus', 'motorcycle', 'van', 'truck', 'other'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
},
  {
  tableName: 'vehicles',
  timestamps: true
});

Vehicle.associate = (models) => {
    Vehicle.hasMany(models.Count, {
      foreignKey: 'vehicleId',
      as: 'counts'
    });
}

module.exports = Vehicle;
