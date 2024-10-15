import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Search from '../Search';
import { fetchLocation } from '../../services/weatherAPI';

jest.mock('../../services/weatherAPI', () => ({
  fetchLocation: jest.fn(),
}));

describe('Search Component', () => {
  const mockOnLocationSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<Search onLocationSelect={mockOnLocationSelect} />);
    expect(getByPlaceholderText('Search location')).toBeTruthy();
  });

  it('displays location results after a successful search', async () => {
    const mockData = {
      results: [
        { id: 1, name: 'Pune', timezone: 'Asia/Kolkata' },
        { id: 2, name: 'Mumbai', timezone: 'Asia/Kolkata' },
      ],
    };

    (fetchLocation as jest.Mock).mockResolvedValueOnce(mockData);

    const { getByPlaceholderText, getByText } = render(<Search onLocationSelect={mockOnLocationSelect} />);

    const searchInput = getByPlaceholderText('Search location');
    fireEvent.changeText(searchInput, 'Pune');

    fireEvent.press(getByText('Search'));

    await waitFor(() => {
      expect(getByText('Pune, Asia/Kolkata')).toBeTruthy();
      expect(getByText('Mumbai, Asia/Kolkata')).toBeTruthy();
    });
  });

  it('calls onLocationSelect when a location is selected', async () => {
    const mockData = {
      results: [
        { id: 1, name: 'Pune', timezone: 'Asia/Kolkata' },
      ],
    };

    (fetchLocation as jest.Mock).mockResolvedValueOnce(mockData);

    const { getByPlaceholderText, getByText } = render(<Search onLocationSelect={mockOnLocationSelect} />);
    const searchInput = getByPlaceholderText('Search location');
    fireEvent.changeText(searchInput, 'Pune');

    fireEvent.press(getByText('Search'));

    await waitFor(() => {
      const locationItem = getByText('Pune, Asia/Kolkata');
      fireEvent.press(locationItem);
      expect(mockOnLocationSelect).toHaveBeenCalledWith('Pune'); 
    });
  });

  it('does not display results for an empty search', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Search onLocationSelect={mockOnLocationSelect} />);
  
    const searchInput = getByPlaceholderText('Search location');
    fireEvent.changeText(searchInput, '');
  
    fireEvent.press(getByText('Search'));
  
    await waitFor(() => {
      expect(queryByText('Pune, Asia/Kolkata')).toBeNull(); 
    });
  });
  
});
