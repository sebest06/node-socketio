

console.log('Nuevo Ticket HTML');

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.style.display = '';

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.style.display = 'none';
    
});

socket.on('ultimo-ticket', (ulitmo) => {
    console.log(ulitmo);
    lblNuevoTicket.innerText = 'Ticket ' + ulitmo;
})

btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        console.log(ticket);
        lblNuevoTicket.innerText = ticket;
    });

});