
 // ============================================
// CAPTURA DE ELEMENTOS DEL HTML
// ============================================

// Captura el botón por su ID.
const btnGenerar = document.getElementById("btn-generar");

// Captura el contenedor de la paleta por su clase.
const contenedorPaleta = document.querySelector(".contenedor-paleta");

// Captura el selector de cantidad de colores por su ID.
const selectCantidad = document.getElementById("select-cantidad");

// Captura el selector de formato de color por su ID.
const formatoColor = document.getElementById("formato-color");



// ============================================
// FUNCIÓN PARA GENERAR LA PALETA
// ============================================

// Crear función generarPaleta y modificar su cantidad.
function generarPaleta() {

    // Obtenemos cuántos elementos hay dentro del contenedorPaleta.
    // Ejemplo: si hay 6 cuadrados, coloresActuales vale 6.
    const coloresActuales = contenedorPaleta.children.length;

    // Saber qué cantidad de colores eligió el usuario para su paleta: 6, 8 u 9.
    const cantidad = Number(selectCantidad.value);

    // Creamos un for para generar las cajas de colores.
    for (let i = coloresActuales; i < cantidad; i++) {

        // Creamos una tarjeta que va a contener el cuadro de color y su código.
        const tarjeta = document.createElement("div");

        // Asignamos una clase a la tarjeta para darle estilo en CSS.
        tarjeta.classList.add("tarjeta-color");

        // Creamos el div que contendrá el color.
        const color = document.createElement("div");

        // Agregamos la clase color para aplicarle los estilos de CSS.
        color.classList.add("color");

        // Le decimos a JS que dentro de la tarjeta va el cuadro de color.
        tarjeta.appendChild(color);

        // Generamos el código HEX del color.
        const codigoHex = generarColorHex();

        // Guarda el código HEX original para poder convertirlo a HSL.
        tarjeta.dataset.hex = codigoHex;

        // Aplicamos el color generado al fondo del cuadro.
        color.style.backgroundColor = codigoHex;

       // Creamos un párrafo para mostrar el código del color.
        const textoHex = document.createElement("p");

        // Comprobamos qué formato eligió el usuario.
        if (formatoColor.value === "hsl") {

        // Convertimos el color HEX a HSL y lo mostramos.
        textoHex.textContent = convertirHexAHsl(codigoHex);

        } else {

        // Si eligió HEX, mostramos el código original.
        textoHex.textContent = codigoHex;
        }

        // Agregamos el párrafo a la tarjeta.
        tarjeta.appendChild(textoHex);

        // Agregamos la tarjeta completa al contenedor de la paleta.
        contenedorPaleta.appendChild(tarjeta);
    }

    // Si el usuario elige menos colores, eliminamos las tarjetas sobrantes.
    while (contenedorPaleta.children.length > cantidad) {

        // Eliminamos la última tarjeta de la paleta.
        contenedorPaleta.lastElementChild.remove();
    }
}


// ============================================
// EVENTOS DE LOS SELECTORES Y DEL BOTÓN
// ============================================

// Al hacer clic, cambia los colores de la paleta.
btnGenerar.addEventListener("click", cambiarColores);

// Al cambiar la cantidad seleccionada, actualiza la paleta automáticamente.
selectCantidad.addEventListener("change", generarPaleta);

// Al cambiar entre HEX y HSL, actualiza los códigos mostrados.
formatoColor.addEventListener("change", actualizarFormatoColores);


// ============================================
// FUNCIÓN PARA GENERAR CÓDIGOS HEX ALEATORIOS
// ============================================

// HEX está compuesto por caracteres del 0 al 9 y de la A a la F.
// Creamos esta variable para generar colores aleatorios.
const caracteres = "0123456789ABCDEF";

function generarColorHex() {

    let colorHex = "#";

    // Repetimos el proceso 6 veces para obtener los 6 caracteres del código.
    for (let i = 0; i < 6; i++) {

        // Generamos un índice aleatorio entre 0 y 15.
        const indice = Math.floor(Math.random() * 16);

        // Sumamos el carácter elegido al código HEX.
        colorHex += caracteres[indice];
    }

    // Devolvemos el código HEX generado.
    return colorHex;
}


// ============================================
// FUNCIÓN PARA CONVERTIR HEX A HSL
// ============================================

