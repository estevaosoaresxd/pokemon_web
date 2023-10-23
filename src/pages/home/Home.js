import { useEffect, useState, useMemo } from "react";
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Skeleton,
  Pagination,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SearchOff } from "@mui/icons-material";
import {
  getAllPokemons,
  getPokemonByNameOrId,
} from "../../services/PokemonServices";
import SearchInput from "../../shared/components/SearchInput";
import CardPokemon from "../../shared/components/CardPokemon";
import ToolbarDefault from "../../shared/components/ToolbarDefault";
import { themeDefault } from "../../shared/theme/themeDefault";
import DetailsPokemon from "../../shared/components/DetailsPokemon";
import { PokemonContextProvider } from "../../modules/pokemon/PokemonContext";

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [emptyInput, setEmptyInput] = useState(false);

  const filterData = (query, data) => {
    if (emptyInput) {
      setEmptyInput(false);
    }

    if (!query) {
      return data;
    } else {
      let filtered = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        const getPokemonByName = async () => {
          try {
            setLoading(true);

            let res = await getPokemonByNameOrId(query);

            setAllPokemons([...allPokemons, res]);
          } catch (e) {
            return [];
          } finally {
            setLoading(false);
          }
        };

        return getPokemonByName(query);
      } else {
        return filtered;
      }
    }
  };

  const onTapSearch = () => {
    if (searchQuery.trim().length < 1) {
      setEmptyInput(true);
    } else {
      filterData(searchQuery, allPokemons);
    }
  };

  const dataFiltered = useMemo(
    () => filterData(searchQuery, allPokemons),
    [searchQuery, allPokemons]
  );

  useEffect(() => {
    const getAllByPage = async () => {
      try {
        setLoading(true);

        let res = await getAllPokemons(page, count);

        setCount(res.count);

        if (res.pokemons) {
          setAllPokemons(res.pokemons);
        }
      } finally {
        setLoading(false);
      }
    };

    getAllByPage();
  }, [page]);

  return (
    <ThemeProvider theme={themeDefault}>
      <CssBaseline />
      <ToolbarDefault />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Pokemon Web
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Aqui é possível fazer as buscas de seus Pokemóns favoritos junto
              com a integração da PokeAPI com milhares de pokenóms !
            </Typography>
          </Container>
        </Box>
        <Box>
          <Container maxWidth="sm">
            <SearchInput
              placeholder="Digite o pokemon aqui..."
              onChange={setSearchQuery}
              emptyInput={emptyInput}
              onTapSearch={onTapSearch}
            ></SearchInput>
          </Container>
        </Box>
        <Container sx={{ py: 8 }}>
          <DetailsPokemon
            open={showModal}
            pokemon={selectedPokemon}
            handleClose={() => {
              setSelectedPokemon(null);
              setShowModal(false);
            }}
          />

          <Grid container spacing={3}>
            {!loading && dataFiltered && dataFiltered.length > 0 ? (
              dataFiltered.map((pokemon) => (
                <Grid item key={pokemon.name} xs={11} sm={5} md={3}>
                  <PokemonContextProvider value={pokemon}>
                    <CardPokemon
                      onTap={() => {
                        setSelectedPokemon(pokemon);
                        setShowModal(true);
                      }}
                    />
                  </PokemonContextProvider>
                </Grid>
              ))
            ) : !loading ? (
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <SearchOff sx={{ fontSize: 40, mr: 1 }} />
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Nenhum pokemon encontrado
                </Typography>
              </Container>
            ) : null}
            {loading &&
              Array.from(Array(20).keys()).map((value) => (
                <Grid item key={value} xs={11} sm={5} md={3}>
                  <Skeleton
                    variant="rounded"
                    height={360}
                    sx={{ borderRadius: 5 }}
                  />
                </Grid>
              ))}
          </Grid>

          {page > 0 && (
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                pt: 3,
              }}
            >
              <Pagination
                count={Math.ceil(count / 20) + 1}
                shape="rounded"
                size="large"
                defaultPage={1}
                siblingCount={5}
                onChange={(ev, value) => setPage(value)}
                color="primary"
              />
            </Container>
          )}
        </Container>
      </main>
    </ThemeProvider>
  );
}
