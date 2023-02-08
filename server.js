require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "login-session",
        secret: process.env.COOKIE_SECRET,
        httpOnly: true
    })
);

const db = require("./models");
const Role = db.role;

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);



db.sequelize.sync()

//{force: true}).then(() => {
//    console.log("Drop and resync DB");
//    initial();
//}

app.get("/", (req, res) => {
    res.json({ message: "Welcome to live chat!" });
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
