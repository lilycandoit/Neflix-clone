import express from 'express';

import { getTrending, getDetails, getTrailers, getSimilar, getCategory } from '../controllers/media.controller.js';

const router = express.Router();

router.get('/trending', getTrending('movie')); // to fetch one random treding movie
router.get('/:id/trailers', getTrailers('movie'));
router.get('/:id/details', getDetails('movie'));
router.get('/:id/similar', getSimilar('movie'));
router.get('/:category', getCategory('movie'));

export default router;
