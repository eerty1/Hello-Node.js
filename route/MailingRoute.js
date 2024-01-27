const express = require("express");
const mailSenderService = require("../service/MailSenderService");

const mailingRouter = express.Router();
const mailSender = new mailSenderService();


mailingRouter.post("/callback", (req, res) => {
    mailSender.sendEmail(req.body);
    res.status(200);
})

module.exports = mailingRouter;