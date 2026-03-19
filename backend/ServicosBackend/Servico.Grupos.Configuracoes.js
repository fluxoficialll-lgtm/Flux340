
import Repositorio from '../Repositorios/Repositorio.Grupos.Configuracoes.js';
import ModeloConfig from '../models/Models.Estrutura.Configuracoes.Grupo.js';

class ServicoGruposConfiguracoes {

    /**
     * Atualiza as configurações de um grupo.
     */
    async atualizarConfiguracoes(idGrupo, dadosConfig) {
        try {
            const dadosCompletos = { ...dadosConfig, idGrupo };
            const modelo = new ModeloConfig(dadosCompletos);
            const dadosValidados = modelo.toObject();

            const resultado = await Repositorio.atualizarConfiguracoes(dadosValidados);

            if (resultado.affectedRows === 0) {
                throw new Error('Nenhum grupo foi atualizado. Verifique o id do grupo.');
            }
            
            return { mensagem: "Configurações atualizadas com sucesso!" };

        } catch (error) {
            // Propaga o erro para ser tratado pelo controlador
            throw error;
        }
    }

    /**
     * Obtém as configurações de um grupo.
     */
    async obterConfiguracoes(idGrupo) {
        try {
            const dados = await Repositorio.obterConfiguracoes(idGrupo);
            if (!dados) {
                return null; // Ou lançar um erro de "não encontrado"
            }
            const modelo = ModeloConfig.fromObject(dados);
            return modelo.toObject();

        } catch (error) {
            throw error;
        }
    }

    // ... (outros métodos como obterEstatisticas, atualizarDiretrizes, etc. podem ser atualizados da mesma forma)
}

export default new ServicoGruposConfiguracoes();
