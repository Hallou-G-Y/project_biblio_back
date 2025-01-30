// Imports
import jwt, { JwtPayload } from "jsonwebtoken";

// Constants
const JWT_SECRET = "mysecret"; // Mettre dans .env

export const generateTokenForUser = (userData: any) => {
  return jwt.sign(
    {
      userId: userData.id,
      isAdmin: userData.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

export const parseAuthorization = (authorization: any) => {
  return authorization != null ? authorization.replace("Bearer ", "") : null;
};

export const getUserId = (userToken: String) => {
  let userId = -1;
  let token = module.exports.parseAuthorization(userToken);
  if (token != null) {
    try {
      let jwtToken = jwt.verify(token, JWT_SECRET) as JwtPayload; // Type assertion
      if (jwtToken && typeof jwtToken !== "string")
        // Type guard
        userId = jwtToken.userId;
    } catch (err) {
      console.log(err);
    }
  }
  return userId;
};
export const verifIsAdmin = (userToken: String) => {
  let isAdmin = false;
  let token = module.exports.parseAuthorization(userToken);
  if (token != null) {
    try {
      let jwtToken = jwt.verify(token, JWT_SECRET) as JwtPayload; // Type assertion
      if (jwtToken && typeof jwtToken !== "string")
        // Type guard
        isAdmin = jwtToken.isAdmin;
    } catch (err) {
      console.log(err);
    }
  }
  return isAdmin;
};


