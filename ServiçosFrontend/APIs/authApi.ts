
import { AxiosResponse } from 'axios';
import ClienteBackend from '../Cliente.Backend';

interface ProfileData {
    name?: string;
    nickname?: string;
    bio?: string;
    website?: string;
    isPrivate?: boolean;
    photoUrl?: string;
}

const authApi = {
    login(email: string, password: string): Promise<AxiosResponse<any>> {
        return ClienteBackend.post('/auth/login', { email, password });
    },

    register(username: string, email: string, password: string): Promise<AxiosResponse<any>> {
        return ClienteBackend.post('/auth/register', { username, email, password });
    },

    validateToken(): Promise<AxiosResponse<any>> {
        return ClienteBackend.post('/auth/validate-token');
    },

    updateProfile(profileData: Partial<ProfileData>): Promise<AxiosResponse<any>> {
        return ClienteBackend.put('/user/profile', profileData);
    },
};

export default authApi;
