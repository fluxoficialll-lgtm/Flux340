import { v4 as uuidv4 } from 'uuid';
import RepositorioGruposPagos from '../Repositorios/Repositorio.Criacao.Grupo.Pago.js';

class ServicoCriacaoGrupoPago {
    async criar(dadosGrupo, creatorId) {
        // Lógica para determinar o valor de expiration_date
        let expirationValue = undefined;
        if (dadosGrupo.accessType === 'temporary') {
            expirationValue = dadosGrupo.accessConfig?.interval;
        } else if (dadosGrupo.accessType === 'one_time') {
            expirationValue = `${dadosGrupo.accessConfig?.days}d${dadosGrupo.accessConfig?.hours}h`;
        }

        const novoGrupo = {
            id: uuidv4(),
            creator_id: creatorId,
            name: dadosGrupo.groupName,
            description: dadosGrupo.description,
            group_type: 'paid',
            cover_image: dadosGrupo.finalCoverUrl || null,
            is_vip: true,
            price: dadosGrupo.numericPrice.toString(),
            currency: dadosGrupo.currency,
            access_type: dadosGrupo.accessType,
            selected_provider_id: dadosGrupo.selectedProviderId,
            expiration_date: expirationValue,
            vip_door: {
                mediaItems: dadosGrupo.finalMediaGallery,
                text: dadosGrupo.vipDoorText || "Bem-vindo ao VIP!",
                buttonText: dadosGrupo.vipButtonText
            },
            pixel_id: dadosGrupo.pixelId || null,
            pixel_token: dadosGrupo.pixelToken || null,
            status: 'active'
        };

        try {
            const grupoCriado = await RepositorioGruposPagos.criar(novoGrupo);
            return grupoCriado;
        } catch (error) {
            console.error("Erro ao criar grupo pago no serviço:", error);
            throw new Error("Falha ao criar o grupo pago.");
        }
    }
}

export default new ServicoCriacaoGrupoPago();
