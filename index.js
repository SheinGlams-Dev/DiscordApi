require('dotenv').config();
const express = require("express");
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Routes
const { profile, avatar, banner, badge } = require("./routes/routes");

// Default route
app.get("/", (req, res) => {
  res.send("Selamat datang di API para obtener el perfil, avatar y banner del usuario de Discord. Use /api/profile/:id, /api/avatar/:id, o /api/banner/:id para obtener información.");
});

app.use('/api/profile', profile);
app.use('/api/avatar', avatar);
app.use('/api/banner', banner);
app.use('/api/badge', badge);

app.listen(port, () => {
  console.log(`API está funcionando en el puerto ${port}`);
});
