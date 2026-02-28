
import { v4 as uuidv4 } from 'uuid';
import RepositorioGrupos from '../Repositorios/Repositorio.Criação.Grupo.Publico.js';

class ServicoCriacaoGrupoPublico {
    async criar(dadosGrupo, creatorId) {
        const novoGrupo = {
            id: uuidv4(),
            creator_id: creatorId,
            name: dadosGrupo.name,
            description: dadosGrupo.description,
            group_type: 'public',
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
            const grupoCriado = await RepositorioGrupos.criar(novoGrupo);
            return grupoCriado;
        } catch (error) {
            console.error("Erro ao criar grupo público no serviço:", error);
            throw new Error("Falha ao criar o grupo público.");
        }
    }
}

export default new ServicoCriacaoGrupoPublico();
