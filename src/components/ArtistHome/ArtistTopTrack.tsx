import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "../ImageWithFallback";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Props {
  topTrackInfo: Track;
  fallback: string;
}

const ArtistTopTrack: FunctionComponent<Props> = function (props) {
  return (
    <Grid container mt={4}>
      <ImageWithFallback
        src={props.topTrackInfo.album.images.at(2)?.url}
        fallback={props.fallback}
        alt={`${props.topTrackInfo.name} album cover`}
        className="topTrackCover"
        imagesArray={props.topTrackInfo.album.images.length}
      />
      <Typography ml={2} mt={1} variant="subtitle1">{props.topTrackInfo.name}</Typography>
    </Grid>
  );
};

export default ArtistTopTrack;
