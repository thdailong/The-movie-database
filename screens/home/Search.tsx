import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Card from '../../components/Card';
import {colors} from '@/theme';

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({
  value,
  onChangeText,
  placeholder = 'Search for movies...',
}) => {
  return (
    <Card style={styles.card}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray.medium}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    color: colors.black,
    padding: 0,
  },
});

export default Search;

