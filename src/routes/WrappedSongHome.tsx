import { LayoutContext } from "./FooterLayout";
import SongHome from "./SongHome"

  
const WrappedSongHome = () => {
    return (
      <LayoutContext.Consumer>
        {({ playSongHandler }) => <SongHome playSongHandler={playSongHandler} />}
      </LayoutContext.Consumer>
    )
  }

export default WrappedSongHome