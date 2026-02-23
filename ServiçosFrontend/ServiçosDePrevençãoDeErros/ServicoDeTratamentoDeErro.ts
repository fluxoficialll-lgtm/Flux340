import { rastreadorDeEventos } from '../ServiçoDeTelemetria/RastreadorDeEventos';
import { ERROR_LEVEL } from './TiposDeErro.ts';

export const handleError = (error: Error, context: any = {}) => {
  const level = classifyError(error);

  rastreadorDeEventos.trackCriticalError(error, context);

  console.error('[ERROR_HANDLER]', {
    level,
    message: error.message,
    context
  });
};

const classifyError = (error: Error) => {
  return ERROR_LEVEL.CRITICAL;
};
