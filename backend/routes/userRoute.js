
import express from 'express';
import {protectRoutes, admin} from "../middleware/authMiddleware.js";
import {logoutUser,
        updateUser,
        authenticateUser,
        getUser,
        getAllUsers,
        deleteUser,
        registerUser,} from "../controller/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(getAllUsers);
router.route("/logout").post(logoutUser);
router.route("/login").post(authenticateUser);

router.route("/:id").get(getUser);
router.route("/:id").put(protectRoutes, admin, updateUser);
router.route("/:id").delete(protectRoutes, admin, deleteUser);

export default router;