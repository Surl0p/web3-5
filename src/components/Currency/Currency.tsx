import { useState } from "react";
import "../../styles/Currency.css";

interface ExchangeApiResponse {
    result: string;
    conversion_rates: Record<string, number>;
}

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "PLN", "RUB"] as const;
type CurrencyCode = (typeof CURRENCIES)[number];

const Currency: React.FC = () => {
    const [amount, setAmount] = useState<string>("100");
    const [from, setFrom] = useState<CurrencyCode>("USD");
    const [to, setTo] = useState<CurrencyCode>("RUB");
    const [result, setResult] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const apiKey = '20a59c4e882a0bf4930e55a5';

    const handleConvert = async () => {
        const value = parseFloat(amount);
        if (!value || value <= 0) {
            setError("Пожалуйста, введите корректную сумму");
            setResult("");
            return;
        }

        setError("");
        setLoading(true);
        setResult("");

        try {
            const res = await fetch(
                `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`
            );

            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }

            const data = (await res.json()) as ExchangeApiResponse;

            if (data.result !== "success") {
                throw new Error("API returned error");
            }

            const rate = data.conversion_rates[to];

            if (!rate) {
                throw new Error(`Валюта ${to} не найдена`);
            }

            const converted = value * rate;
            setResult(`${converted.toFixed(2)} ${to}`);
        } catch (e) {
            console.error(e);
            setError("Не удалось получить курс. Попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    const handleSwap = () => {
        setFrom(to);
        setTo(from);
        setResult("");
    };

    return (
        <section className="currency-page">
            <div className="currency-wrapper">
                <div className="text-center mb-3">
                    <h1>💱 Конвертер валют</h1>
                    <p style={{ color: "var(--text-secondary)" }}>
                        Актуальные курсы валют с конвертацией в реальном времени
                    </p>
                </div>

                <div className="card converter-card">
                    <div className="form-group">
                        <label
                            htmlFor="amount"
                            className="form-label"
                        >
                            Сумма для конвертации
                        </label>
                        <input
                            id="amount"
                            type="number"
                            className="form-input"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min={0}
                        />
                    </div>

                    <div className="currency-selectors">
                        <div className="selector-group">
                            <label
                                htmlFor="fromCurrency"
                                className="form-label"
                            >
                                Из валюты
                            </label>
                            <select
                                id="fromCurrency"
                                className="form-select"
                                value={from}
                                onChange={(e) => setFrom(e.target.value as CurrencyCode)}
                            >
                                {CURRENCIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            className="swap-btn"
                            onClick={handleSwap}
                            aria-label="Поменять местами"
                        >
                            ⇄
                        </button>

                        <div className="selector-group">
                            <label
                                htmlFor="toCurrency"
                                className="form-label"
                            >
                                В валюту
                            </label>
                            <select
                                id="toCurrency"
                                className="form-select"
                                value={to}
                                onChange={(e) => setTo(e.target.value as CurrencyCode)}
                            >
                                {CURRENCIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleConvert}
                        disabled={loading}
                    >
                        {loading ? "Конвертация..." : "Конвертировать"}
                    </button>

                    {error && <p className="error-message mt-2">{error}</p>}
                    {result && (
                        <p className="result-text mt-2">
                            Результат: <strong>{result}</strong>
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Currency;
