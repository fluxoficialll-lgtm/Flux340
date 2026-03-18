
import API_Criacao_Grupo_Privado from '../APIs/API.Criacao.Grupo.Privado.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';
import { fileService } from '../ServiçoDeArquivos/fileService.js';

class ServiçoCriaçãoGrupoPrivado {
    async criar(groupData) {
        const contexto = "ServiçoCriaçãoGrupoPrivado.criar";

        try {
            let coverImageUrl = '';
            if (groupData.coverImageBlob) {
                ServicoLog.info(contexto, "Iniciando upload da imagem de capa.");
                coverImageUrl = await fileService.upload(groupData.coverImageBlob, `group-covers/${Date.now()}.png`);
                ServicoLog.info(contexto, "Upload da imagem de capa concluído.", { coverImageUrl });
            }

            const payload = {
                name: groupData.name,
                description: groupData.description,
                coverImage: coverImageUrl,
            };

            ServicoLog.jsonEnviado(contexto, payload);

            // Refatorado: Delegação da chamada de rede para a camada de API
            const { data } = await API_Criacao_Grupo_Privado.criar(payload);

            ServicoLog.jsonRecebido(contexto, data);
            return data;

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha ao criar o grupo privado.';
            throw new Error(errorMessage);
        }
    }
}

export default new ServiçoCriaçãoGrupoPrivado();
