import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import TextField from "@mui/material/TextField";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";

function Home() {
  const [searchResults, setSearchResults] = useState({})
  const [searchError, setSearchError] = useState(false)
  const [searchValue, setSearchValue] = useState("asd")

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
  const accessToken = 'BQBtswTBtmiGjD9sWr1oxKeC1VTgA3o5QaG2FYa9_LzKwoLOrfPbOjvD2fvifErDYQeXhX46lZtBOGMPjY4'
  spotifyApi.setAccessToken(accessToken);

  return (
    <div>
      <h1>Home</h1>
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