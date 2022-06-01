import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js";
import ImageWithFallback from "../ImageWithFallback";

interface Props {
  artistAlbum: SimplifiedAlbum;
  fallback: string;
}

const ArtistAlbums: FunctionComponent<Props> = function (props) {
  if (
    props.artistAlbum.album_type === "album" &&
    props.artistAlbum.album_group === "album"
  ) {
    return (
      <div className="artistAlbum">
        <ImageWithFallback
          src={props.artistAlbum.images.at(1)?.url}
          fallback={props.fallback}
          alt={`${props.artistAlbum.name} album cover`}
          className="albumCover"
          imagesArray={props.artistAlbum.images.length}
        />
        <span className="artistAlbumName">{props.artistAlbum.name}</span>
      </div>
    );
  }
  return null;
};

export default ArtistAlbums;
