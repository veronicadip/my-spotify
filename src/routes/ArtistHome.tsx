import React, { useEffect, useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import { Artist, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { GetArtistAlbumsResponse } from "spotify-web-api-ts/types/types/SpotifyResponses.js"
import SearchAppBar from "../components/TopOfPage";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ArtistTopTrack from "../components/ArtistTopTrack";
import "../styles/ArtistHome.css"

type ArtistHomeParams = {
  artistId: string;
};

function ArtistHome() {
  const params = useParams() as ArtistHomeParams;
  const artistId = params.artistId;
  const [artistInfo, setArtistInfo] = useState<Artist>();
  const [isLoadingArtist, setIsLoadingArtist] = useState(true);
  const [artistError, setArtistError] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>();
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);
  const [tracksError, setTracksError] = useState(false);


  var spotifyApi = new SpotifyWebApi();
  const accessToken = currentAccessToken;
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.artists
      .getArtist(artistId)
      .then((response) => {
        setArtistInfo(response);
        console.log(response);
        setIsLoadingArtist(false);
      })
      .catch(() => {
        setArtistError(true);
        setIsLoadingArtist(false);
      });
    spotifyApi.artists
      .getArtistTopTracks(artistId, "AR")
      .then((response) => {
        setTopTracks(response);
        console.log(response);
        setIsLoadingTracks(false);
      })
      .catch(() => {
        setTracksError(true);
        setIsLoadingTracks(false);
      });
  }, []);

  const renderArtistPicture = () => {
    if (artistInfo?.images) {
      return (
        <img
          src={artistInfo.images.at(1)?.url}
          alt={`${artistInfo.name} profile picture`}
          className="artistProfilePicture"
        />
      );
    }
    return (
      <img
        src="https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"
        alt={`${artistInfo?.name} profile picture`}
      />
    );
  };

  const renderArtistHome = () => {
    if (isLoadingArtist || isLoadingTracks) {
      return (
        <div className="loadingContainer">
          <CircularProgress color="inherit" className="circularProgress" />
        </div>
      );
    }
    if (artistError || tracksError) {
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
        <div className="artistInfoContainer">
          {renderArtistPicture()}
          <div className="nameAndFollowers">
            <h1 className="artistName">{artistInfo?.name}</h1>
            <span className="followers">{`${artistInfo?.followers.total} followers`}</span>
          </div>
        </div>
        <h2>Popular songs</h2>
        <div className="topTracksList">
          {topTracks?.map((track) => (<ArtistTopTrack topTrackInfo={track} key={track.id} />))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <SearchAppBar />
      <div className="bodyOfPage">{renderArtistHome()}</div>
    </div>
  );
}

export default ArtistHome;
