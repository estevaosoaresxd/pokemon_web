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
import { getAllPokemons } from "../../services/PokemonServices";
import SearchInput from "../../shared/components/SearchInput";
import CardPokemon from "../../shared/components/CardPokemon";
import ToolbarDefault from "../../shared/components/ToolbarDefault";
import { themeDefault } from "../../shared/theme/themeDefault";

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
  const [count, setCount] = useState(0);

  const dataFiltered = useMemo(
    () => filterData(searchQuery, allPokemons),
    [searchQuery, allPokemons]
  );

  const handleChange = (ev, value) => {
    setPage(value);
  };

  const getAllByPage = async () => {
    try {
      setLoading(true);

      let res = await getAllPokemons(page, count);

      if (count < 1) {
        setCount(res.count);
        setPage(page + 1);
      }

      if (res.pokemons) {
        setAllPokemons(res.pokemons);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
            {!loading && dataFiltered && dataFiltered.length > 0 ? (
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
                  <Skeleton variant="rounded" height={360} />
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
                onChange={handleChange}
                color="primary"
              />
            </Container>
          )}

          {/* <Container
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
          </Container> */}
        </Container>
      </main>
    </ThemeProvider>
  );
}
