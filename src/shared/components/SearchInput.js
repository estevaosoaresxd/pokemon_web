import { Divider, IconButton, InputBase, Paper, colors } from "@mui/material";

import { Search } from "@mui/icons-material";

export default function SearchInput({ placeholder, onChange }) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": { placeholder } }}
        onENd
        onDragEnter={(e) => {
          onChange(e.target.value);
        }}
        onInput={(e) => {
          onChange(e.target.value);
        }}
      />

      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
}
