
import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST, PGDATABASE, PGPASSWORD, PGUSER } = process.env;

// Create a SQL connection using our env variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

//neondb_owner:npg_chwT5dZaeL2f@ep-orange-credit-a4t5dg93-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
// this sql function we export is used as a tagged template literal, which allows us to write SQL queries
// safely