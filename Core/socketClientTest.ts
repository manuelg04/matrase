import * as io from 'socket.io-client';

// Conectar al servidor de Socket.io.
const socket = io.io('http://localhost:4000');

// Emitir un evento de 'chat_message'.
socket.emit('chat_message', {
  id: 4,
  mensaje: 'Hola, esto es un mensaje de prueba!',
  idUsuario: 1,
  tipoMensaje: 'text',
  fechaHora: '2023-09-26'
});

// Escuchar el evento 'get_message_12345'.
socket.on('get_message_12345', (payload) => {
  console.log('Mensaje recibido:', payload);
});
