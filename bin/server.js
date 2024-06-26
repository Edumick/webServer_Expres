// comando para inciar serviços do webserver: npm start "start": "nodemon ./bin/server.js"

'use strict';
const app = require('../src/routes');
const debug = require('debug')('balta:server');
const http = require('http');
// configuraçao da porta do servidor
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;
// teste de condicao config para retorno de erro!
  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'requer privilégios elevados');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'já está em uso');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
// Esta função é chamada quando o servidor começa a ouvir conexões.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Ouvindo em ' + bind);
}
