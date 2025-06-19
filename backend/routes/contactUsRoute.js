import express from 'express';
import dotenv from 'dotenv';
import sgMail from "@sendgrid/mail"

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: `runprospectpark@gmail.com`,
        from: "smitsumori@hotmail.com",
        subject: `New contact message from ${name}`,
        text: `Message from ${name} ${email}:\n\n${message}`,
    }
    try {
        await sgMail.send(msg);
        res.json({success: true, data: "Message sent successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Failed to send message"})
    }
})

export default router;