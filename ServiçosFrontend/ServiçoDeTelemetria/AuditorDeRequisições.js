
// ServiçosFrontend/ServiçoDeTelemetria/AuditorDeRequisições.js

// Objeto para manter o estado do auditor
const auditorState = {
  isInitialized: false,
  originalFetch: null,
};

// Função para inicializar o auditor de requisições
export function initAuditorDeRequisições() {
  // Evita reinicialização, que pode causar loops infinitos
  if (auditorState.isInitialized) {
    return;
  }
  
  // Armazena a função fetch original apenas uma vez
  auditorState.originalFetch = window.fetch;
  
  // Substitui a função fetch global
  window.fetch = async (...args) => {
    const [resource, config] = args;
    
    // Extrai a URL, tratando tanto o caso de ser uma string quanto um objeto Request
    const url = typeof resource === 'string' ? resource : resource.url;
    const startTime = performance.now();

    try {
      // Executa a requisição usando a função fetch original armazenada
      const response = await auditorState.originalFetch(...args);
      const duration = performance.now() - startTime;

      // Log de sucesso
      console.log(`[AUDITOR] Sucesso: ${response.status} ${url} (${duration.toFixed(2)}ms)`);
      
      return response;

    } catch (error) {
      const duration = performance.now() - startTime;

      // Log de erro
      console.error(`[AUDITOR] Falha: ${url} (${duration.toFixed(2)}ms)`, error);

      // Propaga o erro para que a aplicação possa tratá-lo
      throw error;
    }
  };

  // Marca o auditor como inicializado
  auditorState.isInitialized = true;
  console.log("[AUDITOR] Auditor de Requisições iniciado.");
}
