
import { ServicoAutenticacaoMock } from "./SimulacaoDeAuth";

const handleGetMyProfile = async (url: URL, config?: RequestInit): Promise<Response> => {
    const currentUser = ServicoAutenticacaoMock.login(); // Reutiliza o mock de usuário
    console.log('[SIMULAÇÃO] ✅ Buscando perfil do usuário logado (/api/profiles/me).');
    
    if (!ServicoAutenticacaoMock.isAuthenticated()) {
        return new Response(JSON.stringify({ message: "Não autorizado" }), { status: 401 });
    }

    await new Promise(res => setTimeout(res, 150));
    
    return new Response(JSON.stringify(currentUser), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

const handleGetUserProfileById = async (url: URL, config?: RequestInit): Promise<Response> => {
    const userId = url.pathname.split('/').pop(); // Extrai o ID da URL
    console.log(`[SIMULAÇÃO] ✅ Buscando perfil do usuário por ID: ${userId}`);

    const currentUser = ServicoAutenticacaoMock.login();

    // Se o ID corresponder ao usuário logado, retorna os dados dele
    if (userId === currentUser.id) {
        await new Promise(res => setTimeout(res, 150));
        return new Response(JSON.stringify(currentUser), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        // Caso contrário, retorna um mock para outros usuários ou um 404
        // Para este caso, vamos retornar 404 para simplificar
        console.warn(`[SIMULAÇÃO] ⚠️ Perfil com ID ${userId} não encontrado.`);
        return new Response(JSON.stringify({ message: "Perfil não encontrado" }), { status: 404 });
    }
};


const handleCompleteProfile = async (url: URL, config?: RequestInit): Promise<Response> => {
    if (!config || !config.body) {
        return new Response(JSON.stringify({ message: "Corpo da requisição ausente."}), { status: 400 });
    }

    const profileData = JSON.parse(config.body as string);
    console.log('[SIMULAÇÃO] ✅ Recebida requisição para completar perfil com dados:', profileData);
    
    const updatedUser = ServicoAutenticacaoMock.completeProfile(profileData);

    return new Response(JSON.stringify(updatedUser), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}


// AQUI ESTÁ A CORREÇÃO: Adicionando a palavra-chave `export`
export const profileHandlers = {
    '/api/profiles/me': handleGetMyProfile,
    '/api/profiles/complete': handleCompleteProfile,
    '/api/profiles/:id': handleGetUserProfileById,
};
