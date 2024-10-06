require("dotenv").config();
const { hashItem } = require("../utils/helpers/bcrypt.utils");
const { headerEncode } = require("../utils/helpers/validator.utils");
const mongoose = require("mongoose");
const userModel=require("../models/user.model");
const counterModel=require("../models/counter.model");
const MONGO_URI=process.env.MONGO_URI;
const DB_NAME=process.env.DB_NAME;
const url =MONGO_URI + "/" + DB_NAME;

const connectDataBase = async () => {
  try {
    const hashPassword = await hashItem(process.env.ADMIN_PASSWORD);
     mongoose
      .connect(url)
      .then(() => {
        let data = {
          name: process.env.ADMIN_NAME,

          
          userId: "admin_1",
          password: hashPassword,
          contact: process.env.ADMIN_CONTACT,
          email: process.env.ADMIN_EMAIL,
          role: "Admin",
          hash: headerEncode(process.env.API_MESSAGE),
          isActive: true,
        };

        let Admin = {
          _id: "admin",
          seq: 1,
        }; 
        new counterModel(Admin).save();
        console.log("counter seeding done.");

         new userModel(data).save();
         console.log("admin seeding done.");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error("Error connecting to the database:", err);
  }
};
connectDataBase();