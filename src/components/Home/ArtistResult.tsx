import { FunctionComponent } from "react";
import { Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { Link } from "react-router-dom";
import ImageWithFallback from "../ImageWithFallback";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


interface Props {
  artistData: Artist;
  fallback: string;
}

const ArtistResult: FunctionComponent<Props> = function (props) {
  return (
    <Grid item mr={2} p={1} maxWidth={270}>
      <ImageWithFallback
        src={props.artistData.images.at(1)?.url}
        fallback={props.fallback}
        alt={`${props.artistData.name} profile picture`}
        className="artistPicture"
        imagesArray={props.artistData.images.length}
      />
      <Link to={`/artist/${props.artistData.id}`}>
        <Typography variant="subtitle1" align="center" fontWeight="bold">{props.artistData.name}</Typography>
      </Link>
    </Grid>
  );
};

export default ArtistResult;