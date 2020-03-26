const connection = require("../database/connection");

module.exports = {
    async criar(req, res) {
        const { titulo, descricao, valor } = req.body;
        const ong_id = req.headers.authorization;
        console.log(req.headers)

        const [id] = await connection('incidents').insert({
            titulo, descricao, valor, ong_id
        });

        return res.json({ id });
    },

    async index(req, res) {
        const { page = 1 } = req.query;
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.cidade', 'ongs.estado']);
        
        res.header("X-total-Count", count['count(*)']);
        return res.json(incidents);
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted. ' });
        }

        await connection('incidents').where('id', id).delete();
        return res.status(204).send();
    },

}