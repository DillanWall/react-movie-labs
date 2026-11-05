import { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import Spinner from "../components/spinner";

const NowPlayingMoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        getNowPlayingMovies()
            .then((nowPlayingMovies) => {
                setMovies(nowPlayingMovies);
            })
            .catch((fetchError) => {
                setError(fetchError);
            })
            .finally(() => {
                setIsPending(false);
            });
    }, []);

    if (isPending) {
        return <Spinner />;
    }

    if (error) {
        return <h1>{error.message}</h1>;
    }

    return (
        <PageTemplate
            title="Now Playing Movies"
            movies={movies}
            action={(movie) => (
                <>
                    <AddToFavoritesIcon movie={movie} />
                    <WriteReview movie={movie} />
                </>
            )}
        />
    );
}

export default NowPlayingMoviesPage;