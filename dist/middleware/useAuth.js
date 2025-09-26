import jwt from "jsonwebtoken";
import env from "../config/config.js";
export const useAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const decodedData = jwt.verify(token, env.JWT_SECRET);
        if (!decodedData) {
            console.log("Failed to decode user from token");
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        req.user = decodedData;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
};
//# sourceMappingURL=useAuth.js.map