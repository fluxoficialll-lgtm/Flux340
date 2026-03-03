
// --- SafeFetchPatcher.ts ---
// Este módulo fornece uma maneira segura de modificar ("monkey-patch") a função global `fetch`.
// Ele garante que o contexto (`window`) nunca seja perdido e permite que múltiplos
// serviços "embrulhem" a função fetch em uma cadeia previsível.

type FetchFunction = (url: URL | RequestInfo, config?: RequestInit) => Promise<Response>;

/**
 * Mantém uma referência à função fetch original (ou a última versão envelopada),
 * sempre com o contexto correto.
 */
let currentFetch: FetchFunction = window.fetch.bind(window);

/**
 * Substitui a função fetch global por uma nova versão que passa por todos os wrappers registrados.
 * 
 * @param {FetchFunction} newWrapper - A nova função de wrapper que interceptará as chamadas fetch.
 *                                      Esta função DEVE chamar a função `originalFetch` que recebe
 *                                      como argumento para continuar a cadeia.
 */
function patchFetch(newWrapper: (originalFetch: FetchFunction, url: URL | RequestInfo, config?: RequestInit) => Promise<Response>) {
    const previousFetch = currentFetch;
    
    // O novo `currentFetch` é uma função que chama o `newWrapper` com a versão anterior do fetch.
    currentFetch = (url, config) => newWrapper(previousFetch, url, config);
    
    // Atualiza a função global window.fetch para o nosso novo wrapper encadeado.
    window.fetch = currentFetch;
}

/**
 * Um objeto que expõe a funcionalidade de patching de forma controlada.
 * Os serviços devem usar `SafeFetchPatcher.apply` para adicionar sua lógica.
 */
export const SafeFetchPatcher = {
    apply: patchFetch,
};
