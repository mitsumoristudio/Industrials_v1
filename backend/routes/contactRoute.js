
import express from 'express';
import {createContacts,
        deleteContact,
        getAllContacts,
        updateContact,
        getMyContacts,
        getContact} from "../controller/contactsController.js";
import {admin, protectRoutes} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllContacts);
router.route("/:id").get(getContact);
router.route("/:id").put(protectRoutes, admin, updateContact);
router.route("/:id").delete(protectRoutes, admin, deleteContact);
router.route("/").post(createContacts);
router.route("/:id/myContacts").get(getMyContacts);

export default router;