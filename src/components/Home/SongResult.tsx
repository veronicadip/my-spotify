import { FunctionComponent, useEffect, useState } from "react";
import ImageWithFallback from "../ImageWithFallback";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../../lib/accessToken";
import { Track, Album } from "spotify-web-api-ts/types/types/SpotifyObjects";
import Typography from '@mui/material/Typography';

interface Props {
  songData: Track;
  fallback: string;
  playSongHandler: (url: string | undefined) => void
}

const SongResult: FunctionComponent<Props> = function (props) {
  const albumId = props.songData.album.id
  const songId = props.songData.id
  const [songAlbum, setSongAlbum] = useState<Album>();
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(true);
  const [albumError, setAlbumError] = useState(false);
  const songUrl = songAlbum?.tracks.items.find((song) => song.id === songId)?.preview_url

  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(currentAccessToken);

  useEffect(() => {
    spotifyApi.albums.getAlbum(albumId)
      .then((response) => {
        setSongAlbum(response);
        setIsLoadingAlbum(false);
      })
      .catch(() => {
        setAlbumError(true);
        setIsLoadingAlbum(false);
      })
  }, [])

  const onSongPlaying = (event: React.MouseEvent) => {
    event.preventDefault()
    props.playSongHandler(songUrl)
  }

  const renderButton = () => {
    if (songUrl) {
      return <Button variant="contained" color="secondary" onClick={onSongPlaying} size="small">Play</Button>
    }
    return <Typography variant="subtitle2">This song isn‘t available</Typography>
  }

  return (
    <div className="songContainer">
      <ImageWithFallback
        src={props.songData.album.images.at(2)?.url}
        fallback={props.fallback}
        alt={`${props.songData.name} cover`}
        className="songCover"
        imagesArray={props.songData.album.images.length}
      />
      <div className="songInfo">
        <Link
          to={`/artist/${props.songData.artists.at(0)?.id}/album/${props.songData.album.id
            }/song/${props.songData.id}`}
        >
          {props.songData.name}
        </Link>
        <p className="songArtist">
          {props.songData.artists.map((artist) => artist.name).join(", ")}
        </p>
        {renderButton()}
      </div>
    </div>
  );
};

export default SongResult;
