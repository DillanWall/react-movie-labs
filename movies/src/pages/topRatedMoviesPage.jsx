import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const TopRatedMoviesPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["topRated", page],
        queryFn: () => getTopRatedMovies(page),
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <PageTemplate
            title="Top Rated Movies"
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
};

export default TopRatedMoviesPage;