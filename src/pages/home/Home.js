import { useEffect, useState, useMemo } from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Toolbar,
  Typography,
  Container,
  Skeleton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Add, CatchingPokemonOutlined, SearchOff } from "@mui/icons-material";
import { theme } from "../../shared/theme/theme";
import { getAllPokemons } from "../../services/PokemonServices";
import SearchInput from "../../shared/components/SearchInput";
import CardPokemon from "../../shared/components/CardPokemon";
import ToolbarDefault from "../../shared/components/ToolbarDefault";

const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data.filter((pokemon) => pokemon.name.toLowerCase().includes(query));
  }
};

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const dataFiltered = useMemo(
    () => filterData(searchQuery, allPokemons),
    [searchQuery, allPokemons]
  );

  const getAll = async () => {
    try {
      setLoading(true);

      let pokemons = await getAllPokemons(page);

      if (pokemons) {
        const pokemonsTotal = [...allPokemons, ...pokemons];

        setPage(page + 1);
        setAllPokemons(pokemonsTotal);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
              Aqui é possível fazer as buscas de seus Pokemóns favoritos que
              queira buscar junto com a comunicação da PokeAPI
            </Typography>
          </Container>
        </Box>
        <Box>
          <Container maxWidth="sm">
            <SearchInput
              placeholder="Digite o pokemon"
              onChange={setSearchQuery}
            ></SearchInput>
          </Container>
        </Box>
        <Container sx={{ py: 8 }}>
          <Grid container spacing={3}>
            {dataFiltered && dataFiltered.length > 0 ? (
              dataFiltered.map((pokemon) => (
                <Grid item key={pokemon.name} xs={11} sm={5} md={3}>
                  <CardPokemon pokemon={pokemon}></CardPokemon>
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
                    sx={{
                      height: 500,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  ></Skeleton>
                </Grid>
              ))}
          </Grid>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              pt: 8,
              pb: 6,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={getAll}
              size="large"
            >
              Carregar mais
            </Button>
          </Container>
        </Container>
      </main>
    </ThemeProvider>
  );
}
