
import { User } from '../../types';
import { db } from '@/database';
import { AccountSyncService } from '../sync/AccountSyncService';
import { hydrationManager } from '../sync/HydrationManager';
import { USE_MOCKS } from '../../mocks';

export async function performLoginSync(user: User) {
    // Persistência mínima local
    db.users.set(user);
    localStorage.setItem('cached_user_profile', JSON.stringify(user));
    localStorage.setItem('user_id', user.id); 
    db.auth.setCurrentUserId(user.id);
    
    // Sinaliza ao gerenciador que a autenticação básica está pronta
    hydrationManager.markReady('AUTH');
    
    // DELEGAÇÃO DE RESPONSABILIDADE: 
    // O motor de sincronização assume o controle total daqui em diante.
    if (!USE_MOCKS) {
        // Executado em background para não travar a animação de login
        AccountSyncService.performFullSync().catch(console.error);
    }
}
