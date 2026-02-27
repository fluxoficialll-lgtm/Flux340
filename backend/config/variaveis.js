
// backend/config/variaveis.js

export const VARIAVEIS_BACKEND = {
    obrigatorias: [
        'DATABASE_URL',
        'JWT_SECRET',
        'VITE_GOOGLE_CLIENT_ID', // Usado no cliente, precisa do prefixo
        'GOOGLE_CLIENT_SECRET',  // Segredo do servidor, SEM prefixo
    ],
    comFallback: {
        'PORT': 3001,
        'CORS_ORIGIN': process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173',
    },
    opcionais: [
        'STRIPE_SECRET_KEY', // Segredo do servidor, SEM prefixo
    ],
};
