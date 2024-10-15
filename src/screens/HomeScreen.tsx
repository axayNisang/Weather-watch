import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import Search from '../components/Search';
import { fetchWeather, fetchLocation } from '../services/weatherAPI';

const MemoizedCurrentWeather = React.memo(CurrentWeather);
const MemoizedForecast = React.memo(Forecast);
const MemoizedSearch = React.memo(Search);

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [location, setLocation] = useState('Pune');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async (latitude: number, longitude: number) => {
      try {
        const result = await fetchWeather(latitude, longitude);
        setWeatherData(result);
      } catch (err) {
        setError('Failed to fetch weather data.');
      }
    };
    
    // Default to Pune coordinates on initial load
    loadWeather(18.51957, 73.85535);
  }, []);

  const handleLocationSelect = useCallback(async (locationName: string) => {
    try {
      const locationData = await fetchLocation(locationName);
      
      if (locationData && locationData.results && locationData.results.length > 0) {
        const selectedLocation = locationData.results[0];
        const { latitude, longitude } = selectedLocation;
        
        const weather = await fetchWeather(latitude, longitude);
        setLocation(locationName);
        setWeatherData(weather); 
      } else {
        Alert.alert('Location not found', 'Please try a different location.');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch location data. Please try again.');
    }
  }, []);

  if (!weatherData) {
    return null; // Early return to avoid rendering empty state
  }

  return (
    <View style={styles.container}>
      <MemoizedSearch onLocationSelect={handleLocationSelect} />
      <MemoizedCurrentWeather
        location={location}
        temperature={weatherData.current_weather.temperature}
        weatherCode={weatherData.current_weather.weathercode}
      />
      <MemoizedForecast forecast={weatherData.daily} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default HomeScreen;
