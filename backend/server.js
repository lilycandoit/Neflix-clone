import express from 'express'; // module - aka 'esm'
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

import { ENV_VARS } from './config/envVars.js';
import { connectBD } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json()); // will allow us to parse req.body object => imp
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes); // movie routes
app.use('/api/v1/tv', protectRoute, tvRoutes); // TV routes
app.use('/api/v1/search', protectRoute, searchRoutes); // TV routes

app.listen(PORT, () => {
  console.log('server started at http:/localhost:' + PORT);
  connectBD();
});
