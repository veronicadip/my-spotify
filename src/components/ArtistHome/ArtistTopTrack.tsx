import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "../ImageWithFallback";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

interface Props {
  topTrackInfo: Track;
  fallback: string;
}

const ArtistTopTrack: FunctionComponent<Props> = function (props) {
  return (
    <Grid container mt={3}>
      <ImageWithFallback
        src={props.topTrackInfo.album.images.at(2)?.url}
        fallback={props.fallback}
        alt={`${props.topTrackInfo.name} album cover`}
        className="topTrackCover"
        imagesArray={props.topTrackInfo.album.images.length}
      />
      <Typography ml={2} mt={1} variant="subtitle1">
        <Link to={`/artist/${props.topTrackInfo.artists.at(0)?.id}/album/${props.topTrackInfo.album.id}/song/${props.topTrackInfo.id}`}>
          {props.topTrackInfo.name}
        </Link>
      </Typography>
    </Grid>
  );
};

export default ArtistTopTrack;
