import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
  songData: Track;
}

const RenderSongCover: FunctionComponent<Props> = function (props) {
  if (props.songData.album.images.length) {
    return (
      <img
        className="songCover"
        src={props.songData.album.images.at(2)?.url}
        alt={`${props.songData.name} cover`}
      />
    );
  }
  return (
    <img
      className="songCover"
      src="https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png"
      alt={`${props.songData.name} cover`}
    />
  );
};

const SongResult: FunctionComponent<Props> = function (props) {
  return (
    <div className="songContainer">
      {RenderSongCover(props)}
      <div className="songInfo">
        <p className="songName">{props.songData.name}</p>
        <p className="songArtist">
          {props.songData.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default SongResult;
