import { FunctionComponent, useEffect } from "react";
import { SimplifiedTrack } from "spotify-web-api-ts/types/types/SpotifyObjects.js";

interface Props {
  songAlbum: SimplifiedTrack;
}

const AlbumSongs: FunctionComponent<Props> = function (props) {
  const date = new Date(props.songAlbum.duration_ms);
  const renderSongDuration = () => {
    if (date.getSeconds().toString().length === 1) {
      return <span>{date.getMinutes() + ":" + "0" + date.getSeconds()}</span>;
    }
    return <span>{date.getMinutes() + ":" + date.getSeconds()}</span>;
  };

  return (
    <div>
      <span>{`${props.songAlbum.track_number}. ${props.songAlbum.name}`}</span>
      {renderSongDuration()}
    </div>
  );
};

export default AlbumSongs;
