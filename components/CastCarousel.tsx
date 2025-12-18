import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {ICredit} from '@/types/movieDetail';
import {colors} from '@/theme';

interface CastCarouselProps {
  cast: ICredit[];
}

const CastCarousel: React.FC<CastCarouselProps> = ({cast}) => {
  const renderCastItem = ({item}: {item: ICredit}) => (
    <View style={styles.castItem}>
      <View style={styles.avatarContainer}>
        {item.profile_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w200${item.profile_path}`,
            }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.castName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.castRole} numberOfLines={1}>
        {item.character}
      </Text>
    </View>
  );

  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cast members</Text>
      <FlatList
        data={cast}
        renderItem={renderCastItem}
        keyExtractor={item => `cast-${item.cast_id || item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  castItem: {
    width: 100,
    marginRight: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray.dark,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray.medium,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  castName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  castRole: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default CastCarousel;

