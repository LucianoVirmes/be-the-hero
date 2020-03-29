const connection = require("../database/connection");
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async index(req, res) {
        const ongs = await connection('ongs').select("*");
        return res.json(ongs);
    },

    async criar(req, res) {
        const { nome, email, whatsapp, cidade, estado } = req.body;
        const id = generateUniqueId();

        await connection('ongs').insert({
            id, nome, email, whatsapp, cidade, estado
        })

        return res.json({id});
    }
}