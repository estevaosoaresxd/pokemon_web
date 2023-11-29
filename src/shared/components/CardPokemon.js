import { Add, BrokenImage, HideImageOutlined } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  colors,
  Box,
  CardActionArea,
} from "@mui/material";
import { verifyTypeColor } from "../utils/utils_pokemons";
import { usePokemon } from "../../modules/PokemonContext";

export default function CardPokemon({ onTap }) {
  const pokemon = usePokemon();

  return (
    <Card
      sx={{
        borderRadius: 5,
        backgroundImage: `linear-gradient(180deg, ${verifyTypeColor(
          pokemon.type
        )},white)`,
      }}
    >
      <CardActionArea
        onClick={onTap}
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <CardMedia
          component="div"
          sx={
            pokemon.image
              ? {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignSelf: "center",
                  height: "20vh",
                  width: 200,
                }
              : {
                  display: "flex",
                  justifyContent: "center",
                }
          }
          src={<BrokenImage />}
          image={pokemon.image}
          children={
            !pokemon.image && (
              <HideImageOutlined sx={{ height: "15vh", width: 200 }} />
            )
          }
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{
              color: colors.common.white,
              textShadow: `${colors.grey[500]} -1px 1px`,
            }}
          >
            {pokemon.name.toUpperCase()}
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={{
                fontSize: 16,
                backgroundColor: verifyTypeColor(pokemon.type),
                ":focus": {
                  backgroundColor: verifyTypeColor(pokemon.type),
                },
                ":hover": {
                  backgroundColor: verifyTypeColor(pokemon.type),
                },
                borderRadius: 5,
                mr: 1,
              }}
            >
              {pokemon.type}
            </Button>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <Button
            startIcon={<Add />}
            onClick={onTap}
            variant="contained"
            sx={{ fontSize: 16, width: "100%" }}
          >
            DETALHES
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
