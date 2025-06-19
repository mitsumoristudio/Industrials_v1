
import express from 'express';
import {updateProject,
        deleteProject,
        createProject,
        getProject,
        getMyProjects,
        getProjectsPagination,
        getAllProjects} from "../controller/projectController.js";
import {admin, protectRoutes} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProjectsPagination);
//router.route("/").get(getAllProjects);
router.route("/:id").get(getProject);
router.route("/:id").put(protectRoutes, updateProject);
router.route("/:id").delete(protectRoutes, deleteProject);
router.route("/").post(createProject);
router.route("/:id/myProjects").get(getMyProjects);

export default router;