// Obtener referencia al elemento donde se mostrará la tabla
const tablaClima = document.getElementById('datosClima');

// Función para crear y mostrar la tabla con los datos del clima
function mostrarTablaClima(data, pais, bandera) {
  // Crear tabla y encabezados
  const tabla = document.createElement('table');
  tabla.classList.add('tabla-clima'); 
  const encabezados = ['Ciudad', 'País', 'Bandera', 'Coordenadas', 'Clima', 'Base', 'Temperatura', 'Humedad', 'Visibilidad', 'Velocidad del viento'];
  const encabezadosRow = document.createElement('tr');
  encabezados.forEach(encabezado => {
    const th = document.createElement('th');
    th.textContent = encabezado;
    encabezadosRow.appendChild(th);
  });
  tabla.appendChild(encabezadosRow);

  // Crear fila de datos
  const filaDatos = document.createElement('tr');
  filaDatos.innerHTML = `
    <td>${data.name}</td>
    <td>${pais}</td>
    <td><img src="${bandera}" alt="Bandera de ${pais}" width="50"></td>
    <td>${data.coord.lon}, ${data.coord.lat}</td>
    <td>${data.weather[0].description}</td>
    <td>${data.base}</td>
    <td>${data.main.temp} K</td>
    <td>${data.main.humidity}%</td>
    <td>${data.visibility} m</td>
    <td>${data.wind.speed} m/s</td>
  `;
  tabla.appendChild(filaDatos);

  // Agregar estilos a las celdas
  const celdas = tabla.querySelectorAll('td, th');
  celdas.forEach(celda => {
    celda.style.padding = '5px'; // Espaciado interno de las celdas
    celda.style.textAlign = 'center'; // Centrar contenido de las celdas
    celda.style.border = '1px solid #ddd'; // Borde de las celdas
  });

  // Limpiar cualquier contenido previo
  tablaClima.innerHTML = '';

  // Agregar la tabla al contenedor
  tablaClima.appendChild(tabla);
}

// Función para obtener el clima y mostrar la tabla
function obtenerClima(ciudad) {
  // Hacer la solicitud fetch a la API de OpenWeatherMap
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
  const api_key = 'ce2ae03503686b738c01bf20937b2324'; // Tu clave de API
  fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then(response => response.json())
    .then(data => {
      // Hacer la solicitud fetch a la API de Rest Countries
      const urlBasePais = 'https://restcountries.com/v3.1/capital';
      fetch(`${urlBasePais}/${ciudad}`)
        .then(response => response.json())
        .then(dataPais => {
          // Asegurarse de que se obtuvo una respuesta válida
          if (dataPais && dataPais[0]) {
            // Mostrar la tabla con los datos del clima, el nombre del país y la bandera
            mostrarTablaClima(data, dataPais[0].name.common, dataPais[0].flags.png);
          }
        })
        .catch(error => console.error('Error al obtener datos del país:', error));
    })
    .catch(error => console.error('Error al obtener datos del clima:', error));
}

// Obtener referencia al botón de búsqueda y al input de texto
const botonBusqueda = document.getElementById('botonBusqueda');
const inputCiudad = document.getElementById('ciudadEntrada');

// Agregar un evento de clic al botón de búsqueda
botonBusqueda.addEventListener('click', () => {
  // Obtener el valor ingresado en el input de texto
  const ciudad = inputCiudad.value.trim();

  // Verificar que se haya ingresado una ciudad antes de hacer la solicitud
  if (ciudad) {
    // Llamar a la función para obtener el clima
    obtenerClima(ciudad);
  } else {
    alert('Por favor ingresa el nombre de una ciudad antes de hacer clic en "Buscar".');
  }
});

// Llamada inicial para mostrar la tabla (puedes quitar esto si no quieres que se muestre una tabla al cargar la página)
// mostrarTablaClima();

