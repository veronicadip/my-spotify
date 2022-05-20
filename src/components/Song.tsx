import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
  songData: Track;
}

const Song: FunctionComponent<Props> = function (props) {
  return (
    <div className="songContainer">
      <img className="songCover" src={props.songData.album.images.at(2)?.url} />
      <div className="songInfo">
        <p className="songName">{props.songData.name}</p>
        <p className="songArtist">{props.songData.artists.map((artist) => artist.name).join(", ")}</p>
      </div>
    </div>
  );
};

export default Song;
