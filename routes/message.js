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

// GET request for signed in home page. 
router.get("/logged-in", signIn_controller.logged_in_home_get);

// Get request for log out

router.get("/log-out", signIn_controller.log_out_get);

// Get request for new message

router.get("/new-message", message_controller.new_message_get);

// Post request for new message

router.post("/new-message", message_controller.new_message_post);

// get for admin sign up

router.get("/admin-signin", signIn_controller.admin_sign_up_get);


module.exports = router;