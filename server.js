var express = require("express")
var mongoose = require("mongoose")
var app = express()

app.use(express.static(__dirname));
const username = 'dbUser';
const password = 'YDaGUIbcBzyxcRjT';
const cluster = 'cluster0.rwc6i'
const dbname = 'chat-app';


mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var server = app.listen(3000, () => {
    console.log("Running on port", server.address().port)
})