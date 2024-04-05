const mongoose = require("mongoose");
const CONNECTION_STRING="mongodb+srv://shettyharshitha666:P7bVvpBnYfgzfKit@news.qanmyqi.mongodb.net/newsfeeds?retryWrites=true&w=majority&appName=news";

const connectDb = async () => { 
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database connected!", connect.connection.host, connect.connection.name)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

}

module.exports = connectDb;