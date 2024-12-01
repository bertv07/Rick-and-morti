const contenido = document.getElementById('contenido');
const siguiente = document.getElementById('siguiente');
const anterior = document.getElementById('anterior');
const numero_personajes = document.getElementById('cantidad');
const numero_pagina = document.getElementById('numero_pagina');

let paginaActual = 1;

function mostrarInformacion(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            contenido.innerHTML = "";
            data.results.forEach(ubicacion => {
                contenido.innerHTML += `
                <div class="ubica">
                    <p>Número de ubicación: <span>${ubicacion.id}</span></p>
                    <p>Nombre de ubicación: <span>${ubicacion.name}</span> </p>
                    <p>Dimensión: <span>${ubicacion.dimension}</span> </p>
                </div>
                `;
            });
            numero_personajes.textContent = `${data.results.length}`;

            if (data.info.next) {
                siguiente.onclick = () => {
                    paginaActual++;
                    mostrarInformacion(data.info.next);
                };
            } else {
                siguiente.onclick = null;
            }

            if (data.info.prev) {
                anterior.onclick = () => {
                    paginaActual--;
                    mostrarInformacion(data.info.prev);
                };
            } else {
                anterior.onclick = null;
            }

            numero_pagina.textContent = paginaActual;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

mostrarInformacion('https://rickandmortyapi.com/api/location');
