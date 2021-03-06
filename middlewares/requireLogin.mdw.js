const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/key");
const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({
      error: "you must be logged in",
    });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "you must be logged in",
      });
    }

    const { _id } = payload;
    User.findById(_id)
      .select("-password")
      .then((userdata) => {
        req.user = userdata;
        next();
      });
  });
};
