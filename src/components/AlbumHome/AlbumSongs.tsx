import { FunctionComponent } from "react";
import { SimplifiedTrack } from "spotify-web-api-ts/types/types/SpotifyObjects.js";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface Props {
  songAlbum: SimplifiedTrack;
}

const AlbumSongs: FunctionComponent<Props> = function (props) {
  const date = new Date(props.songAlbum.duration_ms);
  const renderSongDuration = () => {
    if (date.getSeconds().toString().length === 1) {
      return <Typography variant="subtitle1">{date.getMinutes() + ":" + "0" + date.getSeconds()}</Typography>;
    }
    return <Typography variant="subtitle1">{date.getMinutes() + ":" + date.getSeconds()}</Typography>;
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" width={1000} m={0.5}>
        <Typography variant="subtitle1">{`${props.songAlbum.track_number}. ${props.songAlbum.name}`}</Typography>
        {renderSongDuration()}
      </Box>
    </div>
  );
};

export default AlbumSongs;
