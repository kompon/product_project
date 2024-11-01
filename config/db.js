const { Sequelize } = require('sequelize');

// สร้างการเชื่อมต่อกับฐานข้อมูล
const sequelize = new Sequelize('verceldb', 'default', 'dYFbGiPfr4B8', {
  host: 'ep-divine-pond-a152la6y.ap-southeast-1.aws.neon.tech',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // ปรับเป็น true ถ้าคุณต้องการตรวจสอบใบรับรอง SSL
    },
  },
});

// ตรวจสอบการเชื่อมต่อ
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
