import { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
    const [movies, setMovies] = useState([]);

    const addToFavorites = (movieId) => {
        const updatedMovies = movies.map((movie) =>
            movie.id === movieId ? { ...movie, favorite: true } : movie
        );
        setMovies(updatedMovies);
    };

    useEffect(() => {
        getUpcomingMovies().then((upcomingMovies) => {
            setMovies(upcomingMovies);
        });
    }, []);

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            selectFavorite={addToFavorites}
        />
    );
};

export default UpcomingMoviesPage;
