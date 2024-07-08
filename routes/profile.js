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
        res.send(response.data);
    } catch (error) {
        console.error("Error en la petición:", error.message);
        res.status(500).send("Error al obtener el perfil del usuario");
    }
});

module.exports = router;
