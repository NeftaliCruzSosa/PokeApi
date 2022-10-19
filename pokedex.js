const utterance  = new SpeechSynthesisUtterance();
  utterance.lang = 'es';
  utterance.rate = 1.8;
  utterance.pitch = 0;

const pokedex$$ = document.querySelector("#pokedex");
const searchContainer$$ = document.querySelector(".search-container");
const searchInput$$ = document.querySelector(".search-container input");
const regionToggle$$ = document.querySelector("#region-toggle");
const VIRTUAL_COLLECTION = [];
let ALL_POKEMONS_INFO = [];

const cleanPokedex = () => (pokedex$$.innerHTML = "");

const readDescription = (pokemon) => {
  speechSynthesis.cancel();
  
  const name = pokemon.name;
  const type = esTypes[pokemon.types[0]];
  const description = pokemon.description;

  let completeDescription = `${name} , pokémon tipo ${type}, `;
  completeDescription += description.replace(/(\n)/gm, " ");
  utterance.text = completeDescription;
  
  speechSynthesis.speak(utterance);
}

const search = (value) => {
  const filtered = ALL_POKEMONS_INFO.filter((pokemon) => {
    const matchName = pokemon.name.includes(value);
    const matchId = pokemon.id == value;
    const matchType = pokemon.types.includes(value);

    return matchName || matchId || matchType;
  });
  renderPokemons(filtered);
};

const addEventsListeners = () => {
  searchInput$$.addEventListener("input", (event) => {
    search(searchInput$$.value);
  });
  regionToggle$$.addEventListener("click", () => {
    const regionsContainer$$ = document.querySelector(".regions-container")
    regionsContainer$$.classList.toggle("hidden");
  })
};

const disableButtons = (disabled) => {
  searchInput$$.disabled = disabled;
  const buttons = document.querySelectorAll('button[region]');
  buttons.forEach(button => button.disabled = disabled);
}

const loadPokemons = (event) => {
  const region = event.target.attributes.region.value;
  disableButtons(true);
  getPokemonsFromRegion(region);
};

const arrancar = async () => {
  addEventsListeners();
  renderRegionButtons(Object.keys(regions));
  disableButtons(true);
  getPokemonsFromRegion("kanto");
};

window.onload = arrancar;


