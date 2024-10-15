import React from 'react';
import { render } from '@testing-library/react-native';
import CurrentWeather from '../CurrentWeather';
import getWeatherImage from '../../helpers/getWeatherImage';

// Mock the getWeatherImage function
jest.mock('../../helpers/getWeatherImage');

describe('CurrentWeather Component', () => {
  const location = 'Pune';
  const temperature = 30;
  const weatherCode = '1'; 

  beforeEach(() => {
    (getWeatherImage as jest.Mock).mockReturnValue('https://example.com/image.png'); 
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should render the location correctly', () => {
    const { getByText } = render(<CurrentWeather location={location} temperature={temperature} weatherCode={weatherCode} />);
    const locationText = getByText(location);
    expect(locationText).toBeTruthy(); 
  });

  it('should render the temperature correctly', () => {
    const { getByText } = render(<CurrentWeather location={location} temperature={temperature} weatherCode={weatherCode} />);
    const temperatureText = getByText(`${temperature}°C`);
    expect(temperatureText).toBeTruthy();
  });

  it('should render the weather image correctly', () => {
    const { getByTestId } = render(<CurrentWeather location={location} temperature={temperature} weatherCode={weatherCode} />);
    const weatherImage = getByTestId('weather-image');
    expect(weatherImage.props.source.uri).toBe('https://example.com/image.png'); 
  });
});
