import { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const TopRatedMoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        getTopRatedMovies()
            .then((topRatedMovies) => {
                setMovies(topRatedMovies);
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
            title="Top Rated Movies"
            movies={movies}
            action={(movie) => (
                <>
                    <AddToFavoritesIcon movie={movie} />
                    <WriteReview movie={movie} />
                </>
            )}
        />
    );
};

export default TopRatedMoviesPage;