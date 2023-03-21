
// Para mostrar los juegos
const cardsContainer = document.querySelector(".games-container");
console.log(cardsContainer);
const filterButtons = document.querySelectorAll(".btn");
console.log(filterButtons);
const filterContainer = document.querySelector(".options");
console.log(filterContainer);

// Para los juegos favoritos
const productsCart = document.querySelector(".cart-container");
console.log(productsCart);
const cartBubble = document.querySelector(".fav-cont");
console.log(cartBubble);
const cartBtn = document.querySelector(".cart-label");
console.log(cartBtn);
const cartMenu = document.querySelector(".cart");
console.log(cartMenu);
const barsBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
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

const renderCartProduct = ({ id, title, thumbnail, genre }) => {
  return `
  <div class="cart-item">
    <img src=${thumbnail} alt="Nft del carrito" />
    <div class="item-info">
      <h3 class="item-title">${title}</h3>
      <p class="item-bid">${genre}</p>
      <span class="item-price">N° ${id}</span>
    </div>
    <div class="item-handler">
      <span class="item-quantity">X</span>
    </div>
  </div>
  `;
};

const renderCart = () => {
  if (!games.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay juegos favoritos</p>`;
    return;
  }
  productsCart.innerHTML = games.map(renderCartProduct).join("");
};

const isExistingCartProduct = ({ id }) => games.some(product => product.id === id);

const createCartProduct = (product) => {
  games = [...games, { ...product }];
};

const addProduct = (e) => {
  if (!e.target.classList.contains('btn-add')) return;
  console.log("Soy el boton add")
  const { id, title, thumbnail, genre } = e.target.dataset;
  console.log(id, title)
  const product = { id, title, thumbnail, genre };
  if (isExistingCartProduct(product)) {
    // showSuccessModal("Ya existe juego favorito");
    console.log("exite")
  } else {
    createCartProduct(product);
    // showSuccessModal("Se agrego a favoritos");
    console.log("no exite")
  }
  checkCartState();
};

const renderCartBubble = () => {
  cartBubble.textContent = games.length;
};


const checkCartState = () => {
  console.log("games", games)
  saveLocalStorage(games);
  renderCart();
  disableBtn(deleteBtn);
  renderCartBubble();
  console.log("entra al check")
};

const disableBtn = (button) => {
  if (!games.length) {
    button.classList.add("disabled");
  } else {
    button.classList.remove("disabled");
  }
};

const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("acive-modal");
  }, 1500);
};

const getHtmlCard = ({
  id,
  title,
  thumbnail,
  platform,
  genre
}) => {
  return `
        <div class="card">
            <img  
                src=${thumbnail
    }
                alt="${title}"
                class="card-img"
            />
            <div class="card-id">
                N° ${id}
            </div>
            <div class="card-desc">
                <h2>${title}</h2>
                <p>Plataforma: ${platform}</p>
                <h4>Categoría: ${genre}</h4>
            </div>
            <button class="btn-add"
                            data-id='${id}'
                            data-title='${title}'
                            data-genre='${genre}'
                            data-thumbnail='${thumbnail}'><i class="fa-sharp fa-solid fa-heart cora-icon-add"></i></button>
        </div>
    `;
};

const showCardsContainer = (games) => {
  cardsContainer.innerHTML = games.map(game => getHtmlCard(game)).join('')
};

var filterOption = pageController.filterOption;
console.log("filterOption var", filterOption)

const getGames = async () => {
  console.log("filtro getbook", filterOption)
  const games = await fetchGames(filterOption);

  showCardsContainer(games);
};

const getParameterFilter = filterType => {
  return filterType === "BATTLE" ? BATTLE : filterType === "SPORTS" ? SPORTS : filterType === "STRATEGY" ? STRATEGY : SHOOTER
};

const changeFilter = (e) => {
  console.log("me hiciste click");
  if (
    !e.target.classList.contains("btn") ||
    e.target.classList.contains("btn--active")

  )
    return;
  // console.log("click en un boton");
  console.log("entra")
  const filter = e.target.dataset.filter;
  console.log("filter", filter)
  pageController.filterOption = getParameterFilter(filter);
  console.log("page controller nuevo", pageController.filterOption)

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
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
};



const completeCartAction = (confirmMsg, successMsg) => {
  if (!games.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

const deleteCart = () => {
  completeCartAction(
    "¿Desea eliminar sus juegos favoritos?",
    "Se han borrado sus favoritos"
  );
};

const resetCartItems = () => {
  games = [];
  checkCartState();
};

const init = () => {
  window.addEventListener("DOMContentLoaded", getGames);
  filterContainer.addEventListener("click", changeFilter);

  barsBtn.addEventListener("click", toggleMenu);
  cartBtn.addEventListener("click", toggleCart);

  document.addEventListener('DOMContentLoaded', renderCart);
  cardsContainer.addEventListener("click", addProduct);
  deleteBtn.addEventListener("click", deleteCart);

  renderCartBubble();
};

init();
