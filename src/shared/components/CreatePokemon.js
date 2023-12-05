import {
  Backdrop,
  Container,
  Modal,
  colors,
  IconButton,
  Box,
  Avatar,
  TextField,
  Typography,
  Button,
  MenuItem,
  Grid,
  InputAdornment,
} from "@mui/material";

import { Close } from "@mui/icons-material";

import image from "../assets/logo.png";
import { useState } from "react";
import { createPokemon } from "../../services/PokemonServices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  bgcolor: "background.paper",
  border: `2px solid ${colors.red.A700}`,
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const currencies = [
  {
    value: "grass",
    label: "Grama",
  },
  {
    value: "poison",
    label: "Veneno",
  },
  {
    value: "fire",
    label: "Fogo",
  },
  {
    value: "flying",
    label: "Voador",
  },
  {
    value: "water",
    label: "Água",
  },
  {
    value: "bug",
    label: "Inseto",
  },
  {
    value: "electric",
    label: "Elétrico",
  },
  {
    value: "ground",
    label: "terra",
  },
  {
    value: "fairy",
    label: "Fada",
  },
  {
    value: "fighting",
    label: "Lutador",
  },
  {
    value: "psychic",
    label: "Psíquico",
  },
  {
    value: "rock",
    label: "Rocha",
  },
  {
    value: "ice",
    label: "Gelo",
  },
  {
    value: "dragon",
    label: "Dragão",
  },
  {
    value: "ghost",
    label: "Fantasma",
  },
  {
    value: "dark",
    label: "Escuro",
  },
  {
    value: "steel",
    label: "Aço",
  },
];

const valuesPokemon = [
  {
    value: "hp",
    label: "Vida",
    grid: 3,
  },
  {
    value: "attack",
    label: "Ataque",
    grid: 3,
  },
  {
    value: "speed",
    label: "Velocidade",
    grid: 3,
  },
  {
    value: "defense",
    label: "Defesa",
    grid: 3,
  },
  {
    value: "specialAttack",
    label: "Ataque Especial",
    grid: 4,
  },
  {
    value: "specialDefense",
    label: "Defesa Especial",
    grid: 4,
  },
];

export default function CreatePokemon({ open, onCreate, handleClose }) {
  const [invalidUser, setInvalidUser] = useState(false);

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  const handleSubmit = async (event) => {
    setInvalidUser(false);

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let name = data.get("name");
    let type = data.get("type");
    let height = data.get("height");
    let weight = data.get("weight");
    let hp = data.get("hp");
    let attack = data.get("attack");
    let speed = data.get("speed");
    let defense = data.get("defense");
    let specialAttack = data.get("specialAttack");
    let specialDefense = data.get("specialDefense");
    let image = data.get("image");
    let base64 = await getBase64(image);

    const pokemonData = {
      name,
      type,
      height,
      weight,
      hp,
      attack,
      speed,
      defense,
      specialAttack,
      specialDefense,
      image: base64,
    };

    await createPokemon(pokemonData)
      .then((e) => {
        if (e.status == 201) {
          handleClose();
        }
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <div>
        <Container sx={style} maxWidth="md">
          <IconButton
            aria-label="delete"
            color="primary"
            sx={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
            onClick={handleClose}
          >
            <Close sx={{ width: 30, height: 30 }} />
          </IconButton>

          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              flex: 0.5,
            }}
          >
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "primary.main", width: 50, height: 50 }}
              >
                <img src={image} alt="pokemon-logo" width={50}></img>
              </Avatar>
              <Typography component="h1" variant="h5">
                Cadastrar Pokémon
              </Typography>
              <Grid
                component="form"
                container
                spacing={2}
                onSubmit={handleSubmit}
              >
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    id="type"
                    name="type"
                    required
                    fullWidth
                    select
                    label="Tipo"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="weight"
                    label="Largura"
                    type="number"
                    id="weight"
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                      endAdornment: (
                        <InputAdornment position="end">h</InputAdornment>
                      ),
                    }}
                    name="height"
                    label="Altura"
                    type="number"
                    id="height"
                  />
                </Grid>

                {valuesPokemon.map((option) => (
                  <Grid key={option.value} item xs={option.grid}>
                    <TextField
                      margin="normal"
                      key={option.value}
                      id={option.value}
                      required
                      fullWidth
                      name={option.value}
                      label={option.label}
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    id="image"
                    required
                    fullWidth
                    name="image"
                    label="Imagem"
                    type="file"
                    InputProps={{
                      inputProps: {
                        accept: ".png, .jpg",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cadastrar
                </Button>
              </Grid>
            </Box>
          </Container>
        </Container>
      </div>
    </Modal>
  );
}
