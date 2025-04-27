export default (sequelize, DataTypes) => {
  const Violations = sequelize.define(
    'violations',
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
    { timeStamps: true }
  )

  return Violations
}
