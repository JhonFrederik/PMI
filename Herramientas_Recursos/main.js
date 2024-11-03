// Inicializamos las variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

// Apuntando a elementos HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// Generación de imágenes aleatorias
let imagenes = [
    '/images/1.png', '/images/1.png', 
    '/images/2.jpg', '/images/2.jpg', 
    '/images/3.jpg', '/images/3.jpg', 
    '/images/4.png', '/images/4.png', 
    '/images/5.png', '/images/5.png', 
    '/images/6.jpg', '/images/6.jpg', 
    '/images/7.png', '/images/7.png', 
    '/images/8.jpg', '/images/8.jpg'
];
imagenes = imagenes.sort(() => Math.random() - 0.5);
console.log(imagenes);

// Función para contar tiempo
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    }, 1000);
}

// Función para bloquear tarjetas cuando el tiempo se acaba
function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="${imagenes[i]}" alt="imagen" />`;
        tarjetaBloqueada.disabled = true;
    }
}

// Función principal para destapar una tarjeta
function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas == 1) {
        // Mostrar primera imagen
        tarjeta1 = document.getElementById(id);
        primerResultado = imagenes[id];
        tarjeta1.innerHTML = `<img src="${primerResultado}" alt="imagen" />`;

        // Deshabilitar primer botón
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        // Mostrar segunda imagen
        tarjeta2 = document.getElementById(id);
        segundoResultado = imagenes[id];
        tarjeta2.innerHTML = `<img src="${segundoResultado}" alt="imagen" />`;

        // Deshabilitar segundo botón
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado === segundoResultado) {
            // Restablecer el contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarTiempo.innerHTML = `Fantástico, solo demoraste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }
        } else {
            // Mostrar las imágenes momentáneamente y volver a tapar si no coinciden
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}
