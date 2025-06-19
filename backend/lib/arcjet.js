
import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";
import dotenv from 'dotenv'

dotenv.config();

// Initialize Archet
export const ajJet = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules: [
        // shield protects your app from common attacks e.g. SQL injection, XSS, CSRF attacks
        shield({mode: "LIVE"}),
        detectBot({
            mode:"LIVE",
            // blocks all bots except search engines and postman
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "POSTMAN"
            ]
        }),
        // Create a token bucket rate limit
        tokenBucket({
            mode:"LIVE",
            refillRate: 5, // Refill 5 tokens per interval
            interval: 30, // Refil every 20 secs
            capacity: 30 // Bucket capacity of 10 tokens

        })
    ]
})