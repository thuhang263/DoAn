import axios from "axios";

const API_KEY = "7188371655e4444241f1587a52f7e69b"; 
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US", 
  },
});


tmdbApi.interceptors.request.use(
  (config) => {
    console.log("Send request to TMDB:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Lấy danh sách phim có trailer (dùng API "popular")

export const getMoviesWithTrailers = async () => {
  try {
    const response = await tmdbApi.get("/movie/popular");
    const movies = response.data?.results || [];
    const batchSize = 5;
    let moviesWithTrailers = [];
    for (let i = 0; i < movies.length; i += batchSize) {
      const batch = movies.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (movie) => {
          try {
            console.log(`Fetching videos for movie: ${movie.title}`);
            const videoRes = await tmdbApi.get(`/movie/${movie.id}/videos`);
            const videos = videoRes.data?.results || [];
            const validTrailer = videos.find(
              (video) =>
                video.type === "Trailer" &&
                video.site === "YouTube" &&
                video.key &&
                video.key.trim() !== ""
            );
            if (validTrailer) {
              return {
                id: movie.id.toString(),
                title: movie.title,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                trailerKey: validTrailer.key, 
                genre: movie.genre_ids?.join(", ") || "N/A",
                year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
              };
            }
          } catch (err) {
            console.error(`Error fetching video for movie ${movie.title}:`, err);
          }
          return null;
        })
      );
      moviesWithTrailers.push(...batchResults.filter((movie) => movie !== null));
    }
    return moviesWithTrailers;
  } catch (error) {
    console.error("Error fetching movies with trailers:", error);
    return [];
  }
};




export default tmdbApi;
