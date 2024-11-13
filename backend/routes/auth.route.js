import express from 'express';
import { signup, login, logout, authCheck } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', signup); // post to send data in the request

router.post('/login', login);

router.post('/logout', logout);

router.get('/authCheck', protectRoute, authCheck);

export default router;
