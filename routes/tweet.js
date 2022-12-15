const router = require("express").Router();
const Tweets = require("../model/tweet.model");
const app = require("../index");

//import rate limitter
const {
  customRedisRateLimiter,
  rateLimiterUsingThirdParty,
} = require("../ratelimiter");

router.get("/gettweet", customRedisRateLimiter, async (req, res) => {
  try {
    const data = await Tweets.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/posttweet", rateLimiterUsingThirdParty, async (req, res) => {
  const data = new Tweets({
    name: req.body.name,
    tweet: req.body.tweet,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/gettweet/:id", rateLimiterUsingThirdParty, async (req, res) => {
  try {
    const data = await Tweets.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Tweets.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Tweets.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
