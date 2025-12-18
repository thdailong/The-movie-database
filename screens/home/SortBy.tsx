import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Expandable from '../../components/Expandable';
import { colors } from '@/theme';

export type SortByType = 'alphabetical' | 'rating' | 'release_date';

interface SortByProps {
  selectedSort: SortByType | null;
  onSortChange: (sort: SortByType) => void;
}

const SortBy: React.FC<SortByProps> = ({ selectedSort, onSortChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortOptions: { key: SortByType; label: string }[] = [
    { key: 'alphabetical', label: 'By alphabetical order' },
    { key: 'rating', label: 'By rating' },
    { key: 'release_date', label: 'By release date' },
  ];

  const handleSelectSort = (sort: SortByType) => {
    onSortChange(sort);
    setIsExpanded(false);
  };

  const handleToggle = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  return (
    <Expandable
      title="Sort by"
      initiallyExpanded={false}
      onToggle={handleToggle}
      headerStyle={styles.expandableHeader}
      contentStyle={styles.expandableContent}
      style={styles.card}
    >
      <View style={styles.optionsContainer}>
        {sortOptions.map(option => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.option,
              selectedSort === option.key && styles.optionSelected,
            ]}
            onPress={() => handleSelectSort(option.key)}
          >
            <Text
              style={[
                styles.optionText,
                selectedSort === option.key && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Expandable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  expandableHeader: {
    padding: 16,
    borderRadius: 8,
  },
  expandableContent: {
    borderTopWidth: 1,
    borderTopColor: '#E3E3E3',
  },
  optionsContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: colors.black,
  },
  optionTextSelected: {
    color: colors.white,
    fontWeight: '500',
  },
});

export default SortBy;
