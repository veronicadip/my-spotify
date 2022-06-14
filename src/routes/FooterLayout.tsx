import React from "react";
import { Outlet } from "react-router-dom";
import { FunctionComponent, useState, ReactNode } from "react"

interface LayoutProps {
    children?: ReactNode
}
export const LayoutContext = React.createContext({ playSongHandler: (url: string | undefined) => { } })


export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    const [songPlaying, setSongPlaying] = useState<string | undefined>();
    const playSongHandler = (song: string | undefined) => {
        setSongPlaying(song)
    }

    return (
        <div>
            <LayoutContext.Provider value={{ playSongHandler }}>
                <Outlet />
            </LayoutContext.Provider>
            <audio controls autoPlay src={songPlaying}></audio>
        </div>

    )
}