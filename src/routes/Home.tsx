import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SpotifyWebApi } from "spotify-web-api-ts";
import TextField from "@mui/material/TextField";
import throttle from "lodash.throttle";
import Album from "../components/Album";
import { SearchResponse } from "spotify-web-api-ts/types/types/SpotifyResponses";
import "../styles/Home.css";
import Song from "../components/Song";

function Home() {
  const [searchResults, setSearchResults] = useState<SearchResponse>({});
  const [searchError, setSearchError] = useState(false);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    makeSearch(value);
  };

  const makeSearch = throttle(
    (query: string) => {
      spotifyApi.search
        .search(query, ["artist", "album", "track"], { limit: 5 })
        .then((response) => {
          setSearchResults(response);
        })
        .catch(() => {
          setSearchError(true);
        });
    },
    400,
    { leading: false }
  );

  var spotifyApi = new SpotifyWebApi();
  const accessToken =
    "BQAAmwxZtPeYAAweUbipO9T489f8xCBbdPXbYsIQdkIJusl-I-odYWpzAIXKCnFFi5uOPMX2gg8uDVcuRxA";
  spotifyApi.setAccessToken(accessToken);

  return (
    <div>
      <div className="topOfPage">
        <Link to="/artist">Artist</Link> | <Link to="/artist/album">Album</Link>
      </div>
      <div className="bodyOfPage">
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={searchHandler}
        />
        <h2>Songs</h2>
        <div className="songsList">
          {searchResults.tracks?.items.map((song) => (
            <Song songData={song} key={song.id} />
          ))}
        </div>
        <h2>Albums</h2>
        <div className="albumsList">
          {searchResults.albums?.items.map((album) => (
            <Album albumData={album} key={album.id} />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;

// client ID: e26e4e3168be4fc3b9a9c766601fa05a
// client secret: a478ac602633484da0b64a6b9c2679bb
