import { useEffect, useState, FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import { Artist, Track, Album } from "spotify-web-api-ts/types/types/SpotifyObjects";
import SearchAppBar from "../components/TopOfPage";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ImageWithFallback from "../components/ImageWithFallback";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container"
import "../styles/SongHome.css"

type SongHomeParams = {
  artistId: string;
  albumId: string;
  songId: string;

};

type SongHomeProps = {
  playSongHandler: (url: string | undefined) => void
}

const SongHome: FunctionComponent<SongHomeProps> = ({ playSongHandler }) => {
  const { artistId, albumId, songId } = useParams() as SongHomeParams;
  const [songInfo, setSongInfo] = useState<Track>();
  const [isLoadingSong, setIsLoadingSong] = useState(true);
  const [songError, setSongError] = useState(false);
  const [songArtist, setSongArtist] = useState<Artist>();
  const [isLoadingArtist, setIsLoadingArtist] = useState(true);
  const [artistError, setArtistError] = useState(false);
  const [songAlbum, setSongAlbum] = useState<Album>();
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(true);
  const [albumError, setAlbumError] = useState(false);
  const songUrl = songAlbum?.tracks.items.find((song) => song.id === songInfo?.id)?.preview_url

  const albumCoverFallback =
    "https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png";
  const artistPictureFallback =
    "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021";

  var spotifyApi = new SpotifyWebApi();
  const accessToken = currentAccessToken;
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.tracks
      .getTrack(songId)
      .then((response) => {
        setSongInfo(response);
        setIsLoadingSong(false);
      })
      .catch(() => {
        setSongError(true);
        setIsLoadingSong(false);
      });
    spotifyApi.artists.getArtist(artistId)
      .then((response) => {
        setSongArtist(response);
        setIsLoadingArtist(false);
      })
      .catch(() => {
        setArtistError(true);
        setIsLoadingArtist(false);
      })
    spotifyApi.albums.getAlbum(albumId)
      .then((response) => {
        setSongAlbum(response);
        setIsLoadingAlbum(false);
      })
      .catch(() => {
        setAlbumError(true);
        setIsLoadingAlbum(false);
      })
  }, []);

  const onSongPlaying = (event: React.MouseEvent) => {
    event.preventDefault()
    playSongHandler(songUrl)
  }

  const renderButton = () => {
    if (songUrl) {
      return <Button variant="contained" color="secondary" onClick={onSongPlaying} size="large">Play</Button>
    }
    return <Typography variant="subtitle1">This song isn‘t available</Typography>
  }

  const renderSongHome = () => {
    if (isLoadingSong || isLoadingArtist || isLoadingAlbum) {
      return (
        <div className="loadingContainer">
          <CircularProgress color="inherit" className="circularProgress" />
        </div>
      )
    }
    if (songError || artistError || albumError) {
      return (
        <div>
          <Alert severity="error" className="errorMessage">
            There was an error loading the data, please try again.
          </Alert>
        </div>
      )
    }
    return (
      <div>
        <Box display="flex" mt={8}>
          <ImageWithFallback
            src={songInfo?.album.images.at(1)?.url}
            fallback={albumCoverFallback}
            alt={`${songInfo?.album.name} album cover`}
            imagesArray={songInfo?.album.images.length}
          />
          <Box>
            <Typography variant="h3" ml={10} mt={4} fontWeight="bold">{songInfo?.name}</Typography>
            <Box ml={10} mt={10}>
              {renderButton()}
            </Box>
          </Box>
        </Box>

        <Typography variant="subtitle1" mt={3}>
          <Link to={`/artist/${artistId}/album/${albumId}`}>More of: {songInfo?.album.name}</Link>
        </Typography>
        <Grid container m={6} ml={0}>
          <ImageWithFallback
            src={songArtist?.images.at(2)?.url}
            fallback={artistPictureFallback}
            alt={`${songArtist?.name} profile picture`}
            imagesArray={songArtist?.images.length}
            className="artistProfilePictureSH" />
          <Typography variant="h5" fontWeight="bold" mt={4} ml={3}>
            <Link to={`/artist/${artistId}`}>
              {songInfo?.artists.at(0)?.name}
            </Link>
          </Typography>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <SearchAppBar />
      <div>
        <Container maxWidth="xl">
          {renderSongHome()}
        </Container>
      </div>
    </div>
  );
}

export default SongHome;
