const socket = io();


let user;
const inputMSJ = document.getElementById('message');



Swal.fire({
  title: 'Te damos la bienvenida a nuestro chat',
  input: 'text',
  text: 'Ingresá tu correo electrónico',
  icon: 'success',
  inputValidator: (value) => {
    return !value && 'Es necesario que te identifiques. ';
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});


inputMSJ.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    let message = inputMSJ.value;
    if ( message.trim().length > 0) {
      socket.emit('message', { user,  message });
      inputMSJ.value = '';
    }
  }
});



 function render(data) {
   const html = data.map((elem) => {
        return `<div>
                <strong>Usuario: ${elem.user}</strong>
                <p>${elem.message}</p>
              </div>`
          }).join(' '); 
    document.getElementById('messages').innerHTML = html;
  }

socket.on('messages', (data) => {
  render(data);
});
