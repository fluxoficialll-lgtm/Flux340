
import queries from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Perfil.Flux.js';
import ServicoLog from '../ServicosBackend/Servico.Logs.Backend.js';

const PossibilidadeAtualizarPerfil = async (userId, profileData) => {
    const contexto = "Repositorio.Criacao.Perfil.Flux.PossibilidadeAtualizarPerfil";
    ServicoLog.info(contexto, `Iniciando a operação de garantir perfil para o usuário: ${userId}`);

    try {
        const perfilDb = await queries.garantirPerfil(userId, profileData);
        ServicoLog.info(contexto, `Perfil garantido com sucesso para o usuário: ${userId}.`, { perfilId: perfilDb.id });
        return perfilDb;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao garantir o perfil para o usuário: ${userId}`, error);
        // A camada de consulta já está lidando com o tipo de erro, então apenas relançamos.
        throw error;
    }
};

const PossibilidadeBuscarUsuarioPorId = async (userId) => {
    const contexto = "Repositorio.Criacao.Perfil.Flux.PossibilidadeBuscarUsuarioPorId";
    ServicoLog.info(contexto, `Buscando perfil para o usuário: ${userId}`);
    
    try {
        const perfilDb = await queries.ConsultarPerfilPorIdUsuario(userId);
        if (perfilDb) {
            ServicoLog.info(contexto, `Perfil encontrado para o usuário: ${userId}.`);
        } else {
            ServicoLog.info(contexto, `Nenhum perfil encontrado para o usuário: ${userId}.`);
        }
        return perfilDb;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao buscar o perfil para o usuário: ${userId}`, error);
        throw error;
    }
};

const PossibilidadeDeletarPerfil = async (userId) => {
    const contexto = "Repositorio.Criacao.Perfil.Flux.PossibilidadeDeletarPerfil";
    ServicoLog.info(contexto, `Iniciando deleção do perfil para o usuário: ${userId}`);

    try {
        const perfilDeletado = await queries.DeletarPerfilPorIdUsuario(userId);
        ServicoLog.info(contexto, `Perfil deletado com sucesso para o usuário: ${userId}.`);
        return perfilDeletado;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao deletar o perfil para o usuário: ${userId}`, error);
        throw error;
    }
};

export default {
    PossibilidadeAtualizarPerfil,
    PossibilidadeBuscarUsuarioPorId,
    PossibilidadeDeletarPerfil
};
