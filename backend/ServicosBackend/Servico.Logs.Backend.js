
class ServicoLog {

  static log(level, contexto, mensagem, dados = null) {
    const tempo = new Date().toISOString();
    const levelUpper = level.toUpperCase();
    const logString = `[${tempo}] [${levelUpper}] [${contexto}] ${mensagem}`;

    if (dados) {
      console.log(logString, dados);
    } else {
      console.log(logString);
    }
  }

  static info(contexto, mensagem, dados = null) {
    this.log('info', contexto, mensagem, dados);
  }

  static erro(contexto, mensagem, erro = null) {
    const tempo = new Date().toISOString();
    const logString = `[${tempo}] [ERRO] [${contexto}] ${mensagem}`;
    
    if (erro) {
        console.error(logString, erro);
    } else {
        console.error(logString);
    }
  }

  static warn(contexto, mensagem, dados = null) {
    this.log('warn', contexto, mensagem, dados);
  }

  static debug(contexto, mensagem, dados = null) {
    // Opcional: Logar debug apenas em ambiente de desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', contexto, mensagem, dados);
    }
  }

  static jsonEnviado(contexto, dados) {
    this.log('json_sent', contexto, 'JSON Enviado', dados);
  }

  static jsonRecebido(contexto, dados) {
    this.log('json_received', contexto, 'JSON Recebido', dados);
  }
}

export default ServicoLog;
