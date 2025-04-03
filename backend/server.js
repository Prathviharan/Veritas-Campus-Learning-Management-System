const express = require('express');

//dotenv
require('dotenv').config();

const app = express();
const {mongoose} = require('mongoose');

//database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("MongoDB Not Connected"))

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});