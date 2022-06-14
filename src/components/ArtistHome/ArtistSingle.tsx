import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js";
import ImageWithFallback from "../ImageWithFallback";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface Props {
  artistSingle: SimplifiedAlbum;
  fallback: string;
}

const ArtistSingle: FunctionComponent<Props> = function (props) {
  if (
    props.artistSingle.album_type === "single" &&
    props.artistSingle.album_group === "single"
  ) {
    return (
      <Grid item p={5} m={3} ml={0} maxWidth={270}>
        <ImageWithFallback
          src={props.artistSingle.images.at(1)?.url}
          fallback={props.fallback}
          alt={`${props.artistSingle.name} single cover`}
          className="singleCover"
          imagesArray={props.artistSingle.images.length}
        />
        <Typography variant="subtitle1" mt={1}>{props.artistSingle.name}</Typography>
      </Grid>
    );
  }
  return null;
};

export default ArtistSingle;
