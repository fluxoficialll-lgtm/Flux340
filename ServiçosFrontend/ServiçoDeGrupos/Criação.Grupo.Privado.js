
import API_Criacao_Grupo_Privado from '../APIs/APIsServicoGrupos/API.Criacao.Grupo.Privado.js';
import { fileService } from '../ServiçoDeArquivos/fileService.js';

class ServiçoCriaçãoGrupoPrivado {
    async criar(groupData) {
        try {
            let coverImageUrl = '';
            if (groupData.coverImageBlob) {
                coverImageUrl = await fileService.upload(groupData.coverImageBlob, `group-covers/${Date.now()}.png`);
            }

            const payload = {
                name: groupData.name,
                description: groupData.description,
                coverImage: coverImageUrl,
            };

            // Refatorado: Delegação da chamada de rede para a camada de API
            const { data } = await API_Criacao_Grupo_Privado.criar(payload);

            return data;

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha ao criar o grupo privado.';
            throw new Error(errorMessage);
        }
    }
}

export default new ServiçoCriaçãoGrupoPrivado();
