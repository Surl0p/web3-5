import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Weather from "./components/Weather/Weather";
import Movies from "./components/Movies/Movies";
import Currency from "./components/Currency/Currency";

import "./App.css";

// Тип страницы — экспортируем, чтобы использовать в других компонентах
export type Page = "home" | "weather" | "movies" | "currency";

export default function App() {
    const [page, setPage] = useState<Page>("home");
    const [darkTheme, setDarkTheme] = useState<boolean>(true);

    // переключение страницы
    const handleChangePage = (nextPage: Page) => {
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // переключение темы
    const toggleTheme = () => {
        setDarkTheme((prev) => !prev);

        document.documentElement.setAttribute(
            "data-theme",
            !darkTheme ? "dark" : "light"
        );
    };

    return (
        <div className={`app ${darkTheme ? "theme-dark" : "theme-light"}`}>
            {/* Шапка */}
            <Header
                currentPage={page}
                onChangePage={handleChangePage}
                darkTheme={darkTheme}
                onToggleTheme={toggleTheme}
            />

            {/* Основной контейнер */}
            <main className="app-main">
                {page === "home" && <Home onChangePage={handleChangePage} />}
                {page === "weather" && <Weather />}
                {page === "movies" && <Movies />}
                {page === "currency" && <Currency />}
            </main>

            {/* Подвал */}
            <Footer onChangePage={handleChangePage} />
        </div>
    );
}
