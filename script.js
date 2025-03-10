// Crear un contenedor para el footer con los botones
const footer = document.createElement("footer");
footer.style.display = "flex";
footer.style.flexDirection = "row"; // Cambiar a columna para botones verticales
footer.style.alignItems = "center";
footer.style.marginTop = "10px";
footer.style.padding = "20px";
footer.style.backgroundColor = "#f4f4f4";
footer.style.borderTop = "2px solid #ddd";

// Asegurarnos de que el footer esté al fondo
footer.style.position = "fixed";  // Esto hace que el footer quede fijo en la parte inferior
footer.style.left = "0";
footer.style.bottom = "0";
footer.style.width = "100%";  // Aseguramos que el footer cubra todo el ancho de la página
document.body.appendChild(footer);
footer.style.zIndex = "10";  // Hacer que el footer tenga una capa superior a las cuadrillas

// Crear contenedor para las cuadrillas
const contenedorCuadrillas = document.createElement("div");
document.body.appendChild(contenedorCuadrillas);

const botones = [];




const cuadrillas = [];
// Definir los nombres de las cuadrillas (botones)
const nombresCuadrillas = ["Salida Autos", "Autorizaciones", "Salida Peatones", "Alumnos"];



// Nombres de las columnas de la cuadrilla "Salida de autos"
const columnasSalidaAutos = [
  "Enviado a acceso", 
  "N° de auto", 
  "Nombre", 
  "Retirado de la institución", 
  "N° de auto", 
  "Conductor/DNI", 
  "Marca/Modelo/Color", 
  "Patente"
];

// Tomar los últimos 4 valores de "Salida de autos" para la cuadrilla "Autorizaciones"
const columnasAutorizaciones = columnasSalidaAutos.slice(-4); // Tomar los últimos 4 valores

// Crear botones y cuadrillas
for (let i = 0; i < 4; i++) {
    let btn = document.createElement("button");
    btn.textContent = nombresCuadrillas[i]; 
    btn.style.margin = "5px";
    btn.style.padding = "8px 15px";
    btn.style.border = "1px solid black";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.onclick = () => mostrarCuadrilla(i);
    footer.appendChild(btn);
    botones.push(btn);

    let div = document.createElement("div");
    div.style.display = i === 0 ? "block" : "none";
    div.style.textAlign = "center";
    div.style.overflow = "auto";
    div.style.maxHeight = "800px"; 
    div.style.border = "2px solid #000"; 
    div.style.marginBottom = "20px"; 
    cuadrillas.push(div);
    contenedorCuadrillas.appendChild(div);
}

// Crear la cuadrilla con animación en "Enviado a acceso"
crearCuadrilla(cuadrillas[0], columnasSalidaAutos, true);
crearCuadrilla(cuadrillas[1], columnasAutorizaciones, false);  // Usando los últimos 4 valores
crearCuadrilla(cuadrillas[2], ["Columna 1", "Columna 2", "Columna 3", "Columna 4"], false);
crearCuadrilla(cuadrillas[3], ["Columna 1", "Columna 2", "Columna 3", "Columna 4"], false);



// Lista de filas animadas
let filasAnimadas = new Set();
let colores = ["#add8e6", "#ffcccc"]; // Rojo y Azul pastel
let indiceColor = 0;

// Temporizador global para todas las filas
setInterval(() => {
    filasAnimadas.forEach(fila => {
        fila.style.backgroundColor = colores[indiceColor];
    });
    indiceColor = (indiceColor + 1) % colores.length;
}, 500); // Cambia de color cada 500ms

