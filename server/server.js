const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
require("dotenv").config();

//middleware 
app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.PASS,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
})

transporter.verify((err, success) => {
    err ? console.log(err) : console.log(`==== Server is ready to take messages: ${success}`)
});

app.post("/send", function (req, res) {
    let mailOptions = {
        from: `${req.body.mailState.email}`,
        to: process.env.EMAIL,
        subject: `Message from: ${req.body.mailState.email}`,
        text: `${req.body.mailState.message}`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if(err){
            console.log("Error" + err + err.message);
            res.json({
                status: "fail",
            });
        } else {
            console.log("== Email sent ==");
            res.json({status: "success"});
        }
    });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})