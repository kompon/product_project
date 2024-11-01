const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// ดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', userController.getAllUsers);

// ลงทะเบียนผู้ใช้
router.post('/register', userController.registerUser);

// ล็อกอินผู้ใช้
router.post('/login', userController.loginUser);

module.exports = router;
