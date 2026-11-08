const fetchMoviePage = async (path, page, additionalParams = "") => {
    const response = await fetch(
        `https://api.themoviedb.org/3/${path}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US${additionalParams}&page=${page}`
    );
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.status_message || "Something went wrong");
    }
    return response.json();
};

export const getMovies = (page = 1) =>
    fetchMoviePage("discover/movie", page, "&include_adult=false&include_video=false");

export const getUpcomingMovies = (page = 1) =>
    fetchMoviePage("movie/upcoming", page);

export const getTopRatedMovies = (page = 1) =>
    fetchMoviePage("movie/top_rated", page);

export const getPopularMovies = (page = 1) =>
    fetchMoviePage("movie/popular", page);

export const getNowPlayingMovies = (page = 1) =>
    fetchMoviePage("movie/now_playing", page);

export const getMovie = (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getGenres = () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPerson = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    });
};

export const getPersonMovieCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    });
};

export const getMovieRecommendations = ({ queryKey }) => {
    const [, idPart, page = 1] = queryKey;
    const { id } = idPart;
    return fetchMoviePage(`movie/${id}/recommendations`, page);
};