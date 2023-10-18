import {
  Add,
  BrokenImage,
  HideImage,
  HideImageOutlined,
} from "@mui/icons-material";
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

const verifyTypeColor = (type) => {
  switch (type) {
    case "grass":
      return colors.green[900];
    case "poison":
      return colors.purple[900];
    case "fire":
      return colors.orange[800];
    case "flying":
      return colors.lightBlue[100];
    case "water":
      return colors.blue[700];
    case "bug":
      return colors.lightGreen.A700;
    case "normal":
      return colors.grey[600];
    case "electric":
      return colors.yellow.A700;
    case "ground":
      return colors.deepOrange[700];
    case "fairy":
      return colors.pink[500];
    case "fighting":
      return colors.red[600];
    case "psychic":
      return colors.red[300];
    case "rock":
      return colors.brown.A700;
    case "ice":
      return colors.lightBlue[300];
    case "dragon":
      return colors.blue[900];
    case "ghost":
      return colors.deepPurple[400];
    case "dark":
      return colors.common.black;
    case "steel":
      return colors.blueGrey[500];
  }
};

export default function CardPokemon({ pokemon, onTap }) {
  console.log(
    pokemon.sprites.front_default ? (
      pokemon.sprites.front_default
    ) : (
      <BrokenImage />
    )
  );
  return (
    <Card
      sx={{
        borderRadius: 5,
        backgroundImage: `linear-gradient(180deg, ${verifyTypeColor(
          pokemon.types[0].type.name
        )},white)`,
      }}
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <CardMedia
          component="div"
          sx={
            pokemon.sprites.front_default
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
          image={pokemon.sprites.front_default}
          children={
            !pokemon.sprites.front_default && (
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
            {pokemon.types.map((types) => (
              <Button
                variant="contained"
                sx={{
                  fontSize: 16,
                  backgroundColor: verifyTypeColor(types.type.name),
                  borderRadius: 5,
                  mr: 1,
                }}
              >
                {types.type.name}
              </Button>
            ))}
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
