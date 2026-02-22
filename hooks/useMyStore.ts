
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceService } from '../ServiçosDoFrontend/marketplaceService';
import { adService } from '../ServiçosDoFrontend/adService';
import { authService } from '../ServiçosDoFrontend/ServiçosDeAutenticacao/authService';
import { screenService, BusinessDashboardData } from '../ServiçosDoFrontend/screenService';

export const useMyStore = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'products' | 'campaigns'>('products');
    const [dashboardData, setDashboardData] = useState<BusinessDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadAggregatedData = useCallback(async () => {
        const user = authService.getCurrentUser();
        if (!user) {
            navigate('/');
            return;
        }
        setLoading(true);
        try {
            const data = await screenService.getMyBusinessData(user.id);
            setDashboardData(data);
        } catch (e) {
            console.error("BFF Error:", e);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        loadAggregatedData();
    }, [loadAggregatedData]);

    const deleteProduct = async (id: string) => {
        await marketplaceService.deleteItem(id);
        loadAggregatedData();
    };

    const endCampaign = async (id: string) => {
        await adService.updateCampaignStatus(id, 'ended');
        loadAggregatedData();
    };

    const resumeCampaign = async (id: string) => {
        await adService.updateCampaignStatus(id, 'active');
        loadAggregatedData();
    };

    const deleteCampaign = async (id: string) => {
        await adService.deleteCampaign(id);
        loadAggregatedData();
    };

    const handleBack = () => {
        navigate(-1);
    };

    return {
        activeTab,
        setActiveTab,
        dashboardData,
        loading,
        deleteProduct,
        endCampaign,
        resumeCampaign,
        deleteCampaign,
        handleBack
    };
}
