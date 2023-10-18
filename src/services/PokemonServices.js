import axios from "axios";

const pageBase = 0;
const takeBase = 20;

const getAllPokemons = async (page, count) => {
  if (page) page = page - 1;

  let offset;

  if (count > 1) {
    var offsetTotal = (page ?? pageBase) * takeBase;

    offset = offsetTotal > count ? count - takeBase : offsetTotal;
  }

  var res = await axios
    .get(`${process.env.REACT_APP_API_URL}/pokemon`, {
      params: {
        limit: takeBase,
        offset: offset,
      },
    })
    .then((e) => e.data);

  var all = await axios.all(
    res.results.map((pokemon) => axios.get(pokemon.url).then((e) => e.data))
  );

  return {
    count: res.count,
    pokemons: all,
  };
};

const getPokemonByNameOrId = async (nameOrId) => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/pokemon/${nameOrId}`)
    .then((res) => res.data);

  // return res;
};

export { getAllPokemons, getPokemonByNameOrId };
