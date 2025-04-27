import { ulid } from 'ulid'

export default (sequelize, DataTypes) => {
  const TrafficEvents = sequelize.define(
    'traffic_events',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(26),
        defaultValue: ulid()
      },
      fk_sensor_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'sensors',
          key: 'id'
        },
        field: 'fk_sensor_id'
      },
      fk_violation_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'violations',
          key: 'id'
        },
        field: 'fk_violation_id'
      },
      fk_vehicle_type_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'vehicle_types',
          key: 'id'
        },
        field: 'fk_vehicle_type_id'
      },
      metadata: {
        allowNull: false,
        type: DataTypes.JSON
      },
      speed_kph: {
        allowNull: false,
        type: DataTypes.FLOAT
      }
    },
    {
      timeStamps: true
    }
  )

  return TrafficEvents
}
