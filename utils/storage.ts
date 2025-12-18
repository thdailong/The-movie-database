import AsyncStorage from '@react-native-async-storage/async-storage';
import {IMovie} from '@/types/movie';
import {CategoryType} from '@/screens/home/Category';
import {SortByType} from '@/screens/home/SortBy';

const WATCHLIST_KEY = '@watchlist';
const HOME_CATEGORY_KEY = '@home_category';
const HOME_SORTBY_KEY = '@home_sortby';

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

  // Home screen preferences
  async getHomeCategory(): Promise<CategoryType | null> {
    try {
      const data = await AsyncStorage.getItem(HOME_CATEGORY_KEY);
      return data ? (data as CategoryType) : null;
    } catch (error) {
      console.error('Error getting home category:', error);
      return null;
    }
  },

  async setHomeCategory(category: CategoryType): Promise<void> {
    try {
      await AsyncStorage.setItem(HOME_CATEGORY_KEY, category);
    } catch (error) {
      console.error('Error setting home category:', error);
    }
  },

  async getHomeSortBy(): Promise<SortByType | null> {
    try {
      const data = await AsyncStorage.getItem(HOME_SORTBY_KEY);
      return data ? (data as SortByType) : null;
    } catch (error) {
      console.error('Error getting home sortBy:', error);
      return null;
    }
  },

  async setHomeSortBy(sortBy: SortByType | null): Promise<void> {
    try {
      if (sortBy === null) {
        await AsyncStorage.removeItem(HOME_SORTBY_KEY);
      } else {
        await AsyncStorage.setItem(HOME_SORTBY_KEY, sortBy);
      }
    } catch (error) {
      console.error('Error setting home sortBy:', error);
    }
  },
};

