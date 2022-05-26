import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js";

interface Props {
  artistAlbum: SimplifiedAlbum;
  src: string | undefined;
  fallback: string;
}

const ImageWithFallback: FunctionComponent<Props> = function (props) {
  if (props.artistAlbum.images.length) {
    return (
      <img
        src={props.src}
        alt={`${props.artistAlbum.name} album cover`}
        className="albumCover"
      />
    );
  }
  return (
    <img
      src={props.fallback}
      alt={`${props.artistAlbum.name} album cover`}
      className="albumCover"
    />
  );
};

const ArtistAlbums: FunctionComponent<Props> = function (props) {
  if (
    props.artistAlbum.album_type === "album" &&
    props.artistAlbum.album_group === "album"
  ) {
    return (
      <div className="artistAlbum">
        {ImageWithFallback(props)}
        <span className="artistAlbumName">{props.artistAlbum.name}</span>
      </div>
    );
  }
  return null;
};

export default ArtistAlbums;
