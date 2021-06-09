const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require("../middleware/auth")

const Idea = require('../models/Idea')

// @desc Login/Landing Page
// @route GET/

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc Dashboard
// @route GET /dashboard

router.get('/dashboard', ensureAuth, async (req, res) => {

    try {
        const stories = await Idea.find({ user: req.user.id }).lean().limit(10)
        res.render('dashboard', {
            name: req.user.firstName,
            image: req.user.image,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

    
})

router.get('/dashboard/public', ensureAuth, async (req, res) => {

    try {
        const stories = await Idea.find({ user: req.user.id, status: "public"}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            image: req.user.image,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

    
})

router.get('/dashboard/private', ensureAuth, async (req, res) => {

    try {
        const stories = await Idea.find({ user: req.user.id, status: "private"}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            image: req.user.image,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

    
})

router.get('/settings', ensureAuth, async (req, res) => {

    try {
        const stories = await Idea.find({ user: req.user.id }).lean()
        res.render('settings', {
            name: req.user.firstName,
            image: req.user.image,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

    
})

module.exports = router