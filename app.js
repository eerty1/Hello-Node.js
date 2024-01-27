const express = require("express");
const mailingRoute = require("./route/MailingRoute");
const blogRoute = require("./route/BlogRoute");
const portfolioRoute = require("./route/PortfolioRoute");
const authenticationRoute = require("./route/AuthenticationRoute");
const passport = require("passport");
const cors = require("cors")
const port = 8080;
const app = express();

app.use(express.json());

app.use(passport.initialize());
require("./service/AuthenticationService");

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use("/api", authenticationRoute);
app.use("/api", mailingRoute);

app.use("/api/blog", blogRoute);
app.use("/api/portfolio", portfolioRoute);
app.listen(port);
