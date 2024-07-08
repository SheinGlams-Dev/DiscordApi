const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const badgeId = req.params.id;

    try {
        const response = await axios.get(`https://cdn.discordapp.com/badge-icons/${badgeId}`, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "image/*",
            },
        });

        const contentType = response.headers["content-type"];
        res.set("Content-Type", contentType);
        res.send(response.data);
    } catch (error) {
        console.error("Error en la petición:", error.message);
        res.status(500).send("Error al obtener el badge icon");
    }
});

module.exports = router;
