import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthorized = async (req, res, next) => {
    try {
        if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
    } else  {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } catch (error) {
    let err = new Error("Not authorized, No token");
    err.statusCode = 401;
    next(err);
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error("Not authorized as an admn");
    error.statusCode = 401;
    next(error);
  }
};