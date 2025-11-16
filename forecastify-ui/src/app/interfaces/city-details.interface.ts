interface CityI {
    id: number;
    city: string;
    forecast: ForecastI [];
}

interface ForecastI {
        date: string;
        temperatureCelsius: number;
        temperatureFahrenheit: number;
        temperatureDescription: string;
        humidity: number;
        humidityDescription: string;
        weatherDescription: string;
}
interface CityLatestI {
    id: number;
    city: string;
    date: string;
    temperatureCelsius: number;
    temperatureFahrenheit: number;
    temperatureDescription: string;
    humidity: number;
    humidityDescription: string;
    weatherDescription: string;
}
export type { CityI, CityLatestI, ForecastI };
