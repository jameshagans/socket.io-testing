const socket = io();

socket.on('connect', (client) => {
  console.log('You have connected to the server');
});

socket.on('user_connected', (data) => {
  console.log('The server says:', data);
});

socket.on('greeting from server', (data) => {
  console.log('The server says:', data);
});

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  console.log('msg = ', msg);
});
