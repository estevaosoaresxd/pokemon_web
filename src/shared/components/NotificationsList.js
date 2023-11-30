import * as React from "react";
import {
  Backdrop,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  colors,
  IconButton,
  Typography,
} from "@mui/material";

import { Close, Notifications } from "@mui/icons-material";
import { Modal } from "@mui/material";

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

export default function NotificationsList({ open, handleClose }) {
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
      <Container sx={style} maxWidth="xs">
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
            alignItems: "start",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Notificações
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Notifications />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Notifications />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Notifications />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
          </List>
        </Container>
      </Container>
    </Modal>
  );
}
