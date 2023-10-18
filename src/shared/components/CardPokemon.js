import { Add } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const typeHandler = (types) => {
  if (types[1]) {
    return types[0].type.name + "  " + types[1].type.name;
  }
  return types[0].type.name;
};

const verifyTypeColor = (type) => {
  switch (type) {
    case "grass":
      return "green";
    case "poison":
      return "purple";
    case "fire":
      return "orange";
    case "flying":
      return "grey";
    case "water":
      return "blue";
    case "bug":
      return "greenAccent";
    case "normal":
      return "black";
    case "eletric":
      return "yellow";
    case "ground":
      return "brown";
    case "fairy":
      return "pink";
    case "fighitig":
      return "red";
    case "psychic":
      return "black";
    case "rock":
      return "grey";
    case "ice":
      return "blueGrey";
    case "dragon":
      return "orangeAccent";
  }
};

export default function CardPokemon({ pokemon, onTap }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={onTap}
    >
      <CardMedia
        component="div"
        sx={{
          pt: "100%",
        }}
        image={pokemon.sprites.front_default}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {pokemon.name.toUpperCase()}
        </Typography>
        <Typography>{typeHandler(pokemon.types)}</Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          startIcon={<Add />}
          onClick={onTap}
          variant="contained"
          sx={{ fontSize: 16, width: "100%" }}
        >
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
