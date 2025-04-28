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
        type: DataTypes.STRING
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING
      },
      zip_code: {
        allowNull: false,
        type: DataTypes.STRING
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
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  Addresses.associate = function (models) {
    Addresses.belongsTo(models.Countries, {
      foreignKey: 'fk_country_id',
      as: 'country'
    })
  }

  return Addresses
}
