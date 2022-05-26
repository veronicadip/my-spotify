import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js"


interface Props {
    artistAlbum: SimplifiedAlbum
}

const ArtistAlbums: FunctionComponent<Props> = function (props) {
    const renderAlbumCover = () => {
        if (props.artistAlbum.images.length) {
            return <img src={props.artistAlbum.images.at(1)?.url} alt={`${props.artistAlbum.name} album cover`} />
        }
        return <img src="https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png" alt={`${props.artistAlbum.name} album cover`} />
    }
    if (props.artistAlbum.album_type === "album" && props.artistAlbum.album_group === "album") {
        return (
            <div className="artistAlbum">
                {renderAlbumCover()}
                <span>{props.artistAlbum.name}</span>
            </div>
        )
    }
    return null

}

export default ArtistAlbums;