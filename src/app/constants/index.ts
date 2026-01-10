// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://restcountries.com/v3.1/all',
  FIELDS_PARAM: 'name,capital,flags,area,population,region,subregion,latlng',
  TIMEOUT_MS: 10000,
  CACHE_REVALIDATE_SECONDS: 3600,
} as const;

// Game Configuration
export const GAME_CONFIG = {
  DEFAULT_DIFFICULTY: 3,
  ANIMATION_DELAY_MS: 1000,
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  DISCLAIMER: '/disclaimer',
  ERROR: '/error',
  FUN_WITH: '/funwith',
  LIST: '/funwith/list',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  BEST_SCORE_PREFIX: '_',
} as const;
