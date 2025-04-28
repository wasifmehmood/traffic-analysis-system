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

  TrafficEvents.getTrafficViolationAnalytics = async function () {
    const data = await TrafficEvents.findAll({
      attributes: [
        'fk_violation_id',
        [
          TrafficEvents.sequelize.fn(
            'COUNT',
            TrafficEvents.sequelize.col('fk_violation_id')
          ),
          'count'
        ],
        [
          TrafficEvents.sequelize.fn(
            'AVG',
            TrafficEvents.sequelize.col('speed_kph')
          ),
          'avg_speed_kph'
        ]
      ],
      include: [
        {
          association: 'violation',
          attributes: ['name']
        }
      ],
      group: ['fk_violation_id', 'violation.id']
    })

    return data
  }

  TrafficEvents.getTrafficViolationCount = async function () {
    const data = await TrafficEvents.count({})

    return data
  }

  TrafficEvents.getTrafficViolationByCountry = async function () {
    const data = await TrafficEvents.findAll({
      attributes: [
        'fk_violation_id',
        [
          TrafficEvents.sequelize.fn(
            'COUNT',
            TrafficEvents.sequelize.col('fk_violation_id')
          ),
          'count'
        ],
        [
          TrafficEvents.sequelize.fn(
            'AVG',
            TrafficEvents.sequelize.col('speed_kph')
          ),
          'avg_speed_kph'
        ],
        'sensor->address.id',
        'sensor->address.fk_country_id',
        'sensor->address->country.name'
      ],
      include: [
        {
          association: 'violation',
          attributes: ['name']
        },
        {
          association: 'sensor',
          attributes: ['fk_address_id'],
          include: [
            {
              association: 'address',
              attributes: ['id', 'fk_country_id'],
              include: [
                {
                  association: 'country',
                  attributes: ['name'],
                  required: true
                }
              ]
            }
          ]
        }
      ],
      group: [
        'fk_violation_id',
        'violation.id',
        'sensor.id',
        'sensor->address.id',
        'sensor->address->country.id',
        'sensor->address.fk_country_id',
        'sensor->address->country.name'
      ]
    })

    return data
  }

  return TrafficEvents
}
