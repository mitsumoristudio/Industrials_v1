
import {sql} from "../config/postGresdb.js";

export default async function initContactModel() {
    try {
        await sql`
                CREATE TABLE IF NOT EXISTS contacts (
                    id SERIAL PRIMARY KEY NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255),
                    company_name VARCHAR(255),
                    phone VARCHAR(255),
                    position VARCHAR(255),
                    project_id INTEGER REFERENCES projects (id) ON DELETE SET NULL,
                    user_id INTEGER REFERENCES users (id) ON DELETE SET NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
                `;

        console.log("Contact Database was initialized successfully.");
    } catch (error) {
        console.log("Error connecting to contact database", error)
    }
}