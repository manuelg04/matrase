// client2.ts
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

socket.on('get_message_12345', (payload) => {
  console.log('Cliente 2 - Mensaje recibido:', payload);
});
