const express = require('express');
const router = express.Router();

router.get(
  '/all',
  (req, res, next) => {
    console.log(req)
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

module.exports = router;