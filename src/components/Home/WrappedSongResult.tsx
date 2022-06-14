import { LayoutContext } from "../../routes/FooterLayout";
import SongResult from "../../components/Home/SongResult"
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { FunctionComponent } from "react";

type SongResultProps = {
    songData: Track;
    fallback: string;
}

const WrappedSongHome: FunctionComponent<SongResultProps> = function (props) {
    return (
        <LayoutContext.Consumer>
            {({ playSongHandler }) => <SongResult playSongHandler={playSongHandler} fallback={props.fallback} songData={props.songData} />}
        </LayoutContext.Consumer>
    )
}

export default WrappedSongHome;