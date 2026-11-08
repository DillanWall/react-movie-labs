import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../../images/OIP-4240120040.jpg";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    const menuOptions = [
        { label: "Home", path: "/", icon: HomeIcon },
        { label: "Favorites", path: "/movies/favorites", icon: FavoriteBorderIcon },
        { label: "Playlist", path: "/movies/playlist", icon: PlaylistPlayIcon },
        { label: "Upcoming", path: "/movies/upcoming", icon: EventIcon },
        { label: "Top Rated", path: "/movies/top-rated", icon: StarIcon },
        { label: "Popular", path: "/movies/popular", icon: WhatshotIcon },
        { label: "Now Playing", path: "/movies/now-playing", icon: MovieIcon },
    ];

    const handleMenuSelect = (pageURL) => {
        setAnchorEl(null);
        navigate(pageURL);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#0d253f" }}>
                <Toolbar>
                    <Typography
                        variant="h4"
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Broadway, sans-serif",
                        }}
                    >
                        <img
                            src={logo}
                            alt=""
                            style={{ width: 40, height: 40, objectFit: "contain", marginRight: 8 }}
                        />
                        TMDB Client
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        All you ever wanted to know about Movies!
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        <opt.icon fontSize="small" sx={{ mr: 1 }} />
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    startIcon={<opt.icon />}
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
