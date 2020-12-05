const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Idea = require("../models/Idea");
const User = require("../models/User");

router.get("/:title", ensureAuth, async (req, res) => {
  try {
    const idea = await Idea.find({
      title: req.params.title,
    }).lean();


      res.render("ideas/search", {
        idea,
      });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router