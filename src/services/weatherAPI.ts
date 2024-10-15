const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const fetchWeather = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchLocation = async (locationName: string) => {
  try {
    const response = await fetch(`${GEOCODE_URL}?name=${locationName}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch location data');
  }
};
