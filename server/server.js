const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");
const DB = require("./database.js");
const Item = require("./item.model.js");
const bodyParser = require("body-parser");

/** Development environment. We won't use the .env file in Heroku */
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

console.log("username", process.env.DB_USERNAME);
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-szs3x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1/users", userRouter);

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get('/items/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static('dist'));

function listen(){
	//Heroku needs process.env.PORT
	app.listen(PORT, () => {
		console.log("Server started", PORT);
		console.log(`http://localhost:${PORT}`);
	});
}

mongoose.connect(DB_URL)
	.then(() => {
		console.log("DB access successful");
		// deleteAllItems();
		migrate();
		listen();
	})
	.catch(err => {
		console.error("error", err);
	});

function migrate(){
	Item.countDocuments({}, (err, count) => {
		if(err) throw err;
		if(count > 0) {
			console.log("Items already exist");	
			return;
		}
		saveAllItems();
	});
}

function saveAllItems(){
	const items = DB.getItems();
	items.forEach(item => {
		const document = new Item(item);
		document.save((err) => {
				if(err){
					console.log(err);
					throw new Error("Error during save");
				}
				console.log("Save successful");
		});
	});
}

function deleteAllItems(){
	Item.deleteMany({}, (err, doc) => {
		console.log("err", err, "doc", doc);
	});
}