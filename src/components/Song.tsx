import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
  songData: Track;
}

const Song: FunctionComponent<Props> = function (props) {
  return (
    <div>
      <span>{props.songData.name}</span>
    </div>
  );
};

export default Song;
