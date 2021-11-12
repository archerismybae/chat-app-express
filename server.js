var express = require("express")
var mongoose = require("mongoose")
var app = express()
var http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname));

var Message = mongoose.model('Messages',{ name : String, message : String});

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

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err) {
            res.sendStatus(500);
        }
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

io.on('connection', (socket) => {
    console.log('a user is connected');
})

var s = server.listen(3000, () => {
    console.log("Running on port", s.address().port)
})