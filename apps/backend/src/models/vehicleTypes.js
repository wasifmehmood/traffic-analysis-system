export default (sequelize, DataTypes) => {
  const VehicleTypes = sequelize.define(
    'vehicle_types',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      timeStamps: true
    }
  )

  return VehicleTypes
}
