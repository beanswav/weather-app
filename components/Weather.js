import { View, Text, StyleSheet, Image } from "react-native";
import { conditions } from "./Conditions";
import React, { useState, useEffect } from "react";

export default function Weather({
  temperature,
  weatherCondition,
  weatherIcon,
  description,
}) {
  return (
    <View
      style={[
        styles.weatherContainer,
        {
          backgroundColor: weatherCondition
            ? conditions[weatherCondition].color
            : "gray",
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
          }}
          style={{ width: 80, height: 80 }}
        />
        <Text style={{ fontSize: 48, color: "#fff" }}>{temperature}°F</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherCondition}</Text>
        <Text style={styles.subtitle}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});
