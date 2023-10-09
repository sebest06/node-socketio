

const lblEscritorio = document.querySelector('h1');
const lblAtendiendo = document.querySelector('h4');
const btnAtender = document.querySelector('button');
const lblAlert = document.querySelector('.alert');
//const lblTicket = document.querySelector('small');


const searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El parametro escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

lblAlert.style.display = 'none';


console.log('Nuevo Ticket HTML');

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.style.display = '';

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.style.display = 'none';
    
});

socket.on('actual-ticket', (ulitmo) => {
    //lblAtendiendo.innerText = 'Ticket ' + ulitmo;
})

btnAtender.addEventListener( 'click', () => {
    
    socket.emit( 'atender-ticket', {escritorio}, ( {ok, ticket} ) => {
        //console.log(payload);
        if(!ok){
            lblAtendiendo.innerText = 'Nadie';
            lblAlert.style.display = '';
            return
        }
        
        lblAtendiendo.innerText = 'Ticket ' + ticket.numero;
        
    });
    

});