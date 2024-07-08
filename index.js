require('dotenv').config();
const express = require("express");

const app = express();
const cors = require('cors');
const port = 4000;

// let allowedOrigins = [
//   'https://localhost:3000',
//   'http://localhost:3000',
// ]

app.use(cors());
app.use(express.json());

// Routes
const { profile, avatar, banner, badge } = require("./routes/routes");

// Default route
app.get("/", (req, res) => {
  res.send("Selamat datang di API untuk mendapatkan profil, avatar, dan spanduk pengguna Discord, gunakan /api/profile/:id, /api/avatar/:id atau /api/banner/:id untuk mendapatkan informasi");
});
app.use('/api/profile', profile);
app.use('/api/avatar', avatar);
app.use('/api/banner', banner);
app.use('/api/badge', badge);

app.listen(port, () => {
  console.log(`API sedang running di port ${port}`);
});