
class Perfil {
    constructor({
        id,
        usuarioId,
        nome,
        apelido,
        bio,
        urlFoto,
        site,
        privado = false,
        perfilCompleto = false,
        dataCriacao,
        dataAtualizacao
    }) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.nome = nome;
        this.apelido = apelido;
        this.bio = bio;
        this.urlFoto = urlFoto;
        this.site = site;
        this.privado = privado;
        this.perfilCompleto = perfilCompleto;
        this.dataCriacao = dataCriacao || new Date();
        this.dataAtualizacao = dataAtualizacao || new Date();
    }

    paraBancoDeDados() {
        return {
            user_id: this.usuarioId,
            name: this.nome,
            nickname: this.apelido,
            bio: this.bio,
            photo_url: this.urlFoto,
            website: this.site,
            is_private: this.privado,
            profile_completed: this.perfilCompleto
        };
    }

    static deBancoDeDados(dados) {
        if (!dados) return null;
        return new Perfil({
            id: dados.id,
            usuarioId: dados.user_id,
            nome: dados.name,
            apelido: dados.nickname,
            bio: dados.bio,
            urlFoto: dados.photo_url,
            site: dados.website,
            privado: dados.is_private,
            perfilCompleto: dados.profile_completed,
            dataCriacao: dados.created_at,
            dataAtualizacao: dados.updated_at
        });
    }

    paraRespostaHttp() {
        return {
            id: this.id,
            usuarioId: this.usuarioId,
            nome: this.nome,
            apelido: this.apelido,
            bio: this.bio,
            urlFoto: this.urlFoto,
            site: this.site,
            privado: this.privado,
            perfilCompleto: this.perfilCompleto,
            dataCriacao: this.dataCriacao,
            dataAtualizacao: this.dataAtualizacao
        };
    }
}

export default Perfil;
