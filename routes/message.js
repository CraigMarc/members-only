const express = require("express");
const router = express.Router();

// Require controller modules.
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");
const signIn_controller = require("../controllers/signInController");

/// Catagory ROUTES ///

// GET catalog home page.
router.get("/", message_controller.index);

// GET request for sign up. 
router.get("/create", user_controller.user_create_get);

// POST request for sign up.
router.post("/create", user_controller.user_create_post);


// GET request for sign in. 
router.get("/sign-in", signIn_controller.sign_in_get);

// Post request for sign in. 
router.post("/sign-in", signIn_controller.sign_in_post);


module.exports = router;