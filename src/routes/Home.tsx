import React, { useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import CircularProgress from "@mui/material/CircularProgress";
import throttle from "lodash.throttle";
import AlbumResult from "../components/AlbumResult";
import { SearchResponse } from "spotify-web-api-ts/types/types/SpotifyResponses";
import "../styles/Home.css";
import SongResult from "../components/SongResult";
import ArtistResult from "../components/ArtistResult";
import SearchAppBar from "../components/TopOfPageHome";
import Alert from "@mui/material/Alert";
import currentAccessToken from "../lib/accessToken";

function Home() {
  const [searchResults, setSearchResults] = useState<SearchResponse>({});
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);
  const [searchError, setSearchError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const albumCoverFallback =
    "https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png";
  const artistPictureFallback =
    "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021";

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      return makeSearch(value), setSearchValue(value);
    }
  };

  const makeSearch = throttle(
    (query: string) => {
      spotifyApi.search
        .search(query, ["artist", "album", "track"], { limit: 5 })
        .then((response) => {
          setSearchResults(response);
          setIsLoadingSearch(false);
        })
        .catch(() => {
          setSearchError(true);
          setIsLoadingSearch(false);
        });
    },
    400,
    { leading: false }
  );

  var spotifyApi = new SpotifyWebApi();
  const accessToken = currentAccessToken;
  spotifyApi.setAccessToken(accessToken);

  const renderSongs = () => {
    if (searchResults.tracks?.items.length) {
      return (
        <div className="songsList">
          {searchResults.tracks?.items.map((song) => (
            <SongResult
              songData={song}
              src={song.album.images.at(2)?.url}
              fallback={albumCoverFallback}
              key={song.id}
            />
          ))}
        </div>
      );
    }
    return <p>{`There aren't any songs with the name "${searchValue}"`}</p>;
  };

  const renderAlbums = () => {
    if (searchResults.albums?.items.length) {
      return (
        <div className="albumsList">
          {searchResults.albums?.items.map((album) => (
            <AlbumResult
              albumData={album}
              src={album.images.at(1)?.url}
              fallback={albumCoverFallback}
              key={album.id}
            />
          ))}
        </div>
      );
    }
    return <p>{`There aren't any albums with the name "${searchValue}"`}</p>;
  };

  const renderArtists = () => {
    if (searchResults.artists?.items.length) {
      return (
        <div className="artistsList">
          {searchResults.artists?.items.map((artist) => (
            <ArtistResult
              artistData={artist}
              src={artist.images.at(1)?.url}
              fallback={artistPictureFallback}
              key={artist.id}
            />
          ))}
        </div>
      );
    }
    return <p>{`There aren't any artists with the name ${searchValue}`}</p>;
  };

  const renderSearchResults = () => {
    if (searchValue) {
      if (isLoadingSearch) {
        return (
          <div className="loadingContainer">
            <CircularProgress color="inherit" className="circularProgress" />
          </div>
        );
      }
      if (searchError) {
        return (
          <div>
            <Alert severity="error" className="errorMessage">
              There was an error loading the data, please try again.
            </Alert>
          </div>
        );
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
      );
    }
    return <h2>Search here the music that you want!</h2>;
  };

  return (
    <div>
      <SearchAppBar searchHandler={searchHandler} />
      <div className="bodyOfPage">{renderSearchResults()}</div>
    </div>
  );
}

export default Home;

// client ID: e26e4e3168be4fc3b9a9c766601fa05a
// client secret: a478ac602633484da0b64a6b9c2679bb
