import express from 'express';

import {
  getTrending,
  getDetails,
  getTrailers,
  getSimilar,
  getCategory,
} from '../controllers/media.controller.js';

const router = express.Router();

router.get('/trending', getTrending('tv')); // to fetch one random treding movie
router.get('/:id/trailers', getTrailers('tv'));
router.get('/:id/details', getDetails('tv'));
router.get('/:id/similar', getSimilar('tv'));
router.get('/:category', getCategory('tv'));

export default router;
