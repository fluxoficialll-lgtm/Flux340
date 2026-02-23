type EnvConfig = {
  VITE_API_URL: string;
};

const DEFAULT_CONFIG: EnvConfig = {
  VITE_API_URL: 'http://localhost:3000', // Fallback for local development
};

const getRuntimeConfig = (): Partial<EnvConfig> => {
  // 1. Vite env (for development, from .env files)
  const viteEnv = (import.meta as any)?.env || {};

  // 2. window.__ENV__ (for production, injected via index.html)
  const windowEnv = (window as any).__ENV__ || {};

  return {
    VITE_API_URL: viteEnv.VITE_API_URL || windowEnv.VITE_API_URL,
  };
};

const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const loadEnvironment = (): EnvConfig => {
  const runtime = getRuntimeConfig();

  const finalConfig: EnvConfig = {
    VITE_API_URL: runtime.VITE_API_URL || DEFAULT_CONFIG.VITE_API_URL,
  };

  // Non-destructive validation
  const warnings: string[] = [];

  if (!runtime.VITE_API_URL) {
    warnings.push('VITE_API_URL não definida. Usando fallback para localhost:3000.');
  }

  if (!isValidUrl(finalConfig.VITE_API_URL)) {
    warnings.push(`VITE_API_URL inválida: "${finalConfig.VITE_API_URL}". O app pode não conseguir se conectar ao backend.`);
  }

  if (warnings.length > 0) {
    console.warn('[CONFIG WARNING]', warnings.join(' '));
  } else {
    console.log('[CONFIG] Environment configurado com sucesso.');
  }

  return finalConfig;
};

// Load config immediately and export it
export const config = loadEnvironment();

// Make it globally available for easier access and debugging
(window as any).__CONFIG__ = config;