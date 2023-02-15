import { LayoutContext } from "./FooterLayout";
import ArtistHome from "./ArtistHome";


const WrappedArtistHome = () => {
    return (
        <LayoutContext.Consumer>
            {({ playSongHandler }) => <ArtistHome playSongHandler={playSongHandler} />}
        </LayoutContext.Consumer>
    )
}

export default WrappedArtistHome;