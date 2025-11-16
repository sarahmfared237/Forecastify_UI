# Global Weather UI
A simple and responsive weather dashboard that displays forecast data for cities around the world. Users can browse all available cities, search for a specific city, filter weather data by date, and toggle between Celsius and Fahrenheit. The project focuses on clean architecture, small reusable components, and an intuitive user experience.
![Homepage](https://github.com/user-attachments/assets/f637a819-4da2-4c1a-85a0-7f635acdff9e)
![CityPage](https://github.com/user-attachments/assets/5940bb89-82d4-4e86-a1b0-7eda586a88d8)


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

## NgRx State Management Overview

This application uses NgRx for centralized state management to handle global application settings and shared data across all components. The state is divided into two main slices: **Settings State** and **Cities State**.

The **Settings State** manages user preferences including dark/light theme mode and temperature unit (Celsius/Fahrenheit). These settings are controlled through the navbar but affect the entire application's appearance and data display. By using NgRx, we ensure that when a user toggles dark mode or changes the temperature unit, all components (home page, city page, sliders, cards, and graphs) instantly reflect these changes without prop drilling or manual synchronization.

The **Cities State** manages the weather data for cities fetched from the API. When users search for cities in the navbar, the search results are stored in the central state and become immediately available to all components. The home page displays these cities in an interactive slider, while the city detail page shows comprehensive forecast information for the selected city. This approach prevents duplicate API calls, maintains consistent data across navigation, and provides a seamless user experience. The state also tracks loading and error states, ensuring proper feedback during API operations.

The implementation follows NgRx best practices with Actions defining state changes, Reducers handling state updates, Effects managing side effects like API calls, and Selectors providing optimized data access. This architecture ensures the application remains scalable, maintainable, and provides predictable state updates with excellent debugging capabilities through Redux DevTools.

