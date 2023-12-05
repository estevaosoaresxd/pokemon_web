import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  colors,
  Badge,
} from "@mui/material";
import {
  Add,
  CatchingPokemonOutlined,
  Login,
  Logout,
  Notifications,
} from "@mui/icons-material";

import image from "../assets/logo.png";

export default function ToolbarDefault({
  user,
  onTapPokemon,
  onTapNotification,
  onTapLogout,
  onTapEnter,
  totalNotifications,
}) {
  return (
    <AppBar position="relative">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img alt="pokemon-logo" src={image} width={150}></img>
            <Typography
              variant="h4"
              sx={{
                color: colors.yellow[600],
                textShadow: `3px 3px 1px ${colors.blue[500]}`,
              }}
            >
              Web
            </Typography>
          </Box>
          <CatchingPokemonOutlined fontSize="large" sx={{ mr: 2 }} />
        </Box>
        <Box>
          {user != null && user.token && (
            <Button color="inherit" onClick={onTapPokemon}>
              <Add color="inherit" sx={{ mr: 1 }} />
              CRIAR POKEMON
            </Button>
          )}

          <Button color="inherit" onClick={onTapNotification}>
            <Badge
              showZero={true}
              badgeContent={totalNotifications}
              color="secondary"
              sx={{ mr: 1 }}
            >
              <Notifications color="inherit" />
            </Badge>
            NOTIFICAÇÕES
          </Button>
          {user != null && user.token ? (
            <Button color="inherit" onClick={onTapLogout}>
              <Logout sx={{ mr: 1 }} />
              SAIR
            </Button>
          ) : (
            <Button color="inherit" onClick={onTapEnter}>
              <Login sx={{ mr: 1 }} />
              ENTRAR
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
