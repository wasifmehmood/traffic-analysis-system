export default (sequelize, DataTypes) => {
  const Addresses = sequelize.define(
    'addresses',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      fk_country_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'countries',
          key: 'id'
        },
        field: 'fk_country_id'
      },
      street_name: {
        allowNull: true,
        type: DataTypes.String
      },
      city: {
        allowNull: false,
        type: DataTypes.String
      },
      state: {
        allowNull: false,
        type: DataTypes.String
      },
      zip_code: {
        allowNull: false,
        type: DataTypes.String
      },
      longitude: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      latitude: {
        allowNull: false,
        type: DataTypes.FLOAT
      }
    },
    {
      timeStamps: true
    }
  )

  return Addresses
}