function crearCuadrilla(contenedor, columnas, tieneCheckboxes) {
    let tabla = document.createElement("table");
    tabla.style.borderCollapse = "collapse";
    tabla.style.width = "100%"; 
    tabla.style.tableLayout = "fixed"; 

    const anchos = {
        "Enviado a acceso": "80px",
        "N° de auto": "80px",
        "Retirado de la institución": "80px",
        "Patente": "150px",
        "Marca/Modelo/Color": "200px",
        "Conductor/DNI": "200px"
    };

    let filaEncabezado = document.createElement("tr");
    columnas.forEach((columna, index) => {
        let celda = document.createElement("th");
        celda.style.border = "1px solid black";
        celda.style.padding = "10px";
        celda.textContent = columna;
        celda.style.backgroundColor = "#f2f2f2"; 
        celda.style.fontWeight = "bold"; 
        celda.style.width = anchos[columna] || "auto";
        celda.style.textAlign = "center"; // Centrar texto en los encabezados

        // Aseguramos que el texto de los encabezados siempre sea negro y en negrita
        celda.style.color = "black";
        celda.style.fontWeight = "bold";
        celda.style.position = "sticky";
        celda.style.top = "0";  // Fija el encabezado en la parte superior de la tabla
        celda.style.zIndex = "1";  // Asegura que el encabezado esté por encima del contenido
        filaEncabezado.appendChild(celda);
    });
    tabla.appendChild(filaEncabezado);

    // Aseguramos que la primera fila tenga todos los bordes en negrita
    const primeraFila = tabla.querySelector("tr");
    const celdasPrimeraFila = primeraFila.querySelectorAll("th, td");
    celdasPrimeraFila.forEach(celda => {
        celda.style.borderWidth = "2px"; // Hacer los bordes más gruesos
    });

    for (let i = 1; i < 200; i++) {
        let fila = document.createElement("tr");

        columnas.forEach((columna, index) => {
            let celda = document.createElement("td");
            celda.style.border = "1px solid black";
            celda.style.padding = "10px"; 
            celda.style.textAlign = "center"; // Centrar el contenido de las celdas
            celda.style.textTransform = "uppercase"; // Convertir el texto a mayúsculas

            // Aseguramos que el texto sea siempre negro y en negrita
           
            celda.style.color = "black";
            celda.style.fontWeight = "bold";
            

            if (tieneCheckboxes && columna === "Enviado a acceso") {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.style.transform = "scale(2)"; // Aumentar el tamaño de la casilla
                celda.appendChild(checkbox);

                // Evento para animar la fila cuando se marque la casilla
                checkbox.addEventListener("change", function () {
                    controlarAnimacion(fila, checkbox, fila.querySelector(".retirado-checkbox"));
                });

                checkbox.classList.add("enviado-checkbox");
            } else if (tieneCheckboxes && columna === "Retirado de la institución") {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.style.transform = "scale(2)"; // Aumentar el tamaño de la casilla
                checkbox.classList.add("retirado-checkbox");
                celda.appendChild(checkbox);

                // Evento para poner la fila en gris si está marcada
                checkbox.addEventListener("change", function () {
                    controlarAnimacion(fila, fila.querySelector(".enviado-checkbox"), checkbox);
                });
            } else {
                celda.contentEditable = true;

                // Si la columna es "N° de auto", agregar evento de cambio
                if (columna === "N° de auto") {
                    celda.addEventListener("input", function () {
                        actualizarDatosEnSalidaAutos(fila, celda.textContent);
                    });
                }
            }

            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
    }

    contenedor.appendChild(tabla);
}

// Agregar el evento de búsqueda
const buscador = document.getElementById('buscador');
buscador.addEventListener('input', function () {
    const textoBusqueda = buscador.value.toUpperCase();

    cuadrillas.forEach(cuadrilla => {
        let tabla = cuadrilla.querySelector("table");
        if (tabla) {
            let filas = tabla.querySelectorAll("tr");
            filas.forEach((fila, index) => {
                // Omite la primera fila (encabezado)
                if (index === 0) return;

                let celdas = fila.querySelectorAll("td");
                let coincide = false;

                celdas.forEach(celda => {
                    if (celda.textContent.toUpperCase().includes(textoBusqueda)) {
                        coincide = true;
                    }
                });

                fila.style.display = coincide ? "" : "none";
            });
        }
    });
});

// Función para cambiar de cuadrilla
function mostrarCuadrilla(index) {
    cuadrillas.forEach((cuadrilla, i) => {
        cuadrilla.style.display = i === index ? "block" : "none";
    });
}

// Función para controlar la animación y el color gris
function controlarAnimacion(fila, checkboxEnviado, checkboxRetirado) {
    // Siempre aseguramos que el texto sea negro y en negrita
    fila.style.color = "black";
    fila.style.fontWeight = "bold";
    
    if (checkboxRetirado.checked) {
        // Si "Retirado de la institución" está marcado, detener animación y poner gris
        filasAnimadas.delete(fila);
        fila.style.backgroundColor = "gray";
        fila.style.color = "white"; // El texto se pone blanco
        fila.style.fontWeight = "normal"; // No negrita
    } else if (checkboxEnviado.checked) {
        // Si "Enviado a acceso" está marcado y "Retirado de la institución" no, añadir fila a la animación
        filasAnimadas.add(fila);
    } else {
        // Si ninguno está marcado, restaurar el color original y quitar de la animación
        filasAnimadas.delete(fila);
        fila.style.backgroundColor = "";
        fila.style.color = "black"; // Texto negro por defecto
        fila.style.fontWeight = "bold"; // Texto en negrita por defecto
    }
}

// Función para actualizar las últimas 4 columnas en "Salida Autos"
function actualizarDatosEnSalidaAutos(fila, numeroDeAuto) {
    // Buscar en "Autorizaciones" el número de auto en la primera columna
    let tablaAutorizaciones = cuadrillas[1].querySelector("table");
    if (tablaAutorizaciones) {
        let filasAutorizaciones = tablaAutorizaciones.querySelectorAll("tr");
        
        // Recorrer todas las filas de la tabla "Autorizaciones"
        filasAutorizaciones.forEach((filaAutorizacion, index) => {
            let celdas = filaAutorizacion.querySelectorAll("td");

            // Asegurarse de que la fila tiene suficientes celdas y que la columna de "N° de auto" está en la primera columna
            if (celdas.length > 1 && celdas[0].textContent.trim() === numeroDeAuto.trim()) {
                // Si se encuentra el número de auto, copiar los valores de las últimas 4 columnas
                for (let i = 0; i < 4; i++) {
                    // Actualiza las celdas correspondientes de "Salida Autos"
                    fila.querySelectorAll("td")[i + 4].textContent = celdas[celdas.length - 4 + i].textContent;
                }
            }
        });
    }
}

// Función para cambiar de cuadrilla
function mostrarCuadrilla(index) {
    cuadrillas.forEach((cuadrilla, i) => {
        cuadrilla.style.display = i === index ? "block" : "none";
    });
}

