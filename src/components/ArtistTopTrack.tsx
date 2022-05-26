import { FunctionComponent } from "react";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";


interface Props {
    topTrackInfo: Track;
}

const ArtistTopTrack: FunctionComponent<Props> = function (props) {
    const renderTrackCover = () => {
        if (props.topTrackInfo.album.images.length) {
            return <img src={props.topTrackInfo.album.images.at(2)?.url} alt={`${props.topTrackInfo.name} album cover`} className="topTrackCover" />
        }
        return <img src="https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png" alt={`${props.topTrackInfo.name} album cover`} className="topTrackCover" />
    }
    return (
        <div className="trackContainer">
            {renderTrackCover()}
            <span className="trackName">{props.topTrackInfo.name}</span>
        </div>
    )
}


export default ArtistTopTrack;