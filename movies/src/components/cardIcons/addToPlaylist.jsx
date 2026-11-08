import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToPlaylistIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const isInPlaylist = context.mustWatch.includes(movie.id);

    const handleAddToMustWatch = (e) => {
        e.preventDefault();
        context.addToMustWatch(movie);
    };

    return (
        <IconButton
            aria-label={isInPlaylist ? "already in playlist" : "add to playlist"}
            aria-pressed={isInPlaylist}
            onClick={handleAddToMustWatch}
        >
            {isInPlaylist
                ? <PlaylistAddCheckIcon color="success" fontSize="large" />
                : <PlaylistAddIcon color="primary" fontSize="large" />}
        </IconButton>
    );
};

export default AddToPlaylistIcon;
