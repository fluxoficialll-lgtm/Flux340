
// --- SIMULAÇÃO DO SERVIÇO DE MÉTRICAS ---

// Este handler intercepta chamadas para o endpoint de métricas e retorna uma resposta JSON.
// Isso evita o erro 'Unexpected end of JSON input' em locais que rastreiam eventos
// e esperam uma resposta JSON do backend.
const handleMetrics = async (): Promise<Response> => {
    console.log(`[SIMULAÇÃO] ✅ Interceptada chamada de métricas. Retornando resposta JSON simulada.`);
    const responseBody = JSON.stringify({ success: true, message: "Evento de métrica recebido pela simulação." });
    
    await new Promise(res => setTimeout(res, 50)); // Pequeno atraso

    return new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const metricsHandlers = {
    '/api/metrics/comment': handleMetrics,
};