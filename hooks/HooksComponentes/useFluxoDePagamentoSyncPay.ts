
import { useState, useEffect, useRef } from 'react';
import { SistemaSyncPay as syncPayService } from '../../ServiçosFrontend/ServiçoDeProvedoresDePagamentos/SistemaSyncPay.js';
import { authService } from '../../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { currencyService } from '../../ServiçosFrontend/ServiçoDeMoeda/currencyService.js';
import { Group, User } from '../../types';

export type SyncPayView = 'selection' | 'pix' | 'boleto';

interface UseFluxoDePagamentoSyncPayProps {
    group: Group;
    onSuccess: () => void;
    onError: (msg: string) => void;
    onTransactionId: (id: string) => void;
}

export const useFluxoDePagamentoSyncPay = ({ group, onSuccess, onError, onTransactionId }: UseFluxoDePagamentoSyncPayProps) => {
    const [currentView, setCurrentView] = useState<SyncPayView>('selection');
    const [pixCode, setPixCode] = useState('');
    const [pixImage, setPixImage] = useState<string | undefined>(undefined);
    const [boletoUrl, setBoletoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const pollingInterval = useRef<any>(null);

    useEffect(() => {
        return () => { if (pollingInterval.current) clearInterval(pollingInterval.current); };
    }, []);

    const startPolling = (id: string, ownerEmail: string, email: string) => {
        if (pollingInterval.current) clearInterval(pollingInterval.current);
        pollingInterval.current = setInterval(async () => {
            try {
                const res = await syncPayService.checkTransactionStatus(id, ownerEmail, group.id, email);
                if (res.status === 'completed' || res.status === 'paid') {
                    clearInterval(pollingInterval.current);
                    onSuccess();
                }
            } catch (e) { clearInterval(pollingInterval.current); }
        }, 3000);
    };

    const generatePayment = async (selectedMethod: SyncPayView) => {
        if (selectedMethod === 'selection') return;
        
        setIsLoading(true);
        
        const user = authService.getCurrentUser();
        const guestEmail = localStorage.getItem('guest_email_capture');
        if (!user && !guestEmail) { 
            onError("E-mail não identificado. Por favor, recarregue a página."); 
            setIsLoading(false);
            return; 
        }
        
        const email = user?.email || guestEmail!;

        try {
            const baseCurrency = group.currency || 'BRL';
            const basePrice = parseFloat(group.price || '0');
            
            let finalBrlAmount = basePrice;
            if (baseCurrency !== 'BRL') {
                const conversionResult = await currencyService.convert(basePrice, baseCurrency, 'BRL');
                finalBrlAmount = conversionResult.amount;
            }

            const creatorId = group.creatorEmail || group.creatorId;
            const syncGroup = { ...group, price: finalBrlAmount.toString(), currency: 'BRL' as const, creatorEmail: creatorId };

            const { pixCode, identifier, qrCodeImage, boletoUrl } = await syncPayService.createPayment({ email } as User, syncGroup, selectedMethod);
            
            setPixCode(pixCode);
            setPixImage(qrCodeImage);
            setBoletoUrl(boletoUrl);
            onTransactionId(identifier);
            setCurrentView(selectedMethod);
            startPolling(identifier, creatorId, email);

        } catch (error: any) {
            onError(error.message || "Erro ao gerar pagamento.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        currentView,
        setCurrentView,
        isLoading,
        pixCode,    // Apenas fornece o código
        pixImage,
        boletoUrl,
        generatePayment,
    };
};
