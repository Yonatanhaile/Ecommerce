const express = require("express");
const multer = require("multer");
const Item = require("../models/Item");

const router = express.Router();

// Storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// POST an item
router.post("/post", upload.single("image"), async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            image: `/uploads/${req.file.filename}`,
            price: req.body.price,
            phone: req.body.phone
        });
        await newItem.save();
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET all items
router.get("/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
