import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SpotifyWebApi } from "spotify-web-api-ts";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import throttle from "lodash.throttle";
import AlbumResult from "../components/AlbumResult";
import { SearchResponse } from "spotify-web-api-ts/types/types/SpotifyResponses";
import "../styles/Home.css";
import SongResult from "../components/SongResult";
import ArtistResult from "../components/ArtistResult";
import { dialogActionsClasses } from "@mui/material";

function Home() {
  const [searchResults, setSearchResults] = useState<SearchResponse>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchError, setSearchError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    makeSearch(value);
    setSearchValue(value);
  };

  const makeSearch = throttle(
    (query: string) => {
      spotifyApi.search
        .search(query, ["artist", "album", "track"], { limit: 6 })
        .then((response) => {
          setSearchResults(response);
          console.log(response);
          setIsLoading(false);
        })
        .catch(() => {
          setSearchError(true);
          setIsLoading(false);
        });
    },
    400,
    { leading: false }
  );

  var spotifyApi = new SpotifyWebApi();
  const accessToken =
    "BQCHVx_VcOdG0hpUBI8m3gNrixElXWjuT0AIM18WYSUxsouXdVr9vhpi4TvG0jUuNXZkZ58W8gWUlvq05Ew";
  spotifyApi.setAccessToken(accessToken);

  const renderSongs = () => {
    if (searchResults.tracks?.items.length) {
      return (
        <div className="songsList">
          {searchResults.tracks?.items.map((song) => (
            <SongResult songData={song} key={song.id} />
          ))}
        </div>
      )
    }
    return <p>{`There aren‘t any songs with the name "${searchValue}"`}</p>
  }

  const renderAlbums = () => {
    if (searchResults.albums?.items.length) {
      return (
        <div className="albumsList">
          {searchResults.albums?.items.map((album) => (
            <AlbumResult albumData={album} key={album.id} />
          ))}
        </div>
      )
    }
    return <p>{`There aren‘t any albums with the name "${searchValue}"`}</p>
  }

  const renderArtists = () => {
    if (searchResults.artists?.items.length) {
      return (
        <div className="artistsList">
          {searchResults.artists?.items.map((artist) => (<ArtistResult artistData={artist} key={artist.id} />))}
        </div>
      )
    }
    return <p>{`There aren‘t any artists with the name ${searchValue}`}</p>
  }

  const renderSearchResults = () => {
    if (searchValue) {
      if (isLoading) {
        return <CircularProgress color="inherit" className="circularProgress" />
      }
      return (
        <div>
          <h2>Songs</h2>
          {renderSongs()}
          <h2>Albums</h2>
          {renderAlbums()}
          <h2>Artists</h2>
          {renderArtists()}
        </div>
      )
    }
  }

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
        {renderSearchResults()}
      </div>
      <Outlet />
    </div>
  );
}

export default Home;

// client ID: e26e4e3168be4fc3b9a9c766601fa05a
// client secret: a478ac602633484da0b64a6b9c2679bb
