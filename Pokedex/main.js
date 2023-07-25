// Seleccionar el elemento con el id "listaPokemon" y almacenarlo en la variable listaPokemon
const listaPokemon = document.querySelector("#listaPokemon");

// Definir la URL base de la API de Pokémon
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Bucle for que va desde 1 hasta 501 (los primeros 501 Pokémones)
for (let i = 1; i <= 501; i++) {
    // Realizar una solicitud fetch para obtener los datos del Pokémon con el número i
    fetch(URL + i)
        .then((response) => response.json()) // Convertir la respuesta a formato JSON
        .then(data => mostrarPokemon(data)); // Llamar a la función mostrarPokemon con los datos del Pokémon
}

// Función para filtrar los Pokémones por nombre
function filtrarPorNombre(nombre) {
    // Obtenemos todos los elementos de clase "pokemon" (las tarjetas de Pokémon)
    const tarjetasPokemon = document.querySelectorAll(".pokemon");
    // Recorremos todas las tarjetas de Pokémon y mostramos u ocultamos según el nombre buscado
    tarjetasPokemon.forEach(tarjeta => {
    const nombrePokemon = tarjeta.querySelector(".pokemon-nombre").textContent.toLowerCase();
    if (nombrePokemon.includes(nombre.toLowerCase())) {
        tarjeta.style.display = "block"; // Mostramos la tarjeta si el nombre coincide
    } else {
        tarjeta.style.display = "none"; // Ocultamos la tarjeta si el nombre no coincide
    }
    });
}

// Event listener para el campo de entrada del buscador
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", () => {
    const searchTerm = searchInput.value.trim();
    filtrarPorNombre(searchTerm);
});


// Función para mostrar los datos de un Pokémon en una tarjeta
function mostrarPokemon(poke) {
    // Obtener los tipos del Pokémon y formatearlos como elementos HTML
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join(''); // Unir los elementos HTML en una sola cadena

    // Formatear el ID del Pokémon para que siempre tenga 3 dígitos (ejemplo: 01, 02, 03)
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "0" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "" + pokeId;
    }

     // Obtener la información de los ataques del Pokémon
     const moves = poke.moves.slice(0, 5).map((move) => move.move.name);
     const movesHTML = moves.map((ataque) => `<p class="move">${ataque}</p>`).join('');

    // Crear elementos HTML dinámicamente para mostrar la información del Pokémon en una tarjeta
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos} <!-- Mostrar los tipos del Pokémon -->
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
            <div class="pokemon-detalle">
            <h3>moves</h3>
            ${movesHTML} <!-- Mostrar los ataques del Pokémon -->
            </div>
        </div>
    `;
    listaPokemon.append(div); // Agregar la tarjeta del Pokémon al contenedor "listaPokemon"
};