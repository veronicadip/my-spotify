import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Artist from "./routes/Artist";
import Album from "./routes/Album";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/artist" element={<Artist />} />
        <Route path="/artist/album" element={<Album />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
