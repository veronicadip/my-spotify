import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import { Artist, Track, SimplifiedTrack } from "spotify-web-api-ts/types/types/SpotifyObjects";
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
  const [songArtist, setSongArtist] = useState<Artist>();
  const [isLoadingArtist, setIsLoadingArtist] = useState(true);
  const [artistError, setArtistError] = useState(false);
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
        setIsLoadingSong(false);
      })
      .catch(() => {
        setSongError(true);
        setIsLoadingSong(false);
      });
    spotifyApi.artists.getArtist(artistId)
      .then((response) => {
        setSongArtist(response);
        setIsLoadingArtist(false);
      })
      .catch(() => {
        setArtistError(true);
        setIsLoadingArtist(false);
      })
  }, []);

  const renderSongHome = () => {
    if (isLoadingSong || isLoadingArtist) {
      <div className="loadingContainer">
        <CircularProgress color="inherit" className="circularProgress" />
      </div>;
    }
    if (songError || artistError) {
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
        <div>
          <ImageWithFallback src={songArtist?.images.at(2)?.url} fallback={artistPictureFallback} alt={`${songArtist?.name} profile picture`} imagesArray={songArtist?.images.length} />
          <Link to={`/artist/${artistId}`}>
            {songInfo?.artists.at(0)?.name}
          </Link>
        </div>
        <Link to={`/artist/${artistId}/album/${albumId}`}>More of: {songInfo?.album.name}</Link>
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
