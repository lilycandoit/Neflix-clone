import dotenv from 'dotenv';
// dotenv package: Loads the variables from .env into process.env.

dotenv.config();
// dotenv.config() loads the variables from .env into process.env, making them accessible via process.env.VARIABLE_NAME

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY: process.env.TMDB_API_KEY
};

// envVars.js: Configures dotenv, accesses process.env, and exports specific variables for use in other parts of the application.
