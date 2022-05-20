import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
  albumData: SimplifiedAlbum;
}

const AlbumResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="albumContainer">
      <div className="albumPictureContainer">
        <img
          className="albumPicture"
          src={props.albumData.images.at(1)?.url}
          alt={`${props.albumData.name} album cover`}
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
