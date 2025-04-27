export default (sequelize, DataTypes) => {
  const Countries = sequelize.define(
    'countries',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      iso_code: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Countries
}
