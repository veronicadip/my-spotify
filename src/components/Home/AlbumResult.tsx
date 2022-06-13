import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "../ImageWithFallback";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



interface Props {
  albumData: SimplifiedAlbum;
  fallback: string;
}

const AlbumResult: FunctionComponent<Props> = function (props) {
  return (
    <Grid item mr={2} p={3} maxWidth={270}>
      <ImageWithFallback
        src={props.albumData.images.at(1)?.url}
        fallback={props.fallback}
        alt={`${props.albumData.name} album cover`}
        className="albumPicture"
        imagesArray={props.albumData.images.length}
      />
      <Box>
        <Link
          to={`/artist/${props.albumData.artists.at(0)?.id}/album/${props.albumData.id
            }`}
        >
          <Typography variant="subtitle1" fontWeight="bold">{props.albumData.name}</Typography>
        </Link>
        <Typography variant="subtitle2" mt={0.5}>
          {props.albumData.artists.map((artist) => artist.name).join(", ")}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AlbumResult;
