import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "../ImageWithFallback";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Props {
  songData: Track;
  fallback: string;
}

const SongResult: FunctionComponent<Props> = function (props) {
  return (
    <Grid container mt={4}>
      <ImageWithFallback
        src={props.songData.album.images.at(2)?.url}
        fallback={props.fallback}
        alt={`${props.songData.name} cover`}
        className="songCover"
        imagesArray={props.songData.album.images.length}
      />
      <Grid item ml={1.5} mt={1}>
        <Link
          to={`/artist/${props.songData.artists.at(0)?.id}/album/${props.songData.album.id
            }/song/${props.songData.id}`}
        >
          {props.songData.name}
        </Link>
        <Typography variant="subtitle2" gutterBottom mt={0.5}>
          {props.songData.artists.map((artist) => artist.name).join(", ")}
        </Typography>
      </Grid>
    </Grid>


  );
};

export default SongResult;
