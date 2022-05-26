import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
  topTrackInfo: Track;
  src: string | undefined;
  fallback: string;
}

const ImageWithFallback: FunctionComponent<Props> = function (props) {
  if (props.topTrackInfo.album.images.length) {
    return (
      <img
        src={props.src}
        alt={`${props.topTrackInfo.name} album cover`}
        className="topTrackCover"
      />
    );
  }
  return (
    <img
      src={props.fallback}
      alt={`${props.topTrackInfo.name} album cover`}
      className="topTrackCover"
    />
  );
};

const ArtistTopTrack: FunctionComponent<Props> = function (props) {
  return (
    <div className="trackContainer">
      {ImageWithFallback(props)}
      <span className="trackName">{props.topTrackInfo.name}</span>
    </div>
  );
};

export default ArtistTopTrack;
