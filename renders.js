const renderTypes = (types, container) => {
  const div$$ = document.createElement("div");
  div$$.classList.add("card-subtitle", "types-container");

  types.forEach((type) => {
    const typeContainer$$ = document.createElement("p");
    typeContainer$$.setAttribute("pokemon-type", type);
    typeContainer$$.style.backgroundColor = "white";
    typeContainer$$.classList.add("type");
    typeContainer$$.style.color = typeColors[type];
    typeContainer$$.textContent = type;
    typeContainer$$.addEventListener("click", () => {
      searchInput$$.setAttribute("value", type);
      search(type);
    });
    div$$.appendChild(typeContainer$$);
  });

  container.appendChild(div$$);
};

const renderLoader = (text) => {
  cleanPokedex();
  const li$$ = document.createElement("li");

  const p$$ = document.createElement("p");
  p$$.classList.add("card-title");
  p$$.textContent = text;

  li$$.appendChild(p$$);
  pokedex$$.appendChild(li$$);
};

const renderFrontFace = (pokemon, container) => {
  const cardFront$$ = document.createElement("div");
  cardFront$$.classList.add("card__face", "card__face--front");
  cardFront$$.style.backgroundColor = typeColors[pokemon.types[0]];

  const img$$ = document.createElement("img");
  img$$.classList.add("card-image");
  img$$.src = pokemon.image;
  img$$.alt = pokemon.name;

  const p$$ = document.createElement("p");
  p$$.classList.add("card-title");
  p$$.textContent = pokemon.name;

  const divId$$ = document.createElement("div");
  divId$$.classList.add("card-subtitle");
  divId$$.textContent = "ID: " + pokemon.id;

  cardFront$$.appendChild(img$$);
  cardFront$$.appendChild(p$$);
  cardFront$$.appendChild(divId$$);

  renderTypes(pokemon.types, cardFront$$);

  container.appendChild(cardFront$$);
};

const renderBackFace = (pokemon, container) => {
  const cardBack$$ = document.createElement("div");
  cardBack$$.classList.add("card__face", "card__face--back");
  const cardBackContainer$$ = document.createElement("div");
  cardBackContainer$$.classList.add("card__face--container");
  const typeImg$$ = document.createElement("img");
  typeImg$$.src = `./assets/${pokemon.types[0]}.png`

  const readButton$$ = document.createElement("span");
  readButton$$.style.cursor = "pointer";
  readButton$$.innerHTML = 'Escuchar Descripción --> <img src="./assets/volume-button.png" alt="ReproducirDescripcion">';
  readButton$$.addEventListener("click", () => readDescription(pokemon));

  const statsContainer$$ = document.createElement("div");
  
  statsContainer$$.innerHTML = `
  <div class="bars_container">    
  HP
  <div class="stats">
    <div class="stats-bar" style="width: ${(pokemon.stats.hp * 100 / 150)}%; background-color: #FE0000;">
    ${pokemon.stats.hp}
    </div>                       
  </div> 
  Attack
  <div class="stats">
    <div class="stats-bar" style="width: ${(pokemon.stats.attack * 100 / 150)}%; background-color: #EF7E30;">
    ${pokemon.stats.attack}
    </div>                       
  </div> 
  Defense
  <div class="stats">
    <div class="stats-bar" style="width: ${(pokemon.stats.defense * 100 / 150)}%; background-color: #F8D030;">
    ${pokemon.stats.defense}
    </div>                       
  </div> 
  Special Attack
  <div class="stats">
    <div class="stats-bar" style="width: ${(pokemon.stats.spAttack * 100 / 150)}%; background-color: #6890F2;">
    ${pokemon.stats.spAttack}
    </div>                       
  </div> 
  Special Defense
  <div class="stats">
    <div class="stats-bar" style="width: ${(pokemon.stats.spDefense * 100 / 150)}%; background-color: #78C750;">
    ${pokemon.stats.spDefense}
    </div>                       
  </div> 
  Speed
  <div class="stats">
    <div class="stats-bar" style="width: ${(pokemon.stats.speed * 100 / 150)}%; background-color: #F85687;">
    ${pokemon.stats.speed}
    </div>                       
  </div> 
</div>`
  cardBackContainer$$.appendChild(typeImg$$);
  cardBackContainer$$.appendChild(readButton$$);
  cardBackContainer$$.appendChild(statsContainer$$);

  cardBack$$.appendChild(cardBackContainer$$);

  container.appendChild(cardBack$$);
};

const renderPokemonCard = (pokemon) => {
  const li$$ = document.createElement("li");
  li$$.classList.add("card");

  li$$.addEventListener("dblclick", function () {
    li$$.classList.toggle("is-flipped");
  });

  renderFrontFace(pokemon, li$$);
  renderBackFace(pokemon, li$$);

  pokedex$$.appendChild(li$$);
};

const renderPokemons = (pokemons) => {
  cleanPokedex();
  if (!pokemons.length) renderLoader("No se encuentran resultados");
  pokemons.forEach((pokemon) => renderPokemonCard(pokemon));
};

const renderRegionButtons = (regions) => {
  const regionsContainer$$ = document.createElement("div");
  regionsContainer$$.classList.add("regions-container", "hidden");

  regions.forEach((region) => {
    const button$$ = document.createElement("button");
    button$$.textContent = region;
    button$$.setAttribute("region", region);
    button$$.addEventListener("click", loadPokemons);
    regionsContainer$$.appendChild(button$$);
  });

  searchContainer$$.appendChild(regionsContainer$$);
};