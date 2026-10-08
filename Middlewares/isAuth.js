import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            console.log("Auth failed: No token provided");
            return res.status(401).json({ message: "No token" });
        }

        // Handle Bearer <token> format
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Auth failed: Invalid token -", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

export default isAuth;