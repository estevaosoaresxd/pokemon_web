import axios from "axios";

const pageBase = 0;
const takeBase = 20;

const url = process.env.REACT_APP_LOCAL_URL;

const createPokemon = async (data) => {
  const { token } = JSON.parse(localStorage.getItem("user"));

  return await axios.post(`${url}/pokemon`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const getAllPokemons = async (page, count) => {
  if (page) page = page - 1;

  var res = await axios
    .get(`${url}/pokemon`, {
      params: {
        limit: takeBase,
        page: page,
      },
    })
    .then((e) => e.data.data);

  return {
    count: res.count,
    pokemons: res.pokemons,
  };
};

const getPokemonByName = async (name) => {
  const { token } = JSON.parse(localStorage.getItem("user"));

  return await axios
    .get(`${url}/pokemon/name/${name.toLowerCase()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((res) => res.data);
};

export { getAllPokemons, getPokemonByName, createPokemon };
