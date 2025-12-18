import {
  API_BASE_URL,
  API_KEY,
  IMAGE_BASE_URL,
  APP_NAME,
  APP_VERSION,
} from '@env';

export const env = {
  API_BASE_URL: API_BASE_URL || 'https://api.themoviedb.org/3',
  API_KEY: API_KEY || '',
  IMAGE_BASE_URL: IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
  APP_NAME: APP_NAME || 'The Movie DB',
  APP_VERSION: APP_VERSION || '1.0.0',
};

export default env;

