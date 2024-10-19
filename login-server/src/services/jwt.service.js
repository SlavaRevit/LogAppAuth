import jwt from "jsonwebtoken";

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_KEY, {
    expiresIn: '10s'
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.JWT_REFRESH_KEY);
}


function validateAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_KEY);
  } catch (e) {
    return null;
  }
}


export const jwtService = {
  generateAccessToken,
  validateAccessToken,
  generateRefreshToken,
  validateRefreshToken
};
