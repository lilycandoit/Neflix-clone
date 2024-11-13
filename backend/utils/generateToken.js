import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, { expiresIn: '15d'});

    res.cookie('jwt-netflix', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milisecons
        httpOnly: true, // making the cookie accessible only through HTTP (not JavaScript) for added security.
        sameSite: 'strict', //  the cookie will only be sent in requests originating from the same site.
        secure: ENV_VARS.NODE_ENV !== 'development', //ensures that the cookie is only sent over HTTPS (secure HTTP connections).
    })

    return token;
}