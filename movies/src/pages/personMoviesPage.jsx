import { Link as RouterLink, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const PersonMoviesPage = () => {
    const { personId } = useParams();
    const personQuery = useQuery({
        queryKey: ["person", { id: personId }],
        queryFn: getPerson,
    });
    const creditsQuery = useQuery({
        queryKey: ["personMovieCredits", { id: personId }],
        queryFn: getPersonMovieCredits,
    });

    if (personQuery.isPending || creditsQuery.isPending) {
        return <Spinner />;
    }

    if (personQuery.isError) {
        return <h1>{personQuery.error.message}</h1>;
    }

    if (creditsQuery.isError) {
        return <h1>{creditsQuery.error.message}</h1>;
    }

    const movies = [...(creditsQuery.data.cast ?? []), ...(creditsQuery.data.crew ?? [])]
        .filter((movie, index, allMovies) =>
            allMovies.findIndex((entry) => entry.id === movie.id) === index
        )
        .sort((a, b) => (b.release_date ?? "").localeCompare(a.release_date ?? ""));

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Typography variant="h4" component="h1">
                {personQuery.data.name} - Filmography
            </Typography>
            {movies.length === 0 ? (
                <Typography sx={{ mt: 2 }}>No movie credits available.</Typography>
            ) : (
                <List>
                    {movies.map((movie) => (
                        <ListItem key={movie.id} disablePadding>
                            <ListItemButton component={RouterLink} to={`/movies/${movie.id}`}>
                                <ListItemText
                                    primary={movie.title}
                                    secondary={[movie.character, movie.release_date?.slice(0, 4)]
                                        .filter(Boolean)
                                        .join(" · ")}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default PersonMoviesPage;
