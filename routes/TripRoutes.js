const express = require('express');
const tripRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const User = require('../models/User');
const Trip = require('../models/Trip');
const message = { msgBody: "Error has occured", msgError: true };

tripRouter.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { trip, id } = req.body;
    Trip.findOneAndUpdate({ _id: id }, trip, (err, trip) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else {
            res.status(201).json({ message: { msgBody: "Trip successfully updated", msgError: false } });
        }
    });
});

tripRouter.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { trip } = req.body;
    const newTrip = new Trip(trip);
    newTrip.save((err, trip) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else {
            req.user.trips.push(trip);
            req.user.save(err => {
                if (err) {
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                }
                else {
                    res.status(201).json({ trip, message: { msgBody: "Trip successfully created", msgError: false } });
                }
            });
        }
    });
});

tripRouter.get('/trip-info/:id', (req, res) => {
    Trip.findById({ _id: req.params.id }).exec((err, trip) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({ trip });
        }
    });
});


//gets user info
tripRouter.get('/info', passport.authenticate('jwt', { session: false }), (req, res) => {
    const message = { msgBody: "Error has occured", msgError: true };
    User.findById({ _id: req.user._id }).exec((err, document) => {
        if (err) {
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({
                id: document._id,
                username: document.username,
                address: document.address,
                authenticated: true
            });
        }
    });
});

module.exports = tripRouter;