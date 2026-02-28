import { fileService } from '../ServiçoDeArquivos/fileService.js';

class ServiçoCriaçãoGrupoPrivado {
    async criar(groupData) {
        let coverImageUrl = '';
        if (groupData.coverImageBlob) {
            coverImageUrl = await fileService.upload(groupData.coverImageBlob, `group-covers/${Date.now()}.png`);
        }

        const response = await fetch('/api/groups/private', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: groupData.name,
                description: groupData.description,
                coverImage: coverImageUrl,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao criar o grupo privado.');
        }

        return await response.json();
    }
}

export default new ServiçoCriaçãoGrupoPrivado();