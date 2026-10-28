
 // Captura de boton por su ID
const btnGenerar = document.getElementById("btn-generar");

// Captura del contenedorPaleta por su clase
const contenedorPaleta = document.querySelector(".contenedor-paleta"); 

// captura de Selector de cantidad de colores en la paleta por ID
const selectCantidad = document.getElementById("select-cantidad");

// Crear funcion generarPaleta

function generarPaleta() {
    
    // Limpiamos los cuadrados anteriores 
    contenedorPaleta.innerHTML = "";

    //Saber que cantidad de colores eligio el usuario para su paleta 6,8 u 9
    const cantidad = Number(selectCantidad.value);
    console.log (cantidad)

    // Creamos un for para generar los 6,8 u 9 cajas de colores que luego van a cambiar aleatoriamente. 
    for (let i = 0; i < 6; i++) {
        const color = document.createElement ("div") // Creamos una variable const div desde js y lo llamamos "Color"    
        color.classList.add("color") // A "color" le agregamos los estilos de CSS    
        color.style.backgroundColor = generarColorHex(); // A "Color" le agregamos la funcion de generar color Hex aleatorio 
        contenedorPaleta.appendChild(color); // A nuestro contenedorPaleta creado en html, le agregamos "hijos" de la variable div "color" que creamos antes
        
    } 

}

 // Aviso que luego del evento "click", aplique la funcion generarPaleta.
btnGenerar.addEventListener("click", generarPaleta); 


// El formato de color HEX esta compuesto por caracteres del 0 al 9 y de la A a la F. Creamos esta variable para luego crear nuestro color aleatorio con estos caracteres.
const caracteres = "0123456789ABCDEF"; 
        
function generarColorHex () {
    let colorHex = "#";
    for (let i = 0; i < 6; i++){
        const indice = Math.floor(Math.random() * 16); // Aplicamos la misma formula, math floor y math random para multiplicar x 16 (cuenta el 0) y obtener nuestros caraceteres aleatorios para formar color HEX
        colorHex += caracteres[indice] //Sumo a la variable colorHex (que vale #) el resultado de el numero aleatorio creado con indice. (basado en caracteres)
   }
    return colorHex; // Nos devuelve el color creado en el for
}

const miColor = generarColorHex();
console.log(miColor);



