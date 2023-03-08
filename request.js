

const SHOOTER = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter`;
const BATTLE = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=battle-royale`;
const STRATEGY = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=strategy`;
const SPORTS = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=sports`;



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eb08baedc6mshc11b7b0f86601edp1e8ab6jsn07a24ceebdd5',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};



const fetchGames = async (gamesURL) => {
  try {
    const response = await fetch(gamesURL, options)
    const result = await response.json();
    return result;
  } catch (e) {
    alert('Error')
  }
};
