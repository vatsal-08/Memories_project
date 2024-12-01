import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const auth = (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log("No token");

      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error);
    return res.status(401).json({ message: "Unauthenticated" });
  }
};
export default auth;
