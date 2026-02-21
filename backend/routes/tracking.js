
import express from 'express';
import { facebookCapi } from '../ServiçosBackEnd/facebookCapi.js';
import { userRepositorio } from '../GerenciadoresDeDados/user.repositorio.js'; // Importando o novo repositório

const router = express.Router();

/**
 * POST /api/tracking/capi
 * Hub universal para eventos Server-Side. (Nenhuma alteração necessária aqui)
 */
router.post('/capi', async (req, res) => {
    try {
        const { platform, pixelId, accessToken, eventName, eventData, userData, eventId, url } = req.body;
        
        if (platform === 'meta' || !platform) {
            const result = await facebookCapi.sendEvent({
                pixelId,
                accessToken,
                eventName,
                eventData,
                userData,
                eventId,
                url
            });
            return res.json({ success: true, platform: 'meta', trace_id: result.fb_trace_id });
        }

        res.status(400).json({ error: "PLATFORM_NOT_SUPPORTED" });
    } catch (e) {
        console.warn(`[Tracking Hub Error]: ${e.message}`);
        res.status(202).json({ status: "FAILED", error: e.message });
    }
});

/**
 * GET /api/tracking/pixel-info
 * Refatorado para usar o userRepositorio.
 */
router.get('/pixel-info', async (req, res) => {
    try {
        const { ref } = req.query;
        if (!ref) return res.status(400).json({ error: "REF_REQUIRED" });

        // Lógica refatorada para usar o userRepositorio
        const user = await userRepositorio.findByEmail(ref) || await userRepositorio.findByHandle(ref);
        
        if (user && user.marketingConfig?.pixelId) {
            return res.json({ 
                pixelId: user.marketingConfig.pixelId,
                tiktokId: user.marketingConfig.tiktokId
            });
        }

        // Fallback para o pixel padrão do ambiente
        res.json({ pixelId: process.env.VITE_PIXEL_ID || "" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
