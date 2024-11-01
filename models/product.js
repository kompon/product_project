const { Sequelize, DataTypes } = require('sequelize');
// เชื่อมตKอกับฐานข8อมูล
const sequelize = require('../config/db');
// สร8าง Model สําหรับ Product
const Product = sequelize.define('Product', {
proId: {

allowNull: false,
autoIncrement: true,
primaryKey: true,
type: Sequelize.INTEGER
},
proname: {
type: DataTypes.STRING,
allowNull: false
},
image: {
type: DataTypes.STRING,
allowNull: true
},
price: {
type: DataTypes.FLOAT,
allowNull: false
}
});
module.exports = Product;