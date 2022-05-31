import React, { useEffect, useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import SearchAppBar from "../components/TopOfPage";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Album } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { GetAlbumsResponse } from "spotify-web-api-ts/types/types/SpotifyResponses.js"

type AlbumHomeParams = {
  artistId: string;
  albumId: string;
}

function AlbumHome() {
  const params = useParams() as AlbumHomeParams;
  const artistId = params.artistId;
  const albumId = params.albumId;
  const [albumInfo, setAlbumInfo] = useState<GetAlbumsResponse>();
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(true);
  const [albumError, setAlbumError] = useState(false);
  const albumCoverFallback =
    "https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png";

  var spotifyApi = new SpotifyWebApi();
  const accessToken = currentAccessToken;
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.albums.getAlbum(albumId)
      .then((response) => {
        setAlbumInfo(response),
          console.log(response),
          setIsLoadingAlbum(false)
      })
      .catch(() => {
        setIsLoadingAlbum(false)
        setAlbumError(true)
      })
  })

  return (
    <div>
      <SearchAppBar />
      <h1>{albumInfo}</h1>

    </div>
  );
}

export default AlbumHome;
