import type { Page } from "../App";
import "../styles/Footer.css";

interface FooterProps {
    onChangePage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onChangePage }) => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>DevStars Web App</h3>
                        <p>Инновационные веб-виджеты для повседневного использования</p>
                    </div>

                    <div className="footer-section">
                        <h4>Сервисы</h4>
                        <button
                            className="footer-link"
                            onClick={() => onChangePage("weather")}
                        >
                            Погода
                        </button>
                        <button
                            className="footer-link"
                            onClick={() => onChangePage("movies")}
                        >
                            Фильмы
                        </button>
                        <button
                            className="footer-link"
                            onClick={() => onChangePage("currency")}
                        >
                            Валюты
                        </button>
                    </div>

                    <div className="footer-section">
                        <h4>Команда DevStars</h4>
                        <p>
                            <span>Ваня Клочков — Домашняя страница</span>
                            <br />
                            <span>Ваня Павлов — Погода, домашняя страница</span>
                            <br />
                            <span>Витя Смыков — Фильмы</span>
                            <br />
                            <span>Дима Яновский — Валюты</span>
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 DevStars. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
