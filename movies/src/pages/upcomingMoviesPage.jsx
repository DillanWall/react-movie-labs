import { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const UpcomingMoviesPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getUpcomingMovies().then((upcomingMovies) => {
            setMovies(upcomingMovies);
        });
    }, []);

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => <AddToPlaylistIcon movie={movie} />}
        />
    );
};

export default UpcomingMoviesPage;
