import { FunctionComponent } from "react";
import { Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { Link } from "react-router-dom";
import ImageWithFallback from "../ImageWithFallback";

interface Props {
  artistData: Artist;
  fallback: string;
}

const ArtistResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="artistContainer">
      <ImageWithFallback
        src={props.artistData.images.at(1)?.url}
        fallback={props.fallback}
        alt={`${props.artistData.name} profile picture`}
        className="artistPicture"
        imagesArray={props.artistData.images.length}
      />
      <Link className="artistName" to={`/artist/${props.artistData.id}`}>
        {props.artistData.name}
      </Link>
    </div>
  );
};

export default ArtistResult;
