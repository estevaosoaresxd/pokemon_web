const pageBase = 1;
const takeBase = 20;
const url = process.env.API_URL;

export const getAllPokemons = async (page, take) => {
  console.log(process.env);

  return await fetch(
    `${url}/pokemon?limit=${take ?? takeBase}&offset=${page ?? pageBase}`,
    { method: "GET" }
  ).then((res) => res.json());
};
