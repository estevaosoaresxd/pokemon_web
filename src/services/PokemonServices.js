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

// const getAllPokemons = async (page, count) => {
//   if (page) page = page - 1;

//   let offset;

//   if (count > 1) {
//     var offsetTotal = (page ?? pageBase) * takeBase;

//     offset = offsetTotal > count ? count - takeBase : offsetTotal;
//   }

//   var res = await axios
//     .get(`${process.env.REACT_APP_API_URL}/pokemon`, {
//       params: {
//         limit: takeBase,
//         offset: offset,
//       },
//     })
//     .then((e) => e.data);

//   var pokemons = await axios.all(
//     res.results.map((pokemon) => axios.get(pokemon.url).then((e) => e.data))
//   );

//   return {
//     count: res.count,
//     pokemons: pokemons,
//   };
// };

const getAllPokemons = async (page, count) => {
  if (page) page = page - 1;

  const { token } = JSON.parse(localStorage.getItem("user"));

  var res = await axios
    .get(`${url}/pokemon`, {
      params: {
        limit: takeBase,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((e) => e.data.data);

  console.log(res);

  return {
    count: res.count,
    pokemons: res.pokemons,
  };
};

const getPokemonByNameOrId = async (nameOrId) => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/pokemon/${nameOrId.toLowerCase()}`)
    .then((res) => res.data);
};

export { getAllPokemons, getPokemonByNameOrId, createPokemon };
