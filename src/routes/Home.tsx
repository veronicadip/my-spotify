import React, { useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import CircularProgress from "@mui/material/CircularProgress";
import throttle from "lodash.throttle";
import AlbumResult from "../components/Home/AlbumResult";
import { SearchResponse } from "spotify-web-api-ts/types/types/SpotifyResponses";
import SongResult from "../components/Home/SongResult";
import ArtistResult from "../components/Home/ArtistResult";
import SearchAppBar from "../components/TopOfPageHome";
import Alert from "@mui/material/Alert";
import currentAccessToken from "../lib/accessToken";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
          console.log(response)
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
  spotifyApi.setAccessToken(currentAccessToken);

  const renderSongs = () => {
    if (searchResults.tracks?.items.length) {
      return (
        <div className="songsList">
          {searchResults.tracks?.items.map((song) => (
            <SongResult
              songData={song}
              fallback={albumCoverFallback}
              key={song.id}
            />
          ))}
        </div>
      );
    }
    return <Typography variant="subtitle1" gutterBottom mt={3} >{`There aren't any songs with the name "${searchValue}"`}</Typography>
  };

  const renderAlbums = () => {
    if (searchResults.albums?.items.length) {
      return (
        <div className="albumsList">
          {searchResults.albums?.items.map((album) => (
            <AlbumResult
              albumData={album}
              fallback={albumCoverFallback}
              key={album.id}
            />
          ))}
        </div>
      );
    }
    return <Typography variant="subtitle1" gutterBottom mt={3}>{`There aren't any albums with the name "${searchValue}"`}</Typography>;
  };

  const renderArtists = () => {
    if (searchResults.artists?.items.length) {
      return (
        <div className="artistsList">
          {searchResults.artists?.items.map((artist) => (
            <ArtistResult
              artistData={artist}
              fallback={artistPictureFallback}
              key={artist.id}
            />
          ))}
        </div>
      );
    }
    return <Typography variant="subtitle1" gutterBottom mt={3}>{`There aren't any artists with the name "${searchValue}"`}</Typography>;
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
          <Typography variant="h4" mb={4} mt={4}>Songs</Typography>
          {renderSongs()}
          <Typography variant="h4" mb={4} mt={5}>Albums</Typography>
          {renderAlbums()}
          <Typography variant="h4" mb={4} mt={5}>Artists</Typography>
          {renderArtists()}
        </div>
      );
    }
    return <Typography variant="h4" mt={8}>Search here the music that you want!</Typography>
  };

  return (
    <Box>
      <SearchAppBar searchHandler={searchHandler} />
      <div className="bodyOfPage">{renderSearchResults()}</div>
    </Box>
  );
}

export default Home;

// client ID: e26e4e3168be4fc3b9a9c766601fa05a
// client secret: a478ac602633484da0b64a6b9c2679bb
