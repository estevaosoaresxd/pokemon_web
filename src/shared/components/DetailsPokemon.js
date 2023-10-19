import {
  Backdrop,
  Button,
  Container,
  Modal,
  Typography,
  colors,
  Box,
  IconButton,
  Divider,
} from "@mui/material";

import { verifyTypeColor } from "../utils/utils_pokemons";
import {
  CatchingPokemonOutlined,
  Close,
  HeightOutlined,
  HideImageOutlined,
  MonitorWeightOutlined,
} from "@mui/icons-material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styled from "@emotion/styled";

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

export default function DetailsPokemon({ pokemon, open, handleClose }) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
    height: 10,
    width: "100%",
    borderRadius: 5,
    animationDuration: "8s",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[400],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: value < 50 ? colors.red.A700 : colors.lightGreen.A700,
    },
  }));

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
        {pokemon ? (
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
              {pokemon.sprites.front_default ? (
                <img
                  src={pokemon.sprites.front_default}
                  alt="Imagem Pokemon"
                  width={250}
                />
              ) : (
                <HideImageOutlined sx={{ height: "15vh", width: 200 }} />
              )}

              <Typography variant="h6" fontWeight="bold">
                #{pokemon.id}
              </Typography>

              <Typography
                id="transition-modal-title"
                variant="h5"
                fontWeight="bold"
              >
                {pokemon.name.toUpperCase()}
              </Typography>

              <Box mt={2}>
                {pokemon.types.map((types) => (
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: 16,
                      backgroundColor: verifyTypeColor(types.type.name),
                      ":focus": {
                        backgroundColor: verifyTypeColor(types.type.name),
                      },

                      ":hover": {
                        backgroundColor: verifyTypeColor(types.type.name),
                      },
                      borderRadius: 5,
                      mr: 1,
                    }}
                  >
                    {types.type.name}
                  </Button>
                ))}
              </Box>

              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: 3,
                    }}
                  >
                    <MonitorWeightOutlined sx={{ mr: 0.5 }} />
                    <Typography id="transition-modal-title" fontWeight="bold">
                      {pokemon.weight} kg
                    </Typography>
                  </Box>

                  <Typography id="transition-modal-description">
                    Weight
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: 3,
                    }}
                  >
                    <HeightOutlined sx={{ mr: 0.25 }} />
                    <Typography id="transition-modal-title" fontWeight="bold">
                      {pokemon.height} m
                    </Typography>
                  </Box>

                  <Typography id="transition-modal-description">
                    Height
                  </Typography>
                </Box>
              </Container>
            </Container>

            <Divider orientation="vertical" flexItem>
              <CatchingPokemonOutlined fontSize="large" color="primary" />
            </Divider>

            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                textAlign: "center",
                flex: 1,
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h2"
              >
                Status
              </Typography>

              {pokemon.stats.map((status) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 0.4,
                      mr: 2,
                    }}
                  >
                    <Typography id="transition-modal-description" mr={1}>
                      {status.stat.name}
                    </Typography>
                    <Typography id="transition-modal-title" fontWeight="bold">
                      {status.base_stat}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flex: 0.6,
                    }}
                  >
                    <BorderLinearProgress
                      variant="determinate"
                      value={status.base_stat > 100 ? 100 : status.base_stat}
                    />
                  </Box>
                </Box>
              ))}
            </Container>
          </Container>
        ) : null}
      </div>
    </Modal>
  );
}
