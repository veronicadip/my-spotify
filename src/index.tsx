import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArtistHome from "./routes/ArtistHome";
import AlbumHome from "./routes/AlbumHome";
import "./styles/index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SongHome from "./routes/SongHome";
import NotFound from "./routes/NotFound";
import FooterLayout from "./routes/FooterLayout";

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
        <Route element={<FooterLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/artist/:artistId" element={<ArtistHome />} />
          <Route
            path="/artist/:artistId/album/:albumId/song/:songId"
            element={<SongHome />}
          />
          <Route
            path="/artist/:artistId/album/:albumId"
            element={<AlbumHome />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);
