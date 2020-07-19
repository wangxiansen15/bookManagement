var express = require('express');
var service = require('../service/index');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* api */
router.post('/addbook', function (req, res) {
  service.addbook(req, res);
});

router.post('/book', function (req, res) {
  service.getbookList(req, res);
});

router.delete('/book/:key', function (req, res) {
  service.deleteBook(req, res);
});

router.get('/book/:key', function (req, res) {
  service.getDetail(req, res);
});

router.put('/book/:key', function (req, res) {
  service.changeBook(req, res);
});

router.post('/login', function (req, res) {
  service.login(req, res);
});

router.post('/addorder', function (req, res) {
  service.addorder(req, res);
});

router.post('/getorder', function (req, res) {
  service.getorder(req, res);
});

router.delete('/deleteOrder/:key', function (req, res) {
  service.deleteOrder(req,res);
});

router.post('/jqueryBook', function (req, res) {
  service.jqueryBook(req, res);
});

module.exports = router;
