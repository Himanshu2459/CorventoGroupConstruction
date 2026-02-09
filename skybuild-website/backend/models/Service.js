const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  pricing: {
    type: DataTypes.JSONB
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = Service;
