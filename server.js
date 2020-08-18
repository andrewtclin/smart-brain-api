const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cors = require("cors");
var knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It is working!");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Currently listening on port: ${process.env.PORT}`);
});

/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/: userId --> GET = user
/image --> PUT --> user
*/
