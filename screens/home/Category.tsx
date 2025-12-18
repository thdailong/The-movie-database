import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import Expandable from '../../components/Expandable';
import { colors } from '@/theme';

export type CategoryType = 'now_playing' | 'upcoming' | 'popular';

interface CategoryProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const Category: React.FC<CategoryProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'popular', label: 'Popular' },
  ];

  const getCategoryTitle = (): string => {
    const category = categories.find(cat => cat.key === selectedCategory);
    return category?.label || 'Now Playing';
  };

  const handleSelectCategory = (category: CategoryType) => {
    onCategoryChange(category);
    setIsExpanded(false);
  };

  const handleToggle = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  return (
    <Expandable
      title={getCategoryTitle()}
      initiallyExpanded={false}
      onToggle={handleToggle}
      headerStyle={styles.expandableHeader}
      contentStyle={styles.expandableContent}
      style={styles.card}
    >
      <View style={styles.optionsContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.option,
              selectedCategory === category.key && styles.optionSelected,
            ]}
            onPress={() => handleSelectCategory(category.key)}
          >
            <Text
              style={[
                styles.optionText,
                selectedCategory === category.key && styles.optionTextSelected,
              ]}
            >
              {category.label}
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
    shadowRadius: 2,
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
    padding: 18,
    gap: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
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

export default Category;
