require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;


module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  DB_NAME,
};
