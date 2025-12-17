import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Container from '@/components/layout/Container';
import {colors} from '@/theme';

const WishlistScreen: React.FC = () => {
  return (
    <Container>
      <View style={styles.content}>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.placeholder}>
          Your wishlist will be displayed here
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 14,
    color: colors.text.muted,
    textAlign: 'center',
  },
});

export default WishlistScreen;

