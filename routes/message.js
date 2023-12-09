const express = require("express");
const router = express.Router();

// Require controller modules.
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");


/// Catagory ROUTES ///

// GET catalog home page.
router.get("/", message_controller.index);

// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get("/create", user_controller.user_create_get);

// POST request for creating Category.
router.post("/create", user_controller.user_create_post);


module.exports = router;