import React from "react";
import { Outlet } from "react-router-dom";
import { FunctionComponent, useState } from "react"

export const LayoutContext = React.createContext({ setSongPlaying: (url: string) => { } })

export const Layout: FunctionComponent = ({ children }) => {
    const [songPlaying, setSongPlaying] = useState<string | undefined>();
    const playSongHandler = (song: string) => {
        setSongPlaying(song)
    }
    

    return (
        <div>
            <Outlet />
            <LayoutContext.Provider value={{ setSongPlaying: playSongHandler }}>
                {children}
            </LayoutContext.Provider>
        </div>

    )
}

// export const LayoutContext = React.createContext({ setSongUrl: (url: string) => {} })

// export const Layout: FunctionComponent = ({children}) => {
//   const [songUrl, setSongUrl] = useState('')
//   const onSongSelected = (song: string) => {
//     setSongUrl(song)
//   }

//   return (
//     <Header />
//       <LayoutContext.Provider value={{ setSongUrl: onSongSelected }}>
//         {children}
//       </LayoutContext>
//     <Footer />
//   )
// }

// function FooterLayout() {
//     return (
//         <div>
//             <Outlet />
//             <audio controls src="https://p.scdn.co/mp3-preview/c871f7a3b36ad708640a833fbf7a0b9e84c5b688?cid=e26e4e3168be4fc3b9a9c766601fa05a"></audio>
//         </div>
//     )
// }

// export default FooterLayout;