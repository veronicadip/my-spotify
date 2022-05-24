import React, { useEffect, useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import { Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import SearchAppBar from "../components/TopOfPage";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

type ArtistHomeParams = {
  artistId: string;
};

function ArtistHome() {
  const params = useParams() as ArtistHomeParams;
  const artistId = params.artistId;
  const [artistPage, setArtistPage] = useState<Artist>();
  const [isLoadingArtist, setIsLoadingArtist] = useState(true);
  const [artistError, setArtistError] = useState(false);

  var spotifyApi = new SpotifyWebApi();
  const accessToken = currentAccessToken;
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.artists
      .getArtist(artistId)
      .then((response) => {
        setArtistPage(response);
        console.log(response);
        setIsLoadingArtist(false);
      })
      .catch(() => {
        setArtistError(true);
        setIsLoadingArtist(false);
      });
    spotifyApi.artists.getArtistTopTracks(artistId, "AR");
  }, []);

  const renderArtistPicture = () => {
    if (artistPage?.images) {
      return (
        <img
          src={artistPage.images.at(1)?.url}
          alt={`${artistPage.name} profile picture`}
        />
      );
    }
    return (
      <img
        src="https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"
        alt={`${artistPage?.name} profile picture`}
      />
    );
  };

  const renderArtistInfo = () => {
    if (isLoadingArtist) {
      return (
        <div className="loadingContainer">
          <CircularProgress color="inherit" className="circularProgress" />
        </div>
      );
    }
    if (artistError) {
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
        {renderArtistPicture()}
        <span>{artistPage?.name}</span>
        <span>{`${artistPage?.followers.total} followers`}</span>
      </div>
    );
  };
  return (
    <div>
      <SearchAppBar />
      <div className="bodyOfPage">{renderArtistInfo()}</div>
    </div>
  );
}

export default ArtistHome;
