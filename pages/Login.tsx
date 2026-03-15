
import React from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useUsuarioSessao } from '../hooks/Hook.Usuario.Sessao';
import { useLoginEmailSenha } from '../hooks/Hook.Login.Email.Senha'; // Hook para email/senha
import { useGoogleLogin } from '../hooks/Hook.Login.Google'; // Hook para Google Login
import { LoginInitialCard } from '../Componentes/ComponentesDeAuth/Componentes/LoginInitialCard';
import { LoginEmailCard } from '../Componentes/ComponentesDeAuth/Componentes/LoginEmailCard';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Login: React.FC = () => {
    // Hook de autenticação geral (verifica se o usuário já está logado)
    const { user, loading: authLoading } = useUsuarioSessao();

    // Hook específico para o fluxo de login com email e senha
    const {
        processando: processandoEmail,
        erro: erroEmail,
        mostrarFormEmail,
        setMostrarFormEmail,
        email,
        definirEmail,
        senha,
        definirSenha,
        submeterLoginEmail,
    } = useLoginEmailSenha();

    // Hook específico para o fluxo de login com Google
    const {
        processando: processandoGoogle,
        erro: erroGoogle,
        submeterLoginGoogle,
    } = useGoogleLogin();

    // Estado de carregamento geral para a UI
    const isLoading = processandoEmail || processandoGoogle || authLoading;

    // Se o hook de autenticação ainda está verificando, mostramos um loader global
    if (authLoading) {
        return (
            <div className="h-screen w-full bg-[#0c0f14] flex flex-col items-center justify-center gap-4">
                <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl"></i>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[3px]">
                    Verificando Credenciais...
                </span>
            </div>
        );
    }

    // Se o usuário já está logado, redireciona
    if (user) {
        return <Navigate to={user.profile_completed ? '/feed' : '/complete-profile'} replace />;
    }

    // Componente para a camada de sobreposição durante o processamento
    const CamadaDeProcessamento = () => (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-[32px] flex items-center justify-center z-50">
            <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl"></i>
        </div>
    );

    // Componente que renderiza o botão de login do Google
    const BotaoGoogle = () => {
        if (!GOOGLE_CLIENT_ID) {
            return (
                <div className="w-full text-center p-4 bg-red-900/50 border border-red-500/50 rounded-lg">
                    <p className="text-white text-xs">VITE_GOOGLE_CLIENT_ID não configurada.</p>
                </div>
            );
        }

        return (
            <div className="w-full flex justify-center">
                <GoogleLogin
                    onSuccess={submeterLoginGoogle}
                    onError={() => console.error(erroGoogle || 'Login com Google falhou')}
                    shape="rectangular"
                    size="large"
                    theme="filled_black"
                />
            </div>
        );
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white font-['Inter'] relative overflow-hidden">
            {/* Efeitos de fundo */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-[400px] mx-4 bg-white/5 backdrop-blur-2xl rounded-[32px] p-10 border border-white/10 shadow-2xl relative z-10 flex flex-col items-center">
                {mostrarFormEmail ? (
                    <LoginEmailCard 
                        email={email}
                        definirEmail={definirEmail}
                        senha={senha}
                        definirSenha={definirSenha}
                        aoSubmeter={submeterLoginEmail}
                        aoVoltar={() => setMostrarFormEmail(false)}
                        carregando={processandoEmail}
                        erro={erroEmail || erroGoogle}
                    />
                ) : (
                    <LoginInitialCard 
                        onSelecionarEmail={() => setMostrarFormEmail(true)}
                        slotBotaoGoogle={<BotaoGoogle />}
                    />
                )}
                
                {/* Exibe a camada de processamento se qualquer um dos logins estiver ativo */}
                {isLoading && <CamadaDeProcessamento />}
            </div>
        </div>
    );
};
