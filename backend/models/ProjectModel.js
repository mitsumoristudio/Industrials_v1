
import {sql} from "../config/postGresdb.js";

export default async function initProjectModel() {
    try {
        await sql`
                CREATE TABLE IF NOT EXISTS projects (
                    id SERIAL PRIMARY KEY NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    address VARCHAR(255),
                    city_state VARCHAR(255),
                    jobnumber VARCHAR(255),
                    scope_of_work INTEGER,
                    image VARCHAR NOT NULL,
                    company_name VARCHAR NOT NULL,
                    contacts_id INTEGER REFERENCES contacts(id) ON DELETE SET NULL,
                    users_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
    `;
      console.log("Project Database was initialized successfully.");
    } catch (error) {
        console.log("Error connecting to projects database", error)
    }
}