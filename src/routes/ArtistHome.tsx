import { FunctionComponent, useEffect, useState } from "react";
import { SpotifyWebApi } from "spotify-web-api-ts";
import currentAccessToken from "../lib/accessToken";
import { Artist, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { GetArtistAlbumsResponse } from "spotify-web-api-ts/types/types/SpotifyResponses.js";
import SearchAppBar from "../components/TopOfPage";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ArtistTopTrack from "../components/ArtistHome/ArtistTopTrack";
import "../styles/ArtistHome.css";
import ArtistAlbums from "../components/ArtistHome/ArtistAlbums";
import ArtistSingle from "../components/ArtistHome/ArtistSingle";
import ImageWithFallback from "../components/ImageWithFallback";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container"
import Typography from '@mui/material/Typography';

type ArtistHomeParams = {
  artistId: string;
};

type ArtistHomeProps = {
  playSongHandler: (url: string | undefined) => void
}
const ArtistHome: FunctionComponent<ArtistHomeProps> = ({ playSongHandler }) => {
  const params = useParams() as ArtistHomeParams;
  const artistId = params.artistId;
  const [artistInfo, setArtistInfo] = useState<Artist>();
  const [isLoadingArtist, setIsLoadingArtist] = useState(true);
  const [artistError, setArtistError] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>();
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);
  const [tracksError, setTracksError] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState<GetArtistAlbumsResponse>();
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);
  const [albumsError, setAlbumsError] = useState(false);
  const albumCoverFallback =
    "https://tidal.com/browse/assets/images/defaultImages/defaultPlaylistImage.png";
  const artistPictureFallback =
    "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021";

  var spotifyApi = new SpotifyWebApi();
  const accessToken = currentAccessToken;
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.artists
      .getArtist(artistId)
      .then((response) => {
        setArtistInfo(response);
        setIsLoadingArtist(false);
      })
      .catch(() => {
        setArtistError(true);
        setIsLoadingArtist(false);
      });
    spotifyApi.artists
      .getArtistTopTracks(artistId, "AR")
      .then((response) => {
        setTopTracks(response);
        setIsLoadingTracks(false);
      })
      .catch(() => {
        setTracksError(true);
        setIsLoadingTracks(false);
      });
    spotifyApi.artists
      .getArtistAlbums(artistId, { limit: 50, country: "AR" })
      .then((response) => {
        setArtistAlbums(response);
        setIsLoadingAlbums(false);
      })
      .catch(() => {
        setAlbumsError(true);
        setIsLoadingAlbums(false);
      });
  }, []);

  const renderArtistHome = () => {
    if (isLoadingArtist || isLoadingTracks || isLoadingAlbums) {
      return (
        <div className="loadingContainer">
          <CircularProgress color="inherit" className="circularProgress" />
        </div>
      );
    }
    if (artistError || tracksError || albumsError) {
      return (
        <div>
          <Alert severity="error" className="errorMessage">
            There was an error loading the data, please try again.
          </Alert>
        </div>
      );
    }
    return (
      <div>
        <Box display="flex" mt={5}>
          <ImageWithFallback
            src={artistInfo?.images.at(1)?.url}
            fallback={artistPictureFallback}
            alt={`${artistInfo?.name} profile picture`}
            className="artistProfilePicture"
            imagesArray={artistInfo?.images.length}
          />
          <Grid item m={4}>
            <Typography variant="h2" fontWeight="bold">{artistInfo?.name}</Typography>
            <Typography m={1} variant="subtitle2">{`${artistInfo?.followers.total} followers`}</Typography>
          </Grid>
        </Box>
        <Typography mt={8} mb={4} variant="h4" fontWeight="bold">Popular songs</Typography>
        <div>
          {topTracks?.map((track) => (
            <ArtistTopTrack
              topTrackInfo={track}
              fallback={albumCoverFallback}
              key={track.id}
            />
          ))}
        </div>
        <Typography mt={8} mb={5} variant="h4" fontWeight="bold">Albums</Typography>
        <Box display="flex" flexWrap="wrap">
          {artistAlbums?.items.map((album) => (
            <ArtistAlbums
              artistAlbum={album}
              fallback={albumCoverFallback}
              key={album.id}
            />
          ))}
        </Box>
        <Typography mt={8} mb={5} variant="h4" fontWeight="bold">Singles</Typography>
        <Box display="flex" flexWrap="wrap">
          {artistAlbums?.items.map((single) => (
            <ArtistSingle
              artistSingle={single}
              fallback={albumCoverFallback}
              key={single.id}
            />
          ))}
        </Box>
      </div>
    );
  };
  return (
    <div>
      <SearchAppBar />
      <div>
        <Container maxWidth="xl">
          {renderArtistHome()}
        </Container>
      </div>
    </div>
  );
}

export default ArtistHome;

