
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useLogin } from '../hooks/useLogin';
import { LoginInitialCard } from '../Componentes/ComponentesDeAuth/Componentes/LoginInitialCard';
import { LoginEmailCard } from '../Componentes/ComponentesDeAuth/Componentes/LoginEmailCard';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Login: React.FC = () => {
    const {
        loading,
        processing,
        error,
        showEmailForm,
        setShowEmailForm,
        email,
        setEmail,
        password,
        setPassword,
        handleEmailLogin,
        handleGoogleSuccess,
    } = useLogin();

    const ProcessingOverlay = () => (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-[32px] flex items-center justify-center z-50">
            <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl"></i>
        </div>
    );

    const GoogleButton = () => {
        if (!GOOGLE_CLIENT_ID) {
            return (
                <div className="w-full flex flex-col items-center justify-center text-center p-4 bg-red-900/50 border border-red-500/50 rounded-lg">
                    <p className="text-white text-xs">A configuração para login com Google (VITE_GOOGLE_CLIENT_ID) não foi encontrada.</p>
                </div>
            );
        }

        return (
            <div className="w-full flex justify-center">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.error('Login com Google falhou')}
                    shape="pill"
                    size="large"
                    width="400px"
                    theme="filled_black"
                />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="h-screen w-full bg-[#0c0f14] flex items-center justify-center">
                <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-3xl"></i>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white font-['Inter'] relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-[400px] mx-4 bg-white/5 backdrop-blur-2xl rounded-[32px] p-10 border border-white/10 shadow-2xl relative z-10 flex flex-col items-center">
                {showEmailForm ? (
                    <LoginEmailCard 
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        onSubmit={handleEmailLogin}
                        onBackToGoogle={() => setShowEmailForm(false)}
                        loading={processing}
                        error={error}
                    />
                ) : (
                    <LoginInitialCard 
                        onSelectEmail={() => setShowEmailForm(true)}
                        googleButtonSlot={<GoogleButton />} // Passamos o botão como um slot!
                        loading={loading}
                        googleProcessing={processing}
                    />
                )}
                
                {processing && <ProcessingOverlay />}
            </div>
        </div>
    );
};
