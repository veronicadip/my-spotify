import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
  songData: Track;
  src: string | undefined;
  fallback: string;
}

const ImageWithFallback: FunctionComponent<Props> = function (props) {
  if (props.songData.album.images.length) {
    return (
      <img
        className="songCover"
        src={props.src}
        alt={`${props.songData.name} cover`}
      />
    );
  }
  return (
    <img
      className="songCover"
      src={props.fallback}
      alt={`${props.songData.name} cover`}
    />
  );
};

const SongResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="songContainer">
      {ImageWithFallback(props)}
      <div className="songInfo">
        <p className="songName">{props.songData.name}</p>
        <p className="songArtist">
          {props.songData.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default SongResult;
