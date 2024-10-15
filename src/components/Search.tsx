import React, { useState, useCallback, useMemo } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fetchLocation } from '../services/weatherAPI';

interface SearchProps {
  onLocationSelect: (location: string) => void;
}

const Search: React.FC<SearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<{ id: number, name: string, timezone: string }[]>([]);

  const handleSearch = useCallback(async () => {
    if (query.trim() === '') return;

    try {
      const result = await fetchLocation(query);
      if (result?.results?.length > 0) {
        setLocations(result.results.map((loc: any) => ({
          id: loc?.id,
          name: loc?.name,
          timezone: loc?.timezone
        })));
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error('Failed to fetch location data:', error);
    }
  }, [query]);

  const renderItem = useCallback(({ item }: { item: typeof locations[0] }) => (
    <TouchableOpacity onPress={() => onLocationSelect(item.name)}>
      <Text>{`${item.name}, ${item.timezone}`}</Text>
    </TouchableOpacity>
  ), [onLocationSelect]);

  const keyExtractor = useCallback((item: { id: number }) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search location"
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={<Text>No results found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

export default Search;
