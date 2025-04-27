'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.createTable(
        'countries',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          iso_code: {
            allowNull: true,
            type: Sequelize.INTEGER
          }
        },
        { timestamps: true }
      ),
      queryInterface.createTable(
        'addresses',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          fk_country_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'countries',
              key: 'id'
            }
          },
          street_name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          city: {
            allowNull: false,
            type: Sequelize.STRING
          },
          state: {
            allowNull: false,
            type: Sequelize.STRING
          },
          zip_code: {
            allowNull: false,
            type: Sequelize.STRING
          },
          longitude: {
            allowNull: false,
            type: Sequelize.FLOAT
          },
          latitude: {
            allowNull: false,
            type: Sequelize.FLOAT
          }
        },
        { timestamps: true }
      ),
      queryInterface.createTable(
        'sensors',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          fk_address_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'addresses',
              key: 'id'
            }
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          description: {
            allowNull: true,
            type: Sequelize.STRING
          }
        },
        { timestamps: true }
      ),
      queryInterface.createTable(
        'vehicle_types',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          }
        },
        { timestamps: true }
      ),
      queryInterface.createTable(
        'violations',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          }
        },
        { timestamps: true }
      ),
      queryInterface.createTable(
        'traffic_events',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING(26)
          },
          fk_sensor_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'sensors',
              key: 'id'
            }
          },
          fk_violation_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'violations',
              key: 'id'
            }
          },
          fk_vehicle_type_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'vehicle_types',
              key: 'id'
            }
          },
          metadata: {
            allowNull: false,
            type: Sequelize.JSON
          },
          speed_kph: {
            allowNull: false,
            type: Sequelize.FLOAT
          }
        },
        { timestamps: true }
      )
    ])
  },

  async down(queryInterface) {
    await Promise.all([
      queryInterface.dropTable('vehicle_types'),
      queryInterface.dropTable('countries'),
      queryInterface.dropTable('addresses'),
      queryInterface.dropTable('sensors'),
      queryInterface.dropTable('traffic_events'),
      queryInterface.dropTable('violations')
    ])
  }
}
