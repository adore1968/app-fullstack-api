import jwt from "jsonwebtoken";

const authRequired = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = decoded;
    next();
  });
};

export default authRequired;
