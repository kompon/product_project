const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้', error: error.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { username, password, image_url } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว' });
        }

        const user = await User.create({ username, password, image_url });
        res.status(201).json({ message: 'ลงทะเบียนสำเร็จ', user });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        const token = jwt.sign({ id: user.user_id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'ล็อกอินสำเร็จ', token, user });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการล็อกอิน', error: error.message });
    }
};
