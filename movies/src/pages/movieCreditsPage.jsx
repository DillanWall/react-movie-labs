import { useParams, Link as RouterLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { getMovie } from "../api/tmdb-api";
import MovieCredits from "../components/movieCredits";
import Spinner from "../components/spinner";

const MovieCreditsPage = () => {
    const { id } = useParams();
    const { data: movie, error, isPending, isError } = useQuery({
        queryKey: ["movie", { id }],
        queryFn: getMovie,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Button component={RouterLink} to={`/movies/${movie.id}`} sx={{ mb: 2 }}>
                Back to {movie.title}
            </Button>
            <MovieCredits movie={movie} linkActors />
        </Container>
    );
};

export default MovieCreditsPage;
