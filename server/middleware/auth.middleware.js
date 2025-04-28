import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  console.log("cookie: req.cookies", req.cookies);
  const token = req.cookies.jwt;
  console.log({token});
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.userId = payload.userId;
    next();
  });
}