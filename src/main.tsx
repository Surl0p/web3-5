import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Weather from "./components/Weather/Weather.tsx";
import Movies from "./components/Movies/Movies.tsx";
import Currency from "./components/Currency/Currency.tsx";
import "./App.css";

export type Page = "home" | "weather" | "movies" | "currency";

function App() {
    const [page, setPage] = useState<Page>("home");
    const [darkTheme, setDarkTheme] = useState<boolean>(true);

    const handleChangePage = (next: Page) => {
        setPage(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleTheme = () => {
        setDarkTheme((prev) => !prev);
        document.documentElement.setAttribute(
            "data-theme",
            !darkTheme ? "dark" : "light"
        );
    };

    return (
        <div className={`app ${darkTheme ? "theme-dark" : "theme-light"}`}>
            <Header
                currentPage={page}
                onChangePage={handleChangePage}
                darkTheme={darkTheme}
                onToggleTheme={toggleTheme}
            />

            <main className="app-main">
                {page === "home" && <Home onChangePage={handleChangePage} />}
                {page === "weather" && <Weather />}
                {page === "movies" && <Movies />}
                {page === "currency" && <Currency />}
            </main>

            <Footer onChangePage={handleChangePage} />
        </div>
    );
}

export default App;
