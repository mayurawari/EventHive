// [BE/backend.md > Best Practices > Authentication]: Refactored for robust JWT handling, error fallback, and code clarity per documentation
import sessionIdModel from "../models/sessionIdmodel.js";
import jwt from "jsonwebtoken"

const Authenticate = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        // [BE/backend.md > Best Practices > Error Handling]: Fallback for missing auth header
        return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = header.split(' ')[1];
    if (!token) {
        // [BE/backend.md > Best Practices > Error Handling]: Fallback for missing token
        return res.status(401).json({ error: "Token not provided. Please login again." });
    }
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.sessionId) {
            // [BE/backend.md > Best Practices > Error Handling]: Fallback for invalid token structure
            return res.status(401).json({ error: "Invalid token structure." });
        }
        const checkId = await sessionIdModel.findOne({ sessionId: decoded.sessionId });
        if (!checkId) {
            // [BE/backend.md > Best Practices > Error Handling]: Fallback for invalid session
            return res.status(401).json({ error: "Session invalid or expired." });
        }
        jwt.verify(token, process.env.ACCESS_KEY, (err, result) => {
            if (err) {
                // [BE/backend.md > Best Practices > Error Handling]: Fallback for JWT verification failure
                return res.status(401).json({ error: "Token verification failed." });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        // [BE/backend.md > Best Practices > Error Handling]: General fallback for auth middleware errors
        console.log("Error in token authentication middleware", error);
        return res.status(500).json({ error: "Internal authentication error." });
    }
}

export default Authenticate;