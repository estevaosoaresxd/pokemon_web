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

// SERVICES
import {
  getAllPokemons,
  getPokemonByName,
} from "../../services/PokemonServices";

// THEME
import { themeDefault } from "../../shared/theme/themeDefault";

// CONTEXT
import { PokemonContextProvider } from "../../modules/PokemonContext";
import { useAuth } from "../../modules/AuthContext";

// COMPONENTS
import LoginForm from "../../shared/components/LoginForm";
import DetailsPokemon from "../../shared/components/DetailsPokemon";
import SearchInput from "../../shared/components/SearchInput";
import CardPokemon from "../../shared/components/CardPokemon";
import ToolbarDefault from "../../shared/components/ToolbarDefault";
import AlertSucess from "../../shared/components/AlertSucess";
import CreatePokemon from "../../shared/components/CreatePokemon";
import NotificationsList from "../../shared/components/NotificationsList";

// SOCKET
import { socket } from "../../socket";

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [emptyInput, setEmptyInput] = useState(false);

  const [showModalPokemon, setShowModalPokemon] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalCreatePokemon, setshowModalCreatePokemon] = useState(false);
  const [showModalNotifications, setShowModalNotifications] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { isAuth, signOut, user } = useAuth();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

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
        const getPokemon = async () => {
          try {
            setLoading(true);

            let res = await getPokemonByName(query);

            setAllPokemons([...allPokemons, res]);
          } catch (e) {
            return [];
          } finally {
            setLoading(false);
          }
        };

        return getPokemon();
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

  const callAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const socketIO = () => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("notification", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  };

  useEffect(() => {
    isAuth();
    socketIO();
  }, []);

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
      <AlertSucess
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
      />

      <CssBaseline />
      <ToolbarDefault
        user={user}
        onTapEnter={() => setShowModalLogin(true)}
        onTapLogout={() => {
          signOut();
          callAlert("Logoff feito com sucesso");
        }}
        onTapNotification={() => setShowModalNotifications(true)}
        onTapPokemon={() => setshowModalCreatePokemon(true)}
      />
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
              com a integração da PokeAPI com milhares de pokémons !
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {isConnected ? "Conectado" : "Desconectado"}
            </Typography>
          </Container>
        </Box>
        {user != null && user.token && (
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
        )}

        <Container sx={{ py: 8 }}>
          <DetailsPokemon
            key="details"
            open={showModalPokemon}
            pokemon={selectedPokemon}
            handleClose={() => {
              setSelectedPokemon(null);
              setShowModalPokemon(false);
            }}
          />

          <LoginForm
            key="login"
            open={showModalLogin}
            onLogin={() => callAlert("Login efetuado com sucesso.")}
            handleClose={() => setShowModalLogin(false)}
          />

          <CreatePokemon
            key="createPokemon"
            open={showModalCreatePokemon}
            onCreate={() => callAlert("Pokémon criado com sucesso.")}
            handleClose={() => setshowModalCreatePokemon(false)}
          />

          <NotificationsList
            key="notifications"
            open={showModalNotifications}
            handleClose={() => setShowModalNotifications(false)}
          />

          <Grid container spacing={3}>
            {!loading && dataFiltered && dataFiltered.length > 0 ? (
              dataFiltered.map((pokemon) => (
                <Grid item key={pokemon.name} xs={11} sm={5} md={3}>
                  <PokemonContextProvider value={pokemon}>
                    <CardPokemon
                      onTap={() => {
                        setSelectedPokemon(pokemon);
                        setShowModalPokemon(true);
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
                count={Math.ceil(count / 20)}
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
