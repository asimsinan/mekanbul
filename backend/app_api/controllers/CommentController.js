var mongoose = require("mongoose");
var Venue = mongoose.model("venue");
var User=mongoose.model("user");
const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const getComment = async function (req, res) {
  try {
    await Venue.findById(req.params.venueid)
      .select("name comments")
      .exec()
      .then(function (venue) {
        var response, comment;
        if (!venue) {
          createResponse(res, 404, {
            status: "venuid bulunamadı",
          });
          return;
        } else if (venue.comments && venue.comments.length > 0) {
          comment = venue.comments.id(req.params.commentid);
          if (!comment) {
            createResponse(res, 404, {
              status: "commentid bulunamadı",
            });
          } else {
            response = {
              venue: {
                name: venue.name,
                id: req.params.venueid,
              },
              comment: comment,
            };
            createResponse(res, 200, response);
          }
        } else {
          createResponse(res, 404, {
            status: "Yorum bulunamadı",
          });
        }
      });
  } catch (error) {
    createResponse(res, 404, {
      status: "venueid bulunamadı.",
    });
  }
};
var calculateLastRating = function (incomingVenue) {
  var i, numComments, avgRating, sumRating;
  if (incomingVenue.comments && incomingVenue.comments.length > 0) {
    numComments = incomingVenue.comments.length;
    sumRating = 0;
    for (i = 0; i < numComments; i++) {
      sumRating = sumRating + incomingVenue.comments[i].rating;
    }
    avgRating = Math.ceil(sumRating / numComments);
    incomingVenue.rating = avgRating;
    incomingVenue.save();
  }
};

var updateRating = function (venueid) {
  Venue.findById(venueid)
    .select("rating comments")
    .exec()
    .then(function (venue) {
      calculateLastRating(venue);
    });
};
const getUser = async (req, res, callback) => {
 
  if (req.auth && req.auth.email) {
    try{
      await User.findOne({ email: req.auth.email }).then(function(user) {
        callback(req, res, user.name);
      });
    }catch(error){
      createResponse(res, 400, { status: "Kullanıcı bulunamadı" });
    }
   
  } else {
    createResponse(res, 400, { status: "Token girilmedi" });
  }
};
const createComment = function (req, res, incomingVenue, author) {
  try {
    incomingVenue.comments.push({
      author: author,
      rating: req.body.rating,
      text: req.body.text,
    });
    incomingVenue.save().then(function (venue) {
      var comment;
      updateRating(venue._id);
      comment = venue.comments[venue.comments.length - 1];
      createResponse(res, 201, comment);
    });
  } catch (error) {
    createResponse(res, 400, { status: "Yorum oluşturulamadı!" });
  }
};
const addComment = async function (req, res) {
  try {
    
    getUser(req,res,(req,res,userName)=>{
     Venue.findById(req.params.venueid)
      .select("comments")
      .exec()
      .then((incomingVenue) => {
        createComment(req, res, incomingVenue,userName);
      });
    });
  } catch (error) {
    createResponse(res, 400, { status: "Yorum ekleme başarısız"});
  }
};
const deleteComment = async function (req, res) {
  try {
    await Venue.findById(req.params.venueid)
      .select("comments")
      .exec()
      .then(function (venue) {
        try {
          let comment = venue.comments.id(req.params.commentid);
          comment.deleteOne();
          venue.save().then(function () {
            updateRating(venue._id);
            createResponse(res, 200, {
              status: comment.author + " isimli kişinin yaptığı yorum silindi!",
            });
          });
        } catch (error) {
          createResponse(res, 404, { status: "Yorum bulunamadı!" });
        }
      });
  } catch (error) {
    createResponse(res, 400, { status: "Yorum silinemedi!" });
  }
};

const updateComment = async function (req, res) {
  try {
    Venue.findById(req.params.venueid)
      .select("comments")
      .exec()
      .then(function (venue) {
        try {
          let comment = venue.comments.id(req.params.commentid);
          comment.set(req.body);
          venue.save().then(function () {
            updateRating(venue._id);
            createResponse(res, 200, comment);
          });
        } catch {
          createResponse(res, 404, { status: "Böyle bir yorum yok" });
        }
      });
  } catch (error) {
    createResponse(res, 400, { status: "Yorum güncelleme başarısız!" });
  }
};

module.exports = {
  getComment,
  addComment,
  updateComment,
  deleteComment,
};
