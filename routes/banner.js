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

    const bannerId = response.data.user.banner;

    if (!bannerId) {
      return res.status(404).send("El usuario no tiene banner");
    }

    const bannerResponse = await axios.get(`https://cdn.discordapp.com/banners/${userId}/${bannerId}?size=2048`, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "image/*",
      },
    });

    const contentType = bannerResponse.headers["content-type"];
    res.set("Content-Type", contentType);
    res.send(bannerResponse.data);
  } catch (error) {
    console.error("Error en la petición:", error.message);
    res.status(500).send("Error al obtener el banner del usuario");
  }
});

module.exports = router;
