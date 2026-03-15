
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js

/**
 * @file Agregador de serviços relacionados a grupos.
 * 
 * Este arquivo importa todos os serviços modulares de grupo (cargos, membros, convites, etc.)
 * e os exporta como um único objeto `groupSystem`. Isso mantém uma API consistente
 * para o resto da aplicação, permitindo que a lógica interna seja dividida em arquivos menores
 * e mais fáceis de gerenciar, sem quebrar o código que consome esses serviços.
 */

import * as roleService from './Servico.Sistema.Cargos.js';
import * as inviteService from './Servico.Sistema.Convites.js';
import * as memberService from './Servico.Sistema.Membros.js';
import * as settingsService from './Servico.Sistema.Configuracoes.js';

/**
 * Objeto de serviço unificado que combina todos os submódulos de grupo.
 * Mantém uma interface consistente para o resto da aplicação.
 */
export const groupSystem = {
    // Funções do serviço de cargos
    ...roleService,

    // Funções do serviço de convites
    ...inviteService,

    // Funções do serviço de membros
    ...memberService,

    // Funções do serviço de configurações e estatísticas
    ...settingsService,
};
