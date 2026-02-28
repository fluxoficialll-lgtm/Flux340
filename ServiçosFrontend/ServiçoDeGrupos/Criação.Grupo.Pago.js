import { fileService } from '../ServiçoDeArquivos/fileService.js';

class ServiçoCriaçãoGrupoPago {
    async criar(payload, onProgress) {
        const {
            groupName, description, selectedCoverFile, vipMediaItems, 
            vipDoorText, vipButtonText, numericPrice, currency, accessType, 
            accessConfig, selectedProviderId, pixelId, pixelToken
        } = payload;

        const filesToUpload = vipMediaItems.map(item => item.file).filter(Boolean);
        if (selectedCoverFile) {
            filesToUpload.unshift(selectedCoverFile);
        }

        onProgress(0, 0, filesToUpload.length);

        let filesUploadedCount = 0;
        let finalCoverUrl = '';
        const finalMediaGallery = [];

        // Upload cover image first if it exists
        if (selectedCoverFile) {
            finalCoverUrl = await fileService.upload(selectedCoverFile, `group-covers/${Date.now()}_${selectedCoverFile.name}`);
            filesUploadedCount++;
            onProgress((filesUploadedCount / filesToUpload.length) * 100, filesUploadedCount, filesToUpload.length);
        }

        // Upload VIP door media
        const vipItemsWithFiles = vipMediaItems.filter(item => item.file);
        for (const item of vipItemsWithFiles) {
            const uploadedUrl = await fileService.upload(item.file, `vip-door-media/${Date.now()}_${item.file.name}`);
            finalMediaGallery.push({ url: uploadedUrl, type: item.type });
            filesUploadedCount++;
            onProgress((filesUploadedCount / filesToUpload.length) * 100, filesUploadedCount, filesToUpload.length);
        }

        // Add media items that were already URLs (e.g., when editing a group)
        vipMediaItems.forEach(item => {
            if (!item.file) {
                finalMediaGallery.push({ url: item.url, type: item.type });
            }
        });

        const apiPayload = {
            groupName,
            description,
            finalCoverUrl,
            vipDoorText,
            vipButtonText,
            numericPrice,
            currency,
            accessType,
            accessConfig,
            selectedProviderId,
            pixelId,
            pixelToken,
            finalMediaGallery,
        };

        const response = await fetch('/api/groups/paid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiPayload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao criar o grupo VIP.');
        }

        return await response.json();
    }
}

export default new ServiçoCriaçãoGrupoPago();