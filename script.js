const gato = document.getElementById('gato');
let gatoX = 0;
let gatoY = 0;

let contadorActividad = 0;

// Función para mover el gato
function moverGato(direccion) {
    const paso = 20;
    if (direccion === 'izquierda') {
        gatoX -= paso;
    } else if (direccion === 'derecha') {
        gatoX += paso;
    } else if (direccion === 'arriba') {
        gatoY -= paso;
    } else if (direccion === 'abajo') {
        gatoY += paso;
    }
    gato.style.left = `${gatoX}px`;
    gato.style.top = `${gatoY}px`;

    verificarColisiones();
}

// Función para hacer saltar al gato
function saltarGato() {
    gato.style.transition = "transform 0.2s";
    gato.style.transform = "translateY(-50px)";
    setTimeout(() => {
        gato.style.transform = "translateY(0)";
    }, 200);
}

// Función para verificar colisiones
function verificarColisiones() {
    const comida = document.getElementById('comida');
    const jugueteSala = document.getElementById('juguete-sala');
    const jugueteDormitorio = document.getElementById('juguete-dormitorio');
    const jugueteJardin = document.getElementById('juguete-jardin');

    // Verificar si el gato colisiona con la comida
    if (colisiona(gato, comida)) {
        comida.style.display = 'none';
        contadorActividad++;
        verificarCansancio();
    }

    // Verificar si el gato colisiona con los juguetes
    if (colisiona(gato, jugueteSala)) {
        jugueteSala.style.display = 'none';
        contadorActividad++;
        verificarCansancio();
    }
    if (colisiona(gato, jugueteDormitorio)) {
        jugueteDormitorio.style.display = 'none';
        contadorActividad++;
        verificarCansancio();
    }
    if (colisiona(gato, jugueteJardin)) {
        jugueteJardin.style.display = 'none';
        contadorActividad++;
        verificarCansancio();
    }
}

// Función de colisión
function colisiona(a, b) {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    return !(rectA.right < rectB.left || 
             rectA.left > rectB.right || 
             rectA.bottom < rectB.top || 
             rectA.top > rectB.bottom);
}

// Función para verificar si el gato está cansado
function verificarCansancio() {
    if (contadorActividad >= 4) {
        mostrarCama();
    }
}

// Función para mostrar la cama
function mostrarCama() {
    const cama = document.getElementById('cama');
    cama.style.display = 'block';
    gato.style.display = 'none'; // Hacer que el gato desaparezca
    reiniciarObjetos();
}

// Reiniciar objetos después de un tiempo
function reiniciarObjetos() {
    setTimeout(() => {
        document.getElementById('comida').style.display = 'block';
        document.getElementById('juguete-sala').style.display = 'block';
        document.getElementById('juguete-dormitorio').style.display = 'block';
        document.getElementById('juguete-jardin').style.display = 'block';
        contadorActividad = 0;
        document.getElementById('cama').style.display = 'none';
        gato.style.display = 'block'; // Volver a mostrar el gato
    }, 5000); // 5 segundos para reiniciar
}

// Mostrar juguetes aleatorios al inicio
function mostrarJuguetes() {
    document.getElementById('juguete-sala').style.display = 'block';
    document.getElementById('juguete-dormitorio').style.display = 'block';
    document.getElementById('juguete-jardin').style.display = 'block';
}

// Llama a la función para mostrar los juguetes al cargar la página
window.onload = mostrarJuguetes;
