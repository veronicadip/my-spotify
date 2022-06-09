import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "../ImageWithFallback";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';


interface Props {
  songData: Track;
  fallback: string;
}

const SongResult: FunctionComponent<Props> = function (props) {
  return (
    <Grid container>
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
      </div>
    </Grid>


  );
};

export default SongResult;
