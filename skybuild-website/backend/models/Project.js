const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('house', 'villa', 'kothi', 'commercial', 'renovation'),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  area: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  budget: {
    type: DataTypes.FLOAT
  },
  duration: {
    type: DataTypes.JSONB
  },
  status: {
    type: DataTypes.ENUM('planning', 'in-progress', 'completed'),
    defaultValue: 'planning'
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
}, {
  timestamps: true
});

module.exports = Project;
