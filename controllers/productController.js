const Product = require('../models/product'); // นำเข้าโมเดล Product

// ฟังก์ชันสำหรับเพิ่มข้อมูลสินค้าที่ใหม่
exports.createProduct = async (req, res) => {
    try {
        // รับข้อมูล proname และ price
        const { proname, price } = req.body;
        // รับชื่อไฟล์รูปภาพ
        const image_file_name = req.file ? req.file.filename : null;

        // สร้างผลิตภัณฑ์ใหม่
        const product = await Product.create({
            proname: proname,
            image: image_file_name,
            price: price
        });
        
        // ส่งผลลัพธ์กลับ
        res.status(201).json({ message: 'เพิ่มสินค้าใหม่สำเร็จ', product });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า', error });
    }
};

// แสดงข้อมูลสินค้าทั้งหมด
exports.getdata = async (req, res) => {
    try {
        const products = await Product.findAll(); // ดึงข้อมูลสินค้าทั้งหมด
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ลบข้อมูลสินค้าตาม ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.proId);
        if (!product) {
            return res.status(404).json({ error: 'ไม่พบสินค้า' });
        }

        await product.destroy(); // ลบผลิตภัณฑ์
        res.json({ message: 'ลบสินค้าสำเร็จ' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// แก้ไขข้อมูลสินค้าตาม ID
exports.updateProduct = async (req, res) => {
    try {
        // รับข้อมูล proname และ price
        const { proname, price } = req.body;
        // รับชื่อไฟล์รูปภาพ
        const image_file_name = req.file ? req.file.filename : null;

        const product = await Product.findByPk(req.params.proId);
        if (!product) {
            return res.status(404).json({ error: 'ไม่พบสินค้า' });
        }

        // อัปเดตผลิตภัณฑ์
        await product.update({
            proname: proname,
            image: image_file_name,
            price: price
        });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
