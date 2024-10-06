const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../configs/server.config");

const createToken = async (id, type) => {
  try {
    const token = jwt.sign({ userId: id, type: type }, JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    log.error("Error from [TOKEN HELPER] : ", error);
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    return decode;
  } catch (error) {
    log.error("Error from [TOKEN HELPER] :", error);
    throw error;
  }
};

const generateAccessToken = (id) => {
  const accessToken = jwt.sign({ userId: id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
};

const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign({ userId: id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
};

const resetToken = (email) => {
  const resetToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "30m",
  });
  return resetToken;
};

const verifyAccessToken = (token) => {
  return jwt.verify(token,JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token,JWT_SECRET);
};

module.exports = {
  createToken,
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  resetToken,
};
