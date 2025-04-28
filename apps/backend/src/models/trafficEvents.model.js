import { ulid } from 'ulid'
import { Op, QueryTypes } from 'sequelize'

export default (sequelize, DataTypes) => {
  const TrafficEvents = sequelize.define(
    'traffic_events',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(26),
        defaultValue: () => ulid()
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
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  TrafficEvents.associate = function (models) {
    TrafficEvents.belongsTo(models.Sensors, {
      foreignKey: 'fk_sensor_id',
      as: 'sensor'
    })
    TrafficEvents.belongsTo(models.VehicleTypes, {
      foreignKey: 'fk_vehicle_type_id',
      as: 'vehicle_type'
    })
    TrafficEvents.belongsTo(models.Violations, {
      foreignKey: 'fk_violation_id',
      as: 'violation'
    })
  }

  TrafficEvents.insertEvents = function (events) {
    return TrafficEvents.bulkCreate(events)
  }

  TrafficEvents.insertEvent = function ({
    metadata,
    fk_sensor_id,
    fk_violation_id,
    fk_vehicle_type_id,
    fk_address_id,
    speed_kph
  }) {
    return TrafficEvents.create({
      metadata,
      fk_sensor_id,
      fk_violation_id,
      fk_vehicle_type_id,
      fk_address_id,
      speed_kph
    })
  }

  TrafficEvents.getTrafficViolationByVehicleType = async function () {
    const result = await sequelize.query(
      `select COUNT(v.id) as violations, v.id, v.name from traffic_events as te
      JOIN vehicle_types as v ON v.id = te.fk_violation_id
      GROUP BY v.id
      ORDER BY violations DESC`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  }

  TrafficEvents.getTrafficViolationCount = async function () {
    const data = await TrafficEvents.count({})

    return data
  }
  TrafficEvents.getRecentTrafficViolations = async function () {
    const data = await TrafficEvents.findAll({
      include: [
        {
          association: 'violation',
          attributes: ['name', 'id']
        }
      ],
      where: {
        created_at: {
          [Op.gte]: new Date().setDate(new Date().getDate() - 1)
        }
      },
      order: [['created_at', 'DESC']],
      limit: 100
    })

    return data
  }

  TrafficEvents.getTrafficViolationByCountry = async function () {
    const result = await sequelize.query(
      `select c.id, COUNT(c.id) as violations, c.name from traffic_events as te
      JOIN sensors as s ON s.id = te.fk_sensor_id
      JOIN addresses as ad ON ad.id = s.fk_address_id
      JOIN countries as c ON c.id = ad.fk_country_id
      GROUP BY c.id
      ORDER BY violations DESC
      LIMIT 10`,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  }

  TrafficEvents.getSpeedTrafficViolationsInLastHour = async function () {
    const result = await sequelize.query(
      `select AVG(te.speed_kph) as avg_speed_kph, te.created_at from traffic_events as te
      where te.created_at > now() - interval '2' hour
      GROUP BY te.created_at
      `,
      {
        type: QueryTypes.SELECT
      }
    )
    return result
  }

  return TrafficEvents
}
