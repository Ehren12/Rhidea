const express = require("express");
const bodyParser = require("body-parser")
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Idea = require("../models/Idea");

// @desc Login/Landing Page
// @route GET/

router.get("/add", ensureAuth, (req, res) => {
  res.render("ideas/add");
});

router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Idea.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

router.get("/", ensureAuth, async (req, res) => {
  try {
    const ideas = await Idea.find({ status: "public" })
      .populate("user")
      .sort({ problem: "desc" })
      .lean();
    res.render("ideas/index", {
      ideas,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const idea = await Idea.findOne({
      _id: req.params.id,
    }).lean();

    if (!idea) {
      return res.render("error/404");
    }

    if (idea.user != req.user.id) {
      res.redirect("/ideas");
    } else {
      res.render("ideas/edit", {
        idea,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

router.put("/:id", ensureAuth, async (req, res) => {
  let idea = await Idea.findById(req.params.id).lean();

  if (!idea) {
    return res.render("error/404");
  }

  if (idea.user != req.user.id) {
    res.redirect("/ideas");
  } else {
    story = await Idea.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect("/dashboard");
  }
});

router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    let idea = await Idea.findById(req.params.id).lean();

    if (!idea) {
      return res.render("error/404");
    }

    if (idea.user != req.user.id) {
      res.redirect("/ideas");
    } else {
      await Idea.remove({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let idea = await Idea.findById(req.params.id).populate("user").lean();

    if (!idea) {
      return res.render("error/404");
    }

    res.render("ideas/show", {
      idea,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const ideas = await Idea.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();
    res.render("ideas/index", {
      ideas,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/search/:title", ensureAuth, async (req, res) => {
  try {
    const idea = await Idea.find({
      title: req.params.title,
    }).lean();

    if (!idea) {
      return res.render("error/404");
    }

    if (idea.user != req.user.title) {
      res.redirect("/ideas");
    } else {
      res.render("ideas/index", {
        idea,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }

});

// @desc Dashboard
// @route GET /dashboard

module.exports = router;
