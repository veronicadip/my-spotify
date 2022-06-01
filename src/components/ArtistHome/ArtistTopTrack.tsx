import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import ImageWithFallback from "../ImageWithFallback";

interface Props {
  topTrackInfo: Track;
  fallback: string;
}

const ArtistTopTrack: FunctionComponent<Props> = function (props) {
  return (
    <div className="trackContainer">
      <ImageWithFallback
        src={props.topTrackInfo.album.images.at(2)?.url}
        fallback={props.fallback}
        alt={`${props.topTrackInfo.name} album cover`}
        className="topTrackCover"
        imagesArray={props.topTrackInfo.album.images.length}
      />
      <span className="trackName">{props.topTrackInfo.name}</span>
    </div>
  );
};

export default ArtistTopTrack;
