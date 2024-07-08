const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await axios.get(`https://discord.com/api/v9/users/${userId}/profile`, {
      headers: {
        "authorization": process.env.TOKEN,
      },
    });

    const avatarId = response.data.user.avatar;

    if (!avatarId) {
      return res.status(404).send("El usuario no tiene avatar");
    }

    const avatarResponse = await axios.get(`https://cdn.discordapp.com/avatars/${userId}/${avatarId}?size=2048`, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "image/*",
      },
    });

    const contentType = avatarResponse.headers["content-type"];
    res.set("Content-Type", contentType);
    res.send(avatarResponse.data);
  } catch (error) {
    console.error("Error en la petición:", error.message);
    res.status(500).send("Error al obtener el avatar del usuario");
  }
});

module.exports = router;
