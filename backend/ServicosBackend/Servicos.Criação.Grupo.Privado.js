const { v4: uuidv4 } = require('uuid');
const RepositorioGruposPrivados = require('../Repositorios/Repositorio.Criação.Grupo.Privado.js');

class ServicoCriacaoGrupoPrivado {
    async criar(dadosGrupo, creatorId) {
        const novoGrupo = {
            id: uuidv4(),
            creator_id: creatorId,
            name: dadosGrupo.name,
            description: dadosGrupo.description,
            group_type: 'private',
            cover_image: dadosGrupo.coverImage || null,
            is_vip: false,
            price: null,
            currency: null,
            access_type: null,
            selected_provider_id: null,
            expiration_date: null,
            vip_door: null,
            pixel_id: null,
            pixel_token: null,
            status: 'active'
        };

        try {
            const grupoCriado = await RepositorioGruposPrivados.criar(novoGrupo);
            return grupoCriado;
        } catch (error) {
            console.error("Erro ao criar grupo privado no serviço:", error);
            throw new Error("Falha ao criar o grupo privado.");
        }
    }
}

module.exports = new ServicoCriacaoGrupoPrivado();
