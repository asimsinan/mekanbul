var express = require("express");
var router = express.Router();
var ctrlVenues = require("../controllers/VenueController");
var ctrlComments = require("../controllers/CommentController");
const jwt = require('express-jwt'); 
const auth = jwt.expressjwt({
  secret:process.env.JWT_SECRET,
  userProperty:"payload",
  algorithms:["sha1","RS256","HS256"]
});
const ctrlAuth = require("../controllers/Auth");
router.post("/signup", ctrlAuth.signUp);
router.post("/login", ctrlAuth.login);

router.route("/venues").get(ctrlVenues.listVenues).post(ctrlVenues.addVenue);

router.route("/admin").get(auth,ctrlVenues.listAllVenues);

router
  .route("/venues/:venueid")
  .get(ctrlVenues.getVenue)
  .put(auth,ctrlVenues.updateVenue)
  .delete(auth,ctrlVenues.deleteVenue);

router.route("/venues/:venueid/comments")
.post(auth,ctrlComments.addComment);

router
  .route("/venues/:venueid/comments/:commentid")
  .get(ctrlComments.getComment)
  .put(auth,ctrlComments.updateComment)
  .delete(auth,ctrlComments.deleteComment);

module.exports = router;
