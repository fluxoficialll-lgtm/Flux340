
import React from 'react';
import { Route } from 'react-router-dom';
import { FinancialPanel } from '../../pages/FinancialPanel';
import { ProviderConfig } from '../../pages/ProviderConfig';
import TransactionHistoryPage from '../../pages/TransactionHistoryPage';

export const SettingsRoutes = [
    <Route key="financial" path="/financial" element={<FinancialPanel />} />,
    <Route key="financial-providers" path="/financial/providers" element={<ProviderConfig />} />,
    <Route key="financial-transactions" path="/financial/transactions" element={<TransactionHistoryPage />} />
];
