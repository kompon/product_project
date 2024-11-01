// server.js หรือ app.js
const express = require('express');
const cors = require('cors'); // เพิ่ม cors
const sequelize = require('./config/db');
const routes = require('./routes/productRoutes');
const app = express();

app.use(cors()); // เพิ่ม middleware CORS
app.use(express.json());

// ระบุตำแหน่ง url สำหรับเรียกดูรูปภาพ
app.use(express.static('public'));
app.use('/images', express.static('images'));

// ระบุตำแหน่ง url สำหรับเรียกใช้งาน api
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.error(error));
