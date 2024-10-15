import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import getWeatherImage, { WeatherCode } from '../helpers/getWeatherImage';

interface CurrentWeatherProps {
  location: string;
  temperature: number;
  weatherCode: WeatherCode; 
}

const CurrentWeather: React.FC<CurrentWeatherProps> = React.memo(({ location, temperature, weatherCode }) => {

  const imageUrl = React.useMemo(() => getWeatherImage(weatherCode), [weatherCode]);

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Image source={{ uri: imageUrl }} style={styles.weatherImage} testID="weather-image" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  location: { fontSize: 24, fontWeight: 'bold' },
  temperature: { fontSize: 40, fontWeight: 'bold', marginVertical: 10 },
  weatherImage: { width: 100, height: 100 },
});

export default CurrentWeather;
