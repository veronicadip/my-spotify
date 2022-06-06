import { useEffect, useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import { Artist, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { GetArtistAlbumsResponse } from "spotify-web-api-ts/types/types/SpotifyResponses.js";
import SearchAppBar from "../components/TopOfPage";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ArtistTopTrack from "../components/ArtistHome/ArtistTopTrack";
import "../styles/ArtistHome.css";
import ArtistAlbums from "../components/ArtistHome/ArtistAlbums";
import ArtistSingle from "../components/ArtistHome/ArtistSingle";
import ImageWithFallback from "../components/ImageWithFallback";

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
  const [artistAlbums, setArtistAlbums] = useState<GetArtistAlbumsResponse>();
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);
  const [albumsError, setAlbumsError] = useState(false);
  const albumCoverFallback =
    "https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png";
  const artistPictureFallback =
    "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021";

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
        console.log(response)
        setIsLoadingTracks(false);
      })
      .catch(() => {
        setTracksError(true);
        setIsLoadingTracks(false);
      });
    spotifyApi.artists
      .getArtistAlbums(artistId, { limit: 50, country: "AR" })
      .then((response) => {
        setArtistAlbums(response);
        console.log(response)
        setIsLoadingAlbums(false);
      })
      .catch(() => {
        setAlbumsError(true);
        setIsLoadingAlbums(false);
      });
  }, []);

  const renderArtistHome = () => {
    if (isLoadingArtist || isLoadingTracks || isLoadingAlbums) {
      return (
        <div className="loadingContainer">
          <CircularProgress color="inherit" className="circularProgress" />
        </div>
      );
    }
    if (artistError || tracksError || albumsError) {
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
          <ImageWithFallback
            src={artistInfo?.images.at(1)?.url}
            fallback={artistPictureFallback}
            alt={`${artistInfo?.name} profile picture`}
            className="artistProfilePicture"
            imagesArray={artistInfo?.images.length}
          />
          <div className="nameAndFollowers">
            <h1 className="artistNameHome">{artistInfo?.name}</h1>
            <span className="followers">{`${artistInfo?.followers.total} followers`}</span>
          </div>
        </div>
        <h2>Popular songs</h2>
        <div className="topTracksList">
          {topTracks?.map((track) => (
            <ArtistTopTrack
              topTrackInfo={track}
              fallback={albumCoverFallback}
              key={track.id}
            />
          ))}
        </div>
        <h2>Albums</h2>
        <div className="albumsList">
          {artistAlbums?.items.map((album) => (
            <ArtistAlbums
              artistAlbum={album}
              fallback={albumCoverFallback}
              key={album.id}
            />
          ))}
        </div>
        <h2>Singles</h2>
        <div className="singlesList">
          {artistAlbums?.items.map((single) => (
            <ArtistSingle
              artistSingle={single}
              fallback={albumCoverFallback}
              key={single.id}
            />
          ))}
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
