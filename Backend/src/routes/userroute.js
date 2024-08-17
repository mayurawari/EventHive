import { Router } from "express";
import usermodel from "../config/models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import blacklistModel from "../config/models/blaclistModel.js";
config();

const key = process.env.SECRET_KEY;
const userroute = Router();

userroute.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userexist = await usermodel.findOne({ username: username });
    if (userexist) {
      return res
        .status(400)
        .json({ message: "already registered try to login" });
    }

    bcrypt.hash(password, 12, async (err, result) => {
      if (err) console.log(err);

      let role = "user";
      if (email.endsWith("@company.com")) {
        role = "admin";
        console.log("admin moment detected");
      }
      const user = new usermodel({ username, email, password: result, role });
      await user.save();

      return res.status(201).send("user is registred successffully");
    });
  } catch (error) {
    res.status(500).send(err.message);
  }
});

userroute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "enter proper details" });
    }

    const existuser = await usermodel.findOne({ username: username });
    if (!existuser) {
      return res
        .status(400)
        .json({ message: "please register first and then try to login " });
    }

    bcrypt.compare(password, existuser.password, async (err, result) => {
      if (err) console.log(err);
      else {
        if (result) {
          jwt.sign(
            { username: existuser.username, role: existuser.role },
            key,
            (err, token) => {
              if (err) console.log(err);
              else {
                console.log(token);
                res.cookie("accesstoken", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "Strict",
                  maxAge: 864000000,
                });
                return res.status(200).json({ accestoken: token });
              }
            }
          );
          await existuser.save();
        } else {
          return res.status(400).json({
            message: "details not correct",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

userroute.post("/logout", async (req, res) => {
  const header = req.cookies.accesstoken;
  if (!header) {
    return res.status(400).json({
      message: "token header is not present ",
    });
  }
  const token = header;
  try {
    const blaclisttoken = new blacklistModel({ token });
    await blaclisttoken.save();
    res.cookie("accestoken", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(201).json({ message: "user is loggoed out successfully" });
  } catch (error) {
    console.log(error);
  }
});
export default userroute;


