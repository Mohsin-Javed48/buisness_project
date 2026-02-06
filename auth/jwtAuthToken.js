const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  req.isVerified = false;
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    req.isVerified = true;
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    req.isVerified = false;
    next(err);
  }
};

module.exports = authToken;
