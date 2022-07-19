import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js";
import ImageWithFallback from "../ImageWithFallback";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

interface Props {
  artistAlbum: SimplifiedAlbum;
  fallback: string;
}

const ArtistAlbums: FunctionComponent<Props> = function (props) {
  if (
    props.artistAlbum.album_type === "album" &&
    props.artistAlbum.album_group === "album"
  ) {
    return (
      <Grid item p={5} m={3} ml={0} maxWidth={270}>
        <ImageWithFallback
          src={props.artistAlbum.images.at(1)?.url}
          fallback={props.fallback}
          alt={`${props.artistAlbum.name} album cover`}
          className="albumCover"
          imagesArray={props.artistAlbum.images.length}
        />
        <Typography variant="subtitle1" mt={1}>
          <Link to={`/artist/${props.artistAlbum.artists.at(0)?.id}/album/${props.artistAlbum.id}`}>
            {props.artistAlbum.name}
          </Link>
        </Typography>
      </Grid>
    );
  }
  return null;
};

export default ArtistAlbums;
