import AsyncStorage from '@react-native-async-storage/async-storage';
import {IMovie} from '@/types/movie';

const WATCHLIST_KEY = '@watchlist';

export const storage = {
  // Watchlist operations
  async getWatchlist(): Promise<IMovie[]> {
    try {
      const data = await AsyncStorage.getItem(WATCHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting watchlist:', error);
      return [];
    }
  },

  async addToWatchlist(movie: IMovie): Promise<void> {
    try {
      const watchlist = await this.getWatchlist();
      const exists = watchlist.some(m => m.id === movie.id);
      if (!exists) {
        watchlist.push(movie);
        await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  },

  async removeFromWatchlist(movieId: number): Promise<void> {
    try {
      const watchlist = await this.getWatchlist();
      const filtered = watchlist.filter(m => m.id !== movieId);
      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  },

  async isInWatchlist(movieId: number): Promise<boolean> {
    try {
      const watchlist = await this.getWatchlist();
      return watchlist.some(m => m.id === movieId);
    } catch (error) {
      console.error('Error checking watchlist:', error);
      return false;
    }
  },
};