// Esta función recibe un código HEX y lo convierte al formato HSL.
function convertirHexAHsl(codigoHex) {

    // Eliminamos el símbolo # del código HEX.
    codigoHex = codigoHex.replace("#", "");

    // Extraemos los componentes rojo, verde y azul del código hexadecimal.
    const rojo = parseInt(codigoHex.substring(0, 2), 16);
    const verde = parseInt(codigoHex.substring(2, 4), 16);
    const azul = parseInt(codigoHex.substring(4, 6), 16);

    // Normalizamos los valores RGB a una escala de 0 a 1.
    const r = rojo / 255;
    const g = verde / 255;
    const b = azul / 255;

    // Buscamos el componente de mayor valor.
    const max = Math.max(r, g, b);

    // Buscamos el componente de menor valor.
    const min = Math.min(r, g, b);

    // Calculamos la luminosidad como el promedio entre máximo y mínimo.
    const l = (max + min) / 2;

    // Declaramos la variable que almacenará la saturación.
    let s;

    // Si el máximo y el mínimo son iguales, el color es un tono de gris.
    if (max === min) {
        s = 0;

    } else {

        // Si no es gris, calculamos la saturación según su luminosidad.
        s = (max - min) / (1 - Math.abs(2 * l - 1));
    }

    // Declaramos la variable que almacenará el tono (hue).
    let h;

    // Si el máximo y el mínimo son iguales, el tono es 0.
    if (max === min) {
        h = 0;

    // Si el rojo es el componente de mayor valor, calculamos el tono usando rojo.
    } else if (max === r) {
        h = (g - b) / (max - min);

    // Si el verde es el componente de mayor valor, calculamos el tono usando verde.
    } else if (max === g) {
        h = (b - r) / (max - min) + 2;

    // Si el azul es el componente de mayor valor, calculamos el tono usando azul.
    } else {
        h = (r - g) / (max - min) + 4;
    }

    // Multiplicamos el tono por 60 para convertirlo a grados.
    h = h * 60;

    // Si el tono es negativo, le sumamos 360 para llevarlo al rango correcto.
    if (h < 0) {
        h = h + 360;
    }

    // Devolvemos el color en formato HSL con valores redondeados.
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}


// ============================================
// FUNCIÓN PARA CAMBIAR LOS COLORES EXISTENTES
// ============================================

// Esta función genera un nuevo color aleatorio para cada tarjeta.
function cambiarColores() {

    // Recorremos todas las tarjetas de colores de la paleta.
    for (let i = 0; i < contenedorPaleta.children.length; i++) {

        // Seleccionamos la tarjeta que corresponde a la posición actual.
        const tarjeta = contenedorPaleta.children[i];

        // Buscamos dentro de la tarjeta el cuadro que tiene la clase color.
        const color = tarjeta.querySelector(".color");

        // Generamos un nuevo código HEX aleatorio.
        const codigoHex = generarColorHex();

        // Actualizamos el código HEX guardado con el nuevo color generado.
        tarjeta.dataset.hex = codigoHex;

        // Cambiamos el color de fondo del cuadro.
        color.style.backgroundColor = codigoHex;

        // Seleccionamos el párrafo donde se muestra el código del color.
        const textoColor = tarjeta.querySelector("p");

        // Mostramos el código según el formato elegido por el usuario.
        if (formatoColor.value === "hsl") {

            // Convertimos el nuevo código HEX a HSL y lo mostramos.
            textoColor.textContent = convertirHexAHsl(codigoHex);

        } else {

            // Si eligió HEX, mostramos el código HEX original.
            textoColor.textContent = codigoHex;
        }
        
        
    }
}


// ============================================
// FUNCIÓN PARA ACTUALIZAR EL FORMATO MOSTRADO
// ============================================

// Actualiza los códigos sin modificar los colores de la paleta.
function actualizarFormatoColores() {

    // Recorremos todas las tarjetas que existen en la paleta.
    for (let i = 0; i < contenedorPaleta.children.length; i++) {

        // Seleccionamos la tarjeta actual.
        const tarjeta = contenedorPaleta.children[i];

        // Recuperamos el código HEX original guardado en la tarjeta.
        const codigoHex = tarjeta.dataset.hex;

        // Seleccionamos el párrafo donde se muestra el código del color.
        const textoColor = tarjeta.querySelector("p");

        // Comprobamos qué formato seleccionó el usuario.
        if (formatoColor.value === "hsl") {

            // Convertimos el HEX a HSL y mostramos el resultado.
            textoColor.textContent = convertirHexAHsl(codigoHex);

        } else {

            // Si eligió HEX, mostramos el código original guardado.
            textoColor.textContent = codigoHex;
        }
    }
}


// ============================================
// INICIO DE LA APLICACIÓN
// ============================================

// Por defecto, muestra 6 colores al iniciar la página.
generarPaleta();