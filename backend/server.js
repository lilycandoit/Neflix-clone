import express from 'express'; // module - aka 'esm'
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

import { ENV_VARS } from './config/envVars.js';
import { connectBD } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

// CORS configuration
app.use(
  cors({
    origin: "https://mern-neflix-clone.onrender.com", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Include this if using cookies
  })
);

app.use(express.json()); // will allow us to parse req.body object => imp
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
  connectBD();
});
