import { CityI, CityLatestI } from "../interfaces/city-details.interface";

export function minimizeCities(cities: CityI[]): CityLatestI[] {
    return cities.map(city => {
        const latestForecast = city.forecast[city.forecast.length - 1];
        return {
            id: city.id,
            city: city.city,
            date: latestForecast.date,
            temperatureCelsius: latestForecast.temperatureCelsius,
            temperatureFahrenheit: latestForecast.temperatureFahrenheit,
            temperatureDescription: latestForecast.temperatureDescription,
            humidity: latestForecast.humidity,
            humidityDescription: latestForecast.humidityDescription,
            weatherDescription: latestForecast.weatherDescription
        };
    });
}

export function populateDesc(city: CityI): CityI {
    city.forecast.forEach(forecast => {
        forecast.temperatureDescription = getTemperatureDescription(forecast.temperatureCelsius);
        forecast.humidityDescription = getHumidityDescription(forecast.humidity);
        forecast.weatherDescription = getWeatherDescription(forecast.temperatureCelsius, forecast.humidity) ;
    });
    return city;
}

export function getTemperatureDescription(tempC: number): string {
    if (tempC > 25) return 'Hot';
    if (tempC > 19) return 'Warm';
    if (tempC > 12) return 'Mild';
    if (tempC > 5) return 'Cold';
    return 'Freezing';
}

export function getHumidityDescription(humidity: number): string {
    if (humidity > 75) return 'Very Humid';
    if (humidity > 60) return 'Humid';
    if (humidity > 40) return 'Comfortable';
    return 'Dry';
}

export function getWeatherDescription(tempC: number, humidity: number): string {
    if (humidity >= 80) return 'Foggy';
    if (humidity >= 70 && tempC >= 5 && tempC <= 22) return 'Rainy';
    if (tempC >= 18 && humidity <= 55) return 'Sunny';
    if (tempC >= 10 && tempC <= 25 && humidity >= 65) return 'Cloudy';
    return 'Windy';
}