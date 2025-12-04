import type { Page } from "../App";
import "../styles/Header.css";

interface HeaderProps {
    currentPage: Page;
    onChangePage: (page: Page) => void;
    darkTheme: boolean;
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({
                                           currentPage,
                                           onChangePage,
                                           darkTheme,
                                           onToggleTheme,
                                       }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <h1>DevStars</h1>
                    </div>

                    <nav className="nav">
                        <button
                            className={`nav-link ${currentPage === "home" ? "active" : ""}`}
                            onClick={() => onChangePage("home")}
                        >
                            Главная
                        </button>
                        <button
                            className={`nav-link ${
                                currentPage === "weather" ? "active" : ""
                            }`}
                            onClick={() => onChangePage("weather")}
                        >
                            Погода
                        </button>
                        <button
                            className={`nav-link ${
                                currentPage === "movies" ? "active" : ""
                            }`}
                            onClick={() => onChangePage("movies")}
                        >
                            Фильмы
                        </button>
                        <button
                            className={`nav-link ${
                                currentPage === "currency" ? "active" : ""
                            }`}
                            onClick={() => onChangePage("currency")}
                        >
                            Валюты
                        </button>
                    </nav>

                    <button className="theme-toggle" onClick={onToggleTheme}>
                        <span className="theme-icon">{darkTheme ? "🌙" : "☀️"}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
