import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
  songData: Track;
  fallback: string;
}

const SongResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="songContainer">
      <ImageWithFallback
        src={props.songData.album.images.at(2)?.url}
        fallback={props.fallback}
        alt={`${props.songData.name} cover`}
        className="songCover"
        imagesArray={props.songData.album.images.length}
      />
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
