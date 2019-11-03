const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("./item.model.js");

//Deletes an item
router.delete("/api/items/:itemId", (req, res) => {
  Item.deleteOne({"_id" : mongoose.Types.ObjectId(req.params.itemId)}, (err) => {
    if(err) {
      console.error(err);
      return res.sendStatus(500);
    }
    console.log("deletion successful");
    return res.sendStatus(204);
  });
});

// Creates a new item
router.post("/api/items", (req, res) => {
  const props = {
    imgSrc: "google.com",
    title: "red phone",
    price: 200,
    category: "phone",
  };
  const item1 = new Item(props);
  item1.save(err => {
    if (err){
      console.error("Error: ", err);
      res.sendStatus(500);
      return;
    }
    console.log("Successfuly created!")
    res.sendStatus(201);
  });
});

// Returns an item
router.get("/api/items/:itemId", (req, res)=>{
  Item.findById(req.params.itemId, function(err, item){
    if (err){
      console.error("Error: ", err);
      res.status(500).send(err);
      return;
    }
    res.send(item);
  });
});

// Returns all items
router.get("/api/items", (req, res)=>{
  Item.find({}, function(err, items){
    if (err){
      console.error("Error: ", err);
      res.status(500).send(err);
      return;
    }
    res.send(items);
  });
});

module.exports = router;