const router = require('express').Router();
var fs = require('fs');

module.exports = (Moment, User) => {

    router.post('/create-moment', (req, res) => {
        console.log("Creating a moment");
        console.log(req);
        let moment = new Moment({
            timestamp: req.body.date,
            highlight: req.body.highlight,
            message: req.body.message,
            color: req.body.color,
            user: req.user._id,
            //image: fs.readFileSync(req.body.image.src),
        });
    moment.save()
    .then(() => res.json({success: true}))
    .catch((err) => res.json({success: false, err: err}));
  });

  router.get('/moments', (req, res) => {
    Moment.find({user: req.user._id})
    .then((moments) => res.json({success: true, moments}))
    .catch(() => res.json({success: false}));
  });

  return router;
}
