const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const enquiryRoutes = require("./App/routes/web/enquiryRoutes");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*'
}));

// CALLING ROUTES
app.use("/api/enquiry",enquiryRoutes);



// CONNECT TO MONGO-DB
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DATABASE SUCCESSFULLY CONNECTED");
    app.listen(process.env.PORT,()=>{
        console.log(`APPLICATION STARTED ON PORT- ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err);
});
