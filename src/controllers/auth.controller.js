import User from "../database/models/User.js";
import bcrypt from "bcryptjs";
import createAccessToken from "../libs/createAccessToken.js";
import jwt from "jsonwebtoken";

export const profileController = async (req, res) => {
  try {
    const { id } = req.user;
    const userFound = await User.findById(id, { password: 0, __v: 0 });
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, {
    secure: true,
    sameSite: "None",
  });
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    const verifyPassword = await bcrypt.compare(password, userFound.password);
    if (!verifyPassword) {
      return res.status(401).json({ message: "Passwords do not match" });
    }
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token, {
    secure: true,
    sameSite: "None",
  });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("token", "");
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    jwt.verify(token, process.env.PRIVATE_KEY, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Not authorized" });
      }
      const { id } = decoded;
      const userFound = await User.findById(id);
      if (!userFound) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
