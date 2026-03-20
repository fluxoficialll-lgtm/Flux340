// ServiçosFrontend/ServiçosDePublicações/Servico.Publicacao.Feed.ts

import { PublicacaoFeed } from '../../types/Saida/Types.Estrutura.Publicacao.Feed';
import { apiFeedPublicationService } from '../APIs/APIsServicoPublicacao/API.Servico.Publicacao.Feed';

/**
 * @file Serviço para gerenciar publicações no feed.
 *
 * Este arquivo concentra a lógica de negócios e orquestra as operações
 * relacionadas a posts no feed, delegando a comunicação com a API.
 */
class FeedPublicationService {

  /**
   * Busca todas as publicações do feed.
   * @returns Uma promessa que resolve para um array de publicações.
   */
  async getPosts(): Promise<PublicacaoFeed[]> {
    try {
      return await apiFeedPublicationService.getPosts();
    } catch (error) {
      console.error('Erro no serviço ao buscar publicações do feed:', error);
      throw new Error('Falha ao buscar publicações.');
    }
  }

  /**
   * Busca uma única publicação pelo seu ID.
   * @param postId - O ID da publicação a ser buscada.
   * @returns Uma promessa que resolve para a publicação encontrada.
   */
  async getById(postId: string): Promise<PublicacaoFeed> {
    try {
      return await apiFeedPublicationService.getPostById(postId);
    } catch (error) {
      console.error(`Erro no serviço ao buscar a publicação ${postId}:`, error);
      throw new Error('Falha ao buscar a publicação.');
    }
  }

  /**
   * Busca publicações no feed com base em um termo de pesquisa.
   * @param query - O termo a ser pesquisado.
   * @returns Uma promessa que resolve para um array de publicações encontradas.
   */
  async search(query: string): Promise<PublicacaoFeed[]> {
    try {
      return await apiFeedPublicationService.searchPosts(query);
    } catch (error) {
      console.error('Erro no serviço ao pesquisar publicações:', error);
      throw new Error('Falha ao pesquisar publicações.');
    }
  }

  /**
   * Cria uma nova publicação no feed.
   * @param postData - Os dados da nova publicação.
   * @returns Uma promessa que resolve para a nova publicação criada.
   */
  async createPost(postData: FormData): Promise<PublicacaoFeed> {
    try {
      return await apiFeedPublicationService.createPost(postData);
    } catch (error) {
      console.error('Erro no serviço ao criar publicação no feed:', error);
      throw new Error('Falha ao criar publicação.');
    }
  }

  /**
   * Atualiza uma publicação existente.
   * @param postId - O ID da publicação a ser atualizada.
   * @param postData - Os dados atualizados da publicação.
   * @returns Uma promessa que resolve para a publicação atualizada.
   */
  async updatePost(postId: string, postData: Partial<PublicacaoFeed>): Promise<PublicacaoFeed> {
    try {
      return await apiFeedPublicationService.updatePost(postId, postData);
    } catch (error) {
      console.error(`Erro no serviço ao atualizar a publicação ${postId}:`, error);
      throw new Error('Falha ao atualizar publicação.');
    }
  }

  /**
   * Deleta uma publicação do feed.
   * @param postId - O ID da publicação a ser deletada.
   */
  async deletePost(postId: string): Promise<void> {
    try {
      await apiFeedPublicationService.deletePost(postId);
    } catch (error) {
      console.error(`Erro no serviço ao deletar a publicação ${postId}:`, error);
      throw new Error('Falha ao deletar publicação.');
    }
  }
}

export const feedPublicationService = new FeedPublicationService();
