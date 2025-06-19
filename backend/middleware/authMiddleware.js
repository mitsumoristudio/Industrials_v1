
import jwt from 'jsonwebtoken';
import {sql} from "../config/postGresdb.js";
import asyncHandler from "./asyncHandler.js";

export const protectRoutes = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the jwt Cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            console.log("Decoded jwt token", decoded);

            req.user = (await sql`
                SELECT * FROM users WHERE id = ${decoded.id}
            `)[0];

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Unauthorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Unauthorized, token not found');
    }
})

export const admin = (req, res, next) => {

    console.log("Authenticated user", req.user);
    console.log("Admin check:", req.user?.is_admin);
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized, user was not found');
    }

    if (req.user && req.user.is_admin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an Admin');
    }
}