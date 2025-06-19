
import asyncHandler from "../middleware/asyncHandler.js";
import {sql} from "../config/postGresdb.js";

// @desc Update a Project
// @route POST /api/projects/:id
// @access Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        address,
        jobnumber,
        scope_of_work,
        city_state,
        image,
        company_name,
        job_contact_name,
    } = req.body;

    try {
        // Check if project exists in database
        // const existingProject = await sql`
        //     SELECT * FROM projects WHERE id = ${id}
        //     `;
        // if (existingProject.length === 0) {
        //     return res.status(404).json({success: false,
        //                                  message: "Project not found"}
        //     )
        // }
        // Update the Project - No comma before WHERE
        const updatedProject = await sql`
            UPDATE projects
            SET name = ${name},
                description = ${description},
                address = ${address},
                jobnumber = ${jobnumber},
                scope_of_work = ${scope_of_work},
                image = ${image},
                city_state = ${city_state},
                company_name = ${company_name},
                job_contact_name = ${job_contact_name}
                WHERE id = ${id}
                RETURNING *;
            `;
        return res.status(200).json({
            success: true,
            data: updatedProject[0]
        })

    } catch (error) {
        console.log("Error updating project", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// @desc Create a Project
// @route POST /api/projects
// @access Private/Admin
export const createProject = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        address,
        jobnumber,
        job_contact_name,
        city_state,
        scope_of_work,
        image,
        company_name,
        users_id,
    } = req.body;

    // if (!name || !jobnumber || !users_id) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Please enter all the required fields",
    //     });
    // }

    try {
        const newProject = await sql`
            INSERT INTO projects (
                name, description, address, jobnumber, scope_of_work, image, company_name, users_id, job_contact_name, city_state
            ) 
            VALUES (
                ${name}, ${description}, ${address}, ${jobnumber}, ${scope_of_work}, ${image}, ${company_name}, ${users_id},
                    ${job_contact_name}, ${city_state}
            )
            RETURNING *;
        `;

        res.status(200).json({
            success: true,
            data: newProject[0],
        });

    } catch (error) {
        console.error("Error in creating projects:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

// @desc Fetch All Projects
// @route POST /api/projects
// @access Public
export const getAllProjects = asyncHandler(async (req, res) => {
    try {
        const projects = await sql`
              SELECT * FROM projects
              ORDER BY created_at DESC
              `;
        console.log("fetched projects", projects);
        res.status(200).json({success: true, data: projects});

    } catch (error) {
        console.log("Error in fetching projects", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

// @desc Fetch products by pagination
// @route POST /api/projects/
// @access Public
export const getProjectsPagination = asyncHandler(async (req, res) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = Number(process.env.PAGINATION_PAGE_SIZE) || 8;
    const keyword = req.query.keyword || "";

    const offset = pageSize * (page - 1);

    let countQuery, dataQuery;
    let countParams = [], dataParams = [];

    if (keyword) {
        countQuery = sql`SELECT COUNT(*) FROM projects WHERE name ILIKE ${'%' + keyword + '%'}`;
        dataQuery = sql`
            SELECT * FROM projects
            WHERE name ILIKE ${'%' + keyword + '%'}
            ORDER BY id
            LIMIT ${pageSize}
            OFFSET ${offset}
        `;
    } else {
        countQuery = sql`SELECT COUNT(*) FROM projects`;
        dataQuery = sql`
            SELECT * FROM projects
            ORDER BY id
            LIMIT ${pageSize}
            OFFSET ${offset}
        `;
    }

    const countResult = await countQuery;
    const count = Number(countResult[0].count);

    const projects = await dataQuery;

    res.json({
        success: true,
        data: projects,
        page: page,
        pages: Math.ceil(count / pageSize),
        totalProjects: count,
    });
});


// @desc Fetch a single Project
// @route POST /api/projects/:id
// @access Public
export const getProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const existingProject = await sql`
              SELECT * FROM projects WHERE id = ${id}  
            `;
        res.status(200).json({success: true, data: existingProject[0]});

    } catch (error) {
        console.log("Error in getting project", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

// @desc Delete a Project
// @route POST /api/projects/:id
// @access Private/Admin

export const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProject = await sql`
        DELETE FROM projects WHERE id = ${id}
        RETURNING *
        `;
        if (deleteProject.length === 0) {
            return res.status(404).json({success: false, message: 'Project not found'});
        }
        res.status(200).json({success: true, data: deleteProject[0]});
    } catch (error) {
        console.log("Error in deleting project", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

// @desc Get my Project
// @route POST /api/projects/myProject
// @access Private/Admin
export const getMyProjects = asyncHandler(async (req, res) => {
   // const userId = req.params.id;
    const { id: userId } = req.params;

    if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try {
        const projects = await sql`
            SELECT *
            FROM projects
            WHERE users_id = ${userId}
            ORDER BY created_at DESC
        `;
        res.status(200).json({success: true, data: projects});
    } catch (error) {
        console.log("Error in getting my projects", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})