const path = require("path");
const router = require("express").Router();
const userRouter = require("./User.js");
const tripRouter = require("./TripRoutes.js");

// API Routes
router.use("/User", userRouter);
router.use("/Trip", tripRouter);

// If no API routes are hit, send the React app
router.use('*',function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;