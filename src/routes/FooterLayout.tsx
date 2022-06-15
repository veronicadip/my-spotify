import React from "react";
import { Outlet } from "react-router-dom";
import { FunctionComponent, useState, ReactNode } from "react";
import Box from '@mui/material/Box';

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
            <Box display="flex" justifyContent="center" mt={10}>
                <audio controls autoPlay src={songPlaying}></audio>
            </Box>
        </div>

    )
}