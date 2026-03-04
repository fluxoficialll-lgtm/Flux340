
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js

const API_BASE_URL = '/api/feed';

async function fetchWithAuth(url, options = {}) {
    const authToken = localStorage.getItem('authToken');
    const headers = {
        ...options.headers,
    };

    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorResult = await response.json().catch(() => ({}));
        throw new Error(errorResult.message || `Falha na requisição para ${url}`);
    }

    if (response.status !== 204) {
        return response.json();
    }
}

// CORREÇÃO: O serviço agora é uma constante e exportado como padrão no final.
const ServiçoPublicaçãoFeed = {
    // CORREÇÃO: A função foi renomeada de 'create' para 'createPost' para consistência.
    async createPost(postData) {
        return fetchWithAuth(API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify(postData)
        });
    },

    async getFeed(feedType, options = {}) {
        const queryParams = new URLSearchParams(options).toString();
        const url = `${API_BASE_URL}?${queryParams}`;
        return fetchWithAuth(url);
    },

    async getById(postId) {
        return fetchWithAuth(`${API_BASE_URL}/${postId}`);
    },

    async search(query) {
        return fetchWithAuth(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    },

    async update(postId, postData) {
        return fetchWithAuth(`${API_BASE_URL}/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(postData)
        });
    },

    async delete(postId) {
        return fetchWithAuth(`${API_BASE_URL}/${postId}`, { method: 'DELETE' });
    }
};

// CORREÇÃO: Exporta o serviço como padrão para resolver o erro de importação do Vite.
export default ServiçoPublicaçãoFeed;
