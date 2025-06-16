import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import sessionIdModel from "../models/sessionIdmodel.js";
import { randomUUID } from "crypto";
const accesskey = process.env.ACCESS_KEY;
const refreshkey = process.env.REFRESH_KEY;

const RegisterController = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username) {
      res.send("Please Provide your Username");
    }
    if (!email) {
      res.send("Please Provide your Email");
    }
    if (!password) {
      res.send("Please Provide your Password");
    }

    const finduser = await usermodel.findOne({ username, email: email });

    if (finduser) {
      res.send(
        "You are already registered with given email please try to login"
      );
    }

    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        console.log("error in hashing", err);
      }
      const newuser = new usermodel({
        username,
        email,
        password: hash,
        role,
      });
      await newuser.save();
    });
    res.status(200).send("Registered successfully");
  } catch (error) {
    console.error("error while registerig the user", error);
  }
};

const LoginController = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username) {
      res.status(400).send("Please Provide your Username");
    }
    if (!password) {
      res.status(400).send("Please Provide your Password");
    }

    const finduser = await usermodel.findOne({ username: username });

    if (!finduser) {
      res
        .status(400)
        .send(
          "You are not registered. Please try to register and then try to Login"
        );
    }

    let passwordcheck = bcrypt.compare(
      password,
      finduser.password,
      async (err, result) => {
        if (err) {
          console.log("error in bcrypt while comparing");
        }

        return result;
      }
    );

    if (!passwordcheck) {
      res.status(400).send("Password is incorrect");
    }

    const uniqueId = randomUUID();

    const findsessionid = await sessionIdModel.findOne({
      expiredsessionID: uniqueId,
    });

    if (findsessionid) {
      res.status(400).send("you are already loggedin try to logout");
    }

    const payload = {
      username: finduser.username,
      email: finduser.email,
      role: finduser.role,
      sessionId: uniqueId,
    };

    const accesstoken = jwt.sign(
      payload,
      accesskey,
      { expiresIn: "15m" },
      (err, token) => {
        if (err) {
          console.log("Error in Token genration");
        }
        console.log("accesstoken", token);
        return token;
      }
    );

    const refreshToken = jwt.sign(
      payload,
      refreshkey,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          console.log("Error while genrating token");
        }
        console.log("RefreshToken", token);
      }
    );

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).send({ accessToken: `Login Successfully ${accesstoken}` });
  } catch (error) {
    console.error("error while registerig the user", error);
  }
};

const LogoutController = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(400).send("Token not provided.");
    }

    const decoded = jwt.decode(token);
    const sessionID = decoded.sessionId;

    const findsessionID = await sessionIdModel.findOne({
      sessionId: sessionID,
    });

    if (!findsessionID) {
      res.status(400).send("You have been already logged out");
    }

    await sessionIdModel.deleteOne({ sessionId: sessionID });

    res.status(200).send("You have been logged out.");
  } catch (error) {
    console.error("error while logging out the user", error);
    res.status(400).send("Sorry ran into problem");
  }
};

const RefreshTokenController = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(400).send("Session expired Please Login again.");
  }

  try {
    const decoded = jwt.verify(token, refreshkey);

    const reassignAccessToken = jwt.sign(
      decoded,
      accesskey,
      { expiresIn: "15m" },
      (err, token) => {
        if (err) {
          console.log("Error while reassigning the token");
        }

        return token;
      }
    );
    res.status(200).send({ accesstoken: reassignAccessToken });
  } catch (error) {
    console.log("Error in refresh/token route", error);
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
};

const ForgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      res.send("Please provide with your registered Email");
    }

    const finduser = await usermodel.findOne({ email: email });

    if (!finduser) {
      res.status(400).send("Not registred Email try Again");
    }

    let token = crypto.randomBytes(32).toString("hex");
    finduser.resetToken = token;
    finduser.resetTokenExpire = Date.now() + 3600000;
    await finduser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // app password (app password recommended)
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const htmlContent = `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Reset Your Password</h2>
      <p style="font-size: 16px; color: #555;">Hello,</p>
      <p style="font-size: 16px; color: #555;">
        We received a request to reset your password. Click the button below to choose a new password:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>
      <p style="font-size: 14px; color: #999;">
        If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.
      </p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #ccc;">© ${new Date().getFullYear()} YourAppName. All rights reserved.</p>
    </div>
  </div>
`;

    await transporter.sendMail({
      from: `"Reset Password Support" <${process.env.EMAIL_USER}>`,
      to: finduser.email,
      subject: "Reset Your Password",
      html: htmlContent,
    });

    res.json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.log("Error in forgot-password", error);
    res.status(400).send("Problem occured in Password reset");
  }
};

const PasswordresetController = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  try {
    if (!password) {
      res.status(400).send({ message: "Password Not provided" });
    }

    const finduser = usermodel.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).send({ message: "Invalid token or token expired" });
    }

    bcrypt.hash(password, 4, async (err, result) => {
      if (err) {
        console.log("Error in reset-password-generation");
      }

      finduser.password = result;
      finduser.resetToken = undefined;
      finduser.resetTokenExpire = undefined;

      await finduser.save();
    });

    res.status(200).send("Password has been updated");
  } catch (error) {
    console.log("Error in password-reset", error);
    res.status(400).send({ message: "Error in password-reset" });
  }
};

export {
  LoginController,
  LogoutController,
  RegisterController,
  RefreshTokenController,
  ForgotPasswordController,
  PasswordresetController,
};
