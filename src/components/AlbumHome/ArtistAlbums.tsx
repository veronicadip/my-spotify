import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js";
import ImageWithFallback from "../ImageWithFallback";

interface Props {
  artistAlbum: SimplifiedAlbum;
  albumCoverFallback: string;
}

const ArtistAlbums: FunctionComponent<Props> = function (props) {
  if (
    props.artistAlbum.album_type === "album" &&
    props.artistAlbum.album_group === "album"
  ) {
    return (
      <div>
        <ImageWithFallback
          src={props.artistAlbum.images.at(1)?.url}
          fallback={props.albumCoverFallback}
          alt={`${props.artistAlbum.name} album cover`}
          imagesArray={props.artistAlbum.images.length}
        />
        <span>{props.artistAlbum.name}</span>
      </div>
    );
  }
  return null;
};

export default ArtistAlbums;
