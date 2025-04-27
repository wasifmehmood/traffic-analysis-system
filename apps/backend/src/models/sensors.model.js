export default (sequelize, DataTypes) => {
  const Sensors = sequelize.define(
    'sensors',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      fk_address_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'addresses',
          key: 'id'
        },
        field: 'fk_address_id'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
  )

  return Sensors
}
