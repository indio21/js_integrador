




const boton = document.getElementById("btn-obtener")
const input = document.getElementById("id_pok")
const card = document.querySelector(".card_pokemon")
const form = document.querySelector(".form")

console.log(boton)
console.log(input)
console.log(card)
console.log(form)

const baseURL = 'https://pokeapi.co/api/v2/pokemon';

const init = () => {

    // const obtData = JSON.parse(localStorage.getItem('pokemon')) || [];
    // console.log('hola', obtData)



    // card.innerHTML =
    // `<div id="container">
    //         <h2 id="poke_nombre">${results.name.toUpperCase()}</h2>
    //         <p id="tipos">
    //         ${results.types.map((tipo) => {
    //             return `<span id="poke_tipo">${tipo.type.name}</span>`;
    //         }).join("")
    //         }</p>
    //         <h3 class="poke_atributo">Altura: ${Altura} m.</h3>
    //         <h3 class="poke_atributo">Peso: ${Peso} kg.</h3>
    //         <img id="poke_image" src="${results.sprites.other.home.front_default}" alt="">
    //     </div>`;

}

const fetchPokemons = async () => {
    const response = await fetch(`${baseURL}/${input.value}`);
    const data = await response.json()
    return data;
}

const obtenerPokemon = async (e) => {
    e.preventDefault();

    try {
        const results = await fetchPokemons();

        const Altura = Number(results.height) / 10;
        const Peso = Number(results.weight) / 10;
        card.innerHTML =
            `<div id="container">
                <h2 id="poke_nombre">${results.name.toUpperCase()}</h2>
                <p id="tipos">
                ${results.types.map((tipo) => {
                return `<span id="poke_tipo">${tipo.type.name}</span>`;
            }).join("")
            }</p>
                <h3 class="poke_atributo">Altura: ${Altura} m.</h3>
                <h3 class="poke_atributo">Peso: ${Peso} kg.</h3>
                <img id="poke_image" src="${results.sprites.other.home.front_default}" alt="">
            </div>`;

        // saveData(results)
        // console.log('save', saveData)
    }
    catch {
        card.innerHTML =
            `<div id="container">
                <h2 id="poke_nombre">No se encontró un pokemon.</h2>
                <h3 class="poke_atributo">Vuelva a intentarlo</h3>
                // <img id="poke_image" src="./img/logo.png" alt="">
                </div>`;
    }
}


// const saveData = (pokemon) => localStorage.setItem('pokemon', JSON.stringify(pokemon))

const limpiar = () => input.value = ''

init()
form.onsubmit = obtenerPokemon
input.addEventListener("focus", limpiar)


