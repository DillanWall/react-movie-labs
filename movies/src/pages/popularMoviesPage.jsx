import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import Spinner from "../components/spinner";

const PopularMoviesPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["popular", page],
        queryFn: () => getPopularMovies(page),
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <PageTemplate
            title="Popular Movies"
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

export default PopularMoviesPage;