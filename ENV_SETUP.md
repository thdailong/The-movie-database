# Environment Variables Setup & Troubleshooting

## How to Reapply Environment Variables

If your environment variables are not updating, follow these steps:

### Step 1: Stop Metro Bundler
If Metro bundler is running, stop it (Ctrl+C in the terminal where it's running).

### Step 2: Clear Caches

**Option A: Using npm scripts (Recommended)**
```bash
npm run clean:all
```

**Option B: Manual commands**
```bash
# Clear Metro cache
rm -rf node_modules/.cache
rm -rf /tmp/metro-*
rm -rf /tmp/haste-*

# Clear Watchman cache (if installed)
watchman watch-del-all
```

### Step 3: Restart Metro with Cache Reset
```bash
npm run start:reset
```

Or manually:
```bash
npx react-native start --reset-cache
```

### Step 4: Rebuild the App

**For iOS:**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

## Verify Environment Variables

You can verify your environment variables are loaded correctly by checking:

```typescript
import env from '@/config/env';

console.log('API_KEY:', env.API_KEY);
console.log('API_BASE_URL:', env.API_BASE_URL);
```

## Common Issues

1. **Variables still showing old values:**
   - Make sure you've stopped Metro bundler completely
   - Clear all caches (see Step 2)
   - Restart Metro with `--reset-cache` flag
   - Rebuild the app

2. **Variables are undefined:**
   - Check your `.env` file exists in the project root
   - Verify variable names match exactly (case-sensitive)
   - Make sure there are no spaces around the `=` sign in `.env`
   - Restart Metro bundler

3. **TypeScript errors:**
   - Make sure `types/env.d.ts` exists and has the correct type definitions
   - Restart your TypeScript server in your IDE

## Important Notes

- Environment variables are replaced at **build time**, not runtime
- After changing `.env`, you **must** restart Metro bundler with `--reset-cache`
- The `.env` file should be in the project root (same level as `package.json`)
- Never commit `.env` to git (it's in `.gitignore`)

