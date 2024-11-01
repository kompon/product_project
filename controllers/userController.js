const User = require('../models/user'); // โมเดลผู้ใช้
const jwt = require('jsonwebtoken'); // นำเข้า jsonwebtoken

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // ใช้ findAll เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
        res.status(200).json(users); // ส่งกลับข้อมูลผู้ใช้ด้วยสถานะ 200
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้', error: error.message });
    }
};

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้
exports.registerUser = async (req, res) => {
    try {
        const { username, password, image_url } = req.body;

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
        }

        // ตรวจสอบว่ามีชื่อผู้ใช้นี้อยู่ในฐานข้อมูลหรือไม่
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว' });
        }

        // สร้างผู้ใช้ใหม่ในฐานข้อมูลโดยไม่เข้ารหัสรหัสผ่าน
        const user = await User.create({ username, password, image_url });
        res.status(201).json({ message: 'ลงทะเบียนสำเร็จ', user });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน', error: error.message });
    }
};

// ฟังก์ชันสำหรับล็อกอิน
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
        }

        // ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        // ตรวจสอบรหัสผ่านโดยเปรียบเทียบข้อความธรรมดา
        if (password !== user.password) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        // สร้าง JWT token โดยใช้ JWT_SECRET
        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'ล็อกอินสำเร็จ', token, user });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการล็อกอิน', error: error.message });
    }
};
