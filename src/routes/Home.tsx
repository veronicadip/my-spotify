import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import TextField from "@mui/material/TextField";
import debounce from "lodash.debounce";

function Home() {
  const [searchResults, setSearchResults] = useState({})
  const [searchError, setSearchError] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    makeSearch()
  }

  const makeSearch = debounce(() => {
    spotifyApi.search(searchValue, ["artist", "album", "track"]).then((response) => {
      setSearchResults(response);
      console.log(searchResults)
    }).catch(() => {
      setSearchError(true)
    })
  }, 2000)

  var spotifyApi = new SpotifyWebApi();
  const accessToken = 'BQBnQgvDmUo9UW_-TK83lRYC7ZB8vaRXMcJ9unbiqHautJ5dgFzUIoNTVLf3OjlsZDXn9qW2qRevE7EnjR4'
  spotifyApi.setAccessToken(accessToken);

  return (
    <div>
      <Link to="/artist">Artist</Link> | <Link to="/artist/album">Album</Link>
      <TextField id="outlined-basic" label="Search" variant="outlined" onChange={searchHandler} />
      <p>{searchValue}</p>
      <Outlet />
    </div>
  );
}

export default Home;

// client ID: e26e4e3168be4fc3b9a9c766601fa05a
// client secret: a478ac602633484da0b64a6b9c2679bb