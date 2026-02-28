
// backend/ServicosBackend/Servicos.Publicacao.Reels.js
import RepositorioReels from '../Repositorios/Repositorio.Publicacao.Reels.js';

const checkPermissions = (userId, reel) => {
    // Simula a verificação de permissão.
    // Em um cenário real, essa lógica seria mais robusta.
    if (!reel || !reel.user_id) {
        throw new Error('Não é possível verificar as permissões: dados do reel incompletos.');
    }
    return reel.user_id === userId;
};

const createReel = async (reelData, userId) => {
    // Lógica de negócio: Adiciona o ID do usuário aos dados do reel.
    const fullReelData = { ...reelData, user_id: userId };
    
    if (!fullReelData.video_url) {
        throw new Error('A URL do vídeo é obrigatória para criar um reel.');
    }

    // Chama o repositório para criar o reel.
    return RepositorioReels.createReel(fullReelData);
};

const getAllReels = async (options) => {
    // Lógica de negócio para definir padrões de paginação ou filtros.
    const processedOptions = { limit: 20, offset: 0, ...options };
    return RepositorioReels.findAllReels(processedOptions);
};

const getReelById = async (reelId) => {
    if (!reelId || isNaN(parseInt(reelId))) {
        throw new Error('ID de reel inválido fornecido.');
    }
    return RepositorioReels.findReelById(reelId);
};

const updateReel = async (reelId, updates, userId) => {
    if (!reelId || isNaN(parseInt(reelId))) {
        throw new Error('ID de reel inválido para atualização.');
    }

    const reel = await RepositorioReels.findReelById(reelId);
    if (!reel) {
        throw new Error('Reel não encontrado para atualização.');
    }
    
    // Lógica de negócio: Verificar permissões antes de atualizar.
    if (!checkPermissions(userId, reel)) {
        throw new Error('Usuário não autorizado a editar este reel.');
    }

    return RepositorioReels.updateReel(reelId, updates);
};

const deleteReel = async (reelId, userId) => {
    if (!reelId || isNaN(parseInt(reelId))) {
        throw new Error('ID de reel inválido para exclusão.');
    }

    const reel = await RepositorioReels.findReelById(reelId);
    if (!reel) {
        throw new Error('Reel não encontrado para exclusão.');
    }
    
    // Lógica de negócio: Verificar permissões antes de deletar.
    if (!checkPermissions(userId, reel)) {
        throw new Error('Usuário não autorizado a deletar este reel.');
    }

    await RepositorioReels.deleteReel(reelId);
    // O serviço não precisa retornar nada em uma exclusão bem-sucedida.
};

export default {
    createReel,
    getAllReels,
    getReelById,
    updateReel,
    deleteReel
};
