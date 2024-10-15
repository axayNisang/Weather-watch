import React from 'react';
import { render } from '@testing-library/react-native';
import Forecast from '../Forecast';
import getWeatherImage from '../../helpers/getWeatherImage';

// Mock the getWeatherImage function
jest.mock('../../helpers/getWeatherImage');

type WeatherCode = '1' | '2' | '3';

describe('Forecast Component', () => {
  const forecastData = {
    time: ['2024-10-13', '2024-10-14', '2024-10-15'],
    temperature_2m_max: [31.2, 32.0, 30.5],
    temperature_2m_min: [23.4, 23.1, 22.9],
    weathercode: ['1', '2', '3'] as WeatherCode[],
  };

  beforeEach(() => {
    (getWeatherImage as jest.Mock).mockImplementation((code) => `https://example.com/image_${code}.png`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correct number of forecast items', () => {
    const { getAllByText } = render(<Forecast forecast={forecastData} />);
    
    const dateElements = getAllByText(/2024-10-1[3-5]/);
    expect(dateElements.length).toBe(forecastData.time.length);
  });

  it('should call getWeatherImage with correct weather code', () => {
    render(<Forecast forecast={forecastData} />);

    expect(getWeatherImage).toHaveBeenCalledWith(forecastData.weathercode[0]);
    expect(getWeatherImage).toHaveBeenCalledWith(forecastData.weathercode[1]);
    expect(getWeatherImage).toHaveBeenCalledWith(forecastData.weathercode[2]);
  });
});
