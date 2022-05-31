import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import SearchAppBar from "../components/TopOfPage";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ImageWithFallback from "../components/ImageWithFallback";
import { Link } from "react-router-dom";

type SongHomeParams = {
  artistId: string;
  albumId: string;
  songId: string;
};

function SongHome() {
  const { artistId, albumId, songId } = useParams() as SongHomeParams;
  const [songInfo, setSongInfo] = useState<Track>();
  const [isLoadingSong, setIsLoadingSong] = useState(true);
  const [songError, setSongError] = useState(false);
  const albumCoverFallback =
    "https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png";
  const artistPictureFallback =
    "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021";

  var spotifyApi = new SpotifyWebApi();
  const accessToken = currentAccessToken;
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.tracks
      .getTrack(songId)
      .then((response) => {
        setSongInfo(response);
        console.log(response);
        setIsLoadingSong(false);
      })
      .catch(() => {
        setSongError(true);
        setIsLoadingSong(false);
      });
  }, []);

  const renderSongHome = () => {
    if (isLoadingSong) {
      <div className="loadingContainer">
        <CircularProgress color="inherit" className="circularProgress" />
      </div>;
    }
    if (songError) {
      <div>
        <Alert severity="error" className="errorMessage">
          There was an error loading the data, please try again.
        </Alert>
      </div>;
    }
    return (
      <div>
        <ImageWithFallback
          src={songInfo?.album.images.at(1)?.url}
          fallback={albumCoverFallback}
          alt={`${songInfo?.album.name} album cover`}
          imagesArray={songInfo?.album.images.length}
        />
        <h1>{songInfo?.name}</h1>
        <Link to={`/artist/${songInfo?.artists.at(0)?.id}`}>
          {songInfo?.artists.at(0)?.name}
        </Link>
      </div>
    );
  };

  return (
    <div>
      <SearchAppBar />
      {renderSongHome()}
    </div>
  );
}

export default SongHome;
