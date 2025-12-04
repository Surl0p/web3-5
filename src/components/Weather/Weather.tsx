import { useState } from "react";
import "../../styles/Weather.css";

interface WeatherApiResponse {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}

const Weather: React.FC = () => {
    const [city, setCity] = useState("");
    const [data, setData] = useState<WeatherApiResponse | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const apiKey = "89c563ae16caa06090600ce6b5abf65a";

    const handleSearch = async () => {
        if (!city.trim()) return;

        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                    city
                )}&appid=${apiKey}&units=metric&lang=ru`
            );

            if (!res.ok) {
                throw new Error("Не удалось получить погоду");
            }

            const json: WeatherApiResponse = await res.json();
            setData(json);
        } catch (e) {
            console.error(e);
            setError("Не смогли найти этот город");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <section className="weather-page">
            <div className="weather-widgets card">
                <h1 className="card_title">Weather App</h1>
                <p className="card_date">
                    Today,{" "}
                    <span>
            {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
            })}
          </span>
                </p>

                <div className="card_search">
                    <input
                        type="text"
                        className="card_input"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="card_btn" onClick={handleSearch}>
                        <span className="theme-icon">🔍</span>
                    </button>
                </div>

                {loading && <p>Загрузка...</p>}
                {error && <p className="error-message">{error}</p>}

                {data && (
                    <div className="card_body">
                        <img
                            className="card_weather-icon"
                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                            alt={data.weather[0].description}
                        />
                        <h2 className="card_title--city">{data.name}</h2>
                        <p className="card_title--temp">
                            {Math.round(data.main.temp)}°C, {data.weather[0].description}
                        </p>

                        <div className="weather-details">
                            <div className="detail-item">
                <span>
                  <strong>Влажность:</strong> {data.main.humidity}%
                </span>
                            </div>
                            <div className="detail-item">
                <span>
                  <strong>Скорость ветра:</strong> {data.wind.speed} м/с
                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Weather;
