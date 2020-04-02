const router = require('express').Router();

module.exports = (Moment, User) => {

    router.post('/create-moment', (req, res) => {
        console.log("Creating a moment");
        console.log(req);
    /* User.findById(req.body.user)
    .then((listing) => (
      (new Request({
        host: listing.host,
        listing: listing._id,
        guest: req.user._id,
        from: req.body.from,
        to: req.body.to,
      })).save()
      .then(() => (
        (new Notification({
          user: listing.host,
          message: `${req.user.name.fname} sent you a booking request!`,
          category: 'Request',
          timestamp: new Date(),
        })).save()))
    ))
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false})); */
  });

  return router;
}
