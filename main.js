
// Para mostrar los juegos en general
const gamesContainer = document.querySelector(".games-container");
const filterButtons = document.querySelectorAll(".btn");
const filterContainer = document.querySelector(".options");

// Para los juegos favoritos
const gamesFavs = document.querySelector(".favs-container");
console.log(gamesFavs);
const cantIconFavs = document.querySelector(".fav-cont");
const btnFavs = document.querySelector(".fav-icon");
const menuFavs = document.querySelector(".list-favs");
const btnMenu = document.querySelector(".btn-menu");
const burgerMenu = document.querySelector(".navbar-list");
const deleteBtn = document.querySelector(".btn-delete");

// Filtro por defecto
var filterOption = SHOOTER;

let games = JSON.parse(localStorage.getItem("games")) || [];

const saveLocalStorage = (gameList) => {
  console.log("gameList:", gameList)
  localStorage.setItem("games", JSON.stringify(gameList));
  console.log("entro al local storage")
};

const pageController = {
  filterOption: SHOOTER
};


// Muestra el juego favorito en la lista
const renderFavGame = ({ id, title, thumbnail, genre }) => {
  return `
  <div class="fav-item">
    <img src=${thumbnail} alt="Img del juego" />
    <div class="game-info">
      <h3 class="title">${title}</h3>
      <p class="genre">${genre}</p>
      <span class="id-game">N° ${id}</span>
    </div>
    <div class="removeAction">
      <span class="removeFav">X</span>
    </div>
  </div>
  `;
};

// Muestra los favoritos al usuario
const renderFavs = () => {
  if (!games.length) {
    gamesFavs.innerHTML = `<p class="empty-msg">No hay juegos favoritos</p>`;
    return;
  }
  gamesFavs.innerHTML = games.map(renderFavGame).join("");
};

// Pregunta si existe el producto, para agregarlo
const isExistingGameFav = ({ id }) => games.some(game => game.id === id);

// Agrega juego a la lista específicamente
const addFavGame = (game) => {
  games = [...games, { ...game }];
};


// Agrega juego favorito
const addGame = (e) => {
  if (!e.target.classList.contains('btn-add')) return;
  const { id, title, thumbnail, genre } = e.target.dataset;
  const game = { id, title, thumbnail, genre };
  if (!isExistingGameFav(game)) {
    addFavGame(game);
  }
  stateFavsGames();
};

// Cantidad de favoritos se muestran en el icono
const cantFavs = () => {
  cantIconFavs.textContent = games.length;
};

// Verifica el estado de los favoritos
const stateFavsGames = () => {
  saveLocalStorage(games);
  renderFavs();
  disableBtn(deleteBtn);
  cantFavs();
};

// No permite que el boton de borrar favs esté activo si está vacío
const disableBtn = (button) => {
  if (!games.length) {
    button.classList.add("disabled");
  } else {
    button.classList.remove("disabled");
  }
};

// Estructura de cada juego 
const showCardGame = ({ id, title, thumbnail, platform, genre }) => {
  return `
      <div class="card">
        <img src=${thumbnail} alt="${title}" class="card-img"/>
        <div class="card-id">N° ${id}</div>
        <div class="card-desc">
          <h2>${title}</h2>
          <p>Plataforma: ${platform}</p>
          <h4>Categoría: ${genre}</h4>
        </div>
        <button class="btn-add"
          data-id='${id}'
          data-title='${title}'
          data-genre='${genre}'
          data-thumbnail='${thumbnail}'><i class="fa-sharp fa-solid fa-heart cora-icon-add"></i>
        </button>
      </div>
    `;
};

// Muestra los juegos
const showGames = (games) => {
  gamesContainer.innerHTML = games.map(game => showCardGame(game)).join('')
};

var filterOption = pageController.filterOption;
console.log("Categoría elegida", filterOption)


// GET - Pedido de los juegos a la api
const getGames = async () => {
  const games = await fetchGames(filterOption);
  showGames(games);
};

const getParameterFilter = filterType => {
  return filterType === "BATTLE" ? BATTLE : filterType === "SPORTS" ? SPORTS : filterType === "STRATEGY" ? STRATEGY : SHOOTER
};

// Cambia la categoria
const changeFilter = (e) => {
  if (
    !e.target.classList.contains("btn") ||
    e.target.classList.contains("btn--active")
  )
    return;
  const filter = e.target.dataset.filter;
  pageController.filterOption = getParameterFilter(filter);
  console.log("page controller nuevo", pageController.filterOption)

  // Categoría activa en el momento
  const buttons = [...filterButtons];
  buttons.forEach((btn) => {
    if (btn.dataset.filter !== filter) {
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  });

  filterOption = pageController.filterOption;
  getGames();
};

const toggleMenu = () => {
  burgerMenu.classList.toggle("open-menu");
  if (menuFavs.classList.contains("open-favs")) {
    menuFavs.classList.remove("open-favs");
    return;
  }
};

const toggleFavs = () => {
  menuFavs.classList.toggle("open-favs");
  if (burgerMenu.classList.contains("open-menu")) {
    burgerMenu.classList.remove("open-menu");
    return;
  }
};


// Mensaje de validacion para borrar los favoritos
const emptyActionFavs = (confirmMsg, successMsg) => {
  if (!games.length) return;
  if (window.confirm(confirmMsg)) {
    removeFavs();
    alert(successMsg);
  }
};

// Preguntas de validación y confirmacion
const emptyFavs = () => {
  emptyActionFavs(
    "¿Desea eliminar sus juegos favoritos?",
    "Se han borrado sus favoritos"
  );
};

// Vacía los favoritos y verifica el estado
const removeFavs = () => {
  games = [];
  stateFavsGames();
};

const init = () => {
  window.addEventListener("DOMContentLoaded", getGames);
  filterContainer.addEventListener("click", changeFilter);

  btnMenu.addEventListener("click", toggleMenu);
  btnFavs.addEventListener("click", toggleFavs);

  document.addEventListener('DOMContentLoaded', renderFavs);
  gamesContainer.addEventListener("click", addGame);
  deleteBtn.addEventListener("click", emptyFavs);

  cantFavs();
};

init();
