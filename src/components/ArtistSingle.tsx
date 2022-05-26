import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
  artistSingle: SimplifiedAlbum;
  fallback: string;
}

const ArtistSingle: FunctionComponent<Props> = function (props) {
  if (
    props.artistSingle.album_type === "single" &&
    props.artistSingle.album_group === "single"
  ) {
    return (
      <div className="artistSingle">
        <ImageWithFallback
          src={props.artistSingle.images.at(1)?.url}
          fallback={props.fallback}
          alt={`${props.artistSingle.name} single cover`}
          className="singleCover"
          imagesArray={props.artistSingle.images.length}
        />
        <span className="singleName">{props.artistSingle.name}</span>
      </div>
    );
  }
  return null;
};

export default ArtistSingle;
