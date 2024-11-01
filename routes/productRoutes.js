const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productController = require('../controllers/productController');
const router = express.Router();

// กำหนดโฟลเดอร์สำหรับจัดเก็บไฟล์ที่อัพโหลด
const upload_path = './public/images';

// ตรวจสอบว่ามีโฟลเดอร์ uploads หรือไม่
if (!fs.existsSync(upload_path)) {
    // ถ้าไม่มีให้สร้างใหม่
    fs.mkdirSync(upload_path, { recursive: true });
}

// ตั้งค่า multer สำหรับจัดการไฟล์อัปโหลด
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // กำหนดให้อัพโหลดไฟล์ไปไว้ที่โฟลเดอร์ public/images
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        // ตั้งชื่อไฟล์โดยใช้วันที่และเวลาปัจจุบัน
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// กำหนดเส้นทางหรือ URL สำหรับเรียกใช้งานแต่ละ API

// สร้างสินค้าใหม่ พร้อมอัปโหลดรูปภาพ
router.post('/Products', upload.single('image'), productController.createProduct);

// ดึงข้อมูลสินค้าทั้งหมด
router.get('/Products', productController.getdata);

// แก้ไขข้อมูลสินค้าตาม ID พร้อมอัปโหลดรูปภาพใหม่
router.put('/Products/:proId', upload.single('image'), productController.updateProduct);

// ลบข้อมูลสินค้าตาม ID
router.delete('/Products/:proId', productController.deleteProduct);

module.exports = router;
