import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js";

interface Props {
  artistSingle: SimplifiedAlbum;
  src: string | undefined;
  fallback: string;
}

const ImageWithFallback: FunctionComponent<Props> = function (props) {
  if (props.artistSingle.images.length) {
    return (
      <img
        src={props.src}
        alt={`${props.artistSingle.name} single cover`}
        className="singleCover"
      />
    );
  }
  return (
    <img
      src={props.fallback}
      alt={`${props.artistSingle.name} single cover`}
      className="singleCover"
    />
  );
};

const ArtistSingle: FunctionComponent<Props> = function (props) {
  if (
    props.artistSingle.album_type === "single" &&
    props.artistSingle.album_group === "single"
  ) {
    return (
      <div className="artistSingle">
        {ImageWithFallback(props)}
        <span className="singleName">{props.artistSingle.name}</span>
      </div>
    );
  }
  return null;
};

export default ArtistSingle;
