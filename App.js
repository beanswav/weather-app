import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoadingScreen from "./components/LoadingScreen";
import Weather from "./components/Weather";

import { API_KEY } from "./utils/WeatherAPIKey";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWeather();
    setTimeout(() => setLoading(false), 2000);
  }, []);

  async function getWeather() {
    const data = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=94.04&appid=${API_KEY}&units=imperial`
    ).then((res) => res.json());

    setTemperature(data.current.temp);
    setWeatherCondition(data.current.weather[0].main);
    console.log(data.current);
  }

  return (
    <>
      {loading === false ? (
        <>
          <Weather weather={weatherCondition} temperature={temperature} />
          <StatusBar style="auto" />
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
