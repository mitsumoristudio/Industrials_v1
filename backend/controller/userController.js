
import {sql} from "../config/postGresdb.js";
import jwt from "jsonwebtoken";
import {generateToken} from "../config/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcryptjs from "bcryptjs";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authenticateUser = async (req, res) => {
    const {email, password} = req.body;

    const findUser = await sql`
        SELECT * FROM users WHERE email = ${email}
        `;
    if (findUser.length === 0) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        })
    }
    const user = findUser[0];
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Password does not match',
        });
    }

    if (findUser.length > 0) {
        const token = await jwt.sign({id: findUser.id},
            process.env.JWT_SECRET_TOKEN, {
                expiresIn: `30d`
            });

        // Set JWT as HTTP-Only Cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30days in miliseconds
        });

        res.json({
        success: true,
            id: user.id,
            name: user.name,
            is_admin: user.is_admin,
            email: user.email,
    })
        console.log("User successfully logged in")
} else {
    res.status(400).json({
    success: false,
    message: "Invalid Credentials"})
    }
}

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const { id } = req.body;

    const findUser = await sql`
        SELECT * FROM users WHERE id = ${id}
        `;

    if (findUser.length > 0) {
        return res.status(404).json({success: false, message: "User already exists, try again"})
    }

    // Encrpyt the password so it is not stored in plain text. We are checking if the password has been modified. If it has, we are generating
    // a salt and hashing the password.
    try {
        const salt = await bcryptjs.genSalt(10);
        const newPassword = await bcryptjs.hash(password, salt);

        const newUser = await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${newPassword})
            RETURNING *
            `;
        if (newUser.length > 0) {
            generateToken(res, newUser[0].id);

            res.status(201).json({
                success: true,
                data: newUser[0],
            })
        } else {
            res.status(400);
            throw new Error("Invalid User Data");
        }

    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {httpOnly: true, expires: new Date(0)});
    // used to clear the cookie

    res.status(200).json({message: "User logged out successfully"});
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await sql`
            SELECT * FROM users 
            ORDER BY created_at DESC
            `;
        console.log("fetched users", users);
        res.status(200).json({success: true, data: users});

    } catch (error) {
        console.log("Error in getAllUsers", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const user = await sql`
            SELECT * FROM users WHERE id = ${id}
            `;
        res.status(200).json({success: true, data: user[0]});
    } catch (error) {
        console.log("Error in getUser", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }

})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {name, email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await sql`
            SELECT * FROM users WHERE id = ${id};
        `;

        if (existingUser.length === 0) {
            return res.status(404).json({success: false, message: 'User was not found'
            });
        }

        // Update the User
        const updatedUser = await sql`
             UPDATE users
             SET name = ${name},
                 email = ${email},
                 password = ${password}
             WHERE id = ${id}
             RETURNING *;
             `;
        return res.status(200).json({
            success: true,
            data: updatedUser[0]
        })

    } catch (error) {
        console.log("Error in updateUser", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }

})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await sql`
            DELETE FROM users WHERE id = ${id}
            RETURNING *;
    `;
        if (deletedUser.length === 0) {
            return res.status(404).json({success: false, message: 'User was not found'
            })
        }
        res.status(200).json({success: true, data: deletedUser[0]});

    } catch (error) {
        console.log("Error in deleteUser", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})