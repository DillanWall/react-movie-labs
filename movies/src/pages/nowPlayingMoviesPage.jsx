import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import Spinner from "../components/spinner";

const NowPlayingMoviesPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["nowPlaying", page],
        queryFn: () => getNowPlayingMovies(page),
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <PageTemplate
            title="Now Playing Movies"
            movies={data.results}
            page={page}
            totalPages={data.total_pages}
            onPageChange={setPage}
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