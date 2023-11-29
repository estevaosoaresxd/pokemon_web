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
} from "@mui/material";

import { Close } from "@mui/icons-material";

import image from "../assets/logo.png";
import { loginWithUsernameAndPassword } from "../../services/LoginService";
import { useState } from "react";
import { useAuth } from "../../modules/AuthContext";

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

export default function LoginForm({ open, onLogin, handleClose }) {
  const [invalidUser, setInvalidUser] = useState(false);
  const { updateUser } = useAuth();

  const handleSubmit = async (event) => {
    setInvalidUser(false);

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let username = data.get("username");
    let password = data.get("password");

    await loginWithUsernameAndPassword(username, password)
      .then((e) => {
        if (e.status) {
          updateUser(e.data);
          onLogin();
          handleClose();
        }
      })
      .catch((e) => {
        console.log(e);
        setInvalidUser(true);
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
                Log In
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                // noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Usuário"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                {invalidUser && (
                  <Typography color="primary">
                    Usuário ou senha inválidos.
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Entrar
                </Button>
              </Box>
            </Box>
          </Container>
        </Container>
      </div>
    </Modal>
  );
}
