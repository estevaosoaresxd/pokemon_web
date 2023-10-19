import { AppBar, Box, Toolbar, Typography, colors } from "@mui/material";
import { CatchingPokemonOutlined } from "@mui/icons-material";

import image from "../assets/logo.png";

export default function ToolbarDefault() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={image} width={150}></img>
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
      </Toolbar>
    </AppBar>
  );
}
