// ServiçosFrontend/ServicoLogs/ServicoDeLog.js

class ServicoDeLog {
    constructor() {
        if (!ServicoDeLog.instance) {
            ServicoDeLog.instance = this;
        }
        return ServicoDeLog.instance;
    }

    log(level, message, data = {}, context = "App") {
        const timestamp = new Date().toISOString();

        // Estrutura de log forte
        const logEntry = {
            timestamp,
            level,
            context,
            message,
            data
        };

        // Output para o console
        // Em um app real, isso iria para um serviço de log (Datadog, Sentry, etc.)
        console[level](JSON.stringify(logEntry, null, 2));
    }

    info(message, data, context) {
        this.log('log', message, data, context);
    }

    warn(message, data, context) {
        this.log('warn', message, data, context);
    }

    error(message, data, context) {
        this.log('error', message, data, context);
    }

    debug(message, data, context) {
        // Evita logs de debug em produção
        if (process.env.NODE_ENV !== 'production') {
            this.log('debug', message, data, context);
        }
    }
}

const instance = new ServicoDeLog();
Object.freeze(instance);

export default instance;