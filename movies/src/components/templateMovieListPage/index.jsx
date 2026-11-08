import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

const MOVIES_PER_PAGE = 20;

function MovieListPageTemplate({
    movies,
    title,
    action,
    page = 1,
    totalPages,
    onPageChange,
}) {
    const [localPage, setLocalPage] = useState(1);
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);

    const filteredMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        });
    const isServerPaginated = Boolean(onPageChange);
    const pageCount = isServerPaginated
        ? totalPages
        : Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
    const currentPage = isServerPaginated
        ? page
        : Math.min(localPage, Math.max(pageCount, 1));
    const displayedMovies = isServerPaginated
        ? filteredMovies
        : filteredMovies.slice(
              (currentPage - 1) * MOVIES_PER_PAGE,
              currentPage * MOVIES_PER_PAGE
          );

    const handleChange = (type, value) => {
        if (onPageChange) {
            onPageChange(1);
        } else {
            setLocalPage(1);
        }
        if (type === "name") setNameFilter(value);
        else setGenreFilter(value);
    };

    const handlePageChange = (_event, newPage) => {
        if (onPageChange) {
            onPageChange(newPage);
        } else {
            setLocalPage(newPage);
        }
    };

    return (
        <Grid container>
            <Grid size={12}>
                <Header title={title} />
            </Grid>
            <Grid container sx={{ flex: "1 1 500px" }}>
                <Grid
                    key="find"
                    size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                    sx={{ padding: "20px" }}
                >
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
                {pageCount > 1 && (
                    <Grid size={12} sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            aria-label="Movie list pagination"
                        />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}
export default MovieListPageTemplate;
