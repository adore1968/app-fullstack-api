import jwt from "jsonwebtoken";

const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.PRIVATE_KEY, (error, token) => {
      if (error) return reject(error);
      resolve(token);
    });
  });
};

export default createAccessToken;
