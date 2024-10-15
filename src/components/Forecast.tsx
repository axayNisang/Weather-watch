import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import getWeatherImage, { WeatherCode } from '../helpers/getWeatherImage';

interface ForecastProps {
  forecast: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: WeatherCode[];
  };
}
const Forecast: React.FC<ForecastProps> = React.memo(({ forecast }) => {
  const transformedForecast = React.useMemo(() => 
    forecast.time.map((date: string, index: number) => ({
      date,
      tempMax: forecast.temperature_2m_max[index],
      tempMin: forecast.temperature_2m_min[index],
      weatherCode: forecast.weathercode[index],
    })), 
    [forecast.time, forecast.temperature_2m_max, forecast.temperature_2m_min, forecast.weathercode]
  );

  const renderItem = React.useCallback(({ item }: { item: typeof transformedForecast[0] }) => (
    <View style={styles.item}>
      <Text>{item.date}</Text>
      <Image source={{ uri: getWeatherImage(item.weatherCode) }} style={styles.weatherImage} />
      <Text>{Math.round((item.tempMax + item.tempMin) / 2)}°C</Text>
    </View>
  ), []);

  return (
    <FlatList
      data={transformedForecast}
      renderItem={renderItem}
      keyExtractor={(item) => item.date}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
});

const styles = StyleSheet.create({
  item: { alignItems: 'center', marginHorizontal: 10 },
  weatherImage: { width: 50, height: 50 },
});

export default Forecast;