// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

async function getWeatherAndForecast(coordinates) {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/onecall?",
    {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lng,
        exclude: "minutely,hourly,alerts",
        appid: "22e565d180d5e7214a43cac596cd4ce9",
        units: "metric"
      }
    }
  );

  return response;
}

export default getWeatherAndForecast;