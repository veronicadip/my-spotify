import React from "react";
import { Link, Outlet } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

function Home() {
  var spotifyApi = new SpotifyWebApi();

  return (
    <div>
      <h1>Home</h1>
      <Link to="/artist">Artist</Link> | <Link to="/artist/album">Album</Link>
      <Outlet />
    </div>
  );
}

export default Home;

// client ID: e26e4e3168be4fc3b9a9c766601fa05a
// client secret: a478ac602633484da0b64a6b9c2679bb
