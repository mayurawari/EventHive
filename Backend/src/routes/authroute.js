import { Router } from "express";
import {
  RegisterController,
  LoginController,
  LogoutController,
  RefreshTokenController,
  ForgotPasswordController,
  PasswordresetController,
} from "../controllers/authcontrollers.js";

const Authroute = Router();

//For testing purposes, might remove afterwards
Authroute.get("/", (req, res) => {
  res.send("This is AuthRoute");
});

Authroute.post("/register", RegisterController); //imported from controllers

Authroute.post("/login", LoginController); //imported from controllers

Authroute.post("/logout", LogoutController); //imported from controllers

Authroute.post("/Refreshtoken", RefreshTokenController); //imported from controllers

Authroute.post("/forgot-password", ForgotPasswordController); //imported from controllers

Authroute.post("/password-reset", PasswordresetController); //imported from controllers

export default Authroute;
