
import { User } from '../../types';
import { API_BASE } from '@/ServiçosDoFrontend/ServiçosDeApi/apiConfig';
import { performLoginSync } from './AuthSync';
import { USE_MOCKS, MOCK_USERS } from '../../mocks';

const API_URL = `${API_BASE}/api/auth`;

export const MetodoGoogle = {
    async loginWithGoogle(googleToken?: string, referredBy?: string): Promise<{ user: User; nextStep: string }> {
        if (USE_MOCKS) {
            const user = MOCK_USERS['user'];
            localStorage.setItem('auth_token', 'mock_token_g_' + Date.now());
            await performLoginSync(user);
            return { user, nextStep: '/feed' };
        }

        const response = await fetch(`${API_URL}/google`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ googleToken, referredBy: referredBy || null }) 
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Falha no Google Auth.");
        
        localStorage.setItem('auth_token', data.token);
        await performLoginSync(data.user);
        return { user: data.user, nextStep: data.user.isBanned ? '/banned' : (data.isNew ? '/complete-profile' : '/feed') };
    }
};