import { colors } from "@mui/material";

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
    default:
      return colors.grey[600];
  }
};

export { verifyTypeColor };
