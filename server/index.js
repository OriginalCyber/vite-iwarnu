
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Report = require("./models/Report.js");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);


app.get("/server/test", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json("test ok");
  console.log("connect database")
});

app.post("/server/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password, number, phone, agency } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      number,
      phone,
      agency,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(404).json(e);
  }
});

app.post("/server/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/server/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { _id, name, email, number, phone, agency } = await User.findById(
        userData.id
      );
      res.json({ _id, name, email, number, phone, agency });
    });
  } else {
    res.json(null);
  }
});

app.post("/server/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/server/reports", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { title, phone, date, time, address, description } = req.body;
  try {
    const reportDoc = await Report.create({
      title, phone, date, time, address, description
    });
    res.json(reportDoc);
  } catch (e) {
    res.status(404).json;
  }
})

app.get("/server/reports", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, reportData) => {
    res.json(await Report.find({}));
    console.log()
  });
});

app.get("/server/reports/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Report.findById(id));
});

app.put("/server/reports", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { id, title, phone, date, time, address, description, added, } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, reportData) => {
    if (err) throw err;
    const reportDoc = await Report.findById(id);
    if (reportData.id === reportDoc.owner.toString()) {
      reportDoc.set({
        title,
        phone,
        date,
        time,
        address,
        description,

      });
      await reportDoc.save();
      res.json("ok");
    }
  });
});

app.get("/server/reports", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Report.find());
});

app.listen(4000);