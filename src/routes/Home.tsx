import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import TextField from "@mui/material/TextField";
import throttle from "lodash.throttle";

function Home() {
  const [searchResults, setSearchResults] = useState({});
  const [searchError, setSearchError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    makeSearch(value);
  };

  const makeSearch = throttle((query: string) => {
    spotifyApi
      .search(query, ["artist", "album", "track"])
      .then((response) => {
        setSearchResults(response);
        console.log(response);
      })
      .catch(() => {
        setSearchError(true);
      });
  }, 500);

  const showResult = () => {
    if (searchValue.length >= 1) {
      return <p>Showing results of: {searchValue}</p>;
    }
  };

  var spotifyApi = new SpotifyWebApi();
  const accessToken =
    "BQDhi1NNR6it36qiFAE6Lqf3qDvWCWOUm9FboNKE3xT2VH-b6hB67Hx7a3ukzK5ZO2QQDSjbqpbvHlHAqVU";
  spotifyApi.setAccessToken(accessToken);

  return (
    <div>
      <Link to="/artist">Artist</Link> | <Link to="/artist/album">Album</Link>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={searchHandler}
      />
      {showResult()}
      <Outlet />
    </div>
  );
}

export default Home;

// client ID: e26e4e3168be4fc3b9a9c766601fa05a
// client secret: a478ac602633484da0b64a6b9c2679bb
