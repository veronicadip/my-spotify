import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
  albumData: SimplifiedAlbum;
  src: string | undefined;
  fallback: string;
}

const ImageWithFallback: FunctionComponent<Props> = function (props) {
  if (props.albumData.images.length) {
    return (
      <img
        className="albumPicture"
        src={props.src}
        alt={`${props.albumData.name} album cover`}
      />
    );
  }
  return (
    <img
      src={props.fallback}
      alt={`${props.albumData.name} album cover`}
      className="albumPicture"
    />
  );
};

const AlbumResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="albumContainer">
      <div className="albumPictureContainer">{ImageWithFallback(props)}</div>
      <div className="albumInfo">
        <p className="albumName">{props.albumData.name}</p>
        <p className="albumArtist">
          {props.albumData.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default AlbumResult;
