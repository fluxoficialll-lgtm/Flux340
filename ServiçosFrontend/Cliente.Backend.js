
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import VariaveisFrontend from './Config/Variaveis.Frontend.js';
import ServicoLog from './ServicoLogs/ServicoDeLog.js';

const ClienteBackend = axios.create({
    baseURL: VariaveisFrontend.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de Requisição Aprimorado
ClienteBackend.interceptors.request.use(
    (config) => {
        const traceId = uuidv4();
        
        // Problema 1 e 4 resolvidos: Armazenar traceId e startTime nos metadados
        config.metadata = { startTime: Date.now(), traceId };

        config.headers['X-Flux-Trace-ID'] = traceId;
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Problema 3 resolvido: Log do payload da requisição
        ServicoLog.info(
            'ClienteBackend.Request',
            `▶️ ${config.method.toUpperCase()} ${config.url}`,
            {
                traceId,
                payload: config.data, // Adiciona o corpo da requisição ao log
            }
        );

        return config;
    },
    (error) => {
        ServicoLog.erro('ClienteBackend.Request.Error', 'Erro ao configurar a requisição', error);
        return Promise.reject(error);
    }
);

// Interceptor de Resposta Aprimorado
ClienteBackend.interceptors.response.use(
    (response) => {
        // Problema 4 resolvido: Calcular duração
        const duration = Date.now() - response.config.metadata.startTime;
        const { traceId } = response.config.metadata;

        // Problema 2 resolvido: Log da resposta de sucesso
        ServicoLog.info(
            'ClienteBackend.Response',
            `✅ ${response.status} ${response.config.url} em ${duration}ms`,
            {
                traceId,
                status: response.status,
                duration,
            }
        );

        return response;
    },
    (error) => {
        const contexto = 'ClienteBackend.Response.Error';
        
        // Garante que a configuração exista, mesmo em erros de rede
        if (!error.config || !error.config.metadata) {
            ServicoLog.erro(contexto, 'Erro de rede ou configuração ausente', { message: error.message });
            return Promise.reject(error);
        }

        const { startTime, traceId } = error.config.metadata;
        const duration = Date.now() - startTime;

        if (error.response) {
            const { status, data, config } = error.response;
            ServicoLog.erro(contexto, `❌ ${status} ${config.url} em ${duration}ms`,
                {
                    traceId,
                    status,
                    duration,
                    errorData: data,
                }
            );

            if (status === 401) {
                ServicoLog.warn(contexto, 'Token inválido ou expirado. Deslogando usuário.', { traceId });
                localStorage.removeItem('userToken');
                localStorage.removeItem('user');
                window.dispatchEvent(new Event('authChange'));
            }
        } else {
            ServicoLog.erro(contexto, `Erro de rede em ${error.config.url} em ${duration}ms`,
                {
                    traceId,
                    duration,
                    message: error.message,
                }
            );
        }

        return Promise.reject(error);
    }
);

export default ClienteBackend;
