
import ClienteBackend from '../Cliente.Backend.js';

const authApi = {
    login(email, password) {
        return ClienteBackend.post('/auth/login', { email, password });
    },

    register(username, email, password) {
        return ClienteBackend.post('/auth/register', { username, email, password });
    },

    validateToken() {
        // Não precisa de payload, o token vai no header via interceptor
        return ClienteBackend.post('/auth/validate-token');
    },

    updateProfile(profileData) {
        return ClienteBackend.put('/user/profile', profileData);
    },
};

export default authApi;
