import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["upcoming", page],
        queryFn: () => getUpcomingMovies(page),
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={data.results}
            page={page}
            totalPages={data.total_pages}
            onPageChange={setPage}
            action={(movie) => <AddToPlaylistIcon movie={movie} />}
        />
    );
};

export default UpcomingMoviesPage;