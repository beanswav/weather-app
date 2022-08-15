import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Weather from "./components/Weather";
import { API_KEY } from "./utils/APIKeys";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [description, setDescription] = useState(null);

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=imperial`,
    })
      .then((res) => {
        console.log(res.data);

        const current = res.data.weather[0];
        setData(res.data);

        setTemperature(res.data.main.temp);
        setWeatherCondition(current.main);
        setWeatherIcon(current.icon);
        setDescription(current.description);
      })
      .catch((err) => {
        console.dir(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [input, API_KEY]);

  return (
    <>
      {loading === false ? (
        <>
          <StatusBar style="auto" />
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter city name and press return"
              onChangeText={(text) => setInput(text)}
              placeholderTextColor={"#000"}
              onSubmitEditing={fetchDataHandler}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>{data.name}</Text>
          </View>
          <Weather
            temperature={temperature}
            weatherCondition={weatherCondition}
            weatherIcon={weatherIcon}
            description={description}
          />
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
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 19,
    fontWeight: "300",
    borderRadius: 16,
    borderBottomColor: "#df8e00",
  },
  info: {
    alignItems: "center",
  },
  text: {
    color: "grey",
    fontSize: 40,
    fontWeight: "bold",
  },
});
