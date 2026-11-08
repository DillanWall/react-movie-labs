import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Alert from "@mui/material/Alert";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";

const PlaylistPage = () => {
    const { mustWatch: movieIds } = useContext(MoviesContext);

    // Create an array of queries and run in parallel.
    const playlistMovieQueries = useQueries({
        queries: movieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    });

    // Check if any of the parallel queries is still loading.
    const isPending = playlistMovieQueries.find((query) => query.isPending === true);

    if (isPending) {
        return <Spinner />;
    }

    const failedQuery = playlistMovieQueries.find((query) => query.isError);

    if (failedQuery) {
        return (
            <Alert severity="error">
                {failedQuery.error.message || "Unable to load playlist movies."}
            </Alert>
        );
    }

    const movies = playlistMovieQueries.map((query) => {
        return {
            ...query.data,
            genre_ids: query.data.genres.map((genre) => genre.id),
        };
    });

    return (
        <PageTemplate
            title="My Playlist"
            movies={movies}
            action={(movie) => {
                return <RemoveFromPlaylist movie={movie} />;
            }}
        />
    );

};

export default PlaylistPage;
