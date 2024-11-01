const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const { proname, price, authors } = req.body; // เพิ่ม authors
        const image_file_name = req.file ? req.file.filename : null;

        const product = await Product.create({
            proname: proname,
            image: image_file_name,
            authors: authors, // เก็บ authors
            price: price
        });

        res.status(201).json({ message: 'เพิ่มสินค้าใหม่สำเร็จ', product });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า', error });
    }
};

exports.getdata = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.proId);
        if (!product) {
            return res.status(404).json({ error: 'ไม่พบสินค้า' });
        }

        await product.destroy();
        res.json({ message: 'ลบสินค้าสำเร็จ' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { proname, price, authors } = req.body; // เพิ่ม authors
        const image_file_name = req.file ? req.file.filename : null;

        const product = await Product.findByPk(req.params.proId);
        if (!product) {
            return res.status(404).json({ error: 'ไม่พบสินค้า' });
        }

        await product.update({
            proname: proname,
            image: image_file_name,
            authors: authors, // เก็บ authors
            price: price
        });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
