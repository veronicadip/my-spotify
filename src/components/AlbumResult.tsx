import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
  albumData: SimplifiedAlbum;
  fallback: string;
}

const AlbumResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="albumContainer">
      <div className="albumPictureContainer">
        <ImageWithFallback
          src={props.albumData.images.at(1)?.url}
          fallback={props.fallback}
          alt={`${props.albumData.name} album cover`}
          className="albumPicture"
          imagesArray={props.albumData.images.length}
        />
      </div>
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
