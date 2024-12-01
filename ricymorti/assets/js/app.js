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
            data.results.forEach(personaje => {
                contenido.innerHTML += `
                    <div class="card">
                        <div class="imgBX">
                            <img src="${personaje.image}">
                        </div>
                        <div class="content">
                            <h4>${personaje.name}</h4>
                            <p>Personaje: <span>${personaje.id}</span></p>
                            <p>Su estado: <span>${personaje.status}</span> </p>
                            <p>Su especie: <span>${personaje.species}</span> </p>
                            <p>Genero: <span>${personaje.gender}</span></p>
                            <p>Origen: <span>${personaje.origin.name}</span> </p>
                        </div>
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


mostrarInformacion('https://rickandmortyapi.com/api/character');