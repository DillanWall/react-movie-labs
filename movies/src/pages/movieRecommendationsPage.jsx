import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";

const MovieRecommendationsPage = () => {
    const { id } = useParams();
    const { data: movies, error, isPending, isError } = useQuery({
        queryKey: ["recommendations", { id }],
        queryFn: getMovieRecommendations,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <PageTemplate
            title="Recommended Movies"
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

export default MovieRecommendationsPage;
