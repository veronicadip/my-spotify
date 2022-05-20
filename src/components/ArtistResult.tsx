import { FunctionComponent } from "react";
import { Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";

interface Props {
    artistData: Artist;
}

const ArtistResult: FunctionComponent<Props> = function (props) {
    return (
        <div className="artistContainer">
            <img src={props.artistData.images.at(1)?.url} alt={`${props.artistData.name} profile picture`} className="artistPicture" />
            <p className="artistName">{props.artistData.name}</p>
        </div>
    )
}

export default ArtistResult;
