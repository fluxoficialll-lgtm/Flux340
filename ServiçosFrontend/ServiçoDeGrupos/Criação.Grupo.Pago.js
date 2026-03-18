
import API_Criacao_Grupo_Pago from '../APIs/API.Criacao.Grupo.Pago.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';
import { fileService } from '../ServiçoDeArquivos/fileService.js';

class ServiçoCriaçãoGrupoPago {
    async criar(payload, onProgress) {
        const contexto = "ServiçoCriaçãoGrupoPago.criar";

        const {
            groupName, description, selectedCoverFile, vipMediaItems, 
            vipDoorText, vipButtonText, numericPrice, currency, accessType, 
            accessConfig, selectedProviderId, pixelId, pixelToken
        } = payload;

        // Declarando aqui para estar no escopo do catch
        let filesToUpload = [];

        try {
            // --- Lógica de Upload de Arquivos ---
            filesToUpload = vipMediaItems.map(item => item.file).filter(Boolean);
            if (selectedCoverFile) {
                filesToUpload.unshift(selectedCoverFile);
            }
            ServicoLog.info(contexto, `Iniciando upload de ${filesToUpload.length} arquivos.`);
            onProgress(0, 0, filesToUpload.length);

            let filesUploadedCount = 0;
            let finalCoverUrl = '';
            const finalMediaGallery = [];

            if (selectedCoverFile) {
                finalCoverUrl = await fileService.upload(selectedCoverFile, `group-covers/${Date.now()}_${selectedCoverFile.name}`);
                filesUploadedCount++;
                onProgress((filesUploadedCount / filesToUpload.length) * 100, filesUploadedCount, filesToUpload.length);
            }

            const vipItemsWithFiles = vipMediaItems.filter(item => item.file);
            for (const item of vipItemsWithFiles) {
                const uploadedUrl = await fileService.upload(item.file, `vip-door-media/${Date.now()}_${item.file.name}`);
                finalMediaGallery.push({ url: uploadedUrl, type: item.type });
                filesUploadedCount++;
                onProgress((filesUploadedCount / filesToUpload.length) * 100, filesUploadedCount, filesToUpload.length);
            }

            vipMediaItems.forEach(item => {
                if (!item.file) {
                    finalMediaGallery.push({ url: item.url, type: item.type });
                }
            });
            ServicoLog.info(contexto, "Upload de todos os arquivos concluído.");

            // --- Montagem e Envio do Payload para a API ---
            const apiPayload = {
                groupName, description, finalCoverUrl, vipDoorText, vipButtonText,
                numericPrice, currency, accessType, accessConfig, selectedProviderId,
                pixelId, pixelToken, finalMediaGallery,
            };

            ServicoLog.jsonEnviado(contexto, apiPayload);

            // Refatorado: Delegação da chamada de rede para a camada de API
            const { data } = await API_Criacao_Grupo_Pago.criar(apiPayload);

            ServicoLog.jsonRecebido(contexto, data);
            return data;

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha ao criar o grupo VIP.';
            // O erro já é logado pelo interceptor, mas podemos adicionar um log específico do serviço se quisermos.
            // A linha abaixo se torna opcional se o log do ClienteBackend for suficiente.
            ServicoLog.erro(contexto, errorMessage, { errorData: error.response?.data });
            // Garante que o progresso indique um erro
            onProgress(100, filesToUpload.length, filesToUpload.length, true); 
            throw new Error(errorMessage);
        }
    }
}

export default new ServiçoCriaçãoGrupoPago();
