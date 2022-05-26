import { FunctionComponent } from "react";
import { SimplifiedAlbum } from "spotify-web-api-ts/types/types/SpotifyObjects.js"


interface Props {
    artistSingle: SimplifiedAlbum
}

const ArtistSingle: FunctionComponent<Props> = function (props) {
    const renderSingleCover = () => {
        if (props.artistSingle.images.length) {
            return <img src={props.artistSingle.images.at(1)?.url} alt={`${props.artistSingle.name} single cover`} />
        }
        return <img src="https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png" alt={`${props.artistSingle.name} single cover`} />
    }
    if (props.artistSingle.album_type === "single" && props.artistSingle.album_group === "single") {
        return (
            <div className="artistSingle">
                {renderSingleCover()}
                <span>{props.artistSingle.name}</span>
            </div>
        )
    }
    return null

}

export default ArtistSingle;