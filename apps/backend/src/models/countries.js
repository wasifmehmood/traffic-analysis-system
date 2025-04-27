export default (sequelize, DataTypes) => {
  const Countries = sequelize.define(
    'countries',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.String
      },
      iso_code: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    },
    {
      timeStamps: true
    }
  )

  return Countries
}
