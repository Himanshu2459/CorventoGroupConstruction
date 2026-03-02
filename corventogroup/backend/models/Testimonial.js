const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Testimonial = sequelize.define('Testimonial', {
  clientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clientImage: {
    type: DataTypes.STRING
  },
  projectType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  },
  testimonial: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = Testimonial;
