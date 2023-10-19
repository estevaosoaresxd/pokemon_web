import {
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  colors,
} from "@mui/material";

import { Search } from "@mui/icons-material";
import { useState } from "react";

export default function SearchInput({
  placeholder,
  emptyInput,
  onChange,
  onTapSearch,
}) {
  return (
    <Container>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          mb: 1,
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ "aria-label": { placeholder } }}
          onInput={(e) => {
            onChange(e.target.value);
          }}
        />
        <Divider orientation="vertical" flexItem />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={onTapSearch}
        >
          <Search />
        </IconButton>
      </Paper>
      {emptyInput && <Typography color="primary">Campo vazio.</Typography>}
    </Container>
  );
}
