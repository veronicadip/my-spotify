import { FunctionComponent } from "react";
import { Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { Link } from "react-router-dom";

interface Props {
  artistData: Artist;
}

const RenderProfilePicture: FunctionComponent<Props> = function (props) {
  if (props.artistData.images.length) {
    return (
      <img
        src={props.artistData.images.at(1)?.url}
        alt={`${props.artistData.name} profile picture`}
        className="artistPicture"
      />
    );
  }
  return (
    <img
      src="https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"
      alt={`${props.artistData.name} profile picture`}
      className="artistPicture"
    />
  );
};
const ArtistResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="artistContainer">
      {RenderProfilePicture(props)}
      <Link className="artistName" to={`/artist/${props.artistData.id}`}>
        {props.artistData.name}
      </Link>
    </div>
  );
};

export default ArtistResult;
