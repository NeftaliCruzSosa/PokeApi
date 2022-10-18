const getAllPokemons = async (offset = 0, limit = 151) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.log("Error obteniendo todos los pokemons", error);
  }
};

const getOnePokemon = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const description = await getPokemonsDescription(result);

    const pokemon = {
      name: result.name,
      id: result.id,
      types: result.types.map((element) => element.type.name),
      image: result.sprites.other["official-artwork"].front_default,
      stats: {
        hp : result.stats[0].base_stat,
        attack : result.stats[1].base_stat,
        defense : result.stats[2].base_stat,
        spAttack : result.stats[3].base_stat,
        spDefense : result.stats[4].base_stat,
        speed : result.stats[5].base_stat,
      },
      description: description,
    };
    return pokemon;
  } catch (error) {
    console.log("Error obteniendo pokemon " + url, error);
  }
};

const getPokemonsFromRegion = async (region) => {
  renderLoader(`Cargando pokemons de la region ${region}...`);
  const { limit, offset } = regions[region];
  ALL_POKEMONS_INFO = [];

  const allPokemons = await getAllPokemons(offset, limit);

  for (const pokemon of allPokemons) {
    const id = pokemon.url.split("/").slice(-2)[0];
    const exist = VIRTUAL_COLLECTION.find((pokemon) => pokemon.id == id);
    const pokemonInfo = exist ? exist : await getOnePokemon(pokemon.url);

    if (!exist) VIRTUAL_COLLECTION.push(pokemonInfo);

    ALL_POKEMONS_INFO.push(pokemonInfo);
  }
  disableButtons(false);
  renderPokemons(ALL_POKEMONS_INFO);
};

const getPokemonsDescription = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
  const result = await response.json();
  const description = result.flavor_text_entries.find((element) => element.language.name == "es").flavor_text;

  return description;
};