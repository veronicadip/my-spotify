import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArtistHome from "./routes/ArtistHome";
import AlbumHome from "./routes/AlbumHome";
import "./styles/index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WrappedSongHome from "./routes/WrappedSongHome";
import NotFound from "./routes/NotFound";
import { Layout } from "./routes/FooterLayout";
import { CssBaseline } from "@mui/material"

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
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/artist/:artistId" element={<ArtistHome />} />
          <Route
            path="/artist/:artistId/album/:albumId/song/:songId"
            element={<WrappedSongHome />}
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
