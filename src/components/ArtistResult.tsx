import { FunctionComponent } from "react";
import { Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { Link } from "react-router-dom";

interface Props {
  artistData: Artist;
  src: string | undefined;
  fallback: string;
}

const ImageWithFallback: FunctionComponent<Props> = function (props) {
  if (props.artistData.images.length) {
    return (
      <img
        src={props.src}
        alt={`${props.artistData.name} profile picture`}
        className="artistPicture"
      />
    );
  }
  return (
    <img
      src={props.fallback}
      alt={`${props.artistData.name} profile picture`}
      className="artistPicture"
    />
  );
};
const ArtistResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="artistContainer">
      {ImageWithFallback(props)}
      <Link className="artistName" to={`/artist/${props.artistData.id}`}>
        {props.artistData.name}
      </Link>
    </div>
  );
};

export default ArtistResult;
