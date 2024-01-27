require('dotenv').config();
const axios = require('axios');
const nodemailer = require("nodemailer");

module.exports = class MailSenderService  {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS
            }
        });
    };

    sendEmail(body) {
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: body.email,
            subject: 'Уведобление с filmroom.pro'
        };
        switch (body.purpose) {
            case "callback" :
                mailOptions.text = this.writeCallbackBody(body);
                break;
            case "quiz" :
                mailOptions.text = this.writeQuizBody(body);
                break;
            case "advice" :
                sendTelegramNotification(body);
                mailOptions.text = this.writeAdviceBody(body);
                break;
        }

        this.transporter.sendMail(mailOptions);
    };

    writeCallbackBody(body) {
        return "Заявка на Обратную связь" + "\n" +
            "Мессенджер для обратной связи: " + body.messenger_type + "\n" +
            "Имя клиента: " + body.name + "\n" +
            "Контактная информация: " + body.contactInfo;
    };

    writeQuizBody(body) {
        return "Пользователь прошел Квиз-опрос" + "\n" +
            "Результат квиза: " + body.quiz_result +
            "Мессенджер для обратной связи: " + body.messenger_type + "\n" +
            "Имя клиента: " + body.name + "\n" +
            "Контактная информация: " + body.contactInfo;
    };

    writeAdviceBody(body) {
        return "Ваши советы: "
    };
};

function sendTelegramNotification(body) {
    axios.get("https://api.telegram.org/bot" + process.env.TG_BOT_TOKEN +
        "/sendMessage?chat_id=" + process.env.TG_BOT_CHAT_ID +
        "&text=Пользователь " + body.name + " получил Советы на почту: " + body.email,
        {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
}


