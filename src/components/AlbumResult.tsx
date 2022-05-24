import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
  albumData: SimplifiedAlbum;
}

const RenderAlbumCover: FunctionComponent<Props> = function (props) {
  if (props.albumData.images.length) {
    return (
      <img
        className="albumPicture"
        src={props.albumData.images.at(1)?.url}
        alt={`${props.albumData.name} album cover`}
      />
    );
  }
  return (
    <img
      src="https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png"
      alt={`${props.albumData.name} album cover`}
      className="albumPicture"
    />
  );
};

const AlbumResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="albumContainer">
      <div className="albumPictureContainer">{RenderAlbumCover(props)}</div>
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
