
import {sql} from "../config/postGresdb.js";

export default async function initUserModel() {
    try {
        await sql`
              CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY NOT NULL,
                        name VARCHAR NOT NULL,
                        email VARCHAR NOT NULL UNIQUE,
                        password VARCHAR NOT NULL,
                        is_admin BOOLEAN NOT NULL DEFAULT FALSE,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
              )
`;
    console.log("User Database initialized successfully.");
} catch (error) {
        console.log("Error connecting to users database", error);}
}