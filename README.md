# Global Weather UI
A simple and responsive weather dashboard that displays forecast data for cities around the world. Users can browse all available cities, search for a specific city, filter weather data by date, and toggle between Celsius and Fahrenheit. The project focuses on clean architecture, small reusable components, and an intuitive user experience.
## Features
* **City List**
  View the latest available weather for all cities.
* **City Search**
  Search for a specific city and view its full forecast.
  Uses the `/cityForecast/:cityId` API endpoint.
* **Date Filtering**
  Select a specific date from the available forecast data.
* **Unit Toggle**
  Switch between Celsius and Fahrenheit.
* **Modular Components**
  Clean structure with small, reusable UI components.

## API
The API is located in the `./src` directory.
**Endpoints:**

| Method | Endpoint                | Response      | Description                 |
| ------ | ----------------------- | ------------- | --------------------------- |
| GET    | `/forecast`             | `Array<City>` | Returns all cities’ weather |
| GET    | `/cityForecast/:cityId` | `City`        | Returns weather for a city  |

**City Type:**

```ts
interface City {
  id: number;
  city: string;
  forecast: [
    {
      date: string;
      temperatureCelsius: number;
      temperatureFahrenheit: number;
      humidity: number;
    }
  ];
}
```

## Installation

Node version: **v10.6.0** required (other versions may behave differently).

Inside `./src`:

```bash
npm ci
```
## Running the Project
From `./src`:

```bash
npm start
```

## Structure:

[NAVBAR: home | search | light/dark | C/F toggle]

[Hero section: short title + visual]

[Slider: daily weather cards (latest day)] (More details button)

[Trend sorter bar: Sun | Cold | Wind | Dry | Reset]

[Headline: “Explore all cities”]

Page: [Grid of city cards]

[Chatbot bubble fixed bottom-right]
