var express = require('express');
const req = require('express/lib/request');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const mongoose = require('mongoose')
const Final = require('./public/post')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
server.listen(3333);
app.use(express.static('public'))
app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/public/html_lab2/html_lab2.html');
});

const db = 'mongodb+srv://Mongo:Pass123@cluster0.omcb3.mongodb.net/VirusDB?retryWrites=true&w=majority'
connections = [];

mongoose
  .connect(db, {UseNewUrlParser:true, UseUnifiedTopology: true})
  .then((res) => console.log('Connected to BD'))
  .catch((error) => console.log(error))

io.sockets.on('connection', function(socket) {
	socket.on('send mass', function(data) {
		io.sockets.emit('add mass', data);
	});
});

app.post('/info', jsonParser, (req,res) => {
	const {final} = req.body
	const post = new Final({final})
	console.log(req.body)
	post
		.save()
		.then((result) => res.send(result))
		.catch((error) => {
			console.log(error)
		})
})
