import type { Page } from "../App";
import "../styles/Home.css";

interface HomeProps {
    onChangePage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onChangePage }) => {
    return (
        <div className="home-page">
            <div className="container">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Добро пожаловать в DevStars Web App</h1>
                        <p className="hero-subtitle">
                            Инновационные веб-виджеты для повседневного использования
                        </p>
                        <div className="hero-actions">
                            <button
                                className="btn btn-outline"
                                onClick={() => onChangePage("weather")}
                            >
                                🌤 Узнать погоду
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={() => onChangePage("movies")}
                            >
                                🎬 Найти фильм
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={() => onChangePage("currency")}
                            >
                                💱 Конвертер валют
                            </button>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <h2 className="section-title">Наши возможности</h2>
                    <div className="features-grid">
                        <div
                            className="feature-card"
                            onClick={() => onChangePage("weather")}
                        >
                            <div className="feature-icon">🌤</div>
                            <h3>Виджет погоды</h3>
                            <p>
                                Текущая погода, скорость ветра, влажность и температура для
                                любого города мира
                            </p>
                        </div>

                        <div
                            className="feature-card"
                            onClick={() => onChangePage("movies")}
                        >
                            <div className="feature-icon">🎬</div>
                            <h3>Поиск фильмов</h3>
                            <p>
                                Быстрый поиск информации о фильмах, рейтингах и описаниях через
                                OMDb API
                            </p>
                        </div>

                        <div
                            className="feature-card"
                            onClick={() => onChangePage("currency")}
                        >
                            <div className="feature-icon">💱</div>
                            <h3>Конвертер валют</h3>
                            <p>Актуальные курсы валют и удобная конвертация в реальном времени</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
