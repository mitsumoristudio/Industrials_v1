
import asyncHandler from "../middleware/asyncHandler.js";
import {sql} from "../config/postGresdb.js";



// @desc    Create new contacts
// @route   POST /api/contacts
// @access  Private
export const createContacts = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        company_name,
        phone,
        position,
        project_id,
        user_id,
    } = req.body;

    try {

        const newContacts = await sql`
            INSERT INTO contacts (name, email, company_name, phone, position, project_id, user_id)
            VALUES (${name}, 
                    ${email},
                    ${company_name}, 
                    ${phone}, 
                    ${position}, 
                    ${project_id},
                    ${user_id})
            RETURNING *
            `;
        res.status(201).json({success: true, data: newContacts[0]});

    } catch (error) {
        console.log("Error in creating contacts", error);
        res.status(500).json({success: false, message: "Error in creating contacts"});
    }
})

// @desc Fetch All Contacts
// @route POST /api/contacts
// @access Public
export const getAllContacts = asyncHandler(async (req, res) => {
    try {
        const contacts = await sql`
            SELECT * FROM contacts 
            ORDER BY created_at DESC
            `;
        console.log("fetched contacts", contacts);
        res.status(200).json({success: true, data: contacts});

    } catch (error) {
        console.error("Error in fetching contacts", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

// @desc Update a single contact
// @route POST /api/contacts/:id
// @access Public

export const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        email,
        company_name,
        phone,
        position,
        user_id,
        project_id,
    } = req.body;

try {
    // Check if contact exists in database
    // const existingContact = await sql`
    //     SELECT * FROM contacts WHERE id = ${id}
    //     `;
    // if (existingContact.length === 0) {
    //     return res.status(404).json({success: false,
    //     message: "Contact was not found"})
    // }
    // Update the Contact
    const updatedContact = await sql`
        UPDATE contacts SET name = ${name},
                            email = ${email},
                            company_name = ${company_name},
                            phone = ${phone},
                            position = ${position},
                            user_id = ${user_id},
                            project_id = ${project_id}
                            WHERE id = ${id}
                            RETURNING *;
                            `;
    return res.status(200).json({success: true, data: updatedContact[0]});

} catch (error) {
    console.error("Error in update contact", error);
    res.status(500).json({success: false, message: 'Internal Server Error'});
}

})

// @desc Fetch a single Contact
// @route POST /api/contacts/:id
// @access Public
export const getContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const existingContact = await sql`
                SELECT * FROM contacts WHERE id = ${id}
                `;
        res.status(200).json({success: true, data: existingContact[0]});

    } catch (error) {
        console.log("Error in getting contact", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

// @desc Delete a Contact
// @route POST /api/contacts/:id
// @access Private/Admin
export const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteContact = await sql`
            DELETE FROM contacts WHERE id = ${id}
            RETURNING *
            `;
        if (deleteContact.length === 0) {
            return res.status(404).json({success: false, message: 'Contact was not found'});
        }
        res.status(200).json({success: true, data: deleteContact[0]});

    } catch (error) {
        console.log("Error in deleting contact", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

// @desc Get my Contacts
// @route POST /api/contacts/myProject
// @access Private/Admin
export const getMyContacts = asyncHandler(async (req, res) => {
  //  const contactId = req.params.id;
    const { id: contactId } = req.params;

    if (isNaN(contactId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try {
        const contacts = await sql`
            SELECT *
            FROM contacts WHERE user_id = ${contactId}
            `;
        res.status(200).json({success: true, data: contacts});
    } catch (error) {
        console.log("Error in getting contacts", error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})
