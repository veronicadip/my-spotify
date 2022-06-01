import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArtistHome from "./routes/ArtistHome";
import AlbumHome from "./routes/AlbumHome";
import "./styles/index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NotFound from "./routes/NotFound";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:artistId" element={<ArtistHome />} />
        <Route path="/artist/:artistId/album/:albumId" element={<AlbumHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);
