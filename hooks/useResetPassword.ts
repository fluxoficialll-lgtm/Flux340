
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { ErroSenha } from '@/tipos';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const email = localStorage.getItem('reset_email');

  useEffect(() => {
    if (!email) navigate('/forgot-password');
  }, [email, navigate]);

  const validate = () => {
      if (!password) return "Nova senha obrigatória";
      if (password.length < 6) return ErroSenha.SENHA_MUITO_CURTA;
      if (!confirm) return "Confirme sua senha";
      if (password !== confirm) return ErroSenha.SENHAS_NAO_CONFEREM;
      return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valError = validate();
    if (valError) {
        setError(valError);
        return;
    }

    setLoading(true);
    setError('');
    
    try {
        if (email) {
            await authService.resetPassword(email, password);
            localStorage.removeItem('reset_email'); // Cleanup
            alert("Senha alterada com sucesso!");
            navigate('/');
        }
    } catch (err: any) {        
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const isValid = password.length >= 6 && password === confirm;

  return {
    password,
    setPassword,
    confirm,
    setConfirm,
    error,
    loading,
    handleSubmit,
    isValid
  };
};
