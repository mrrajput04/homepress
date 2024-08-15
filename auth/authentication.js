const admin = require('firebase-admin');

const isAuthenticated = async(req,res,next) => {
    const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: "unauthorized" });
  if (!authorization.startsWith("Bearer"))
    return res.status(401).json({ message: "unauthorized" });
  const split = authorization.split("Bearer ");
  if (split.length !== 2)
    return res.status(401).send({ message: "Unauthorized" });
  const token = split[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email,
    }
    next()
 } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

module.exports = isAuthenticated;
