var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ES API Wrapper for BitShares Blockchain' });
});

module.exports = router;
