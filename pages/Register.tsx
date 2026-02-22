
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister'; // Importando o novo hook
import { RegisterCard } from '../Componentes/ComponentesDeAuth/Componentes/RegisterCard';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  
  // Utilizando o hook para obter todos os estados e manipuladores
  const {
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    termsAccepted, setTermsAccepted,
    errors,
    loading,
    isValid,
    referredBy,
    handleSubmit,
  } = useRegister();

  return (
    <div className="h-screen w-full overflow-y-auto bg-[#0c0f14] text-white font-['Inter'] flex items-center justify-center p-5">
        <header className="fixed top-0 left-0 w-full flex justify-start p-5 z-10">
            <button onClick={() => navigate('/')} className="bg-white/10 p-2 rounded-full border border-[#00c2ff] text-[#00c2ff]">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
        </header>

        <RegisterCard 
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
            termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted}
            errors={errors} loading={loading} isValid={isValid} referredBy={referredBy}
            onSubmit={handleSubmit}
        />
    </div>
  );
};
