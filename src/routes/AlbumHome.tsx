import React, { useEffect, useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import SearchAppBar from "../components/TopOfPage";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Album, Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "../components/ImageWithFallback";
import AlbumSongs from "../components/AlbumHome/AlbumSongs";
import { GetArtistAlbumsResponse } from "spotify-web-api-ts/types/types/SpotifyResponses.js";
import ArtistAlbums from "../components/AlbumHome/ArtistAlbums";
import { Link } from "react-router-dom";

type AlbumHomeParams = {
  artistId: string;
  albumId: string;
};

function AlbumHome() {
  const { artistId, albumId } = useParams() as AlbumHomeParams;
  const [albumInfo, setAlbumInfo] = useState<Album>();
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(true);
  const [albumError, setAlbumError] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState<GetArtistAlbumsResponse>();
  const [loadingArtistAlbums, setLoadingArtistAlbums] = useState(true);
  const [artistAlbumsError, setArtistAlbumsError] = useState(false);
  const [artistInfo, setArtistInfo] = useState<Artist>();
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [artistError, setArtistError] = useState(false);
  const albumCoverFallback =
    "https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png";
  const artistPictureFallback =
    "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021";

  var spotifyApi = new SpotifyWebApi();
  const accessToken = currentAccessToken;
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.albums
      .getAlbum(albumId)
      .then((response) => {
        setAlbumInfo(response);
        setIsLoadingAlbum(false);
      })
      .catch(() => {
        setIsLoadingAlbum(false);
        setAlbumError(true);
      });
    spotifyApi.artists
      .getArtistAlbums(artistId, { country: "AR" })
      .then((response) => {
        setArtistAlbums(response);
        setLoadingArtistAlbums(false);
      })
      .catch(() => {
        setArtistAlbumsError(true);
        setLoadingArtistAlbums(false);
      });
    spotifyApi.artists
      .getArtist(artistId)
      .then((response) => {
        setArtistInfo(response);
        setLoadingArtist(false);
      })
      .catch(() => {
        setArtistError(true);
        setLoadingArtist(false);
      });
  }, []);

  const renderAlbumHome = () => {
    if (isLoadingAlbum) {
      return (
        <div className="loadingContainer">
          <CircularProgress color="inherit" className="circularProgress" />
        </div>
      );
    }
    if (albumError) {
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
        <div>
          <ImageWithFallback
            src={albumInfo?.images.at(1)?.url}
            fallback={albumCoverFallback}
            alt={`${albumInfo?.name} album cover`}
            className="albumCoverHome"
            imagesArray={albumInfo?.images.length}
          />
          <h1>{albumInfo?.name}</h1>
        </div>
        <div>
          {albumInfo?.tracks.items.map((song) => (
            <AlbumSongs songAlbum={song} key={song.id} />
          ))}
        </div>
        <div>
          <ImageWithFallback
            src={artistInfo?.images.at(2)?.url}
            fallback={artistPictureFallback}
            alt={`${artistInfo?.name} profile picture`}
            imagesArray={artistInfo?.images.length}
          />
          <Link to={`/artist/${artistId}`}>{artistInfo?.name}</Link>
        </div>
        <h2>{`More albums by ${albumInfo?.artists.at(0)?.name}`}</h2>
        <div>
          {artistAlbums?.items.map((album) => (
            <ArtistAlbums
              artistAlbum={album}
              key={album.id}
              albumCoverFallback={albumCoverFallback}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <SearchAppBar />
      {renderAlbumHome()}
    </div>
  );
}

export default AlbumHome;
