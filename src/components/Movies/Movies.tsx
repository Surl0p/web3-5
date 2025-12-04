import { useState } from "react";
import "../../styles/Movies.css";

interface Movie {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    imdbRating: string;
}

const Movies: React.FC = () => {
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState<Movie | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const apiKey = '7e9d04cc';

    const handleSearch = async () => {
        if (!query.trim()) {
            setError("Введите название фильма");
            return;
        }

        setLoading(true);
        setError("");
        setMovie(null);

        try {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
                    query
                )}&plot=full`
            );

            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}`);
            }

            const data = (await res.json()) as any;

            if (data.Response === "True") {
                setMovie(data as Movie);
            } else {
                setError(data.Error || "Фильм не найден");
            }
        } catch (e) {
            console.error(e);
            setError("Ошибка поиска. Попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <section className="movies-page">
            <div className="movies-wrapper">
                <div className="text-center mb-3">
                    <h1>🎬 Поиск фильмов</h1>
                    <p style={{ color: "var(--text-secondary)" }}>
                        Найдите информацию о любом фильме через базу данных OMDb
                    </p>
                </div>

                <div className="card mb-3 search-card">
                    <div className="form-group">
                        <label
                            htmlFor="movie-search"
                            className="form-label"
                            style={{ color: "#FFFFFF" }}
                        >
                            Название фильма
                        </label>
                        <input
                            id="movie-search"
                            className="form-input"
                            placeholder="Например, Inception"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? "Поиск..." : "Искать"}
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                {movie && (
                    <div className="card movie-card">
                        <div className="movie-layout">
                            {movie.Poster && movie.Poster !== "N/A" && (
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className="movie-poster"
                                />
                            )}
                            <div className="movie-info">
                                <h2>{movie.Title}</h2>
                                <p>
                                    <strong>Год:</strong> {movie.Year}
                                </p>
                                <p>
                                    <strong>Жанр:</strong> {movie.Genre}
                                </p>
                                <p>
                                    <strong>Рейтинг IMDb:</strong> {movie.imdbRating}
                                </p>
                                <p>
                                    <strong>Описание:</strong> {movie.Plot}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Movies;
