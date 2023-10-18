import axios from "axios";

const pageBase = 1;
const takeBase = 20;

const getAllPokemons = async (page, take) => {
  console.log();

  var results = await axios
    .get(`${process.env.REACT_APP_API_URL}/pokemon`, {
      params: {
        limit: take ?? takeBase,
        offset: (page ?? pageBase) * (take ?? takeBase),
      },
    })
    .then((e) => e.data.results);

  var all = await axios.all(
    results.map((pokemon, index) => axios.get(pokemon.url).then((e) => e.data))
  );

  return all;
};

const findPokemonByNameOrId = async (nameOrId) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/pokemon/${nameOrId}`
  );
};

export { getAllPokemons, findPokemonByNameOrId };
