const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // เชื่อมต่อกับฐานข้อมูล

const User = sequelize.define('User', {
    user_id: {
        allowNull: false,
        autoIncrement: true, // ตั้งค่าให้เป็น autoIncrement
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // ชื่อผู้ใช้ต้องไม่ซ้ำกัน
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // รหัสผ่านต้องมีการกรอก
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true, // URL ของรูปภาพเป็นข้อมูลที่ไม่บังคับ
    },
}, {
    tableName: 'users', // ชื่อของตารางในฐานข้อมูล
});

// ส่งออกโมเดล User
module.exports = User;
