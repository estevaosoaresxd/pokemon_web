import { AppBar, Toolbar, Typography } from "@mui/material";
import { CatchingPokemonOutlined } from "@mui/icons-material";

export default function ToolbarDefault() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <CatchingPokemonOutlined fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Pokemon Web
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
