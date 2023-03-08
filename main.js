

const cardsContainer = document.querySelector(".games-container");
console.log(cardsContainer)
const filterButtons = document.querySelectorAll(".btn");
console.log(filterButtons)
const filterContainer = document.querySelector(".options");
console.log(filterContainer)

var filterOption = SHOOTER;

const pageController = {
  page: null,
  filterOption: SHOOTER
}

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
                src=${
                  thumbnail
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

const changeFilter= (e) => {
console.log("me hiciste click");
  if (
    !e.target.classList.contains("btn") ||
    e.target.classList.contains("btn--active")
    
  )
    return;
  // console.log("click en un boton");
  console.log("entra")
  const filter = e.target.dataset.filter;
  console.log("filter",filter)
  pageController.filterOption = getParameterFilter(filter);
  console.log("page controller nuevo",  pageController.filterOption)
  
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

const init = () => {
  window.addEventListener("DOMContentLoaded", getGames);
  filterContainer.addEventListener("click", changeFilter);
};

init();
