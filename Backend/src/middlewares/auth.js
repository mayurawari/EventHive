import jwt from "jsonwebtoken"
import blacklistModel from "../config/models/blaclistModel.js";

const auth = async (req, res, next) => {
  const header =req.cookies.accesstoken;
  if (!header) {
    return res.status(400).json({
      message: "token header is not present or token is not provided",
    });
  }

  const token = header;
  const blacklistToken = await blacklistModel.findOne({ token });
  if (blacklistToken) {
    return res.status(400).json({
      message: "this token is blacklisted try to get the new token",
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(400).json({ message: "this is not a valid token" });
    } else {
      req.user = decoded;
      next();
    }
  });
};

export default auth;
