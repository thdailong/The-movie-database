# Environment Variables

This project uses `react-native-dotenv` to manage environment variables.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your actual configuration:
   ```env
   API_BASE_URL=https://api.themoviedb.org/3
   API_KEY=your_actual_api_key_here
   IMAGE_BASE_URL=https://image.tmdb.org/t/p
   APP_NAME=The Movie DB
   APP_VERSION=1.0.0
   ```

## Usage

Import environment variables in your code:

```typescript
// Option 1: Import from @env directly
import { API_KEY, API_BASE_URL } from '@env';

// Option 2: Import from config/env.ts (recommended - includes defaults)
import env from '@/config/env';

// Example usage
const apiUrl = `${env.API_BASE_URL}/movie/popular?api_key=${env.API_KEY}`;
```

## Important Notes

- The `.env` file is gitignored and should not be committed
- The `.env.example` file should be committed as a template
- After changing `.env`, you may need to restart Metro bundler
- Environment variables are replaced at build time, not runtime

