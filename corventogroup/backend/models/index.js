const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    // 🔥 RUN THIS ONCE
    await sequelize.sync({ force: true });
    console.log('✅ Tables dropped and recreated');

  } catch (err) {
    console.error('❌ PostgreSQL error:', err);
  }
})();

module.exports = sequelize;
