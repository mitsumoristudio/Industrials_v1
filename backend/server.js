
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import {ajJet} from "./lib/arcjet.js";
import {errorHandler, notFound} from "./middleware/errorHandler.js";
import initUserModel from "./models/UserModel.js";
import initProjectModel from "./models/ProjectModel.js";
import initContactModel from "./models/ContactModel.js";
import userRoute from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";
import contactRoute from "./routes/contactRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contactUsRoute from "./routes/contactUsRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Body Parer Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Security Headers with Helmet
// Helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(helmet());

// Logs the request(GET)
app.use(morgan('dev'));

// Cross-Origin Resource Sharing - is a security feature built into web browsers
// that controls how resources on web pages can be requested from another domain.
// Prevent cores middleware in the client
app.use(cors());

// app.get("/", (req, res) => {
//     res.send("API is currently running ...")
// })

// Apply arcjet rate-limit to all the routes
app.use(async  (req, res, next) => {
    try {
        const decision = await ajJet.protect(req, {
            request: 1, // specifies that each request consumes 2 tokens
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({error: "Too Many Requests"});
            } else if (decision.reason.isBot()) {
                res.status(403).json({error: "Bot access denied"});
            } else {
                res.status(403).json({error: "Forbidden"});
            }
            return;
        }

        // Check for spoofed bots
        // Spoofing typically involves the use of bad bots to manipulate data,
        // network communications, or other digital elements to disguise the true source of the attack by creating a false identity.
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({error: "Spoofed bot detected"});
        }
        next();

    } catch (error) {
        console.log("Arcjet error", error);
        next(error);
    }
})

// Cookie Parser Middleware
// This needs to be added for JWT and localstorage to work together for caching userInfo
app.use(cookieParser());

// Users
app.use("/api/users", userRoute);

// Projects
app.use("/api/projects", projectRoute);

// Contacts
app.use("/api/contacts", contactRoute);

// Upload Photos
app.use("/api/uploads", uploadRoutes);

// ContactUs
app.use("/api/contactUs", contactUsRoute);


// Set upload folder as static
const __dirname = path.resolve(); // Set _dirname to current directory
app.use(`/uploads`, express.static(path.join(__dirname, `/uploads`))); // changed the pathname because the root
// folder would not accept /uploads previous running from backend package json ../uploads

// Connect to Postgres Database by creating a table
// Initialize the usersModel
initUserModel();

initProjectModel();

initContactModel();

// Prepare for Production
if (process.env.NODE_ENV  !== "development") {
    // set static folder
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    // Any route that is not api will be redirected to index.html
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));

} else {
    app.get("/", (req, res) => {
        res.send("API is currently running ...")
    })
}

// app.use(express.static(path.join(__dirname, "/frontend/build")));
//      // Any route that is not api will be redirected to index.html
//      app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));



// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
