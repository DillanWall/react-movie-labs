import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink, useNavigate } from "react-router";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

export default function MovieCredits({ movie, linkActors = false, showFullCreditsLink = false }) {
    const navigate = useNavigate();
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["credits", { id: movie.id }],
        queryFn: getMovieCredits,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const cast = data.cast || [];
    const crew = data.crew || [];

    return (
        <>
        <TableContainer component={Paper}>
            <Typography variant="h5" component="h2" sx={{ p: 2 }}>
                {movie.title} Credits
            </Typography>
            {cast.length === 0 && crew.length === 0 ? (
                <Typography sx={{ p: 2 }}>No credits available.</Typography>
            ) : (
                <Table aria-label="movie credits table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Credit type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cast.map((person) => (
                            <TableRow key={`cast-${person.credit_id}`}>
                                <TableCell component="th" scope="row">
                                    {linkActors ? (
                                        <Link component={RouterLink} to={`/people/${person.id}/movies`}>
                                            {person.name}
                                        </Link>
                                    ) : person.name}
                                </TableCell>
                                <TableCell>{person.character}</TableCell>
                                <TableCell>Cast</TableCell>
                            </TableRow>
                        ))}
                        {crew.map((person) => (
                            <TableRow key={`crew-${person.credit_id}`}>
                                <TableCell component="th" scope="row">
                                    {person.name}
                                </TableCell>
                                <TableCell>{person.job}</TableCell>
                                <TableCell>{person.department}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
        {showFullCreditsLink && (
            <Button
                variant="contained"
                onClick={() => navigate(`/movies/${movie.id}/credits`)}
                sx={{ m: 2 }}
            >
                View full credits
            </Button>
        )}
        </>
    );
}
