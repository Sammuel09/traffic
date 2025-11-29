const Count = require('./Count');
const Vehicle = require('./Vehicle');
const Service = require('./Service');

// // degine associations
// Service.hasMany(Count, {
//   foreignKey: {
//     name: 'serviceId',
//     type: DataTypes.UUID,
//   },
// });

// Count.belongsTo(Service, {
//   foreignKey: {
//     name: 'serviceId',
//     type: DataTypes.UUID,
//   },
// });

// Vehicle.hasMany(Count, {
//   foreignKey: {
//     name: 'vehicleId',
//     type: DataTypes.UUID,
//   },
// });

// Count.belongsTo(Vehicle, {
//   foreignKey: {
//     name: 'vehicleId',
//     type: DataTypes.UUID,
//   },
// });



module.exports = {
    Count,
    Vehicle,
    Service
}
