import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js";
import ImageWithFallback from "../ImageWithFallback";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface Props {
  artistAlbum: SimplifiedAlbum;
  albumCoverFallback: string;
}

const ArtistAlbums: FunctionComponent<Props> = function (props) {
  if (
    props.artistAlbum.album_type === "album" &&
    props.artistAlbum.album_group === "album"
  ) {
    return (
      <Grid item m={5} maxWidth={270}>
        <ImageWithFallback
          src={props.artistAlbum.images.at(1)?.url}
          fallback={props.albumCoverFallback}
          alt={`${props.artistAlbum.name} album cover`}
          imagesArray={props.artistAlbum.images.length}
          className="albumCover"
        />
        <Typography variant="subtitle1" mt={1} fontWeight="bold">{props.artistAlbum.name}</Typography>
      </Grid>
    );
  }
  return null;
};

export default ArtistAlbums;
