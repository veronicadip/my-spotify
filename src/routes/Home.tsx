import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SpotifyWebApi } from "spotify-web-api-ts";
import CircularProgress from "@mui/material/CircularProgress";
import throttle from "lodash.throttle";
import AlbumResult from "../components/AlbumResult";
import { SearchResponse } from "spotify-web-api-ts/types/types/SpotifyResponses";
import "../styles/Home.css";
import SongResult from "../components/SongResult";
import ArtistResult from "../components/ArtistResult";
import SearchAppBar from "../components/TopOfPage";
import Alert from "@mui/material/Alert"


function Home() {
  const [searchResults, setSearchResults] = useState<SearchResponse>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchError, setSearchError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      return (
        makeSearch(value),
        setSearchValue(value)
      )
    }
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
    "BQC5yPmsokDypyl_qBbV7gUF4JXXvJLnFtCez7oGmMCaY1Qi89BYpMF4nUuxAAzGN7vlNnWy3ybHksIkENo";
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
        return (
          <div className="loadingContainer">
            <CircularProgress color="inherit" className="circularProgress" />
          </div>
        )
      }
      if (searchError) {
        return (
          <div>
            <Alert severity="error" className="errorMessage">There was an error loading the data, please try again.</Alert>
          </div>
        )
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
    return <h2>Search here the music you want!</h2>
  }

  return (
    <div>
      <SearchAppBar searchHandler={searchHandler} />
      <div className="bodyOfPage">
        {renderSearchResults()}
      </div>
      <Outlet />
    </div>
  );
}

export default Home;

// client ID: e26e4e3168be4fc3b9a9c766601fa05a
// client secret: a478ac602633484da0b64a6b9c2679bb
