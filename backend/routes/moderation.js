
import express from 'express';
import * as genai from "@google/genai";

const router = express.Router();

// 1. Inicialização Singleton da IA
// A instância é criada apenas uma vez e reutilizada, e só se a API_KEY existir.
let genAI;
if (process.env.API_KEY) {
    genAI = new genai.GoogleGenerativeAI(process.env.API_KEY);
} else {
    console.error("API_KEY for Generative AI is not configured. Moderation service will be disabled.");
}

/**
 * POST /api/moderation/analyze
 * Analisa conteúdo usando IA para garantir a integridade da plataforma.
 * Refatorado com logging estruturado, inicialização singleton e tratamento de erros aprimorado.
 */
router.post('/analyze', async (req, res) => {
    req.logger.log('MODERATION_ANALYZE_START', { body: req.body });

    // 2. Melhor Tratamento de Erro para API Key Ausente
    if (!genAI) {
        req.logger.error('MODERATION_ERROR', { error: "AI service is not configured (API_KEY missing)" });
        // Retorna 503 pois o serviço está indisponível para cumprir sua função.
        return res.status(503).json({ error: "MODERATION_SERVICE_UNAVAILABLE" });
    }

    try {
        const { text, userEmail } = req.body; // mediaUrl não é usado atualmente pela GenAI
        
        // Prompt de IA aprimorado
        const prompt = `
            Analise o seguinte texto para determinar se ele contém conteúdo adulto, discurso de ódio, ou violação de termos de serviço.
            Responda APENAS com um objeto JSON com o formato: {"isAdult": boolean, "reason": "string"}.
            'reason' pode ser: "SAFE", "ADULT_CONTENT", "HATE_SPEECH", "TERMS_VIOLATION".
            Texto para análise: "${text}"
        `;

        // 3. Correção da Chamada da IA
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash-preview",
            generationConfig: { responseMimeType: "application/json" }
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
        
        // 4. Correção da Análise da Resposta
        const analysis = JSON.parse(response.text());

        req.logger.log('MODERATION_ANALYZE_SUCCESS', { userEmail, analysis });
        res.json(analysis);

    } catch (error) {
        // 5. Integração com o Logging Estruturado
        req.logger.error('MODERATION_AI_ERROR', { 
            error: error.message, 
            stack: error.stack,
            userEmail: req.body.userEmail
        });

        // Fail-safe: Em caso de erro na IA, permite o post, mas loga para revisão humana
        // e informa o cliente sobre o erro de moderação.
        res.status(500).json({ isAdult: false, error: "MODERATION_FAILED" });
    }
});

export default router;
