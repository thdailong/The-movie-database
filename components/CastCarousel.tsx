import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {ICredit} from '@/types/movieDetail';
import {colors} from '@/theme';
import Card from './Card';

interface CastCarouselProps {
  cast: ICredit[];
}

const CastCarousel: React.FC<CastCarouselProps> = ({cast}) => {
  const renderCastItem = ({item}: {item: ICredit}) => (
    <Card style={styles.castItem}>
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
      <Text style={styles.castName}>
        {item.name}
      </Text>
      <Text style={styles.castRole} numberOfLines={2}>
        {item.character}
      </Text>
    </Card>
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
        keyExtractor={item => `cast-${item.id}`}
        horizontal
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />

      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 16,
  },
  castItem: {
    width: 120,
    marginRight: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: colors.gray.dark,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray.medium,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  castName: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  castRole: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  divider: {
    backgroundColor: '#E4E4E4',
    height: 1,
    width: '100%',
    marginTop: 30
  }
});

export default CastCarousel;

