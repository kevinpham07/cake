const path = require('path')

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/dist/public')));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cakedb', { useNewUrlParser: true });
const CakeSchema = new mongoose.Schema({
	baker: { type: String, required: true },
	ratings: { type: Array, default:{
		rating: { type: Array, default: [] },
		comments: {type: Array, default: [] }

	}},
	img: {type: String}
})
var Cake = mongoose.model('Cake', CakeSchema);

app.get('/cakes', (req, res) => {
	Cake.find({}, (err, cake) => {
		if(err){
			console.log("ERROR", err)
			res.json({ err });
		}
		else{
			res.json({ cake });
		}
	})
})

app.post('/cakes', (req, res) => {

	var cake = new Cake();
	cake.baker = req.body.baker;
	cake.img = req.body.img;
	cake.save(function(err, cake) {
		if(err){
			res.json({ err });
		}
		else{
			res.json({ cake });
		}
	})
})

app.put('/cakes/:id', (req, res) => {
	console.log(req.body)
	Cake.findOneAndUpdate({_id: req.params.id}, {$push: {ratings: {rating: req.body.rating, comments: req.body.comment}}}, (err, cake) => {
		if(err){
			console.log("************ERROR****************", err)
			res.json(err);
		}
		else{
			console.log(cake);
			res.json(cake);
		}
	});
})

app.get('/cakes/:id', (req, res) => {
	Cake.findOne({_id: req.params.id}, (err, cake) => {
		if(err){
			res.json(err);
		}
		else{
			res.json(cake);
		}
	})
})

app.listen(1337);